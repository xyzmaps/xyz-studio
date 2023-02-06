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
import { withRouter } from 'react-router-dom';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { projectsAPI } from '../../api';
import * as mapActions from '../../actions/mapActions';
import { fetchProject, updateProjectName } from '../../actions/projectActions';
import { fetchSpaces } from '../../actions/spaceActions';
import { getMapSettingsFromURL, isMobile } from '../../helpers';
import StudioSidebar from '../StudioSidebar/StudioSidebar';
import Bookmarks from '../../components/Bookmarks/Bookmarks';
import HereMap from '../HereMap/HereMap';
import MobileScreenAlert from '../../components/MobileScreenAlert/MobileScreenAlert';

import Tour from '../../plugin/reactour/Tour';

import style from './Studio.scss';

const tourConfig = [
  {
    selector: '[data-tut=""]',
    content:
      'Woohoo! You’ve created your first project! We’ll point out a few of the key things you should know getting started. ',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="project-title"]',
    content: 'You can add a title for your project here. ',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="project-details"]',
    content: 'And a description here. ',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="add-data"]',
    content: () => {
      return (
        <div>
          Click here to add data to your project. You’ll be able to upload data
          or add data you’ve already uploaded.
          <br />
          <br /> You can also add an empty layer and add your own features using
          edit mode.
        </div>
      );
    },
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="add-empty-layer"]',
    content: 'Click here to add empty layer.',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="base-map"]',
    content:
      'This is where you can select your basemap style and vector tile provider. You can always change this later.',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="publish-settings"]',
    content: () => {
      return (
        <div>
          Here you can publish your map, and choose whether to include the
          title, description, legend, and feature information cards.
          <br />
          <br /> You’ll also find a shareable link to your published map and an
          embed code to display it on your own site.
        </div>
      );
    },
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="bookmark"]',
    content: () => {
      return (
        <div>
          Want to bookmark your favorite map view?
          <br />
          <br /> You can save locations and jump to different parts of the map
          easily and even publish the map with one of the saved views.
        </div>
      );
    },
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="search-box"]',
    content:
      'Want to search for a particular place across the globe? Use this search bar to view it on the map. ',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut=""]',
    content: () => {
      return (
        <div>
          That’s all for now. Once you add layers to your map, you’ll see
          additional options to style those layers, and you’ll be able to
          inspect the feature data in a table view as well as on the map.
          <br />
          <br /> Let the map-making begin!
        </div>
      );
    },
    style: { color: 'black' },
  },
];

class Studio extends Component {
  state = {
    isTourOpen: false,
  };

  componentDidMount() {
    const {
      fetchSpaces: _fetchSpaces,
      fetchProject: _fetchProject,
      match,
    } = this.props;

    _fetchProject(match.params.project_id);
    _fetchSpaces();
    this.setState({
      isTourOpen: !localStorage.getItem('PROJECT_TOUR_VISITED'),
    });
  }

  componentWillUnmount() {
    this.saveBeforeLeaving();
  }

  getSpaceId = () => {
    let spaceId = null;

    if (this.props.currentProject) {
      if (this.props.currentLayer) {
        spaceId = this.props.currentLayer.geospace.id;
      } else if (this.props.currentProject.layers.length > 0) {
        spaceId = this.props.currentProject.layers[0].geospace.id;
      }
    }

    return spaceId;
  };

  saveBeforeLeaving = () => {
    const { currentProject } = this.props;

    if (!currentProject) return;

    const newProject = {
      ...currentProject,
      map_settings: getMapSettingsFromURL(this.props.location.search),
    };

    if (!currentProject.meta.name) {
      newProject.meta.name = 'Untitled Project';
      this.props.updateProjectName(currentProject.id, 'Untitled Project');
    }

    projectsAPI
      .put(`/${currentProject.id}`, JSON.stringify(newProject), {
        withCredentials: true,
      })
      .then(console.info('Saving...'))
      .catch(e => console.info(e.response));
  };

  closeTour = () => {
    this.setState({ isTourOpen: false });
    localStorage.setItem('PROJECT_TOUR_VISITED', true);
  };

  disableBody = target => disableBodyScroll(target);

  enableBody = target => enableBodyScroll(target);

  render() {
    const {
      currentProject,
      mapMode,
      addBookmark,
      deleteBookmark,
      clickBookmark,
      updateMapBbox,
      colorLoader,
      toggleCardVisibility,
    } = this.props;

    const { isTourOpen } = this.state;

    let renderStudio = () => (
      <HereMap
        toggleCardVisibility={toggleCardVisibility}
        spaceId={this.getSpaceId()}
        dataBtnEnabled={this.dataBtnEnabled}
      />
    );

    if (colorLoader) {
      renderStudio = () => (
        <div className={style.colorLoader}>
          Applying styles to your map <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      );
    }

    return (
      <div className={style.wrapper}>
        {isMobile() && <MobileScreenAlert />}
        {currentProject && currentProject.id && (
          <div className={style.mapWrapper}>
            <StudioSidebar />

            {renderStudio()}

            {mapMode !== 'edit' && (
              <div className={style.topBar}>
                <Bookmarks
                  items={currentProject.bookmarks}
                  onBookmarkAdd={addBookmark}
                  onBookmarkDelete={deleteBookmark}
                  onBookmarkSelect={clickBookmark}
                  onUpdateMapBbox={updateMapBbox}
                />
              </div>
            )}
          </div>
        )}

        {!isMobile() && (
          <Tour
            onAfterOpen={this.disableBody}
            onBeforeClose={this.enableBody}
            onRequestClose={this.closeTour}
            steps={tourConfig}
            isOpen={isTourOpen}
            maskClassName="mask"
            className="helper"
            rounded={5}
            accentColor="#5cb7b7"
          />
        )}
      </div>
    );
  }
}

const s2p = state => ({
  currentProject: state.map.currentProject,
  currentViewMode: state.map.currentViewMode,
  colorLoader: state.map.colorLoader,
  currentLayer: state.map.currentLayer,
  mapMode: state.map.mode,
});

export default withRouter(
  connect(s2p, {
    ...mapActions,
    fetchProject,
    updateProjectName,
    fetchSpaces,
  })(Studio)
);
