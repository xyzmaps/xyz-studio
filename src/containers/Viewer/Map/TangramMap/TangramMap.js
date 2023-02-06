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
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Tangram from 'tangram';
import { urlToProperty } from 'query-string-params';
import _ from 'lodash';
import xyzToTangram from './lib/index';

// constants
import { apiConfig } from '../../../../constants';

// services
import { spacesAPI, statisticsApi } from '../../../../api';

// component
import Card from '../../../../components/Card/Card';
import CardPanel from '../../../../components/Card/CardPanel';
import ProjectDetailsPanel from '../../../../components/ProjectDetailsPanel/ProjectDetailsPanel';
import Zoom from '../../../../components/Zoom/Zoom';
// styles
import style from './TangramMap.scss';
import Searchbar from '../../../../components/SearchBar/Searchbar';
// helper
import { isTouch, isMobile } from '../../../../helpers';

export default class TangramMap extends Component {
  state = {
    card: null,
    cardPanel: null,
    projectTitle: null,
    projectDescription: null,
    projectTitleDisplay: false,
    projectDescriptionDisplay: false,
    projectLegendDisplay: false,
    cardHoverDisplay: false,
    toggleCardHoverDisplay: false,
    zoomValue: null,
    geoMap: {},
    hexbinMax: 0,
    cardMap: null,
  };

  componentDidMount() {
    const { publish_settings, layers, meta } = this.props.data;
    const { access_token } = this.props;
    this.layers = layers;
    this.project = this.props.data;

    const geoHashMap = {};
    const cardHashMap = {};

    this.layers.forEach(layer => {
      statisticsApi.fetch(layer.geospace.id, access_token, (status, stat) => {
        geoHashMap[layer.geospace.id] = stat.geometryTypes.value;

        if (
          !!layer.cards[0] &&
          !!layer.cards[1] &&
          stat.properties.value.length > 0
        ) {
          let i = 0;
          const cards = [];
          cards[0] = [];
          cards[1] = [];
          stat.properties.value.forEach(prop => {
            if (i <= 1) {
              cards[0].push(prop.key);
              i += 1;
            } else {
              cards[1].push(prop.key);
            }
          });

          cardHashMap[layer.geospace.id] = cards;
        }

        this.setState({
          geoMap: geoHashMap,
          cardMap: cardHashMap,
        });
      });
    });

    this.setState(
      {
        projectTitle:
          publish_settings.display &&
          publish_settings.display.name &&
          meta.name,
        projectDescription:
          publish_settings.display &&
          publish_settings.display.description &&
          meta.description,
        projectLegendDisplay:
          publish_settings.display && publish_settings.display.legend,
        projectTitleDisplay:
          publish_settings.display && publish_settings.display.name,
        projectDescriptionDisplay:
          publish_settings.display && publish_settings.display.description,
        cardHoverDisplay: false,
        toggleCardHoverDisplay:
          publish_settings.display && !isMobile()
            ? !!publish_settings.display.cards ||
              typeof publish_settings.display.cards === 'undefined'
            : false,
        hexbinEnabledLayer: layers.find(o => {
          if (o.clustering && o.clustering.hexbin) return o.clustering.hexbin;
          return undefined;
        }),
      },
      () => {
        this.createMap(this.props.data, this.state.geoMap);
        this.addDocumentTitle(meta.name); // add document title
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hexbinMax !== this.state.hexbinMax) {
      this.styleHexbin('componentDidUpdate');
      this.layer.scene.updateConfig({ rebuild: true });
    }
  }

  urlParam = urlToProperty(window.location.search);

  controls = !(this.urlParam.controls || this.urlParam.controls === 'false');

  // preview = (this.urlParam.preview || this.urlParam.preview === "false") ? false : true;
  projectId = this.urlParam.project_id;

  mapCanvas = false;

  layers;

  features = [];

  bookmark = false;

  mapObject;

  newtgScene;

  project;
  // hexbinMax = 0;

  createMap = (data, geoMap) => {
    const { access_token } = this.props;
    const option = {
      env: process.env.REACT_APP_API_HOSTNAME_XYZ,
      collide: false,
    };
    const { scene: tgScene } = xyzToTangram(data, geoMap, option);

    // console.log('Tangram scene',tgScene);
    // Create a Leaflet map
    this.mapObject = L.map('map', {
      maxZoom: 22,
      zoomControl: false,
      zoomSnap: 0,
      keyboard: false,
    });

    // if(this.controls) L.control.zoom({ position: 'bottomright' }).addTo(this.mapObject);

    this.mapObject.setView([40.70531887544228, -74.00976419448853], 11); // Default start position

    this.setState({
      zoomValue: this.mapObject.getZoom(),
    });

    const thisRef = this;
    this.mapObject.on('dblclick', () => {
      thisRef.mapObject.setZoom(thisRef.mapObject.getZoom() + 1);

      thisRef.setState(prevState => {
        return { zoomValue: prevState.zoomValue + 1 };
      });
    });

    this.mapObject.on('zoomend', () => {
      const newZoomValue = Math.round(
        (thisRef.mapObject.getZoom() * 100) / 100
      );

      thisRef.setState(() => {
        return { zoomValue: newZoomValue };
      });
    });

    const basemapAPIKey = 'A-roDPkyR6-7TIHb6ITL4g';
    tgScene.global = tgScene.global || {};
    tgScene.global.sdk_api_key = basemapAPIKey;
    this.newtgScene = tgScene;
    this.createHexbinScene(data, tgScene);

    // Create Tangram as a Leaflet layer
    this.layer = Tangram.leafletLayer({
      scene: this.newtgScene,
      events: {
        click: e => this.onMapClick(e, 'click'), // default to just click events
      },
    });

    if (data.layers.length) {
      spacesAPI
        .get('', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(spaces => {
          data.layers.forEach(l => {
            spaces.forEach(space => {
              if (l.geospace.id === space.id) {
                // eslint-disable-next-line
                space.copyright &&
                  space.copyright.forEach(cr => {
                    if (cr.label && l.visible)
                      this.mapObject.attributionControl.addAttribution(
                        `&copy; ${cr.label}`
                      );
                  });
              }
            });
          });
          this.addHereAttribution();
        })
        .catch(e => {
          return e;
          // console.error(e);
        });
    } else {
      this.addHereAttribution();
    }

    const link =
      '<a target="_blank" href="https://survey.research-feedback.com/jfe/form/SV_9t8edvRPmNReeUZ">Feedback</a>';
    this.mapObject.attributionControl.addAttribution(
      `&copy; Tangram | ${link}`
    );
    this.checkForMSBCopyRight(data.layers);

    this.layer.addTo(this.mapObject);

    if (
      this.state.hexbinEnabledLayer &&
      this.state.hexbinEnabledLayer.visible
    ) {
      this.layer.scene.subscribe({
        view_complete(e) {
          thisRef.queryViewport(e.first);
          if (e.first) thisRef.styleHexbin('view_complete');
        },
      });

      this.mapObject.on('moveend zoomend', () => {
        this.layer.scene.updateConfig({ rebuild: true });
      });

      this.mapObject.on('zoomend', () => {
        this.updateDataSource();
      });
    }
  };

  updateDataSource = () => {
    const { access_token } = this.props;
    const { clustering, geospace } = this.state.hexbinEnabledLayer;
    let params;

    if (clustering.property) {
      params = {
        clustering: 'hexbin',
        'clustering.property': clustering.property,
        'clustering.pointmode': clustering.shape === 'centroid',
      };
    } else {
      params = {
        clustering: 'hexbin',
        'clustering.pointmode': clustering.shape === 'centroid',
      };
    }

    const updatedDataSource = {
      type: 'GeoJSON',
      url: `${apiConfig.spaces}/${geospace.id}/tile/web/{z}_{x}_{y}`,
      url_params: {
        ...params,
        'clustering.resolution': this.getResolution(),
        access_token: `${access_token}`,
        max_zoom: 20,
        margin: 0,
        clip: true,
        clientId: 'viewer',
      },
    };
    this.layer.scene.setDataSource('xyz-h3', updatedDataSource);
  };

  getResolution = () => {
    let h3resolution = 2;
    // eslint-disable-next-line
    switch (Math.floor(this.mapObject._zoom)) {
      case 2:
      case 3:
        h3resolution = 2;
        break;
      case 4:
        h3resolution = 3;
        break;
      case 5:
      case 6:
        h3resolution = 4;
        break;
      case 7:
      case 8:
        h3resolution = 5;
        break;
      case 9:
      case 10:
        h3resolution = 6;
        break;
      case 11:
        h3resolution = 7;
        break;
      case 12:
        h3resolution = 8;
        break;
      case 13:
      case 14:
        h3resolution = 9;
        break;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
        h3resolution = 11;
        break;
      default:
        h3resolution = 2;
    }
    return h3resolution;
  };

  queryViewport = async first => {
    const { property } = this.state.hexbinEnabledLayer.clustering;
    const h3features = await this.layer.scene.queryFeatures({
      filter: { $source: 'xyz-h3' },
      visible: true,
    });
    const numberValues = [];

    h3features.forEach(feature => {
      if (property) {
        numberValues.push(feature.properties.aggregation[property].sum || 0);
      } else {
        numberValues.push(feature.properties.aggregation.qty);
      }
    });

    if (numberValues.length > 0) {
      this.setState({ hexbinMax: Math.max(...numberValues) });
    }

    this.styleHexbin();

    if (first) {
      this.layer.scene.rebuild();
    }
  };

  styleHexbin = () => {
    const {
      theme,
      property,
      label,
      shape,
    } = this.state.hexbinEnabledLayer.clustering;
    if (label) {
      const textObject = {
        priority: 0.05,
        text_source: `function() {
                return '${property}' ? feature.aggregation['${property}'].sum || '0' : feature.aggregation.qty;
            }`,
        font: {
          family: "'FiraGO', sans-serif",
          size: '11px',
          weight: 'bold',
          fill: 'black',
          stroke: {
            color: 'white',
            width: 3,
          },
        },
      };
      this.layer.scene.config.layers.h3.draw.text = textObject;
    }

    if (shape === 'centroid') {
      const sizeFunction = `function() {
              var hexbinParameter = '${property}' ? feature.aggregation['${property}'].sum : feature.aggregation.qty;
              if (hexbinParameter > 1) {
                return Math.round(
                  ((hexbinParameter || 0) / (${this.state.hexbinMax} === 0 ? 1 : ${this.state.hexbinMax})) * 60
                );
              }
              return 10;
            }`;

      const pointObject = {
        collide: false,
        size: sizeFunction,
        order: 100,
        color: theme,
        width: '1px',
      };
      this.layer.scene.config.layers.h3.draw.h3point = pointObject;
    } else {
      const colorFunction = `function() {
              var hexbinParameter = '${property}' ? feature.aggregation['${property}'].sum : feature.aggregation.qty;
              if(${this.state.hexbinMax} == 0) {
                  var color = 'rgba(227,74,51,0)';
              } else {
                  var color = "${theme}".replace(",1)" , ","+(Math.round(((hexbinParameter || 0) / (${this.state.hexbinMax} === 0 ? 1 : ${this.state.hexbinMax})) * 10) / 10)+")" );
              }
              if (hexbinParameter == ${this.state.hexbinMax}) {
              }
              return color;
          }`;

      const hexbinOutline = {
        order: 100,
        color: [0, 0, 0, 0.5],
        width: '1px',
      };

      this.layer.scene.config.layers.h3.draw.h3outline = hexbinOutline;
      this.layer.scene.config.layers.h3.draw.h3polygon.color = colorFunction;
    }
    // if (this.layer.scene.sources['xyz-h3']) {
    //   this.layer.scene.sources['xyz-h3'].config.url_params['clustering.resolution'] = this.getResolution();
    // }
    delete this.layer.scene.config.cameras.xyz;
  };

  createHexbinScene = (project, tgScene) => {
    const { access_token } = this.props;
    project.layers.forEach(layer => {
      if (layer.clustering && layer.clustering.hexbin) {
        const { clustering } = layer;
        let params;

        if (clustering.property) {
          params = {
            clustering: 'hexbin',
            'clustering.property': clustering.property,
            'clustering.pointmode': clustering.shape === 'centroid',
          };
        } else {
          params = {
            clustering: 'hexbin',
            'clustering.pointmode': clustering.shape === 'centroid',
          };
        }

        const hexbin = {
          sources: {
            'xyz-h3': {
              type: 'GeoJSON',
              url: `${apiConfig.spaces}/${layer.geospace.id}/tile/web/{z}_{x}_{y}`,
              url_params: {
                ...params,
                'clustering.resolution': this.getResolution(),
                access_token: `${access_token}`,
                max_zoom: 20,
                margin: 0,
                clip: true,
                clientId: 'viewer',
              },
            },
          },
          styles: {
            h3polygon: {
              base: 'polygons',
              blend: 'overlay',
            },
            h3outline: {
              base: 'lines',
              blend: 'overlay',
            },
            h3point: {
              base: 'points',
              blend: 'overlay',
            },
          },
          layers: {
            h3: {
              data: {
                source: 'xyz-h3',
              },
              draw: {
                h3polygon: {
                  order: 100,
                  color: 'rgba(227,74,51,0)',
                  extrude: false,
                },
                h3point: {
                  collide: false,
                  size: '1',
                  order: 100,
                  color: clustering.theme,
                  width: '1px',
                },
              },
            },
          },
        };
        this.newtgScene = _.merge({}, hexbin, tgScene);
      }
    });
  };

  addHereAttribution = () => {
    const hereAttribution =
      '&copy; HERE | <a target="_blank" href="https://legal.here.com/us-en/terms">Terms and Conditions</a>';
    this.mapObject.attributionControl.addAttribution(hereAttribution);
  };

  addDocumentTitle = title => {
    document.title = `HERE Studio | ${
      !title || title === 'Untitled Project' ? 'Tangram Maps Viewer' : title
    }`;
  };

  checkForMSBCopyRight = layers => {
    layers.forEach(layer => {
      if (layer.meta.tags)
        this.mapObject.attributionControl.addAttribution(
          '&copy; Microsoft (ODbL)'
        );
    });
  };

  findLayerBySpaceId = spaceId => {
    return _.find(this.layers, ({ geospace }) => geospace.id === spaceId);
  };

  onCardButtonClick = toggle => {
    if (toggle) {
      this.setState(prevState => ({
        cardPanel: prevState.card,
      }));
    } else {
      this.setState({
        cardPanel: false,
      });
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

  onHoverCardsToggle = () => {
    this.setState(prevState => ({
      cardHoverDisplay: !prevState.cardHoverDisplay,
    }));
    if (this.state.cardHoverDisplay) {
      this.layer.setSelectionEvents({
        hover: e => this.onMapClick(e, 'hover'),
        click: null,
      });
    } else {
      this.layer.setSelectionEvents({
        hover: null,
        click: e => this.onMapClick(e, 'click'),
      });
    }
  };

  onMapClick = (event, type) => {
    const { feature, changed, pixel, leaflet_event } = event;

    if (
      (type === 'click' && this.state.cardHoverDisplay) ||
      (type === 'hover' && !this.state.cardHoverDisplay)
    ) {
      return;
    }

    // Update and show card if feature changed
    if (feature) {
      if (changed) {
        const spaceDetails = feature.properties['@ns:com:here:xyz'];
        let cards = spaceDetails
          ? this.findLayerBySpaceId(spaceDetails.space).cards
          : [];
        const hiddenCards = spaceDetails
          ? this.findLayerBySpaceId(spaceDetails.space).hiddenCards
          : [];
        let containsProps = false;

        if (
          cards[0].length === 0 &&
          cards[1].length === 0 &&
          _.size(feature.properties) > 1
        ) {
          cards = this.state.cardMap[spaceDetails.space];
        }

        if (cards[0].length && _.size(feature.properties) > 1) {
          this.setState(
            {
              card: false,
              cardPanel: false,
            },
            () => {
              const updatedProperties = feature.properties;

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
              cards[0].forEach(key => {
                if (updatedProperties[key]) {
                  containsProps = true;
                }
              });

              if (containsProps) {
                const card = {
                  properties: updatedProperties,
                  cards,
                  hiddenCards,
                  position: {
                    x: pixel.x,
                    y: pixel.y,
                  },
                  visible: true,
                };

                this.setState({
                  card: !isTouch || !isMobile() ? card : false,
                  cardPanel: isTouch || isMobile() ? card : false,
                });
              }
            }
          );
        }
      }
    } else if (leaflet_event.type !== 'mouseout') {
      this.onCardClose();
    }
  };

  onZoomIn = () => {
    this.mapObject.setZoom(this.mapObject.getZoom() + 1);
    this.setState(prevState => {
      return { zoomValue: prevState.zoomValue + 1 };
    });
  };

  onZoomOut = () => {
    if (this.mapObject.getZoom() > 2) {
      this.mapObject.setZoom(this.mapObject.getZoom() - 1);

      this.setState(prevState => {
        return { zoomValue: prevState.zoomValue - 1 };
      });
    }
  };

  onItemClick = center => {
    this.mapObject.flyTo(center);
    // this.mapObject.setZoom(10);
    return null;
  };

  render() {
    return (
      <div
        className={`${style.wrapper} ${
          this.state.cardPanel ? style.cardPanel : ''
        } ${this.controls ? 'controls' : ''}`}
      >
        {
          // eslint-disable-next-line
          <div className={style.map} ref={ele => (this.$map = ele)}>
            <div className={style.map} id="map" />
            <div className={style.sidePanel}>
              {this.controls && (
                <ProjectDetailsPanel
                  projectTitle={this.state.projectTitle}
                  projectDescription={this.state.projectDescription}
                  projectTitleDisplay={this.state.projectTitleDisplay}
                  projectDescriptionDisplay={
                    this.state.projectDescriptionDisplay &&
                    !!this.state.projectDescription
                  }
                  projectLegendDisplay={this.state.projectLegendDisplay}
                  cardHoverDisplay={this.state.cardHoverDisplay}
                  toggleCardHoverDisplay={this.state.toggleCardHoverDisplay}
                  toggleCardHoverActive={this.state.toggleCardHoverActive}
                  onHoverCardsToggle={this.onHoverCardsToggle}
                  layers={this.layers}
                  clustering={
                    this.state.hexbinEnabledLayer &&
                    this.state.hexbinEnabledLayer.clustering
                  }
                  geoMap={this.state.geoMap}
                />
              )}

              {this.state.cardPanel && (
                <CardPanel
                  properties={this.state.cardPanel.properties}
                  cards={this.state.cardPanel.cards}
                  hiddenCards={this.state.cardPanel.hiddenCards}
                  onButtonClick={this.onCardButtonClick}
                  prjtHeight={this.method ? this.method.getHeight() : 0}
                />
              )}
            </div>

            {this.controls && (
              <Zoom
                onZoomIn={this.onZoomIn}
                onZoomOut={this.onZoomOut}
                zoomValue={this.state.zoomValue}
              />
            )}

            {!isMobile() && this.controls && (
              <Searchbar onItemClick={this.onItemClick} />
            )}

            {this.state.card && this.state.card.visible && (
              <Card
                properties={this.state.card.properties}
                cards={this.state.card.cards}
                hiddenCards={this.state.card.hiddenCards}
                position={this.state.card.position}
                buttonText="View more"
                onClose={this.onCardClose}
                onButtonClick={this.onCardButtonClick}
                parent={this.$map}
              />
            )}
          </div>
        }
      </div>
    );
  }
}
