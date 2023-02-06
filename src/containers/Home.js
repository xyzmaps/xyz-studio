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
import { tcUpdate } from '../actions/userActions';

import { setTokenLink, isMobile } from '../helpers';

import {
  newProject,
  fetchProjects,
  starProject,
  deleteProject,
  setProjectThumbnail,
} from '../actions/projectActions';
import { resetCurrentProject, showAlert } from '../actions/mapActions';

import { gateKeeperAPI, apiErrorHandler } from '../api';

// import Alert from '../components/Alert/Alert';
import Dashboard from './Dashboard/Dashboard';

import Tour from '../plugin/reactour/Tour';
import logEvent from '../utils/amplitudeLogger';

const tourConfig = [
  {
    selector: '[data-tut=""]',
    content: 'Welcome to HERE Studio! Allow us to show you around… ',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="dashboard"]',
    content:
      'This is your project dashboard. You’ll be able to access all your projects here and star your favorites.',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="data-hub"]',
    content:
      'This leads to your Data Tab, where you’ll be able to access and manage all of the data you upload. ',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="documents"]',
    content:
      'Click here anytime to see documentation for Studio, as well as the Data Hub API and command line interface. ',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="account"]',
    content:
      'This is where you can access your account dashboard, to track your usage and make changes to your plan, if you’d like.',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut="create-new-project"]',
    content: 'Click here to create your first project!',
    style: { color: 'black' },
  },
  {
    selector: '[data-tut=""]',
    content:
      'Thanks for taking a look around! We’ll be back when you start your first project.',
    style: { color: 'black' },
  },
];

const LoadingScreen = () => (
  <div className="project-loading">
    Creating new project <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
);

class Home extends Component {
  state = {
    loading: false,
    isTourOpen: false,
  };

  componentDidMount() {
    const {
      fetchProjects: getProjects,
      resetCurrentProject: resetCurrProj,
      tcAcceptedAt,
    } = this.props;

    if (!tcAcceptedAt) {
      this.props.showAlert({
        title: 'Welcome to HERE Studio!',
        text: '',
        subText:
          "By using this site, you accept <a href='https://developer.here.com/terms-and-conditions'>HERE Developer Terms &amp; Conditions</a>.",
        onYes: this.onAccept,
        yesLabel: 'Accept',
      });
    }

    getProjects();
    resetCurrProj();
  }

  componentWillReceiveProps = ({ currentProject }) => {
    if (currentProject) {
      this.goToProject(currentProject);
    }
  };

  componentDidUpdate(prevProps) {
    const { projects } = this.props;
    const { isTourOpen } = this.state;

    if (
      (prevProps.projects.length !== projects.length ||
        !localStorage.getItem('DASHBOARD_TOUR_VISITED')) &&
      !isTourOpen
    ) {
      this.checkForSiteTour();
    }
  }

  goToProject({ id }) {
    if (id) {
      const { history } = this.props;

      history.push(setTokenLink(`/studio/project/${id}`));
    }
  }

  createNewProject = () => {
    this.setState({
      loading: true,
      isTourOpen: false,
    });

    logEvent('i_click_create_new_project');

    this.props.newProject();
  };

  onProjectDeleteClick = (id, rot) => {
    this.props.showAlert({
      title: 'Are you sure?',
      text:
        'You are deleting a project, the data associated with it will no longer be available.',
      theme: 'negative',
      cancelLabel: 'Cancel',
      confirmLabel: 'Delete',
      confirm: () => {
        this.onProjectDelete(id, rot);
      },
    });
  };

  onProjectDelete = (id, rot) => {
    this.props.deleteProject(id, rot);
  };

  checkForSiteTour = () => {
    if (this.props.projects.length > 0) {
      this.setState({ isTourOpen: false });
      localStorage.setItem('DASHBOARD_TOUR_VISITED', true);
    } else if (
      !localStorage.getItem('DASHBOARD_TOUR_VISITED') &&
      this.props.projects.length === 0
    ) {
      this.setState({ isTourOpen: true });
    }
    if (this.props.projects.length > 1) {
      localStorage.setItem('PROJECT_TOUR_VISITED', true);
    }
  };

  starItem = (id, star) => {
    this.props.starProject(id, star);
  };

  onAccept = () => {
    const thisRef = this;

    this.checkForSiteTour();

    gateKeeperAPI
      .patch(
        `/${thisRef.props.aid}`,
        {
          tcAcceptedAt: new Date().getTime(),
        },
        { withCredentials: true }
      )
      .then(response => {
        this.props.tcUpdate(response.tcAcceptedAt);
        logEvent('i_accept_tnc');
      })
      .catch(e => apiErrorHandler(e));
    window.utag.view({
      linkEvent: 'registration',
      sLogin: 'user_registration',
    }); // Registration event for Omniture
  };

  closeTour = () => {
    this.setState({ isTourOpen: false });
    localStorage.setItem('DASHBOARD_TOUR_VISITED', true);
  };

  disableBody = target => disableBodyScroll(target);

  enableBody = target => enableBodyScroll(target);

  render() {
    const {
      setProjectThumbnail: setProjThumbnail,
      deletingItem,
      projects,
      itemsLoaded,
    } = this.props;

    const { loading, isTourOpen } = this.state;

    return loading ? (
      <LoadingScreen />
    ) : (
      <div>
        <Dashboard
          context="project"
          layout={window.localStorage.getItem('layout') || 'card'}
          accLayout={false}
          switchLayout
          sortItems
          starItem={this.starItem}
          onThumbLoaded={setProjThumbnail}
          createItem={this.createNewProject}
          deleteItem={this.onProjectDeleteClick}
          deletingItem={deletingItem}
          items={projects}
          itemsLoaded={itemsLoaded}
          labels={['TITLE', 'DESCRIPTION', 'PUBLISHED', 'DATE UPDATED']}
        />

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

const mapStateToProps = state => ({
  projects: state.project.items,
  itemsLoaded: state.project.itemsLoaded,
  deletingItem: state.project.deletingItem,
  currentProject: state.map.currentProject,
  tcAcceptedAt: state.user.tcAcceptedAt,
  aid: state.user.aid,
});

export default withRouter(
  connect(mapStateToProps, {
    resetCurrentProject,
    newProject,
    fetchProjects,
    starProject,
    deleteProject,
    showAlert,
    setProjectThumbnail,
    tcUpdate,
  })(Home)
);
