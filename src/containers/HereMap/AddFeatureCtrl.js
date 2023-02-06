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
import style from './AddFeatureCtrl.scss';

export default class AddFeatureCtrl extends Component {
  labels = {
    Point: 'Click to add point',
    Polygon: 'Double click on last point to end',
    Line: 'Click on last point to end',
  };

  getTipPosition = () => {
    return {
      transform: `translate(${this.props.x}px,${this.props.y}px)`,
    };
  };

  render() {
    const { toggle, tipKey } = this.props;

    return (
      <div
        className={`${style.addFeatureCtrl} ${toggle ? style.show : ''}`}
        style={this.getTipPosition()}
      >
        <span className={style.tip} data-label={this.labels[tipKey]} />
      </div>
    );
  }
}
