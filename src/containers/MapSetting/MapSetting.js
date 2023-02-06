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
import { withRouter, Link } from 'react-router-dom';
import { uniq } from 'lodash';
// import { Scrollbars } from 'react-custom-scrollbars';
import { setTimeout } from 'timers';
import style from './MapSetting.scss';
import { Arrow } from '../../icons';
import { setTokenLink, isMobile } from '../../helpers';
import Toggle from '../../components/Common/Toggle';
import Embed from '../../components/Embed/Embed';
import Accordion from '../../components/Sidebar/ProjectLayer/Accordion';
import Title from './Title';
import Desc from './Desc';
// import Description from '../../components/Sidebar/Description/Description';
import ProjectDetailsPanel from './ProjectDetailsPanel/ProjectDetailsPanel';
// import ScrollbarStyle from '../../config/ScrollbarStyle';

import {
  publishProject,
  fetchProject,
  setPublishId,
  selectDefaultBookmark,
  selectDefaultLicense,
  showName,
  showDescription,
  enableHoverCards,
  showLegend,
  onViewerSelect,
} from '../../actions/projectActions';
import * as mapActions from '../../actions/mapActions';
import { showProjectPublishNote } from '../../actions/commonActions';

import Cards from './Cards';
import Select from './Select';
import Viewer from './Viewer/Viewer';

class MapSetting extends Component {
  state = {
    onViewerToggle: false,
    viewer: false,
    listOfAppId: this.props.apps,
    publishAppId:
      (this.props.location.state &&
        this.props.location.state.currentProject.publish_settings &&
        this.props.location.state.currentProject.publish_settings.publish_id) ||
      this.props.defaultAppId,
    toggleRevert: false,
    publishing: false,
  };

  componentDidMount = async () => {
    const { fetchProject: _fetchProject, match } = this.props;

    _fetchProject(match.params.project_id);
  };

  closeAlert = onExited => {
    this.props.hideAlert();
    if (!onExited) this.setState({ toggleRevert: true });
  };

  publishProject = () => {
    this.setState({ toggleRevert: false, publishing: true });

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
            this.state.publishAppId,
            () => {
              if (this.props.currentProject.status === 'PUBLISHED')
                this.props.showProjectPublishNote('Published');
              else this.props.showProjectPublishNote('Unpublished');

              this.setState({ publishing: false });
            }
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
        this.state.publishAppId,
        () => {
          if (this.props.currentProject.status === 'PUBLISHED')
            this.props.showProjectPublishNote('Published');
          else this.props.showProjectPublishNote('Unpublished');

          this.setState({ publishing: false });
        }
      );
    }
  };

  selectPublishId = cid => {
    this.setState({
      publishAppId: cid,
    });
    this.props.setPublishId(this.props.location.state.currentProject.id, cid);
  };

  onViewerPreview = type => {
    this.props.onViewerSelect(type);
    setTimeout(() => {
      this.setState(prevState => ({ viewer: !prevState.viewer }));
    }, 4000);
  };

  render() {
    const {
      currentProject,
      selectDefaultBookmark: _selectDefaultBookmark,
      showName: _showName,
      showDescription: _showDescription,
      enableHoverCards: _enableHoverCards,
      showLegend: _showLegend,
      location,
      renameProject,
      upadteProjectDescription,
    } = this.props;

    const {
      listOfAppId,
      publishAppId,
      onViewerToggle,
      viewer,
      toggleRevert,
      publishing,
    } = this.state;

    let cardSetting;
    let bookmark;

    if (location.state) {
      cardSetting =
        location.state.currentProject.publish_settings &&
        location.state.currentProject.publish_settings.display &&
        location.state.currentProject.publish_settings.display.cards;
    } else {
      cardSetting = false;
    }

    if (location.state) {
      bookmark = currentProject
        ? currentProject.publish_settings.bookmark
        : location.state.currentProject.publish_settings.bookmark;
    } else {
      bookmark = currentProject ? currentProject.publish_settings.bookmark : {};
    }

    let backlink = '/';

    if (location.state) {
      backlink = location.state.fromDashboard
        ? '/'
        : `/studio/project/${location.state.currentProject.id}`;
    }

    return (
      <div className={style.wrapper}>
        {currentProject && currentProject.id && (
          <div className={style.wrapper}>
            <div className={style.headerWrapper}>
              <Link className={style.backlink} to={setTokenLink(backlink)}>
                <Arrow />
                Back
              </Link>
              <div className={style.header}>
                <div>Map Settings</div>
                <div className={style.publish}>
                  <span className={style.pub}>Publish&nbsp;&nbsp;</span>
                  <div className={style.toggleBorder}>
                    <Toggle
                      onToggle={this.publishProject}
                      active={currentProject.status === 'PUBLISHED'}
                      toggleRevert={toggleRevert}
                      disabled={publishing}
                      noTooltip
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={style.container}>
              <div className={style.settings}>
                <div className={style.embedsection}>
                  <Embed label="URL" id={currentProject.id} link setting />
                  <Embed label="EMBED" iframe id={currentProject.id} setting />
                </div>
                <div className={style.mapsection}>
                  <Title
                    element="name"
                    label="Project Name:"
                    currentProject={currentProject}
                    onNameToggle={_showName}
                    value={currentProject.meta.name}
                    showElement={
                      currentProject.publish_settings.display &&
                      currentProject.publish_settings.display.name
                    }
                    rename={renameProject}
                  />
                  <Desc
                    element="description"
                    label="Description:"
                    currentProject={currentProject}
                    onDescriptionToggle={_showDescription}
                    value={currentProject.meta.description}
                    showElement={
                      currentProject.publish_settings.display &&
                      currentProject.publish_settings.display.description
                    }
                    edit={upadteProjectDescription}
                  />
                  <Cards
                    active={typeof cardSetting === 'undefined' || !!cardSetting}
                    onCardToggle={_enableHoverCards}
                    label="Cards"
                    element="cards"
                    currentProject={currentProject}
                  />
                  <Cards
                    active={
                      currentProject.publish_settings.display &&
                      currentProject.publish_settings.display.legend
                    }
                    element="legend"
                    label="Legends"
                    currentProject={currentProject}
                    onCardToggle={_showLegend}
                  />
                  <Viewer
                    selectViewer={this.onViewerPreview}
                    currentProject={currentProject}
                  />
                  <Select
                    label="Initial Map Location:"
                    currentValue={bookmark}
                    options={currentProject.bookmarks}
                    onSelect={_selectDefaultBookmark}
                    id={currentProject.id}
                    bookmark
                    placeholder="Please select a bookmark"
                  />
                  <Select
                    label="Plan for billing:"
                    currentValue={listOfAppId[publishAppId].dsAppName}
                    options={listOfAppId}
                    onSelect={this.selectPublishId}
                    publishAppId={publishAppId}
                    disabled={currentProject.status === 'PUBLISHED'}
                    plan
                  />
                </div>
              </div>

              {isMobile() ? (
                <Accordion
                  title="Viewer View"
                  onToggle={() =>
                    this.setState({
                      onViewerToggle: !onViewerToggle,
                    })
                  }
                  isOpen={onViewerToggle}
                >
                  <div className={style.viewContainer}>
                    <iframe
                      title="viewer"
                      scrolling="yes"
                      className={style.viewer}
                      key={viewer}
                      src={`/viewer/?project_id=${currentProject.id}&controls=false&width=356&height=201&scale=1&local=true`}
                    />
                    <ProjectDetailsPanel
                      currentProject={currentProject}
                      className={style.detailPanel}
                    />
                  </div>
                </Accordion>
              ) : (
                <div className={style.preview}>
                  <div className={style.viewhead}>Viewer View</div>
                  <div className={style.preWrapper}>
                    <iframe
                      title="viewer"
                      scrolling="yes"
                      className={style.viewer}
                      key={viewer}
                      src={`/viewer/?project_id=${currentProject.id}&controls=false&width=356&height=201&scale=1&local=true`}
                    />
                    <ProjectDetailsPanel currentProject={currentProject} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const s2p = state => ({
  currentProject: state.map.currentProject,
  currentViewMode: state.map.currentViewMode,
  defaultAppId: state.user.defaultAppId,
  apps: state.user.apps,
  currnetPlan:
    state.user.defaultAppId &&
    state.user.apps[state.user.defaultAppId] &&
    state.user.apps[state.user.defaultAppId].dsAppName,
  virtualMapSource: state.space.itemsVirtualMapSource,
});

export default connect(s2p, {
  ...mapActions,
  publishProject,
  setPublishId,
  showName,
  fetchProject,
  showDescription,
  enableHoverCards,
  showLegend,
  selectDefaultBookmark,
  selectDefaultLicense,
  onViewerSelect,
  showProjectPublishNote,
})(withRouter(MapSetting));
