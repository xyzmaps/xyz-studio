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
import { Link } from 'react-router-dom';

import { setTokenLink } from '../../../helpers';
import { apiConfig } from '../../../constants';

import style from './Publish.scss';
import Share from '../../Share/Share';
import Button from '../../Common/Button';
import Toggle from '../../Common/Toggle';
import Embed from '../../Embed/Embed';

import { Setting, ShareIcon } from '../../../icons';

class Publish extends Component {
  state = {
    shareToggle: false,
    publishing: false,
  };

  onShareToggle = () => {
    if (!this.state.shareToggle) {
      document.addEventListener('click', this.onBlur, false);
    } else {
      document.removeEventListener('click', this.onBlur, false);
    }

    this.setState(prevState => ({ shareToggle: !prevState.shareToggle }));
  };

  onBlur = e => {
    if (this.refs.wrapper && this.refs.wrapper.contains(e.target)) {
      return;
    }

    this.onShareToggle();
  };

  onPublishToggle = () => {
    this.setState({ publishing: true });

    this.props.onPublishToggle(this.props.defaultAppId, () => {
      if (this.props.currentProject.status === 'PUBLISHED') {
        this.props.showAlert({
          theme: 'default',
          title: 'Your Map is now published for everyone to see!',
          text: `${apiConfig.viewer}?project_id=${this.props.currentProject.id}`,
          customSave: {
            maxWidth: 'none',
          },
          emoticon: true,
          renderContent: this.renderContent,
        });
        this.setState({ publishing: false });
      } else {
        this.props.hideAlert();
        this.props.showProjectPublishNote('Unpublished');

        this.setState({ publishing: false });
      }
    });
  };

  onViewerOpen = () => {
    window.open(
      `${apiConfig.viewer}?project_id=${this.props.currentProject.id}`,
      '_blank'
    );
  };

  renderContent = () => {
    return (
      <div className={style.alertcontent}>
        <div>
          <Button text="View Map" onClick={this.onViewerOpen} />
          <div className={`${style.headtext} ${style.liveWidth}`}>
            <div className={style.subtext}>Have a look!</div>
            <p>Go to viewer to view live map</p>
          </div>
        </div>
        <div>
          <Button text="Continue Editing" onClick={this.props.hideAlert} />
          <div className={`${style.headtext} ${style.closeWidth}`}>
            <div className={style.subtext}>Need to make more changes?</div>
            Just go ahead, any changes you make will be reflected live without
            republishing
          </div>
        </div>
        <div>
          <Share />
          <div className={style.headtext}>
            <div className={style.subtext}>Share link</div>
            For people to find it
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { currentProject, toggleRevert } = this.props;
    const { shareToggle, publishing } = this.state;

    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <span className={style.info}>Publish</span>
          <ul className={style.layerControls}>
            <li role="presentation">
              <div className={style.toggleBorder}>
                <Toggle
                  onToggle={this.onPublishToggle}
                  className={style.toggleCustom}
                  active={currentProject.status === 'PUBLISHED'}
                  size
                  small
                  text={`${apiConfig.viewer}?project_id=${currentProject.id}`}
                  toggleRevert={toggleRevert}
                  disabled={publishing}
                  noTooltip
                />
              </div>
            </li>

            <li role="presentation">
              <Link
                to={{
                  ...setTokenLink(`/studio/map-settings/${currentProject.id}`),
                  state: {
                    currentProject: { ...currentProject },
                    fromDashboard: false,
                  },
                }}
              >
                <div className={style.toggleBorder}>
                  <Setting />
                </div>
              </Link>
            </li>

            <li role="presentation" onClick={() => this.onShareToggle()}>
              <div className={style.toggleBorder}>
                <ShareIcon />
              </div>
            </li>
          </ul>

          {shareToggle && (
            <div className={style.sharepanel} ref="wrapper">
              <div className={style.embedsection}>
                <Embed label="URL" id={currentProject.id} link studio />
                <Embed label="EMBED" iframe id={currentProject.id} />
              </div>
              <div className={style.social}>
                <Share id={currentProject.id} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Publish;
