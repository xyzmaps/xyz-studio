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
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddOnTrigger from '../../AddOnTrigger/AddOnTrigger';
import {
  trunc,
  getFormatedMSLabel,
  getMapSettingsFromURL,
} from '../../../helpers';
import {
  Fit,
  Close,
  Filter,
  RectLine,
  RectPolygon,
  RectCircle,
  Plus,
} from '../../../icons';
import { spacesAPI, apiErrorHandler } from '../../../api';

import config from '../../../constants/styleGroupsConfig';
import { updateSpaces } from '../../../actions/spaceActions';
import {
  updateGeometryVisibility,
  updateGeometryStyleProp,
  addColorLoader,
  updateGeometries,
  toggleCardVisibility,
  hideAlert,
  showAlert,
} from '../../../actions/mapActions';
import geometryComponents from './FeatureStyleGeometries';
import Accordion from './Accordion';
import LayerCardItems from './LayerCardItems';
import FeedbackLinks from '../../Feedback/Links';
import Attribution from '../Attribution/Attribution';
import Hexbin from '../../Hexbin/Hexbin';
import { msbfptOpenSpaceId } from '../../../constants/index';
import style from './ProjectLayerDetails.scss';
import store from '../../../store';
import logEvent from '../../../utils/amplitudeLogger';
import GisAnalysis from '../../GisAnalysis/GisAnalysis';

class ProjectLayerDetails extends Component {
  state = {
    tagAccordionOpen: false,
    gisAccordionOpen: false,
    selectedTags: this.props.currentLayer.meta.tags,
    onAttributionToggle: false,
    onHexbinAccordionToggle: false,
    accordions: [],
    largeData: false,
    showDefaultGeometry: false,
    estimated: false,
    loading: true,
    spaceProperties: [],
    lineLengthPersistent: this.props.currentLayer?.lineLength?.persistent,
    polygonAreaPersistent: this.props.currentLayer?.polygonArea?.persistent,
  };

  componentDidMount = () => {
    this.refreshStats();
  };

  componentWillReceiveProps = newProps => {
    if (newProps) {
      if (
        newProps.currentLayer.meta.tags &&
        this.state.selectedTags &&
        newProps.currentLayer.meta.tags.length !==
          this.state.selectedTags.length
      ) {
        this.setState({
          selectedTags: newProps.currentLayer.meta.tags,
        });
      }
    }
  };

  componentWillUpdate() {
    const { lineLengthPersistent, polygonAreaPersistent } = this.state;
    const { lineLength, polygonArea } = this.props.currentLayer;
    if (
      (lineLength && lineLength.persistent !== lineLengthPersistent) ||
      (polygonArea && polygonArea.persistent !== polygonAreaPersistent)
    ) {
      this.onGisPersistentChange();
    }
  }

  componentDidUpdate(prevProps) {
    this.setAccordionState(prevProps);
  }

  // onUpdateLayerCard = (cards, hiddenCards) => {
  //   this.props.updateOldProject(cards, hiddenCards);
  // };
  componentWillUnmount() {
    this.cancelTokenSource.cancel();
  }

  cancelTokenSource = null;

  onGisPersistentChange() {
    const { lineLength, polygonArea } = this.props.currentLayer;
    this.refreshStats();
    this.setState({
      lineLengthPersistent: lineLength && lineLength.persistent,
      polygonAreaPersistent: polygonArea && polygonArea.persistent,
    });
  }

  refreshStats() {
    this.cancelTokenSource = axios.CancelToken.source();
    this.setState({ loading: true });
    // calling statistics api
    spacesAPI
      .get(`/${this.props.geospace.id}/statistics`, {
        headers: {
          'Content-Type': 'application/geo+json',
        },
        withCredentials: true,
        cancelToken: this.cancelTokenSource.token,
      })
      .then(response => {
        if (this.props.currentLayer.bbox.length === 0)
          this.props.updateBbox(response.data.bbox.value);

        if (
          !!this.props.currentLayer.cards[0] &&
          !!this.props.currentLayer.cards[1]
        ) {
          let i = 0;
          const cards = [];
          cards[0] = [];
          cards[1] = [];
          response.data.properties.value.forEach(prop => {
            if (i <= 1) {
              cards[0].push(prop.key);
              i += 1;
            } else {
              cards[1].push(prop.key);
            }
          });
          this.props.onCardItemsSort(cards);
        }

        this.setState({ spaceProperties: response.data.properties.value });
        if (
          response.data.byteSize.value / (1024 * 1024) > 20 &&
          !this.props.geospace.properties.includes('color')
        ) {
          this.setState({
            largeData: true,
            loading: false,
          });
        }

        if (
          response.data.geometryTypes.estimated &&
          this.props.currentLayer.meta.title !== 'Building Footprints'
        ) {
          // if geometries from Stats (updated)
          if (this.props.currentLayer.geometriesFromStats) {
            this.setState({
              accordions: this.getReorderedAccordions(
                this.props.currentLayer.geometries
              ),
              showDefaultGeometry: this.checkAllGeoPresent(
                this.props.currentLayer.geometries
              ),
              estimated: response.data.geometryTypes.estimated,
              loading: false,
            });
          } else {
            this.props.updateGeometries(
              response.data.geometryTypes.value,
              'update'
            ); // update the project api with statistics value if first time
            this.setState({
              showDefaultGeometry: this.checkAllGeoPresent(
                response.data.geometryTypes.value
              ),
              estimated: response.data.geometryTypes.estimated,
              loading: false,
            });
          }
        } else {
          this.setState({
            accordions: this.getReorderedAccordions(
              response.data.geometryTypes.value
            ),
            showDefaultGeometry: false,
            estimated: false,
            loading: false,
          });
        }
      });
  }

  setAccordionState(prevProps) {
    const { currentLayer } = this.props;

    if (currentLayer !== prevProps.currentLayer) {
      this.setState(prevState => ({
        accordions: this.getReorderedAccordions(currentLayer.geometries),
        showDefaultGeometry: prevState.estimated
          ? this.checkAllGeoPresent(currentLayer.geometries)
          : prevState.showDefaultGeometry,
        loading: false,
      }));
    }
  }

  isSymbolActive = type => {
    if (this.props.geometriesCount) {
      switch (type) {
        case 'Circle':
          return (
            this.props.geometriesCount.Point > 0 ||
            this.props.geometriesCount.MultiPoint > 0
          );
        case 'Polygon':
          return (
            this.props.geometriesCount.Polygon > 0 ||
            this.props.geometriesCount.MultiPolygon > 0
          );
        case 'Line':
          return (
            this.props.geometriesCount.LineString > 0 ||
            this.props.geometriesCount.MultiLineString > 0
          );
        default:
          return true;
      }
    } else {
      return true;
    }
  };

  getReorderedAccordions = geometricTypes => {
    let circleIndex = 0;
    let lineIndex = 0;
    let polygonIndex = 0;

    const accordions = [];

    geometricTypes.forEach(type => {
      if (type === 'Point' || type === 'MultiPoint') {
        const pointZindexPrefix = Number(
          this.props.currentLayer.styleGroups.pointStyle[0].zIndex.toString()[0]
        );

        if (pointZindexPrefix === 7) {
          circleIndex = 2;
        } else if (pointZindexPrefix === 8) {
          circleIndex = 1;
        }

        accordions[circleIndex] = 'Point';
      }
      if (type === 'Polygon' || type === 'MultiPolygon') {
        const polygonZindexPrefix = Number(
          this.props.currentLayer.styleGroups.polygonStyle[0].zIndex.toString()[0]
        );

        if (polygonZindexPrefix === 7) {
          polygonIndex = 2;
        } else if (polygonZindexPrefix === 8) {
          polygonIndex = 1;
        }

        accordions[polygonIndex] = 'Polygon';
      }
      if (
        type === 'Line' ||
        type === 'LineString' ||
        type === 'MultiLineString'
      ) {
        const lineZindexPrefix = Number(
          this.props.currentLayer.styleGroups.lineStyle[0].zIndex.toString()[0]
        );

        if (lineZindexPrefix === 7) {
          lineIndex = 2;
        } else if (lineZindexPrefix === 8) {
          lineIndex = 1;
        }

        accordions[lineIndex] = 'Line';
      }
    });
    return accordions;
  };

  checkAllGeoPresent = geometricTypes => {
    if (geometricTypes.length !== 0) {
      if (
        (!geometricTypes.includes('Point') &&
          !geometricTypes.includes('MultiPoint')) ||
        (!geometricTypes.includes('Polygon') &&
          !geometricTypes.includes('MultiPolygon')) ||
        (!geometricTypes.includes('LineString') &&
          !geometricTypes.includes('Line') &&
          !geometricTypes.includes('MultiLineString'))
      ) {
        return true;
      }
    }
    return false;
  };

  getDefaultGeometry = () => {
    const polygonDefaultDisable = _.some(this.state.accordions, el =>
      _.includes(['Polygon', 'MultiPolygon'], el)
    );
    const lineDefaultDisable = _.some(this.state.accordions, el =>
      _.includes(['Line', 'MultiLineString'], el)
    );
    const pointDefaultDisable = _.some(this.state.accordions, el =>
      _.includes(['Point', 'MultiPoint'], el)
    );

    return (
      <div className={style.iconContainer}>
        <span
          role="presentation"
          className={style.addBtn}
          data-tut="add-geometry"
          data-tip="Add default geometry"
        >
          Add
        </span>
        <div
          role="presentation"
          className={` ${style.iconWrapper}
          ${polygonDefaultDisable ? style.disabled : ''}`}
          onClick={
            !polygonDefaultDisable
              ? () => this.addDefaultGeometry('Polygon')
              : null
          }
        >
          <span>
            <RectPolygon />
          </span>
        </div>
        <div
          role="presentation"
          className={` ${style.iconWrapper}
          ${lineDefaultDisable ? style.disabled : ''}`}
          onClick={
            !lineDefaultDisable
              ? () => this.addDefaultGeometry('LineString')
              : null
          }
        >
          <span>
            <RectLine />
          </span>
        </div>
        <div
          role="presentation"
          className={` ${style.iconWrapper}
          ${pointDefaultDisable ? style.disabled : ''}`}
          onClick={
            !pointDefaultDisable ? () => this.addDefaultGeometry('Point') : null
          }
        >
          <span>
            <RectCircle />
          </span>
        </div>
      </div>
    );
  };

  addDefaultGeometry = type => {
    const geoExists = _.some(this.state.accordions, el => _.includes(type, el));

    if (geoExists) {
      this.props.updateGeometries(type, 'remove');
    } else {
      this.props.updateGeometries(type, 'add');
    }
  };

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? '#0F1621' : '#272D37',
    ...draggableStyle,
  });

  reorderGeometry = (source, destination) => {
    const result = this.state.accordions;
    const [removed] = result.splice(source, 1);
    result.splice(destination, 0, removed);
    return result;
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const newGeometry = this.reorderGeometry(
      result.source.index,
      result.destination.index
    );
    this.setState({ accordions: newGeometry });
    this.eometrySort(newGeometry);
  };

  onToggleHideClick = featureType => {
    this.props.updateGeometryVisibility(featureType);
  };

  onToggleColor = async featureType => {
    this.props.addColorLoader(true, getMapSettingsFromURL());
    if (!this.props.geospace.properties.includes('color')) {
      const response = await spacesAPI.get(
        `/${this.props.geospace.id}/iterate?limit=100000`,
        {
          headers: {
            'Content-Type': 'application/geo+json',
          },
          withCredentials: true,
        }
      );

      const { features } = response.data;
      let i = 0;

      for (const feat in features) {
        features[feat].properties.color = config.colorProperty[i];
        i = i === 19 ? 0 : i + 1;
      }

      try {
        await spacesAPI.put(
          `/${this.props.geospace.id}/features`,
          JSON.stringify({ features, type: 'FeatureCollection' }),
          {
            headers: {
              'Content-Type': 'application/geo+json',
            },
            withCredentials: true,
          }
        );
      } catch (e) {
        apiErrorHandler(e, store.dispatch);
      }
    }
    this.props.updateGeometryStyleProp(featureType);
  };

  getAccordions = () => {
    const accordionList = this.state.accordions.map((geometry, k) => {
      const GeometryStyle =
        geometryComponents[config.geometryToLabel(geometry)];
      return (
        <Draggable
          isDragDisabled={this.props.currentStyleGeoPanel === geometry}
          key={geometry}
          draggableId={geometry}
          index={k}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={this.getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <Accordion
                key={k}
                hexbin={
                  this.props.currentLayer.clustering &&
                  this.props.currentLayer.clustering.hexbin
                }
                title={config.typeLabels[config.geometryToLabel(geometry)]}
                isOpen={this.props.currentStyleGeoPanel === geometry}
                onToggle={() => this.props.geometryAccordionClick(geometry)}
                onToggleHideClick={this.onToggleHideClick}
                currentLayer={this.props.currentLayer}
                featureType={geometry}
                actions="hide"
                noShape
                draggable
                geometry
              >
                <GeometryStyle
                  styleGroups={this.props.styleGroups}
                  styleRules={this.props.styleRules}
                  featureProps={this.props.geospace.properties}
                  update={this.props.update}
                  onTextStyleToggle={this.props.onTextStyleToggle}
                  onIconStyleToggle={this.props.onIconStyleToggle}
                  onToggleColor={this.onToggleColor}
                  onStyleRuleEditClick={this.props.onStyleRuleEditClick}
                  onStyleRulesSort={this.props.onStyleRulesSort}
                  onAddNewRuleClick={this.props.onAddNewRuleClick}
                  ruleAccordionClick={this.props.ruleAccordionClick}
                  currentStyleRulePanel={this.props.currentStyleRulePanel}
                  currentLayer={this.props.currentLayer}
                  updateDefaultStyleLabel={this.props.updateDefaultStyleLabel}
                  largeData={this.state.largeData}
                  colorLoader={this.props.colorLoader}
                  isHexbinEnabled={
                    this.props.currentLayer.clustering &&
                    this.props.currentLayer.clustering.hexbin
                  }
                />
              </Accordion>
            </div>
          )}
        </Draggable>
      );
    });

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef}>
              {accordionList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  onTagToggle = () => {
    this.setState(prevState => ({
      tagAccordionOpen: !prevState.tagAccordionOpen,
    }));
  };

  onGisAccordionToggle = () => {
    this.setState(prevState => ({
      gisAccordionOpen: !prevState.gisAccordionOpen,
    }));
  };

  onRomveItem = key => {
    this.state.selectedTags.splice(key, 1);

    if (this.state.selectedTags.length === 0) {
      this.props.onDeleteLayer(this.props.currentLayer.id);
    } else {
      this.props.onTagDelete(this.props.currentLayer.id, key);
      this.setState(prevState => ({
        selectedTags: prevState.selectedTags,
      }));
    }
  };

  addNewTag = () => {
    this.props.onAddTag();
  };

  getTagAccordion = () => {
    const { selectedTags } = this.state;

    return (
      <Accordion
        title="Tags"
        isOpen={this.state.tagAccordionOpen}
        onToggle={this.onTagToggle}
        currentLayer={this.props.currentLayer}
        noShape
        geometry
      >
        <div>
          <div className={style.addNewTag}>
            <span role="presentation" onClick={this.addNewTag}>
              <Plus />
              Add new tag
            </span>
          </div>
          <ul className={style.selectedList}>
            {_.map(selectedTags, (obj, key) => {
              return (
                <li key={key}>
                  <strong>{trunc(getFormatedMSLabel(obj))}</strong>
                  <button
                    type="button"
                    data-key={key}
                    onClick={() => this.onRomveItem(key)}
                  >
                    <Close />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Accordion>
    );
  };

  updateCopyright = (value, otherCopyright) => {
    this.props.updateSpaces(this.props.geospace.id, value, otherCopyright);
  };

  renderAttribution = () => {
    let updatedCopyright;

    _.forEach(this.props.spaces, space => {
      if (space.id === this.props.geospace.id) {
        updatedCopyright = space.copyright;
      }
    });

    if (updatedCopyright) {
      return updatedCopyright.map((cr, k) => {
        return (
          <Attribution
            key={k + 1}
            label="Attribution"
            placeholder="Please add attribution"
            description={cr.label}
            edit={this.updateCopyright}
            otherCopyright={_.filter(
              updatedCopyright,
              c => c.label !== cr.label
            )}
            disabled={this.props.geospace.id === msbfptOpenSpaceId}
          />
        );
      });
    }
    return (
      <Attribution
        label="Attribution"
        placeholder="Please add attribution"
        description=""
        edit={this.updateCopyright}
        disabled={this.props.geospace.id === msbfptOpenSpaceId}
      />
    );
  };

  openProTriggerPopup = () => {
    logEvent('click_non_pro_user_hexbin_lock');
    this.props.showAlert({
      customAlert: <AddOnTrigger hideAlert={this.props.hideAlert} />,
    });
  };

  renderHexbinAccordion = () => {
    const {
      currentLayer,
      meta,
      updateHexbin,
      removeHexbin,
      currentProject,
      urm,
    } = this.props;

    const { onHexbinAccordionToggle, spaceProperties } = this.state;

    if (!currentLayer.virtualSpace) {
      if (
        urm['xyz-hub'].useCapabilities &&
        urm['xyz-hub'].useCapabilities.some(o => o.id === 'hexbinClustering')
      ) {
        if (meta.title !== 'Building Footprints') {
          return (
            <div className={style.hexbinWrapper}>
              <Accordion
                title="Hexbin"
                onToggle={() =>
                  this.setState({
                    onHexbinAccordionToggle: !onHexbinAccordionToggle,
                  })
                }
                isOpen={onHexbinAccordionToggle}
                noShape
              >
                {
                  <Hexbin
                    properties={spaceProperties}
                    updateHexbin={updateHexbin}
                    removeHexbin={removeHexbin}
                    currentLayer={currentLayer}
                    currentProject={currentProject}
                    showAlert={this.props.showAlert}
                    hideAlert={this.props.hideAlert}
                  />
                }
              </Accordion>
            </div>
          );
        }
      } else {
        return (
          <div
            role="presentation"
            onClick={() => this.openProTriggerPopup()}
            className={style.hexbinProTrigger}
          >
            <span className={style.hexbinIcon} /> Hexbin{' '}
            <span className={style.proTxt}>Add On</span>
            <span className={style.lockIcon} />
          </div>
        );
      }
    }

    return '';
  };

  getGisAccordion = () => {
    const { currentLayer, onGisUpdate, toggleGisPersist, meta } = this.props;
    const { estimated } = this.state;
    if (
      (currentLayer.geometries.join(' ').indexOf('Line') > -1 ||
        currentLayer.geometries.join(' ').indexOf('Polygon') > -1) &&
      meta.title !== 'Building Footprints'
    ) {
      return (
        <div className={style.gisWrapper}>
          <Accordion
            title="Spatial Analysis"
            isOpen={this.state.gisAccordionOpen}
            onToggle={this.onGisAccordionToggle}
            currentLayer={currentLayer}
            noShape
          >
            <GisAnalysis
              currentLayer={currentLayer}
              onGisUpdate={onGisUpdate}
              toggleGisPersist={toggleGisPersist}
              estimatedGeometry={estimated}
              largeData={this.state.largeData}
            />
          </Accordion>
        </div>
      );
    }
    return <></>;
  };

  render() {
    const {
      lastSave,
      onFitOnMap,
      bbox,
      currentLayer,
      cards,
      hiddenCards,
      onCardItemsSort,
      openFilter,
      meta,
      geospace,
      toggleCardVisibility: _toggleCardVisibility,
      spaceComp,
    } = this.props;

    const { onAttributionToggle, showDefaultGeometry, loading } = this.state;
    const hexbin = currentLayer.clustering && currentLayer.clustering.hexbin;

    return (
      <div className={style.wrapper}>
        <div className={style.lastSaveWrapper}>
          {lastSave && (
            <span className={style.lastSave}>
              {`Saved at ${moment(lastSave).format('HH:mm')}`}
            </span>
          )}
        </div>
        {bbox && (
          <i
            role="presentation"
            className={style.fitIcon}
            onClick={() => onFitOnMap(bbox)}
            data-tip="Center map on layer features"
            data-tip-x="right"
          >
            <Fit />
          </i>
        )}
        {meta.title !== 'Building Footprints' && (
          <div
            role="presentation"
            data-tip={`${
              hexbin
                ? 'Filter property is not available when Hexbin is enabled'
                : 'Filter property'
            }`}
            data-tip-x="right"
            className={`${hexbin ? style.disabled : ''} ${style.filterButton}`}
            onClick={!hexbin ? openFilter : null}
            disabled={hexbin}
          >
            <Filter fill={hexbin ? '#979797' : undefined} />
            Filter property
          </div>
        )}
        {currentLayer.meta.tags && this.getTagAccordion()}
        {showDefaultGeometry && this.getDefaultGeometry()}
        {!loading ? (
          this.getAccordions()
        ) : (
          <>
            <div className={style.loaderlayout} />
            <div className={style.loaderlayout} />
            <div className={style.loaderlayout} />
          </>
        )}
        {this.getGisAccordion()}
        {this.renderHexbinAccordion()}
        {_.flatten(cards).length > 0 && (
          <LayerCardItems
            onCardItemsSort={onCardItemsSort}
            items={cards}
            hiddenCards={hiddenCards}
            properties={geospace.properties}
            onToggleHideCard={_toggleCardVisibility}
          />
        )}
        {!currentLayer.meta.tags && (
          <div className={style.attributionWrapper}>
            <Accordion
              title="Attribution"
              onToggle={() =>
                this.setState({
                  onAttributionToggle: !onAttributionToggle,
                })
              }
              isOpen={onAttributionToggle}
              noShape
            >
              {this.renderAttribution()}
            </Accordion>
          </div>
        )}

        {spaceComp}

        <FeedbackLinks margin />
      </div>
    );
  }
}

const stateToProps = state => ({
  urm: state.user.urm,
});

export default connect(stateToProps, {
  updateSpaces,
  updateGeometryVisibility,
  updateGeometryStyleProp,
  addColorLoader,
  updateGeometries,
  toggleCardVisibility,
  showAlert,
  hideAlert,
})(ProjectLayerDetails);
