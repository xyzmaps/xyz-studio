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
import Toggle from '../../../Common/Toggle';

import style from './CircleShape.scss';

class CircleShape extends Component {
  state = {
    active: this.props.markerType !== 'none',
    markerType:
      this.props.markerType === 'none' ? 'Circle' : this.props.markerType,
  };

  toggleShape = () => {
    this.setState(
      prevState => ({
        active: !prevState.active,
      }),
      () => {
        this.props.update({
          geometry: 'Point',
          styleProp: 'shape',
          styleType: this.state.markerType,
          value: this.state.active ? this.state.markerType : 'none',
        });
      }
    );
  };

  onRadioBtnClick = type => {
    this.setState({ markerType: type }, () => {
      this.props.update({
        geometry: 'Point',
        styleProp: 'shape',
        styleType: this.state.markerType,
        value: this.state.markerType,
      });
    });
  };

  render() {
    return (
      <div>
        <div className={style.shapeToggle}>
          Shape{' '}
          <Toggle
            active={this.state.active}
            onToggle={this.toggleShape}
            small
          />
        </div>
        {this.state.active && (
          <div className={style.mainContainer}>
            <div className={style.radioBtnContainer}>
              <button
                type="button"
                onClick={() => this.onRadioBtnClick('Circle')}
                className={`${style.radioBtn} ${
                  this.state.markerType === 'Circle' ? style.selected : ''
                }`}
              />
              <span
                onClick={() => this.onRadioBtnClick('Circle')}
                role="presentation"
                className={style.viewerName}
              >
                Circle
              </span>
            </div>
            <div className={style.radioBtnContainer}>
              <button
                type="button"
                onClick={() => this.onRadioBtnClick('Rect')}
                className={`${style.radioBtn} ${
                  this.state.markerType === 'Rect' ? style.selected : ''
                }`}
              />
              <span
                onClick={() => this.onRadioBtnClick('Rect')}
                role="presentation"
                className={style.viewerName}
              >
                Square
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CircleShape;
