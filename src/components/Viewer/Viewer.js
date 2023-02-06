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

/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
// import _ from 'lodash';

import style from './Viewer.scss';
import RadioButton from '../Common/RadioButton';

const HERE = 'here';
const TANGRAM = 'tangram';
export default class Viewer extends Component {
  state = {
    isHereMapInfoVisible: false,
    isTangramMapInfoVisible: false,
    currentViewer:
      this.props.currentProject.publish_settings &&
      this.props.currentProject.publish_settings.viewer
        ? this.props.currentProject.publish_settings.viewer
        : HERE,
  };

  onRadioBtnClick = type => {
    this.setState({ currentViewer: type });
    if (this.props.dashboard) {
      this.props.selectViewer(type, this.props.currentProject.id);
    } else {
      this.props.selectViewer(type);
    }
  };

  showMapInfo = map => {
    if (map === HERE) {
      this.setState({ isHereMapInfoVisible: true });
    } else {
      this.setState({ isTangramMapInfoVisible: true });
    }
  };

  hideMapInfo = map => {
    if (map === HERE) {
      this.setState({ isHereMapInfoVisible: false });
    } else {
      this.setState({ isTangramMapInfoVisible: false });
    }
  };

  render() {
    const {
      currentViewer,
      isTangramMapInfoVisible,
      isHereMapInfoVisible,
    } = this.state;
    return (
      <div className={style.wrapper}>
        <div className={style.titleContainer}>
          <span className={style.title}>SELECT MAP RENDERER</span>
        </div>
        <div className={style.mainContainer}>
          <div className={style.radioBtnContainer}>
            <RadioButton
              label={HERE}
              selected={currentViewer === HERE}
              onClick={this.onRadioBtnClick}
            />

            <span
              onMouseEnter={() => this.showMapInfo(HERE)}
              onMouseLeave={() => this.hideMapInfo(HERE)}
              className={style.info}
            >
              i
            </span>
            {isHereMapInfoVisible && (
              <div className={`${style.mapInfo} ${style.hereMap}`}>
                <div className={style.mapImage} />
                <p>
                  This is default map renderer used in Studio, ideal for
                  minimalist basemaps.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={style.mainContainer}>
          <div className={style.radioBtnContainer}>
            <RadioButton
              label={TANGRAM}
              selected={currentViewer === TANGRAM}
              onClick={this.onRadioBtnClick}
            />
            <span
              onMouseEnter={() => this.showMapInfo(TANGRAM)}
              onMouseLeave={() => this.hideMapInfo(TANGRAM)}
              className={style.info}
            >
              i
            </span>
            {isTangramMapInfoVisible && (
              <div className={`${style.mapInfo} ${style.tangramMap}`}>
                <div className={style.mapImage} />
                <p>
                  This is a new option that provides details like admin & street
                  labels, as well as textures to the basemap.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
