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
import _ from 'lodash';
import FileSaver from 'file-saver';

import { connect } from 'react-redux';
import { updateSpaces } from '../../actions/spaceActions';
import { mapConfig, msbfptOpenSpaceId, links } from '../../constants';

import { spacesAPI, apiErrorHandler } from '../../api';
import ProjectStatusBar from '../../components/Sidebar/ProjectStatusBar/ProjectStatusBar';
import Name from '../../components/Sidebar/Name/Name';
import Description from '../../components/Sidebar/Description/Description';
import Button from '../../components/Common/Button';
import { getToken, formatFileName } from '../../helpers';
import Attribution from '../../components/Sidebar/Attribution/Attribution';

import style from './SpaceSidebar.scss';
import { Copy } from '../../icons';

class SpaceSidebar extends Component {
  state = {
    loading: true,
    title: '',
    description: '',
    copyright: null,
    downloading: true,
  };

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { totalFeatureCount } = this.props;
    if (prevProps.totalFeatureCount !== totalFeatureCount) {
      this.updateDownloading(totalFeatureCount);
    }
  }

  headers = {
    Authorization: `Bearer ${getToken()}`,
    'content-type': 'application/geo+json',
  };

  updateDownloading(totalFeatureCount) {
    if (totalFeatureCount > -1) {
      if (totalFeatureCount > mapConfig.maxDownloadableFeatures) {
        this.setState({ downloading: true });
      } else {
        this.setState({ downloading: false });
      }
    }
  }

  fetch = () => {
    this.setState({ loading: true });

    spacesAPI
      .get(`/${this.props.spaceId}`, { withCredentials: true })
      .then(response => {
        this.setState({
          loading: false,
          title: response.data.title,
          description: response.data.description,
          copyright: response.data.copyright,
        });
      })
      .catch(e => apiErrorHandler(e));
  };

  patch = (key, value) => {
    spacesAPI
      .patch(`/${this.props.spaceId}`, JSON.stringify({ [key]: value }), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(() => {
        this.setState({ [key]: value });
      })
      .catch(e => apiErrorHandler(e));
  };

  editName = text => {
    this.patch('title', text);
  };

  updateDescription = text => {
    this.patch('description', text);
  };

  updateCopyright = (value, otherCopyright) => {
    this.props.updateSpaces(this.props.spaceId, value, otherCopyright);
  };

  onDownload = (spaceId, spaceName) => {
    let file;
    const sName = formatFileName(spaceName);

    this.setState({
      downloading: true,
    });

    spacesAPI
      .get(`/${spaceId}/statistics`, { headers: this.headers })
      .then(response => {
        if (response.data.count.value <= mapConfig.maxDownloadableFeatures) {
          spacesAPI
            .get(
              `/${spaceId}/search/?limit=${mapConfig.maxDownloadableFeatures}`,
              { headers: this.headers }
            )
            .then(res => {
              this.setState({ downloading: false });
              file = new File(
                [JSON.stringify(res.data, null, 2)],
                `${sName}_${spaceId}.geojson`,
                { type: 'text/json' }
              );
              FileSaver.saveAs(file);
            })
            .catch(e => {
              this.setState({ downloading: false });
              apiErrorHandler(e);
            });
        }
      })
      .catch(e => {
        this.setState({ downloading: false });
        apiErrorHandler(e);
      });
  };

  renderAttribution = () => {
    if (this.state.copyright) {
      return this.state.copyright.map((cr, k) => {
        return (
          <Attribution
            key={k + 1}
            label="Attribution"
            placeholder="Please add attribution"
            description={cr.label}
            edit={this.updateCopyright}
            otherCopyright={_.filter(
              this.state.copyright,
              c => c.label !== cr.label
            )}
            disabled={this.props.spaceId === msbfptOpenSpaceId}
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
        disabled={this.props.spaceId === msbfptOpenSpaceId}
      />
    );
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

  renderSpaceId = () => {
    const { spaceId } = this.props;

    return (
      <div className={style.container}>
        <input
          className={style.inputfield}
          type="text"
          ref="inputId"
          value={spaceId}
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
    );
  };

  render() {
    const { loading, title, description, downloading } = this.state;
    const { spaceId } = this.props;

    return (
      !loading && (
        <div className={style.spaceSidebarInner}>
          <ProjectStatusBar backlink="/studio/your-data" backlinkLabel="Back" />

          <Name
            name={title}
            rename={this.editName}
            placeholder="Untitled Space"
          />
          <Description
            label="Space Description"
            placeholder="Please add description for your space"
            description={description}
            edit={this.updateDescription}
          />
          <div className={style.attributionWrapper}>
            <h3>Attribution</h3>
            {this.renderAttribution()}
          </div>
          <div className={style.spaceidWrapper}>
            <h3>Space ID</h3>
            {this.renderSpaceId()}
          </div>

          <div className={style.downloadWrapper}>
            <Button
              className={[style.button]}
              text="Download"
              onClick={() => this.onDownload(spaceId, title)}
              disabled={downloading || loading}
            />
            <p className={style.downloadWarn}>
              * Available for spaces with&nbsp;
              {mapConfig.maxDownloadableFeatures} features or less.
              <br />
              To download the larger spaces, please use the
              <br />
              <a href={links.cli} rel="noopener noreferrer" target="_blank">
                Data Hub CLI
              </a>
            </p>
          </div>
        </div>
      )
    );
  }
}

export default connect(null, { updateSpaces })(SpaceSidebar);
