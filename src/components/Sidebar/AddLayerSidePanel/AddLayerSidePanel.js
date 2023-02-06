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

import style from './AddLayerSidePanel.scss';
import { Arrow } from '../../../icons';
import logEvent from '../../../utils/amplitudeLogger';

class AddLayerSidePanel extends Component {
  state = {
    currentTab: this.props.showOpenDataset ? 'xyzHereSpace' : 'mySpace',
  };

  shouldComponentUpdate(newProps) {
    const { showOpenDataset } = this.props;
    if (newProps.showOpenDataset !== showOpenDataset) {
      this.setState({
        currentTab: newProps.showOpenDataset ? 'xyzHereSpace' : 'mySpace',
      });
    }
    return true;
  }

  onButtonClick(tab) {
    const { onSelectTab } = this.props;
    onSelectTab(tab);
    this.setState({
      currentTab: tab,
    });
  }

  render() {
    const { currentTab } = this.state;
    const { currnetPlanTitle } = this.props;
    return (
      <div className={style.wrapper}>
        <div className={style.title}>Add Data</div>
        <p className={style.description}>
          Find existing content or upload new files (GeoJSON, JSON, or CSV).
          Your current plan allows for 1000{' '}
          <a
            href="https://www.here.xyz/api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Spaces</span>
          </a>{' '}
          with up to 1M features each. To upload larger files, or{' '}
          <a
            href="https://www.here.xyz/cli/shapefiles"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Shapefiles</span>
          </a>
          , please use the{' '}
          <a
            href="https://www.here.xyz/cli/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Data Hub CLI</span>
          </a>
        </p>
        <div className={style.planDetails}>
          {/* Data usage billed on:<br/><span className={style.planTitle}> Freemium Auto 2019-03-26</span>  */}
          Data usage plan:{' '}
          <span className={style.planTitle}>{currnetPlanTitle}</span>
        </div>
        <div className={style.menuButtonWrapper}>
          <div
            role="presentation"
            className={`${style.menuButton} ${currentTab === 'mySpace' &&
              style.active}`}
            onClick={() => this.onButtonClick('mySpace')}
          >
            My Spaces
            {currentTab === 'mySpace' && <Arrow fill="#2dd5c9" />}
          </div>
          <div
            role="presentation"
            className={`${style.menuButton} ${currentTab === 'xyzHereSpace' &&
              style.active}`}
            onClick={() => {
              logEvent('click_here_shared_dataset');
              this.onButtonClick('xyzHereSpace');
            }}
          >
            HERE Shared Datasets
            {currentTab === 'xyzHereSpace' && <Arrow fill="#2dd5c9" />}
          </div>
        </div>
      </div>
    );
  }
}

export default AddLayerSidePanel;
