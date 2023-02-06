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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { urlToProperty } from 'query-string-params';

import { showLoadingScreen } from '../../actions/commonActions';
import { projectsAPI, getTokenDetails } from '../../api';
import { credentials } from '../../constants';

import HereMap from './Map/HereMap';
import TangramMap from './Map/TangramMap/TangramMap';

import style from './Viewer.scss';
import { getToken, setToken } from '../../helpers';

class Viewer extends Component {
  state = {
    loading: true,
    map: null,
  };

  componentDidMount() {
    const thisRef = this;
    this.controls = !!(this.controls === 'true' || this.controls === undefined);
    this.isLocal = this.isLocal === 'true';

    // If accesstoken is passed set the token to localstorage and credentials for further use
    let headers = {};
    if (this.viewerAccessToken) {
      credentials.access_token = this.viewerAccessToken;
      setToken(this.viewerAccessToken);

      // If viewerAccessToken is passed -> Use it to form project API Headers
      headers = {
        Authorization: `Bearer ${this.viewerAccessToken}`,
      };
    }

    projectsAPI
      .get(this.projectId || '000', {
        withCredentials: this.isLocal,
        headers,
      })
      .then(response => {
        const { data } = response;
        this.props.showLoadingScreen(false);
        if (this.isLocal) {
          this.setUpMap(data);
        } else {
          if (!credentials.access_token && data.rot) {
            credentials.access_token = data.rot;
          }
          getTokenDetails(
            credentials.access_token,
            () => {
              thisRef.setUpMap(data);
            },
            () => {
              thisRef.setState({ loading: false });
            }
          );
        }
      })
      .catch(() => {
        this.props.showLoadingScreen(false);
        this.setState({ loading: false });
      });
  }

  urlParam = urlToProperty(window.location.search);

  projectId = this.urlParam.project_id && this.urlParam.project_id.shift();

  controls = this.urlParam.controls && this.urlParam.controls.shift();

  isLocal = this.urlParam.local && this.urlParam.local.shift();

  viewerAccessToken =
    this.urlParam.access_token && this.urlParam.access_token.shift();

  setUpMap = data => {
    const access_token = this.isLocal ? getToken() : credentials.access_token;
    if (
      (data.publish_settings && data.publish_settings.viewer) ||
      this.isLocal
    ) {
      if (data.publish_settings.viewer === 'tangram') {
        // Update the access_token in projectAPI Body for further usage in Tangram Basemap
        const projectData = data;
        projectData.rot = access_token;
        this.setState({
          map: (
            <TangramMap
              data={projectData}
              controls={this.controls}
              access_token={access_token}
            />
          ),
          loading: false,
        });
      } else {
        this.setState({
          map: (
            <HereMap
              data={data}
              controls={this.controls}
              access_token={access_token}
            />
          ),
          loading: false,
        });
      }
    } else {
      this.setState({
        map: (
          <HereMap
            data={data}
            controls={this.controls}
            access_token={access_token}
          />
        ),
        loading: false,
      });
    }
  };

  render() {
    const { loading, map } = this.state;
    /* eslint-disable no-nested-ternary */
    return loading === true ? (
      <div className={style.spinner} />
    ) : map === null ? (
      <div className={style.wrapper}>
        <p className={style.msg}>
          <strong>Project not found!</strong>
          <span>
            Sorry, but the map you were trying to view does not exist.
          </span>
        </p>
      </div>
    ) : (
      map
    );
    /* eslint-enable no-nested-ternary */
  }
}

export default withRouter(
  connect(null, {
    showLoadingScreen,
  })(Viewer)
);
