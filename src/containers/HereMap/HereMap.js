/*
 *
 *   Copyright (C) 2017-2019 HERE Europe B.V.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   SPDX-License-Identifier: Apache-2.0
 *   License-Filename: LICENSE
 *
 *
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import _, { isEmpty, find, size, compact } from 'lodash';

import { filesDropped } from '../../actions/spaceActions';
import { showLoadingScreen } from '../../actions/commonActions';
import {
  updateMapSettings,
  setCurrentFeature,
  setMapMode,
  updateGeometriesCount,
  updateGeometries,
  setCurrentFeatures,
  hideAlert,
  showAlert,
  upadteLayerBbox,
} from '../../actions/mapActions';

import store from '../../store';

import { mapConfig, apiConfig } from '../../constants';
import { themes } from '../../constants/themes';
import styleGroupsConfig from '../../constants/styleGroupsConfig';
import {
  getMapSettingsFromURL,
  getToken,
  filterStringProps,
  populateLength,
  populateArea,
} from '../../helpers';

import ZoomCtrl from './ZoomCtrl';
import AddFeatureCtrl from './AddFeatureCtrl';
import ContextMenu from './ContextMenu';

import DataTable from '../DataTable/DataTable';

import Card from '../../components/Card/Card';
import SplitView from '../../components/SplitView/SplitView';
import DataTableButton from '../../components/DataTable/Widget/DataTableButton';
import EditorMenu from '../../components/EditorMenu/EditorMenu';
import base64Svg from '../../icons/svgBase64Obj.json';
import { projectsAPI, spacesAPI, apiErrorHandler } from '../../api';
import Button from '../../components/Common/Button';

import HERE from './Here';

import style from './HereMap.scss';
import logEvent from '../../utils/amplitudeLogger';

const EDIT_MODE = 'edit';
const MAP_OFFSET = 350;
let MAP_HEIGHT = 0;
let layerStyles = [];

const ACTIONS = {
  HIDE: 'hide',
  MINIMIZE: 'minimize',
  MID: 'mid',
  MAXIMIZE: 'maximize',
};

export const DATA_TABLE_CONFIG = {
  [ACTIONS.HIDE]: {
    action: 'hide',
    mapPos: 1,
  },
  [ACTIONS.MINIMIZE]: {
    action: 'minimize',
    mapPos: 0.8,
  },
  [ACTIONS.MID]: {
    action: 'mid',
    mapPos: 0.6,
  },
  [ACTIONS.MAXIMIZE]: {
    action: 'maximize',
    mapPos: 0.025,
  },
};

const ZOOM_MESSAGE = 'Zoom in the map to view data table';
const SELECT_LAYER_MSG = 'Please select a layer';
const NO_FEATURES_MSG = 'There are no features to display';

// Remember the deleted IDS
const DELETED_FEATURE_IDS = [];

class HereMap extends Component {
  state = {
    drawing: false,
    drawingTooltip: true,
    contextMenu: false,
    currentFeature: null,
    currentLayer: null,
    saving: false,
    history: {
      current_step: 0,
      total_steps: 0,
      modified_features: 0,
    },
    card: null,
    mouse: { x: 0, y: 0 },
    dropzoneActive: false,
    dataTableVisibility: ACTIONS.HIDE,
  };

  componentDidMount() {
    const { currentLayer } = this.props;

    this.updateMap();

    if (currentLayer) {
      this.setState({
        currentLayer: find(
          this.mapLayers,
          c =>
            c.name.indexOf('Hexbin') === -1 &&
            c.getProvider().space === currentLayer.geospace.id
        ),
      });
    }
  }

  shouldComponentUpdate = nextProps => {
    if (this.props.project && nextProps.project) {
      if (nextProps.project.meta.name !== this.props.project.meta.name)
        return false; // FIX FOR MAP FLICKERING
      return nextProps.project.last_update === this.props.project.last_update;
    }
    return true;
  };

  componentDidUpdate(prevProps) {
    const {
      project,
      refresh,
      previousViewMode,
      currentLayer,
      mapBbox,
      centroid,
      updatingFeature,
      mapMode,
      filteredFeatures,
      dataAdded,
    } = this.props;

    const { currentLayer: _currentLayer } = this.state;

    if (
      project !== prevProps.project ||
      refresh !== prevProps.refresh ||
      previousViewMode !== prevProps.previousViewMode
    ) {
      // if (!hexbin) this.updateMap();
      this.updateMap();

      // if (currentLayer && !hexbin) {
      if (currentLayer) {
        const layerObjects = this.mapObject
          .getLayers()
          .filter(o => o.name.includes('GeoSpaceLayer'));

        layerObjects.forEach(layerObject => {
          const geoLayer = project.layers.find(o =>
            layerObject.name.includes(o.geospace.id)
          );

          if (geoLayer) {
            layerObject.setStyle({
              styleGroups: {
                ...geoLayer.styleGroups,
                ...styleGroupsConfig.featureStyleGroups(geoLayer.styleGroups),
              },
              strokeWidthZoomScale: styleGroupsConfig.strokeWidthZoomScale,
              assign: feature => {
                const feat = styleGroupsConfig.geometryToFeatureStyleType(
                  feature.geometry.type
                );

                if (geoLayer.geometryVisibility) {
                  if (
                    geoLayer.geometryVisibility.includes(feat) ||
                    geoLayer.clustering.hexbin
                  ) {
                    return null;
                  }
                } else if (geoLayer.clustering.hexbin) return null;

                return styleGroupsConfig.styleAssignFunction(
                  feature,
                  geoLayer.styleRules,
                  geoLayer.geometryStyle
                );
              },
            });
          }
          this.mapObject.refresh(layerObject);
        });
      }
    }

    if (project.base.template) {
      if (project.base.template !== prevProps.project.base.template) {
        this.addTemplateLayer(project.base.template);
      }
    } else {
      this.mapObject.removeLayer(this.templateLayer);
    }

    if (project.base.theme !== prevProps.project.base.theme) {
      this.mapObject.refresh(this.baseLayer);
    }

    if (currentLayer !== prevProps.currentLayer && currentLayer) {
      this.setCurrLayer();
    }

    if (mapBbox) {
      if (prevProps.mapBbox !== mapBbox) {
        if (mapBbox.length > 0 && this.mapObject) {
          this.mapObject.setViewBounds(new HERE.xyz.maps.geo.Rect(...mapBbox));
        }
      }
    }

    if (centroid && prevProps.centroid !== centroid) {
      if (this.mapObject) {
        this.mapObject.setCenter(centroid[0], centroid[1]);

        this.mapObject.setZoomlevel(15);
      }
    }

    // if (prevProps.updatingFeature && !updatingFeature && !hexbin) {
    if (
      (prevProps.updatingFeature && !updatingFeature) ||
      prevProps.dataAdded !== dataAdded
    ) {
      this.refreshMap();
    }

    if (prevProps.mapMode !== mapMode) {
      this.resetState();

      this.editor.active(this.isEditMode());

      if (prevProps.mapMode === EDIT_MODE) {
        this.editor.clearObjectSelection();

        if (this.drawingBoard) {
          this.drawingBoard.cancel();
        }

        this.unhighlightLayer();

        if (layerStyles.length) {
          this.editor.getLayers().forEach((l, index) => {
            l.setStyle(layerStyles[index]);
            this.mapObject.refresh(l);
          });
        }

        this.onWindowResize(true);
      } else {
        if (_currentLayer) {
          if (filteredFeatures && filteredFeatures.length) {
            this.highlightLayerWithFilter(_currentLayer);
          } else {
            this.highlightLayer(_currentLayer);
          }
        }

        this.onWindowResize();
      }
    }

    if (currentLayer && currentLayer.clustering) {
      // console.log('chwck for hexbin layer', this.getHexbinLayer());
      if (
        prevProps.currentLayer &&
        (prevProps.currentLayer.clustering.hexbin !==
          currentLayer.clustering.hexbin ||
          prevProps.currentLayer.clustering.featureCount !==
            currentLayer.clustering.featureCount ||
          prevProps.currentLayer.clustering.property !==
            currentLayer.clustering.property ||
          prevProps.currentLayer.clustering.shape !==
            currentLayer.clustering.shape)
      ) {
        if (currentLayer.clustering.hexbin) {
          // console.log('changeeeeeeeeeeeee');
          this.enableHexbin();
        }
      }

      // if (
      //   prevProps.currentLayer &&
      //   (prevProps.currentLayer.clustering.theme !==
      //     currentLayer.clustering.theme ||
      //     prevProps.currentLayer.clustering.label !==
      //       currentLayer.clustering.label)
      // ) {
      //   if (currentLayer.clustering.hexbin) this.setStyleGroupForHexbin();
      // }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('keydown', this.onKeyPress);

    this.mapObject.removeEventListener('pointerup', this.onMapPointerUp);
    this.mapObject.removeEventListener('pointermove', this.onMapPointerMove);
    this.mapObject.removeEventListener('pressmove', this.onMapPointerMove);
    this.mapObject.removeEventListener(
      'mapviewchangestart',
      this.onMapViewChangeStart
    );
    this.mapObject.removeEventListener(
      'mapviewchangeend',
      this.onMapViewChangeEnd
    );

    this.editor.removeEventListener('pointerup', this.onEditorPointerUp);
    this.editor.removeObserver('history.current', this.onEditorHistoryChange);

    this.mapObject.removeEventListener(
      'mapviewchangestart',
      this.setStyleGroupForHexbin
    );

    this.mapObject.destroy();
    this.mapObject = null;
  }

  mapObject = null;

  baseLayer = null;

  enableHexbin = () => {
    const hexbinEnabledLayer = this.props.project.layers.find(
      o => o.clustering && o.clustering.hexbin
    );
    if (hexbinEnabledLayer) {
      this.removeHexbin();
      this.createHexbinLayer(hexbinEnabledLayer);
      _.debounce(() => {
        this.setStyleGroupForHexbin();
      }, 1000)();
    }
  };

  setStyleGroupForHexbin = () => {
    const hexbinEnabledLayer = this.props.project.layers.find(o => {
      if (o.clustering && o.clustering.hexbin) return o.clustering.hexbin;
      return undefined;
    });

    if (hexbinEnabledLayer) {
      const { label, theme, property, shape } = hexbinEnabledLayer.clustering;
      const numberValues = [];

      if (this.getHexbinLayer()) {
        const hexbinFeatures = this.getHexbinLayer()
          .getProvider(this.mapObject.getZoomlevel())
          .search({ rect: this.mapObject.getViewBounds() });
        // console.log('hexbinFeatures.length', hexbinFeatures.length);
        hexbinFeatures.forEach(hexbin => {
          if (property) {
            numberValues.push(hexbin.properties.aggregation[property].sum || 0);
          } else {
            numberValues.push(hexbin.properties.aggregation.qty);
          }
        });

        let min = 0;
        let max = 0;

        if (numberValues.length > 0) {
          min = Math.min(...numberValues);
          max = Math.max(...numberValues);

          this.getHexbinLayer().setStyle({
            styleGroups: styleGroupsConfig.hexbinStyleGroups(
              min,
              max,
              theme,
              property,
              shape
            ),
            strokeWidthZoomScale: styleGroupsConfig.strokeWidthZoomScale,
            assign: feature => {
              if (!hexbinEnabledLayer.visible) return null;
              return styleGroupsConfig.hexbinAssignFunction(feature, label);
            },
          });

          this.mapObject.refresh(this.getHexbinLayer());
        }
      }
    }
  };

  removeHexbin = () => {
    // console.log('innnnnside remove hexbin');
    this.mapObject.getLayers().forEach(l => {
      if (l.name.indexOf('Hexbin') !== -1) {
        this.mapObject.removeLayer(l);
      }
    });
  };

  getHexbinLayer = () => {
    let hexbinLayer;
    if (this.mapObject) {
      this.mapObject.getLayers().forEach(l => {
        if (l.name.indexOf('Hexbin') !== -1) hexbinLayer = l;
      });
    }
    return hexbinLayer;
  };

  resetState = () => {
    this.setState({
      dropzoneActive: false,
      card: false,
      drawing: false,
      contextMenu: false,
    });
  };

  setCurrLayer = () => {
    this.setState(
      {
        currentLayer: find(
          this.mapLayers,
          c =>
            c.name.indexOf('Hexbin') === -1 &&
            c.getProvider().space === this.props.currentLayer.geospace.id
        ),
      },
      this.setMapViewFeatures
    );
  };

  findProjectLayerBySpaceId = spaceId => {
    return find(
      this.props.project.layers,
      ({ geospace }) => geospace.id === spaceId
    );
  };

  isEditMode = () => this.props.mapMode === EDIT_MODE;

  isBaseLayer = e => (e.detail ? e.detail.layer === this.baseLayer : true);

  isEditorOverlay = e =>
    e.detail ? e.detail.layer === this.editor.getOverlay() : true;

  isRightClick = e => e.button === 2;

  toggleMapModeIntent = () => {
    if (
      this.state.history.total_steps !== 0 &&
      this.state.history.current_step !== 0
    ) {
      this.props.showAlert({
        title: 'Warning',
        text:
          'It seems that some changes have not been saved.\n Do you want to save the changes?',
        theme: 'negative',
        renderContent: () => (
          <div>
            <Button
              className={[style.btnExit]}
              type="secondary"
              text={"Don't save"}
              onClick={() => {
                this.editor.revert();
                this.toggleMapMode();
                this.props.hideAlert();
              }}
            />

            <Button
              className={[style.btnSave]}
              type="secondary-reversed"
              text="Save"
              onClick={() => {
                this.props.hideAlert();
                this.onSaveClick();
              }}
            />
          </div>
        ),
      });
    } else {
      if (
        this.props.proMap.indexOf(this.props.currentLayer.geospace.id) !== -1 &&
        this.props.mapMode !== EDIT_MODE
      ) {
        this.props.showAlert({
          theme: 'default',
          title: 'Schema is Applied on this space',
          text: 'You wont be able to edit and save anything on the map',
          cancel: this.props.hideAlert,
          cancelLabel: 'OK',
        });
      } else if (
        this.props.virtualMap.indexOf(this.props.currentLayer.geospace.id) !==
          -1 &&
        this.props.mapMode !== EDIT_MODE
      ) {
        this.props.showAlert({
          theme: 'default',
          title: 'Virtual Space',
          text:
            '- Any edits to features will be made in their original spaces. <br />- When adding to or modifying features of the virtual space, they will be written back to their upstream space, or the last space in the order of creation. <br /> - When deleting features from the virtual space a new pseudo-deleted feature is written to the last space. Trying to read the feature with that ID from the virtual-space is not possible afterwards.',
          cancel: this.props.hideAlert,
          cancelLabel: 'OK',
        });
      }

      this.toggleMapMode();
    }
  };

  toggleMapMode = () => {
    const { currentFeature } = this.state;

    if (this.props.mapMode === EDIT_MODE) {
      this.props.setMapMode('view');

      if (currentFeature) {
        this.state.currentFeature.unselect();
      }
    } else {
      logEvent('click_edit_map');
      this.props.setMapMode(EDIT_MODE);

      if (currentFeature) {
        this.state.currentFeature.unselect();
      }

      this.setState({
        editAction: 'reshape',
        dataTableVisibility: ACTIONS.HIDE,
      });
    }
  };

  updateHistoryState = () => {
    this.setState({
      history: this.editor.info(),
    });
  };

  getMapSettings = (initial = false) => {
    let settings;

    if (
      initial &&
      !isEmpty(this.props.project.publish_settings) &&
      !isEmpty(this.props.project.publish_settings.bookmark)
    ) {
      settings = this.props.project.publish_settings.bookmark;
    } else if (
      initial &&
      !isEmpty(this.props.project.map_settings) &&
      this.props.project.map_settings.center &&
      this.props.project.map_settings.zoom
    ) {
      settings = this.props.project.map_settings;
    } else if (getMapSettingsFromURL()) {
      settings = getMapSettingsFromURL();
    } else {
      settings = {
        center: mapConfig.defaultCenter,
        zoom: mapConfig.defaultZoomlevel,
      };
    }

    return {
      center: [parseFloat(settings.center[0]), parseFloat(settings.center[1])],
      zoom: parseInt(settings.zoom, 10),
    };
  };

  highlightLayer = layer => {
    layer.setStyle({
      styleGroups: styleGroupsConfig.selectedLayerStyleGroups,
      strokeWidthZoomScale: styleGroupsConfig.strokeWidthZoomScale,
      assign: feature => styleGroupsConfig.styleAssignFunction(feature),
    });

    this.mapObject.refresh(layer);
  };

  highlightLayerWithFilter = () => {
    const filteredFeaturesHashMap = {};
    this.props.filteredFeatures.forEach(filteredFeature => {
      filteredFeaturesHashMap[filteredFeature.id] = filteredFeature;
    });
    layerStyles = [];
    this.editor.getLayers().forEach(l => {
      layerStyles.push(l.getStyle());
      l.setStyle({
        styleGroups: styleGroupsConfig.selectedLayerStyleGroups,
        strokeWidthZoomScale: styleGroupsConfig.strokeWidthZoomScale,
        assign: feature => {
          return filteredFeaturesHashMap[feature.id]
            ? styleGroupsConfig.styleAssignFunction(feature)
            : null;
        },
      });
      this.mapObject.refresh(l);
    });
  };

  unhighlightLayer = () => {
    if (this.state.currentLayer) {
      const selectedProjectLayer = this.findProjectLayerBySpaceId(
        this.state.currentLayer.getProvider().space
      );
      this.state.currentLayer.setStyle({
        styleGroups: {
          ...selectedProjectLayer.styleGroups,
          ...styleGroupsConfig.featureStyleGroups(
            selectedProjectLayer.styleGroups
          ),
        },
        strokeWidthZoomScale: styleGroupsConfig.strokeWidthZoomScale,
        assign: feature =>
          styleGroupsConfig.styleAssignFunction(
            feature,
            this.props.currentLayer ? this.props.currentLayer.styleRules : null,
            this.props.currentLayer
              ? this.props.currentLayer.geometryStyle
              : null
          ),
      });

      this.mapObject.refresh(this.state.currentLayer);
    }
  };

  setMapViewFeatures = () => {
    if (
      this.state.currentLayer &&
      this.state.currentLayer.name.indexOf('Hexbin') === -1
    ) {
      const fts = this.state.currentLayer
        .getProvider()
        .search({ rect: this.mapObject.getViewBounds() });
      this.props.setCurrentFeatures(fts);
    } else {
      this.props.setCurrentFeatures(null);
    }
  };

  selectFetureOnClick = e => {
    const { filteredFeatures } = this.props;

    if (this.isEditorOverlay(e)) {
      if (this.isRightClick(e) && this.state.editAction === 'transform') {
        this.setState({
          contextMenu: {
            position: {
              x: e.mapX,
              y: e.mapY,
            },
          },
        });
      } else if (this.state.contextMenu) {
        this.setState({
          contextMenu: false,
        });
      }

      return;
    }

    if (this.state.currentFeature) {
      this.state.currentLayer.setStyleGroup(this.state.currentFeature); // Unselect previous feature

      if (this.isEditMode() && filteredFeatures && !filteredFeatures.length) {
        this.unhighlightLayer();
      }
    }

    if (!this.isBaseLayer(e)) {
      // Check I'm not on the base layer
      const selectedFeature = e.target;

      if (selectedFeature) {
        if (
          !this.state.drawing ||
          (this.state.drawing &&
            e.detail.layer.getProvider().space ===
              this.state.currentLayer.getProvider().space)
        ) {
          const selectedLayer = e.detail.layer;
          const selectedProjectLayer = this.findProjectLayerBySpaceId(
            selectedLayer.getProvider().space
          );

          if (selectedFeature.geometry) {
            const { lineLength, polygonArea } = this.getGisConfig(
              e.detail.layer
            );

            if (!lineLength || !lineLength.persistent) {
              delete selectedFeature.properties.length_m;
              delete selectedFeature.properties.length_km;
              delete selectedFeature.properties.length_miles;
            }

            if (!polygonArea || !polygonArea.persistent) {
              delete selectedFeature.properties.area_sqm;
              delete selectedFeature.properties.area_sqkm;
              delete selectedFeature.properties.area_sqmiles;
            }

            if (
              lineLength &&
              !lineLength.persistent &&
              lineLength.enabled &&
              ['LineString', 'MultiLineString'].indexOf(
                selectedFeature.geometry.type
              ) > -1
            ) {
              selectedFeature.properties = {
                ...selectedFeature.properties,
                ...populateLength(
                  selectedFeature,
                  lineLength,
                  !lineLength.persistent
                ).properties,
              };
            }

            if (
              polygonArea &&
              !polygonArea.persistent &&
              polygonArea.enabled &&
              ['Polygon', 'MultiPolygon'].indexOf(
                selectedFeature.geometry.type
              ) > -1
            ) {
              selectedFeature.properties = {
                ...selectedFeature.properties,
                ...populateArea(
                  selectedFeature,
                  polygonArea,
                  !polygonArea.persistent
                ).properties,
              };
            }
          }

          this.props.setCurrentFeature(selectedFeature, selectedProjectLayer);

          if (
            this.isEditMode() &&
            filteredFeatures &&
            !filteredFeatures.length
          ) {
            this.highlightLayer(selectedLayer);
          }

          selectedLayer.setStyleGroup(
            selectedFeature,
            styleGroupsConfig.selectedFeatureStyle(selectedFeature)
          );

          this.setState({
            editAction: 'reshape',
            currentFeature: selectedFeature,
            currentLayer: selectedLayer,
          });
        }
      }

      if (this.isEditMode()) {
        if (!this.isRightClick(e)) {
          if (!this.state.drawing) {
            selectedFeature.select();

            this.setState({
              contextMenu: false,
              editAction: 'reshape',
            });
          }
        } else {
          selectedFeature.select();

          this.setState({
            editAction: 'reshape',
            contextMenu: {
              type: selectedFeature.geometry.type,
              position: {
                x: e.mapX,
                y: e.mapY,
              },
            },
          });
        }
      }
    }
  };

  getGisConfig = layer => {
    const { layers } = this.props.project;
    const matchedLayer = layers.find(l => layer.name.includes(l.geospace.id));
    const lineLength = (matchedLayer && matchedLayer.lineLength) || {
      enabled: false,
    };
    const polygonArea = (matchedLayer && matchedLayer.polygonArea) || {
      enabled: false,
    };
    return { lineLength, polygonArea };
  };

  showCardOnFeatureClick = e => {
    const { currentLayer, filteredFeatures } = this.props;
    const { currentFeature } = this.state;
    if (!this.isEditMode()) {
      let cards = [];
      let hiddenCards = [];
      let containsProps = false;
      let header = false;

      if (!this.isBaseLayer(e)) {
        this.setState(
          {
            card: false,
          },
          () => {
            const updatedProperties = e.target.properties;

            for (const key in updatedProperties) {
              if (
                _.isObject(updatedProperties[key]) &&
                key !== '@ns:com:here:xyz' &&
                key !== '@ns:com:here:editor'
              ) {
                for (const propertyKey in updatedProperties[key]) {
                  updatedProperties[`${key}:${propertyKey}`] =
                    updatedProperties[key][propertyKey];
                }
                delete updatedProperties[key];
              }
            }

            cards = [...currentLayer.cards];
            hiddenCards = [...currentLayer.hiddenCards];

            for (const k of cards[0]) {
              if (!hiddenCards.includes(k)) {
                header = true;
                break;
              }
            }

            if (
              cards[0].length &&
              size(filterStringProps(updatedProperties)) > 0 &&
              header
            ) {
              cards[0].forEach(key => {
                if (updatedProperties[key]) {
                  containsProps = true;
                }
              });

              if (containsProps) {
                this.setState({
                  contextMenu: false,
                  card: {
                    properties: updatedProperties,
                    cards,
                    hiddenCards,
                    position: {
                      x: e.mapX,
                      y: e.mapY,
                    },
                    visible: true,
                  },
                });
              }
            }
          }
        );
      } else {
        this.props.setCurrentFeature(null);

        if (this.state.currentLayer && currentFeature) {
          if (_.find(filteredFeatures, { id: currentFeature.id })) {
            this.state.currentLayer.setStyleGroup(
              currentFeature,
              styleGroupsConfig.selectedFeatureStyle(currentFeature, 'filter')
            );
          } else {
            this.state.currentLayer.setStyleGroup(currentFeature);
          }
        }

        this.setState({
          card: false,
          currentFeature: null,
          contextMenu: false,
        });
      }
    }
  };

  onCardClose = () => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        visible: false,
      },
    }));
  };

  addNewPointOnClick = e => {
    if (this.state.drawing === 'Point') {
      const geoPoint = this.mapObject.pixelToGeo(e.mapX, e.mapY);
      const coord = new HERE.xyz.maps.editor.GeoCoordinate(
        geoPoint.longitude,
        geoPoint.latitude
      );

      this.editor.addFeature(
        new HERE.xyz.maps.editor.features.Marker(coord),
        this.state.currentLayer
      );

      // this.setState({
      //   drawing: false
      // });
    }
  };

  onMapPointerMove = e => {
    if (this.state.drawing !== false) {
      this.setState({
        mouse: {
          x: e.mapX,
          y: e.mapY,
        },
      });
    }
  };

  onMapPointerUp = e => {
    const hexbinFeature =
      e.target &&
      e.target.properties &&
      'resolution' in e.target.properties &&
      'kind' in e.target.properties;

    if (!hexbinFeature) {
      this.addNewPointOnClick(e);
      this.selectFetureOnClick(e);
      this.showCardOnFeatureClick(e);
    }
  };

  onMapViewChangeStart = () => {
    if (this.state.card !== null) {
      this.setState({
        card: null,
      });
    }
  };

  onMapViewChangeEnd = () => {
    if (this.mapObject) {
      const { latitude, longitude } = this.mapObject.getCenter();
      const zoom = this.mapObject.getZoomlevel();

      this.props.history.replace({
        search: `?c=${latitude};${longitude}&z=${zoom}`,
      });

      // this.props.updateMapSettings({ center: [latitude, longitude], zoom: zoom });
      this.setMapViewFeatures();
    }
  };

  onEditorPointerUp = e => {
    const feature = e.target;

    if (feature) {
      if (
        (feature.class === 'AREA_SHAPE' || feature.class === 'NAVLINK_SHAPE') &&
        feature.getLength
      ) {
        const length = feature.getLength();

        if (this.state.drawing === 'Polygon') {
          if (length > 2 && feature.getIndex() === length - 1) {
            if (this.drawingBoard) {
              this.drawingBoard.create();
              this.drawingBoard.cancel();
            }
          }
        } else if (length > 1 && feature.getIndex() === length - 1) {
          if (this.drawingBoard) {
            this.drawingBoard.create();
            this.drawingBoard.cancel();
          }
        }
        // Keep drawing after feature creation
        if (this.state.drawing === 'Line') {
          this.onLineClick();
        } else if (this.state.drawing === 'Polygon') {
          this.onPolygonClick();
        } else if (this.state.drawing === 'Point') {
          this.onPointClick();
        }
      }
    }
  };

  onEditorHistoryChange = () => {
    this.setState({
      history: {
        current_step: this.editor.get('history.current'),
        total_steps: this.editor.get('history.length'),
        modified_features: this.editor.get('changes.length'),
      },
    });
  };

  onKeyPress = e => {
    if (this.isEditMode()) {
      e.preventDefault();

      switch (e.keyCode) {
        case 27:
          this.clearDrawingBoard();
          break;
        case 8:
          this.deleteDrawing();
          break;
        default:
      }
    }
  };

  onMapDoubleClick = e => {
    this.mapObject.setZoomlevel(
      this.mapObject.getZoomlevel() + 1,
      e.mapX,
      e.mapY
    );
  };

  attachEvents = () => {
    this.mapObject.addEventListener('pointerup', this.onMapPointerUp);
    this.mapObject.addEventListener('pointermove', this.onMapPointerMove);
    this.mapObject.addEventListener('pressmove', this.onMapPointerMove);
    this.mapObject.addEventListener(
      'mapviewchangestart',
      this.onMapViewChangeStart
    );
    this.mapObject.addEventListener(
      'mapviewchangeend',
      this.onMapViewChangeEnd
    );
    this.mapObject.addEventListener('dbltap', this.onMapDoubleClick);
    this.editor.addEventListener('pointerup', this.onEditorPointerUp);
    this.editor.addObserver('history.current', this.onEditorHistoryChange);

    document.addEventListener('keydown', this.onKeyPress);
    window.addEventListener('resize', this.onWindowResize);
    this.mapObject.addEventListener(
      'mapviewchangestart',
      this.setStyleGroupForHexbin
    );
  };

  zoomIn = () => {
    this.mapObject.setZoomlevel(this.mapObject.getZoomlevel() + 1);
  };

  zoomOut = () => {
    this.mapObject.setZoomlevel(this.mapObject.getZoomlevel() - 1);
  };

  setupEditor = () => {
    const editorConfig = {
      featureSelectionByDefault: false,
      keepFeatureSelection: true,
    };

    this.editor = new HERE.xyz.maps.editor.Editor(this.mapObject, editorConfig);

    window.editor = this.editor;

    this.editor.getOverlay().getStyle().styleGroups.AREA_SHAPE = [
      {
        fill: '#2DD5c9',
        radius: 5,
        stroke: '#0F1621',
        strokeWidth: 2,
        type: 'Circle',
        zIndex: 3,
      },
    ];

    this.editor.getOverlay().getStyle().styleGroups.LINE_SHAPE = [
      {
        fill: '#2DD5c9',
        radius: 5,
        stroke: '#0F1621',
        strokeWidth: 2,
        type: 'Circle',
        zIndex: 3,
      },
    ];

    this.editor.getOverlay().getStyle().styleGroups.MARKER_SELECTOR = [
      {
        radius: 20,
        stroke: '#2DD5c9',
        strokeWidth: 3,
        type: 'Circle',
        zIndex: 1,
      },
    ];

    this.editor.active(false);
  };

  addTemplateLayer = templateType => {
    if (templateType) {
      this.templateLayer = new HERE.xyz.maps.layers.TileLayer({
        name: mapConfig.template[templateType].label,
        min: 1,
        max: 20,
        provider: new HERE.xyz.maps.providers.ImageProvider({
          name: 'templateImageProvider',
          url: mapConfig.template[templateType].url,
        }),
      });

      this.mapObject.addLayer(this.templateLayer, 1);
      this.mapObject.refresh(this.templateLayer);

      this.templateLayer.pointerEvents(false);
    }
  };

  createBaseLayer = () => {
    const tileLayer = this.props.project.base.tileLayer || 'here';
    const labels = this.props.project.base.showLabels
      ? 'withLabel'
      : 'withoutlabel';
    const theme = this.props.project.base
      ? this.props.project.base.theme
      : 'dark';
    this.baseLayer = new HERE.xyz.maps.layers.MVTLayer({
      name: 'mvt-world-layer',
      remote: {
        url: `${mapConfig.tileUrl[tileLayer].url}?access_token=${getToken()}`,
      },
      min: 1,
      max: 20,
      style: themes[labels][tileLayer][theme],
    });
    this.baseLayer.pointerEvents(false);
  };

  createBaseMap = () => {
    const bPreviousView = this.props.previousViewMode !== 'data';
    const settings = this.getMapSettings(bPreviousView);

    this.createBaseLayer();

    this.mapObject = new HERE.xyz.maps.Map(this.refs.container, {
      credentials: { access_token: getToken() },
      zoomLevel: settings.zoom,
      center: { latitude: settings.center[0], longitude: settings.center[1] },
      layers: [this.baseLayer],
      ui: {
        Logo: {},
      },
    });

    if (this.props.project.base.template) {
      this.addTemplateLayer(this.props.project.base.template);
    }

    window.mapObject = this.mapObject;

    this.setupEditor();
  };

  modifiyStyleGroups = styleGroups => {
    const updatedstyleGroups = { ...styleGroups };

    // this method is temporary and it will be removed in future
    if (updatedstyleGroups.pointStyle[2].src.indexOf('/icons/') > -1) {
      const iconName = updatedstyleGroups.pointStyle[2].baseSrc.split(
        'icons/'
      )[1];
      const iconColor = updatedstyleGroups.pointStyle[2].iconColor.substring(1);
      updatedstyleGroups.pointStyle[2].src =
        base64Svg[`${iconName}-${iconColor}`];
    }

    return updatedstyleGroups;
  };

  addLayer = layer => {
    const imageSrcString = layer.styleGroups.pointStyle[2].src.indexOf(
      '/icons/'
    );

    if (layer.visible) {
      const newGeoSpaceProvider = new HERE.xyz.maps.providers.SpaceProvider({
        name: `GeoSpaceProvider ${layer.geospace.id}`,
        space: layer.geospace.id,
        level: layer.meta.tags ? 14 : 2,
        url: apiConfig.spaces,
        credentials: {
          access_token: getToken(),
          limit: mapConfig.defaultLimit,
        },
        params: {
          clientId: 'studio',
        },
        tags: !layer.meta.tags ? false : layer.meta.spaceTags,
      });

      const newLayer = new HERE.xyz.maps.layers.TileLayer({
        name: `GeoSpaceLayer ${layer.geospace.id}`,
        min: layer.meta.tags ? 14 : 1,
        max: 20,
        margin: layer.meta.tags ? 0 : 32,
        provider: newGeoSpaceProvider,
        style: {
          styleGroups: {
            ...this.modifiyStyleGroups(layer.styleGroups),
            ...styleGroupsConfig.featureStyleGroups(layer.styleGroups),
          },
          strokeWidthZoomScale: styleGroupsConfig.strokeWidthZoomScale,
          assign: feature => {
            const feat = styleGroupsConfig.geometryToFeatureStyleType(
              feature.geometry.type
            );

            if (
              (layer.geometryVisibility &&
                layer.geometryVisibility.includes(feat)) ||
              layer.clustering.hexbin
            ) {
              return null;
            }

            return styleGroupsConfig.styleAssignFunction(
              feature,
              layer.styleRules,
              layer.geometryStyle
            );
          },
        },
      });

      this.mapObject.addLayer(newLayer);

      if (layer.meta.tags) {
        // this.props.centroid && this.mapObject.setCenter(this.props.centroid[0],this.props.centroid[1]);
        // this.mapObject.setZoomlevel(15);
      } else {
        this.editor.addLayer(newLayer);
      }
      newLayer.addEventListener('viewportReady', () => {
        this.selectCurrentFeature();
        this.setMapViewFeatures();
        this.props.showLoadingScreen(false);
      });

      // WORKAROUND
      const overlay = this.editor.getOverlay();
      this.mapObject.removeLayer(overlay);
      this.mapObject.addLayer(overlay);
      // END WORKAROUND

      // below code is temporary and it will be removed in future
      if (imageSrcString > -1) {
        projectsAPI
          .put(
            `/${this.props.project.id}`,
            JSON.stringify(this.props.project),
            { withCredentials: true }
          )
          .then(() => console.info('Project updated with new icon url'))
          .catch(e => console.info(e.response));
      }
    }
  };

  H3SpaceProvider = (ilevel, h3resolution, layer) => {
    const { geospace, clustering } = layer;

    let params;
    if (clustering.property) {
      params = {
        clustering: 'hexbin',
        'clustering.resolution': h3resolution,
        'clustering.property': clustering.property,
        'clustering.pointmode': clustering.shape === 'centroid',
        clientId: 'studio',
      };
    } else {
      params = {
        clustering: 'hexbin',
        'clustering.resolution': h3resolution,
        'clustering.pointmode': clustering.shape === 'centroid',
        clientId: 'studio',
      };
    }

    return new HERE.xyz.maps.providers.SpaceProvider({
      name: 'Hexbin SpaceProvider',
      level: ilevel,
      clip: false,
      margin: 0,
      space: geospace.id,
      url: apiConfig.spaces,
      credentials: {
        access_token: getToken(),
        limit: mapConfig.defaultLimit,
      },
      params,
    });
  };

  createHexbinLayer = layer => {
    const { meta } = layer;
    const mLayer = new HERE.xyz.maps.layers.TileLayer({
      name: `Hexbin Layer ${meta.title}`,
      min: 2,
      max: 20,
      margin: 0,
      providers: [
        { min: 2, max: 3, provider: this.H3SpaceProvider(2, 2, layer) },
        { min: 4, max: 4, provider: this.H3SpaceProvider(4, 3, layer) },
        { min: 5, max: 6, provider: this.H3SpaceProvider(5, 4, layer) },
        { min: 7, max: 8, provider: this.H3SpaceProvider(7, 5, layer) },
        { min: 9, max: 10, provider: this.H3SpaceProvider(9, 6, layer) },
        { min: 11, max: 11, provider: this.H3SpaceProvider(11, 7, layer) },
        { min: 12, max: 12, provider: this.H3SpaceProvider(12, 8, layer) },
        { min: 13, max: 14, provider: this.H3SpaceProvider(13, 9, layer) },
        { min: 15, max: 20, provider: this.H3SpaceProvider(15, 11, layer) },
      ],

      style: {
        styleGroups: {
          hexbin: [
            {
              zIndex: 0,
              type: 'Polygon',
              fill: 'rgba(227,74,51,0)',
              opacity: 0,
              stroke: 'black',
              strokeWidth: 1,
            },
          ],
        },
        assign: () => 'hexbin',
      },
    });

    this.mapObject.addLayer(mLayer);
  };

  selectCurrentFeature = () => {
    if (this.props.currentFeature) {
      const mapCurrentLayer = find(
        this.mapLayers,
        l =>
          l.name.indexOf('Hexbin') === -1 &&
          l.getProvider().space === this.props.currentLayer.geospace.id
      );
      const mapCurrentFeature =
        mapCurrentLayer.name.indexOf('Hexbin') === -1 &&
        mapCurrentLayer.getProvider().getFeature(this.props.currentFeature.id);
      if (mapCurrentFeature) {
        mapCurrentLayer.setStyleGroup(
          mapCurrentFeature,
          styleGroupsConfig.selectedFeatureStyle(mapCurrentFeature)
        );
        this.setState({
          currentFeature: mapCurrentFeature,
          currentLayer: mapCurrentLayer,
        });
      }
    }
  };

  toggleLayers = layer => {
    const currentLayer = find(
      this.mapLayers,
      c =>
        c.name.indexOf('Hexbin') === -1 &&
        c.getProvider().space === layer.geospace.id
    );
    const isHexbinApplied = layer.clustering && layer.clustering.hexbin;

    if (!currentLayer) {
      this.addLayer(layer);
    } else if (layer.visible) {
      if (layer.meta.spaceTags) {
        currentLayer.getProvider().setTags(layer.meta.spaceTags);
      }

      currentLayer.setStyle({
        styleGroups: {
          ...layer.styleGroups,
          ...styleGroupsConfig.featureStyleGroups(layer.styleGroups),
        },
        strokeWidthZoomScale: styleGroupsConfig.strokeWidthZoomScale,
        assign: feature => {
          if (isHexbinApplied) return null;
          return styleGroupsConfig.styleAssignFunction(
            feature,
            layer.styleRules,
            layer.geometryStyle
          );
        },
      });
      this.mapObject.refresh(currentLayer);
    } else {
      this.mapObject.removeLayer(currentLayer);
      currentLayer.removeEventListener(
        'viewportReady',
        this.selectCurrentFeature
      );
    }
  };

  cleanUpLayers = () => {
    if (!this.mapLayers) return;

    this.mapLayers.forEach(l => {
      if (l.name.indexOf('Hexbin') === -1) {
        if (
          !this.findProjectLayerBySpaceId(l.getProvider().space) &&
          l.name !== 'EditEngineOverlay' &&
          l.name !== 'Satellite'
        ) {
          if (l.clear) l.clear();
          this.mapObject.removeLayer(l);
        }
      }
    });
  };

  sortLayers = projectLayers => {
    if (!this.mapLayers) return;

    const mapLayersIndices = compact(
      this.mapLayers.map(l => {
        return l.name.indexOf('Hexbin') === -1 ? l.getProvider().space : '';
      })
    );
    const projectLayersIndices = projectLayers.map(l => l.geospace.id);

    // check if sort is diffrent
    if (mapLayersIndices.toString() !== projectLayersIndices.toString()) {
      this.mapObject.getLayers().forEach((l, i) => {
        return (
          i > 1 &&
          l.name.indexOf('Hexbin') === -1 &&
          this.mapObject.removeLayer(l)
        );
      });
      projectLayers.forEach(this.addLayer);
    }
  };

  updateMapPosition = () => {
    const settings = this.getMapSettings();

    // this.mapObject.refresh(this.baseLayer);
    this.mapObject.setZoomlevel(settings.zoom);
    this.mapObject.setCenter({
      latitude: settings.center[0],
      longitude: settings.center[1],
    });
  };

  refreshMap = () => {
    const projectLayers = [...this.props.project.layers].reverse() || [];

    this.mapObject.getLayers().forEach(l => {
      if (l.name.indexOf('Hexbin') === -1) this.mapObject.removeLayer(l);
    });

    this.createBaseLayer();
    this.mapObject.addLayer(this.baseLayer);
    projectLayers.forEach(this.addLayer);
  };

  updateMap = () => {
    if (!this.mapObject) {
      this.createBaseMap();
      this.enableHexbin();
      this.attachEvents();
    } else {
      this.mapObject.removeLayer(this.baseLayer);
      this.createBaseLayer();
      this.mapObject.addLayer(this.baseLayer, 0);
      this.updateMapPosition();
    }

    if (this.props.project) {
      const projectLayers = [...this.props.project.layers].reverse() || [];
      projectLayers.forEach(this.toggleLayers);

      this.sortLayers(projectLayers);
      this.cleanUpLayers(projectLayers);
      this.mapLayers = this.mapObject.getLayers().slice(1);
    }

    // this.updateMapPosition();
    setTimeout(this.onWindowResize, 400);
  };

  deleteDrawing = () => {
    if (this.state.currentFeature) {
      this.state.currentFeature.remove();
      this.props.setCurrentFeature(null);
      this.editor.clearObjectSelection();

      this.setState({
        contextMenu: false,
        currentFeature: null,
      });
    }
  };

  clearDrawingBoard = () => {
    if (this.isEditMode() && this.state.drawing) {
      if (this.drawingBoard) {
        this.drawingBoard.cancel();
      }

      this.setState({
        drawing: false,
      });
    }
  };

  onToggleDrawingTooltip = toggle => {
    if (this.props.mapMode === EDIT_MODE) {
      this.setState({
        drawingTooltip: toggle,
      });
    }
  };

  onTransformClick = () => {
    const feature = this.state.currentFeature;
    feature.unselect();
    this.state.currentLayer.setStyleGroup(
      feature,
      styleGroupsConfig.selectedFeatureStyle(feature)
    );
    feature.transform();
    this.setState({
      editAction: 'transform',
      contextMenu: false,
    });
  };

  onReshapeClick = () => {
    this.state.currentFeature.select();
    this.setState({
      editAction: 'reshape',
      contextMenu: false,
    });
  };

  onDeleteClick = () => {
    this.deleteDrawing();
  };

  onUndoClick = () => {
    this.editor.undo();

    this.setState({
      currentFeature: null,
    });
  };

  onRedoClick = () => {
    this.editor.redo();

    this.setState({
      currentFeature: null,
    });
  };

  onResetClick = () => {
    this.editor.revert();
  };

  onSaveClick = () => {
    this.setState({
      drawing: false,
      saving: true,
    });

    logEvent('click_save_map');

    this.editor.info().forEach(f => {
      const props = f.properties['@ns:com:here:editor'];

      if (props.created) {
        this.props.updateGeometriesCount(f.geometry.type);
        this.props.updateGeometries(f.geometry.type, 'add');
      } else if (props.removed) {
        this.props.updateGeometriesCount(f.geometry.type, 'remove');
        this.props.updateGeometries(f.geometry.type, 'remove');
      }
    });

    this.editor.submit({
      onSuccess: () => {
        this.setState(
          {
            currentFeature: null,
            saving: false,
          },
          () => {
            spacesAPI
              .get(`/${this.props.currentLayer.geospace.id}/statistics`, {
                withCredentials: true,
              })
              .then(statistics => {
                this.props.upadteLayerBbox(statistics.data.bbox.value);
              })
              .catch(e => apiErrorHandler(e));
            this.toggleMapMode();
          }
        );
      },
      onError: e => {
        this.setState({
          currentFeature: null,
          saving: false,
        });
        apiErrorHandler(e, store.dispatch);
      },
    });
    this.unhighlightLayer();

    if (this.drawingBoard) {
      this.drawingBoard.cancel();
    }
  };

  onAddClick = () => {
    this.editor.clearObjectSelection();
    this.clearDrawingBoard();
  };

  onPolygonClick = () => {
    this.editor.clearObjectSelection();
    this.drawingBoard = this.editor.getDrawingBoard();

    this.drawingBoard.start({
      mode: HERE.xyz.maps.editor.features.Area,
      layer: this.state.currentLayer,
      styleGroup: styleGroupsConfig.drawingBoard.polygons,
    });

    this.setState({
      drawing: 'Polygon',
    });
  };

  onLineClick = () => {
    this.editor.clearObjectSelection();
    this.drawingBoard = this.editor.getDrawingBoard();

    this.drawingBoard.start({
      mode: HERE.xyz.maps.editor.features.Navlink,
      layer: this.state.currentLayer,
      styleGroup: styleGroupsConfig.drawingBoard.lines,
    });

    this.setState({
      drawing: 'Line',
    });
  };

  onPointClick = () => {
    this.editor.clearObjectSelection();

    this.setState({
      drawing: 'Point',
    });
  };

  onLayerChange = layerId => {
    const projectLayer = find(
      this.props.project.layers,
      ({ id }) => id === layerId
    );
    const mapLayer = find(
      this.mapLayers,
      l => l.getProvider().space === projectLayer.geospace.id
    );
    const featureToSelect = mapLayer.getProvider().all()[0];

    this.unhighlightLayer();
    this.highlightLayer(mapLayer);
    this.editor.clearObjectSelection();

    if (featureToSelect) {
      featureToSelect.select();
    }
    this.props.setCurrentFeature(null, projectLayer);

    if (this.drawingBoard) {
      this.drawingBoard.cancel();
    }

    this.setState({
      drawing: false,
    });
  };

  renderEditorMenu = () => {
    return this.props.currentLayer && !this.props.currentLayer.meta.tags ? (
      <EditorMenu
        currentFeature={this.state.currentFeature}
        currentLayer={this.props.currentLayer}
        active={this.isEditMode()}
        action={this.state.editAction}
        drawing={this.state.drawing}
        history={this.state.history}
        onToggle={this.toggleMapModeIntent}
        onToggleTooltip={this.onToggleDrawingTooltip}
        onUndoClick={this.onUndoClick}
        onRedoClick={this.onRedoClick}
        onSaveClick={this.onSaveClick}
        onResetClick={this.onResetClick}
        onTransformClick={this.onTransformClick}
        onReshapeClick={this.onReshapeClick}
        onDeleteClick={this.onDeleteClick}
        onAddClick={this.onAddClick}
        onPolygonClick={this.onPolygonClick}
        onLineClick={this.onLineClick}
        onPointClick={this.onPointClick}
        onLayerChange={this.onLayerChange}
        projectLayers={this.props.project.layers}
        saving={this.state.saving}
        filteredFeatures={this.props.filteredFeatures}
        filterRules={this.props.filterRules}
        hexbin={this.props.currentLayer.clustering.hexbin}
        virtualspace={this.props.currentLayer.virtualSpace}
      />
    ) : (
      ''
    );
  };

  renderContextMenu = () => {
    return this.state.contextMenu ? (
      <ContextMenu
        context={this.state.contextMenu}
        action={this.state.editAction}
        onTransformClick={this.onTransformClick}
        onReshapeClick={this.onReshapeClick}
        onDeleteClick={this.onDeleteClick}
      />
    ) : (
      ''
    );
  };

  renderCardLayer = () => {
    return (
      <div className={style.cards}>
        {this.state.card &&
          this.state.card.visible &&
          size(filterStringProps(this.state.card.properties)) > 0 && (
            <Card
              {...this.state.card}
              parent={this.refs.container}
              onClose={this.onCardClose}
            />
          )}
      </div>
    );
  };

  renderDrwaingBoardTipsLayer = () => {
    return (
      this.state.drawing !== false &&
      this.state.drawingTooltip && (
        <AddFeatureCtrl
          toggle={this.state.drawingTooltip}
          tipKey={this.state.drawing}
          x={this.state.mouse.x}
          y={this.state.mouse.y}
        />
      )
    );
  };

  renderZoomCustomCtrl = () => {
    return <ZoomCtrl onZoomIn={this.zoomIn} onZoomOut={this.zoomOut} />;
  };

  onDrop = files => {
    this.props.filesDropped(files);
    this.setState({
      dropzoneActive: false,
    });
  };

  onDragEnter = () => {
    if (!this.isEditMode()) {
      this.setState({
        dropzoneActive: true,
      });
    }
  };

  onDragLeave = () => {
    if (!this.isEditMode()) {
      this.setState({
        dropzoneActive: false,
      });
    }
  };

  onWindowResize = (animate = false) => {
    if (this.mapObject) {
      if (this.props.mapMode === EDIT_MODE) {
        this.mapObject.resize(window.innerWidth, window.innerHeight);
      } else if (typeof animate === 'boolean' && animate) {
        const INCREMENT = 16;
        let offset = 0;

        // Animating at 17 frames per second is advisable
        const timerHandle = setInterval(() => {
          if (offset >= MAP_OFFSET) {
            offset = MAP_OFFSET;
            clearInterval(timerHandle);
          } else {
            offset += INCREMENT;
          }

          this.mapObject.resize(window.innerWidth - offset, window.innerHeight);
        }, 17);
      } else {
        this.resizeMapForTable(this.state.dataTableVisibility);
      }
    }
  };

  resizeMapForTable = (dataTableVisibility, resizeHeight = 0) => {
    const mapWidth = window.innerWidth - MAP_OFFSET;

    // If we are resizing via some custom component, then handle it separately
    if (resizeHeight) {
      MAP_HEIGHT = resizeHeight;
    } else {
      MAP_HEIGHT = dataTableVisibility
        ? window.innerHeight * DATA_TABLE_CONFIG[dataTableVisibility].mapPos
        : MAP_HEIGHT;
    }

    // Map resizing shouldn't cross a certain height limit
    if (
      MAP_HEIGHT <
      window.innerHeight * DATA_TABLE_CONFIG[ACTIONS.MID].mapPos
    ) {
      MAP_HEIGHT = window.innerHeight * DATA_TABLE_CONFIG[ACTIONS.MID].mapPos;
    }

    this.mapObject.resize(mapWidth, MAP_HEIGHT);

    if (this.state.dataTableVisibility && resizeHeight) {
      this.setState({
        dataTableVisibility: null,
      });
    }
  };

  toggleDataTable = (showTable = ACTIONS.HIDE) => {
    /**
     * If the table is already in minimized state, then when the user clicks on data table icon again,
     * hide the table else set it to the parameter passed to the function
     */
    this.setState(
      ({ dataTableVisibility }) => ({
        dataTableVisibility:
          dataTableVisibility === ACTIONS.HIDE ? ACTIONS.MID : showTable,
      }),
      () => this.resizeMapForTable(this.state.dataTableVisibility)
    );
  };

  onFeatureDelete = featureId => {
    this.refreshMap();
    DELETED_FEATURE_IDS.push(featureId);
  };

  render() {
    const {
      currentLayer,
      spaceId,
      toggleCardVisibility,
      currentFeatures,
      mapMode,
    } = this.props;
    const { dropzoneActive, dataTableVisibility } = this.state;

    const DATA_TABLE_HEIGHT = dataTableVisibility
      ? window.innerHeight * (1 - DATA_TABLE_CONFIG[dataTableVisibility].mapPos)
      : 'auto';
    let datatableBtnMsg = '';

    if (!currentLayer) {
      datatableBtnMsg = SELECT_LAYER_MSG;
    } else if (!currentFeatures.length) {
      datatableBtnMsg = NO_FEATURES_MSG;
    } else if (currentFeatures.length > mapConfig.maxTableFeaturesFromMap) {
      datatableBtnMsg = ZOOM_MESSAGE;
    }

    return (
      <div className={style.container}>
        <Dropzone
          className={`${style.dropzone} ${dropzoneActive && style.active}`}
          disabled={this.isEditMode()}
          disableClick
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          <div
            className={style.mapContainer}
            ref="container"
            onMouseMove={() => this.onToggleDrawingTooltip(true)}
          />
          {/* {this.renderZoomCustomCtrl()} */}
          {this.renderDrwaingBoardTipsLayer()}
          {this.renderEditorMenu()}
          {this.renderContextMenu()}
          {this.renderCardLayer()}
        </Dropzone>

        {dataTableVisibility === ACTIONS.HIDE && mapMode !== EDIT_MODE && (
          <DataTableButton
            onClick={this.toggleDataTable}
            message={datatableBtnMsg}
          />
        )}

        {dataTableVisibility !== ACTIONS.HIDE && (
          <SplitView
            action={dataTableVisibility}
            config={ACTIONS}
            toggleTable={this.toggleDataTable}
            height={DATA_TABLE_HEIGHT}
            width={window.innerWidth - MAP_OFFSET}
            resizeMap={this.resizeMapForTable}
            minResizeHeight={
              window.innerHeight *
              (1 - DATA_TABLE_CONFIG[ACTIONS.MINIMIZE].mapPos)
            }
          >
            <DataTable
              spaceId={spaceId}
              onCardToggle={toggleCardVisibility}
              isOpenDataSet={
                currentLayer && typeof currentLayer.meta.tags !== 'undefined'
              }
              features={currentFeatures}
              currentLayer={currentLayer}
              deletedFeatureIds={DELETED_FEATURE_IDS}
              onDelete={this.onFeatureDelete}
              isUpdateRealTime
            />
          </SplitView>
        )}
      </div>
    );
  }
}

const s2p = state => {
  return {
    project: state.map.currentProject,
    currentLayer: state.map.currentLayer,
    currentFeature: state.map.currentFeature,
    currentFeatures: state.map.currentFeatures,
    previousViewMode: state.map.previousViewMode,
    mapMode: state.map.mode,
    updatingFeature: state.map.updatingFeature,
    refresh: state.map.clickBookmark,
    mapBbox: state.map.mapBbox,
    centroid: state.map.centroid,
    isFilesDropped: state.space.isFilesDropped,
    proMap: state.space.itemsProMap,
    virtualMap: state.space.itemsVirtualMap,
    dataAdded: state.space.dataAdded,
    filterRules: state.map.filterRules,
    filteredFeatures: state.map.filteredFeatures,
  };
};

export default connect(s2p, {
  updateMapSettings,
  updateGeometriesCount,
  updateGeometries,
  setCurrentFeature,
  setCurrentFeatures,
  setMapMode,
  filesDropped,
  hideAlert,
  showAlert,
  showLoadingScreen,
  upadteLayerBbox,
})(withRouter(HereMap));
