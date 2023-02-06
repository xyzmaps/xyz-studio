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
import { Scrollbars } from 'react-custom-scrollbars';
import { Transition } from 'react-transition-group';
import { find, uniq } from 'lodash';

import * as commonActopns from '../../actions/commonActions';
import * as mapActions from '../../actions/mapActions';
import { publishProject } from '../../actions/projectActions';
import {
  createNewSpace,
  virtualizeSpace,
  filesUploadFinished,
  cleanUpSpaces,
  updateVirtualSpaces,
} from '../../actions/spaceActions';
import { tokenAPI, apiErrorHandler } from '../../api';
import store from '../../store';

import ProjectBreadcrumb from '../../components/Sidebar/ProjectBreadcrumb/ProjectBreadcrumb';
import Publish from '../../components/Sidebar/Publish/Publish';
import Name from '../../components/Sidebar/Name/Name';
import ProjectLayerButtons from '../../components/Sidebar/ProjectLayers/ProjectLayerButtons';
import ProjectLayerDetails from '../../components/Sidebar/ProjectLayer/ProjectLayerDetails';
import ProjectLayerFeature from '../../components/Sidebar/ProjectLayer/ProjectLayerFeature';
import AddLayerSidePanel from '../../components/Sidebar/AddLayerSidePanel/AddLayerSidePanel';

import AddDataLayer from '../../components/AddDataLayer/AddDataLayer';
import StyleRulesModal from '../../components/Sidebar/ProjectLayer/StyleRulesModal';
import HighlightFeatures from '../../components/Sidebar/HighlightFeatures/HighlightFeatures';

import { Copy } from '../../icons';
import style from './StudioSidebar.scss';
import ScrollbarStyle from '../../config/ScrollbarStyle';
import logEvent from '../../utils/amplitudeLogger';

class StudioSidebar extends Component {
  state = {
    showAddLayer: false,
    modalRulesOpen: false,
    toggleProjectSetting: false,
    showOpenDataset: false,
    showFilter: false,
    resetFilter: false,
    toggleRevert: false,
  };

  shouldComponentUpdate(newProps) {
    const { currentFeature } = this.props;

    if (newProps.currentFeature !== currentFeature) {
      this.setState({
        resetFilter: false,
      });
    }
    return true;
  }

  componentWillUpdate(prevProps) {
    this.enableAddLayer(prevProps);
  }

  componentWillUnmount() {
    const { removeEmptyLayerHighlight } = this.props;
    removeEmptyLayerHighlight();
  }

  enableAddLayer = prevProps => {
    if (
      !this.state.showAddLayer &&
      this.props.isFilesDropped !== prevProps.isFilesDropped &&
      prevProps.isFilesDropped === true
    ) {
      this.setState({ showAddLayer: true });
    }
  };

  checkVStoken = () => {
    const { status, rot } = this.props.currentProject;

    // For already published project and having token with no hexbin capabilites
    if (
      status === 'PUBLISHED' &&
      this.props.currentProject.layers.some(o => o.virtualSpace === true)
    ) {
      tokenAPI
        .get(`/${rot}.json`)
        .then(r => {
          let accessConnector = true;
          if (r.data.urm['xyz-hub'] && r.data.urm['xyz-hub'].accessConnector) {
            accessConnector = r.data.urm['xyz-hub'].accessConnector.some(
              c => c.id.indexOf('virtualspace') > -1
            );
          } else {
            setTimeout(() => this.republishPopup(), 1500);
          }

          if (!accessConnector) setTimeout(() => this.republishPopup(), 1500);
        })
        .catch(e => apiErrorHandler(e, store.dispatch));
    }
  };

  republishPopup = () => {
    this.props.showAlert({
      theme: 'default',
      title: 'Please republish this project',
      text:
        'Looks like the project is already published. Please republish this project to reflect Virtual Spaces in viewer',
      cancelLabel: 'Ok',
      cancel: () => {
        this.props.hideAlert();
      },
    });
  };

  onDisabledLayerClick = geospaceId => {
    this.props.showAlert({
      title: 'Space not found',
      text: `Looks like the space (id = ${geospaceId}) linked to this layer is no longer available`,
      theme: 'negative',
      cancelLabel: 'Got it',
    });
  };

  onLayerVisibilityClick = (e, id) => {
    e.stopPropagation();
    this.props.hideLayer(id);
  };

  onLayerDeleteClick = (e, id) => {
    e.stopPropagation();

    this.props.showAlert({
      title: 'Are you sure?',
      text:
        'You are deleting a layer and any style settings for the layer.\n The data associated with the layer will still exist, but the data will be removed from this project.',
      theme: 'negative',
      cancelLabel: 'Cancel',
      confirmLabel: 'Delete',
      confirm: () => {
        this.onLayerDelete(id);
      },
    });
  };

  onLayerDelete = id => {
    this.props.deleteLayer(id);
    this.deleteHexbinLayer(id);
    this.props.removeEmptyLayerHighlight();
  };

  deleteHexbinLayer = id => {
    if (this.props.currentProject) {
      this.props.currentProject.layers.forEach(layer => {
        if (layer.id === id) {
          if (layer.clustering && layer.clustering.hexbin) {
            window.mapObject.getLayers().forEach(l => {
              if (l.name.indexOf('Hexbin') !== -1) {
                window.mapObject.removeEventListener(
                  'mapviewchangestart',
                  this.setStyleGroupForHexbin
                );
                window.mapObject.removeLayer(l);
              }
            });
          }
        }
      });
    }
  };

  onLayerSelectClick = (e, id) => {
    e.preventDefault();
    this.props.editLayer(id);
    this.props.removeEmptyLayerHighlight();
    this.setState({ showFilter: false });
  };

  onLayerSort = newLayers => {
    this.props.upadteProjectLayers(newLayers);
    this.props.removeEmptyLayerHighlight();
  };

  onLayerRename = (name, id) => {
    const { currentLayer } = this.props;
    this.props.renameLayer(name, id || currentLayer.id);
    this.props.removeEmptyLayerHighlight();
  };

  onLayerAdd = () => {
    this.setState({
      showAddLayer: true,
      showOpenDataset: false,
    });
  };

  onNewEmptyLayer = () => {
    logEvent('add_empty_layer');
    const { newEmptyLayerCounter } = this.props.currentProject.meta;
    this.props.addEmptyLayer('New Layer', newEmptyLayerCounter);
    this.props.showLoadingScreen(true);
  };

  onShowAddDataLayer = spaces => {
    if (spaces) {
      this.props.addLayer(spaces);
    } else {
      this.props.addEmptyLayer();
    }
    this.setState({ showAddLayer: false });
  };

  onHideAddDataLayer = () => {
    this.setState({
      showAddLayer: false,
      showOpenDataset: false,
    });
  };

  onAddLayer = spaces => {
    if (spaces) {
      this.props.addLayer(spaces, () => {
        this.checkVStoken();
      });
      this.props.showLoadingScreen(true);
    } else {
      this.props.addEmptyLayer();
    }
    this.props.removeEmptyLayerHighlight();
  };

  onAddLayerBack = () => {
    this.setState({
      showAddLayer: false,
    });
    this.props.removeEmptyLayerHighlight();
  };

  layerUpdate = (data, ruleId) => {
    this.props.updateLayer({ ...data, ruleId });
  };

  closeAlert = onExited => {
    this.props.hideAlert();
    if (!onExited) this.setState({ toggleRevert: true });
  };

  publishProject = (cid, callback) => {
    this.setState({ toggleRevert: false });

    const projectSpaces = this.props.currentProject.layers.map(
      ({ geospace }) => geospace.id
    );
    const { rot } = this.props.currentProject;

    if (
      this.props.currentProject.layers.some(o => o.virtualSpace === true) &&
      this.props.currentProject.status !== 'PUBLISHED'
    ) {
      // close open alerts
      this.props.hideAlert();
      // check if there is a virtual space present

      this.props.virtualMapSource.forEach(space => {
        if (projectSpaces.indexOf(space.vSpace) !== -1) {
          projectSpaces.push(...space.sourceSpaces);
        }
      });

      // show alert
      this.props.showAlert({
        theme: 'default',
        title: 'Publishing Virtual Spaces',
        text:
          'Looks like your project consists of layers consisting virtual spaces. On publishing this project, all your source spaces linked with the virtual space will also get published, do you want to proceed?',
        cancelLabel: 'Cancel',
        confirmLabel: 'Publish',
        confirm: () => {
          this.props.publishProject(
            this.props.currentProject.id,
            this.props.currentProject.meta.name,
            this.props.currentProject.status,
            uniq(projectSpaces),
            rot,
            cid,
            callback
          );
        },
        cancel: onExited => {
          this.closeAlert(onExited);
        },
      });
    } else {
      this.props.publishProject(
        this.props.currentProject.id,
        this.props.currentProject.meta.name,
        this.props.currentProject.status,
        projectSpaces,
        rot,
        cid,
        callback
      );
    }
  };

  onAddEmptyLayerIntent = () => {
    this.props.showAlert({
      title: 'Add new layer',
      text: 'Please choose a name for the XYZ space created for this layer.',
      theme: 'positive',
      placeholder: 'New space name',
      cancelLabel: 'Cancel',
      confirmLabel: 'Confirm',
      confirm: name => {
        return new Promise(resolve => {
          this.setState({ showAddLayer: false });
          this.props.addEmptyLayer(name).then(() => resolve({ valid: true }));
        });
      },
    });
  };

  toggleRuleModal = (
    geometryType,
    ruleId = null,
    preset = null,
    name = null
  ) => {
    this.setState(prevState => ({
      modalRulesOpen: !prevState.modalRulesOpen,
      modalRulesGeometry: geometryType,
      modalRuleId: ruleId,
      modalRuleName: name,
      modalRulePreset: preset,
    }));
  };

  onStyleRuleAdd = (rules, name) => {
    this.props.addStyleRule(rules, name, this.state.modalRulesGeometry);
    this.toggleRuleModal();
    this.props.setCurrentFeature(null);
  };

  onStyleRuleDeleteClick = () => {
    this.props.showAlert({
      title: 'Are you sure?',
      text:
        'You are deleting a style group. Any style settings associated with the group will no longer be available.',
      theme: 'negative',
      cancelLabel: 'Cancel',
      confirmLabel: 'Delete',
      confirm: this.onStyleRuleDelete,
    });
  };

  onStyleRuleDelete = () => {
    const { modalRulesGeometry, modalRuleId } = this.state;
    this.props.deleteStyleRule(modalRulesGeometry, modalRuleId);
    this.toggleRuleModal();
  };

  onStyleRuleEdit = (rules, name) => {
    const { modalRulesGeometry, modalRuleId } = this.state;
    this.props.editStyleRule(modalRulesGeometry, modalRuleId, rules, name);
    this.toggleRuleModal();
  };

  collectStyleRules = () => {
    if (!this.props.currentLayer.styleRules) return false;
    const selectedStyleRules = this.props.currentLayer.styleRules[
      this.state.modalRulesGeometry
    ];
    const selectedStyleRule = find(
      selectedStyleRules,
      rule => rule.id === this.state.modalRuleId
    );
    return selectedStyleRule ? [...selectedStyleRule.r] : false;
  };

  getStyleRulesName = () => {
    if (this.state.modalRuleName) return this.state.modalRuleName;
    if (!this.props.currentLayer.styleRules) return false;
    const selectedStyleRules = this.props.currentLayer.styleRules[
      this.state.modalRulesGeometry
    ];
    const selectedStyleRule = find(
      selectedStyleRules,
      rule => rule.id === this.state.modalRuleId
    );
    return selectedStyleRule ? selectedStyleRule.name : false;
  };

  onToggleProjectSetting = toggleProjectSetting => {
    this.setState({
      toggleProjectSetting,
    });
  };

  onUpdateOpenSourceDateSet = (id, tags) => {
    this.onHideAddDataLayer();
    this.props.updateOpenSourceDateSet(id, tags);
    this.props.showLoadingScreen(true);
  };

  onDeleteLayer = id => {
    this.props.editLayer(null);
    this.props.deleteLayer(id);
  };

  onTagDelete = (layerId, tagIndex) => {
    this.props.deleteTag(layerId, tagIndex);
  };

  onSelectTab = tab => {
    this.setState({
      showAddLayer: true,
      showOpenDataset: tab === 'xyzHereSpace',
    });
  };

  openFilter = () => {
    this.setState({ showFilter: true, resetFilter: false });
  };

  backIntoLayer = param => {
    const { setCurrentFeature } = this.props;
    if (param === 'propFilter') {
      this.setState({ showFilter: false, resetFilter: true });
    } else if (param === 'feature') {
      setCurrentFeature(null);
    }
  };

  onAddTag = () => {
    this.setState({ showAddLayer: true, showOpenDataset: true });
  };

  showDataLayerAlert = message => {
    this.props.showAlert({
      title: message.title,
      text: message.text,
      theme: 'negative',
      cancelLabel: 'Got it',
      toggle: true,
    });
  };

  selectAll = () => {
    if (this.refs.inputId.select) {
      this.refs.inputId.select();
    } else {
      this.refs.inputId.setSelectionRange(0, this.refs.inputId.value.length);
    }
  };

  copyText = () => {
    this.selectAll();
    document.execCommand('copy');
  };

  renderSliderItems() {
    const {
      currentLayer,
      sortLayerCardItems,
      updateMapBbox,
      upadteLayerBbox,
      textStyleToggle,
      iconStyleToggle,
      sortStyleRules,
      openStyleGeoPanel,
      openStyleRulePanel,
      currentStyleGeoPanel,
      currentStyleRulePanel,
      updateDefaultStyleLabel,
      updateCurrentFeatureProp,
      updatingFeature,
      spaces,
      currentFeature,
      currentProject,
      renameProject,
      changeBaseTileLayer,
      changeBaseTheme,
      changeShowLabels,
      changeBaseView,
      upadteProjectDescription,
      sortGeometry,
      colorLoader,
      currnetPlan,
      addStyleRule,
      mapMode,
      onFilteringWithEditMode,
      showFilterAppliedNote: _showFilterAppliedNote,
      currentViewMode,
      setCurrentFeature,
      updateHexbin,
      removeHexbin,
      showAlert,
      updateGisFeatures,
      toggleGisPersist,
    } = this.props;

    const {
      showOpenDataset,
      showAddLayer,
      showFilter,
      resetFilter,
    } = this.state;

    // namecomp for Layer detail slide
    const nameComp = (
      <Name
        name={currentLayer ? currentLayer.meta.title : 'Untitled Layer'}
        subTitle={currentProject.meta.name}
        rename={this.onLayerRename}
        placeholder="Untitled Layer"
        readyOnly={currentLayer && currentLayer.meta.tags}
      />
    );

    const spaceComp = (
      <div className={style.spaceidWrapper}>
        <h3>Space ID</h3>
        <div className={style.container}>
          <input
            className={style.inputfield}
            type="text"
            ref="inputId"
            value={currentLayer && currentLayer.geospace.id}
            readOnly
          />
          <div
            role="presentation"
            className={style.copyIcon}
            onClick={this.copyText}
          >
            <span>
              <Copy />
            </span>
          </div>
        </div>
      </div>
    );

    return (
      <div className={style.studioSidebarSliderInner}>
        {/* Layer details Slide */}
        <div
          className={`${style.studioSidebarSlide} ${currentLayer &&
            !currentFeature &&
            !showFilter &&
            style.active}
              ${currentLayer &&
                (currentFeature || showFilter) &&
                style.subactive}`}
        >
          {currentProject.meta && nameComp}
          {currentLayer && (
            <ProjectLayerDetails
              onAddTag={this.onAddTag}
              update={this.layerUpdate}
              onFitOnMap={updateMapBbox}
              updateBbox={upadteLayerBbox}
              onCardItemsSort={sortLayerCardItems}
              onTextStyleToggle={textStyleToggle}
              onIconStyleToggle={iconStyleToggle}
              onAddNewRuleClick={this.toggleRuleModal}
              onStyleRuleEditClick={this.toggleRuleModal}
              onStyleRulesSort={sortStyleRules}
              onGeometrySort={sortGeometry}
              onGisUpdate={updateGisFeatures}
              toggleGisPersist={toggleGisPersist}
              onBackClick={e => this.onLayerSelectClick(e, null)}
              lastSave={currentProject.last_update}
              geometryAccordionClick={openStyleGeoPanel}
              ruleAccordionClick={openStyleRulePanel}
              currentStyleGeoPanel={currentStyleGeoPanel}
              currentStyleRulePanel={currentStyleRulePanel}
              currentLayer={currentLayer}
              updateDefaultStyleLabel={updateDefaultStyleLabel}
              onDeleteLayer={this.onDeleteLayer}
              onTagDelete={this.onTagDelete}
              spaces={spaces}
              colorLoader={colorLoader}
              openFilter={this.openFilter}
              updateHexbin={updateHexbin}
              removeHexbin={removeHexbin}
              mapMode={mapMode}
              currentViewMode={currentViewMode}
              currentProject={currentProject}
              {...currentLayer}
              spaceComp={spaceComp}
            />
          )}
        </div>

        {/* Feature details Slide */}
        <div
          className={`${style.studioSidebarSlide} ${currentLayer &&
            currentFeature &&
            style.active}`}
        >
          {currentProject.meta && nameComp}
          {currentFeature && currentLayer && (
            <ProjectLayerFeature
              currentLayer={currentLayer}
              onFeaturePropEdit={updateCurrentFeatureProp}
              updatingFeature={updatingFeature}
              onBackClick={() => setCurrentFeature(null)}
              onAddRuleClick={this.toggleRuleModal}
              lastSave={currentProject.last_update}
              layerTitle={currentLayer.meta.title}
              {...currentFeature}
            />
          )}
          {spaceComp}
        </div>

        {/* Add layer Slide */}
        <div
          className={`${style.studioSidebarSlide} ${showAddLayer &&
            style.active}`}
        >
          <AddLayerSidePanel
            currnetPlanTitle={currnetPlan}
            onSelectTab={this.onSelectTab}
            showOpenDataset={showOpenDataset}
          />
        </div>

        {/* Property Filter Slide */}
        {currentLayer && (
          <div
            className={`${style.studioSidebarSlide} ${showFilter &&
              currentLayer &&
              !currentFeature &&
              style.active}`}
          >
            <div className={style.layerTitle}>
              {currentLayer && currentLayer.meta && currentLayer.meta.title}
            </div>

            <HighlightFeatures
              featureProps={currentLayer && currentLayer.geospace.properties}
              spaceId={currentLayer && currentLayer.geospace.id}
              addStyleRule={addStyleRule}
              mapMode={mapMode}
              onFilteringWithEditMode={onFilteringWithEditMode}
              showFilterAppliedNote={_showFilterAppliedNote}
              currentViewMode={currentViewMode}
              resetFilter={resetFilter}
              showAlert={showAlert}
            />
          </div>
        )}

        {/* Deafault Slide */}
        <div
          className={`${style.studioSidebarSlide} ${
            style.deafaultSlide
          } ${(currentLayer || currentFeature || showAddLayer || showFilter) &&
            style.hideSlide}`}
        >
          {currentProject.meta && (
            <Name
              name={currentProject.meta.name}
              rename={renameProject}
              placeholder="Untitled Project"
              siteTourId="project-title"
            />
          )}
          <ProjectLayerButtons
            onAdd={this.onLayerAdd}
            onNew={this.onNewEmptyLayer}
            spaces={spaces}
            onLayerSort={this.onLayerSort}
            onLayerRename={this.onLayerRename}
            layers={currentProject.layers}
            onDisabledLayerClick={this.onDisabledLayerClick}
            onLayerSelectClick={this.onLayerSelectClick}
            onLayerVisibilityClick={this.onLayerVisibilityClick}
            onLayerDeleteClick={this.onLayerDeleteClick}
            currentLayer={currentLayer}
            currentProject={currentProject}
            onTileLayerChange={changeBaseTileLayer}
            onThemeChange={changeBaseTheme}
            onShowLabels={changeShowLabels}
            onBaseViewChange={changeBaseView}
            lastSave={currentProject.last_update}
            upadteProjectDescription={upadteProjectDescription}
          />
        </div>
      </div>
    );
  }

  render() {
    let projectBreadcrumb = null;
    const {
      currentLayer,
      spaces,
      proMap,
      virtualMap,
      mapMode,
      currentFeature,
      currentProject,
      uploadProgress,
      defaultAppId,
      alert,
      fileSizeLimit,
      spaceLimitValue,
      loading,
      createNewSpace: _createNewSpace,
      virtualizeSpace: _virtualizeSpace,
      updateVirtualSpaces: _updateVirtualSpaces,
      filesUploadFinished: _filesUploadFinished,
      spacesLimit,
      isFilesDropped,
      files,
      cleanUpSpaces: _cleanUpSpaces,
      loader: _loader,
      showAlert,
      hideAlert,
      showGeocodedFeaturesNotice: _showGeocodedFeaturesNotice,
    } = this.props;

    const {
      toggleProjectSetting,
      modalRulesOpen,
      showAddLayer,
      showOpenDataset,
      modalRulePreset,
      showFilter,
      toggleRevert,
    } = this.state;

    if (currentLayer) {
      projectBreadcrumb = (
        <ProjectBreadcrumb
          backlink={e => this.onLayerSelectClick(e, null)}
          backlinkLabel="Layers"
          currentLabel={currentLayer.meta.title}
        />
      );
    }

    if (currentLayer && showFilter) {
      projectBreadcrumb = (
        <ProjectBreadcrumb
          backlink={() => this.backIntoLayer('propFilter')}
          backlinkLabel={currentLayer.meta.title}
          currentLabel={currentLayer.meta.title}
        />
      );
    }

    if (currentLayer && currentFeature) {
      projectBreadcrumb = (
        <ProjectBreadcrumb
          backlink={() => this.backIntoLayer('feature')}
          backlinkLabel={currentLayer.meta.title}
          currentLabel={currentFeature.properties.name || currentFeature.id}
        />
      );
    }

    if (!currentLayer) {
      projectBreadcrumb = (
        <ProjectBreadcrumb
          backlink="/"
          backlinkLabel="Dashboard"
          currentLabel="Layers"
        />
      );
    }

    if (showAddLayer) {
      projectBreadcrumb = (
        <ProjectBreadcrumb
          backlink={e => this.onAddLayerBack(e)}
          backlinkLabel="Layers"
        />
      );
    }

    const defaultStyle = {
      transition: 'opacity 300ms ease-in-out',
      opacity: 0,
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    };

    return (
      <div
        className={`${style.studioSidebarWrapper} ${
          mapMode === 'edit' ? style.editMode : style.viewMode
        } ${modalRulesOpen || toggleProjectSetting ? style.active : ''} ${
          showAddLayer ? style.AddLayerMode : ''
        }`}
      >
        {currentProject && (
          <div
            className={`${style.studioSidebarInner} ${loading &&
              style.loading}`}
          >
            {projectBreadcrumb}
            <Scrollbars
              style={{ width: '100%', height: '100%', flex: '2' }}
              renderTrackVertical={props => (
                <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
              )}
              renderThumbVertical={props => (
                <div {...props} style={ScrollbarStyle.thumbStyle} />
              )}
              renderView={props => (
                <div {...props} className={style.studioSidebarScroller} />
              )}
            >
              {this.renderSliderItems()}
            </Scrollbars>
            {!showAddLayer && !showFilter && (
              <Publish
                currentProject={currentProject}
                onPublishToggle={this.publishProject}
                defaultAppId={defaultAppId}
                showProjectPublishNote={commonActopns.showProjectPublishNote}
                showAlert={showAlert}
                hideAlert={hideAlert}
                toggleRevert={toggleRevert}
              />
            )}
          </div>
        )}

        <Transition
          in={showAddLayer || isFilesDropped}
          timeout={{
            enter: 0,
            exit: 400,
          }}
          unmountOnExit
        >
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <AddDataLayer
                loader={_loader}
                cleanUpSpaces={_cleanUpSpaces}
                loading={loading}
                spacesLimit={spacesLimit}
                spaceLimitValue={spaceLimitValue}
                fileSizeLimit={fileSizeLimit}
                hasError={alert}
                onError={this.showDataLayerAlert}
                items={spaces}
                itemsProMap={proMap}
                itemsVirtualMap={virtualMap}
                uploadProgress={uploadProgress}
                onAddLayer={this.onAddLayer}
                onAddEmptyLayerIntent={this.onAddEmptyLayerIntent}
                onShowAddDataLayer={this.onShowAddDataLayer}
                onHideAddDataLayer={this.onHideAddDataLayer}
                onSpaceAdd={_createNewSpace}
                virtualizeSpace={_virtualizeSpace}
                updateVirtualSpaces={_updateVirtualSpaces}
                selectable
                isFilesDropped={isFilesDropped}
                files={files}
                filesUploadFinished={_filesUploadFinished}
                currentProject={currentProject}
                updateOpenSourceDateSet={this.onUpdateOpenSourceDateSet}
                onDeleteLayer={this.onDeleteLayer}
                showOpenDataset={showOpenDataset}
                onAddLayerBack={this.onAddLayerBack}
                showAlert={showAlert}
                hideAlert={hideAlert}
                showGeocodedFeaturesNotice={_showGeocodedFeaturesNotice}
              />
            </div>
          )}
        </Transition>

        {modalRulesOpen && (
          <StyleRulesModal
            featureProps={currentLayer.geospace.properties}
            rules={this.collectStyleRules()}
            name={this.getStyleRulesName()}
            modalRulePreset={modalRulePreset}
            onCloseClick={this.toggleRuleModal}
            onDeleteClick={this.onStyleRuleDeleteClick}
            onEditClick={this.onStyleRuleEdit}
            onConfirmClick={this.onStyleRuleAdd}
          />
        )}
      </div>
    );
  }
}

const s2p = state => ({
  loading: state.common.loading,
  currentProject: state.map.currentProject,
  currentViewMode: state.map.currentViewMode,
  currentLayer: state.map.currentLayer,
  currentFeature: state.map.currentFeature,
  updatingFeature: state.map.updatingFeature,
  currentStyleGeoPanel: state.map.currentStyleGeoPanel,
  currentStyleRulePanel: state.map.currentStyleRulePanel,
  spaces: state.space.items,
  proMap: state.space.itemsProMap,
  virtualMap: state.space.itemsVirtualMap,
  virtualMapSource: state.space.itemsVirtualMapSource,
  uploadProgress: state.space.uploadProgress,
  defaultAppId: state.user.defaultAppId,
  spaceLimitValue: state.user.user && state.user.user.spaceLimit,
  isFilesDropped: state.space.isFilesDropped,
  files: state.space.files,
  mapMode: state.map.mode,
  currnetPlan:
    state.user.defaultAppId &&
    state.user.apps[state.user.defaultAppId] &&
    state.user.apps[state.user.defaultAppId].dsAppName,
  colorLoader: state.map.colorLoader,
});

export default connect(s2p, {
  ...mapActions,
  ...commonActopns,
  publishProject,
  createNewSpace,
  virtualizeSpace,
  cleanUpSpaces,
  updateVirtualSpaces,
  filesUploadFinished,
})(StudioSidebar);
