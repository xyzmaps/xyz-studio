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
import style from './ContextMenu.scss';

export default class ContextMenu extends Component {
  getDisabledClass = action =>
    this.props.action === action ? style.disabled : '';

  render() {
    const {
      context,
      onTransformClick,
      onReshapeClick,
      onDeleteClick,
    } = this.props;

    return (
      <div
        className={style.context}
        style={{
          left: `${context.position.x}px`,
          top: `${context.position.y}px`,
        }}
      >
        <ul>
          {context.type !== 'Point' && (
            <li
              role="presentation"
              className={this.getDisabledClass('transform')}
              onClick={onTransformClick}
            >
              Transform
            </li>
          )}
          <li
            role="presentation"
            className={this.getDisabledClass('reshape')}
            onClick={onReshapeClick}
          >
            Reshape
          </li>
          <li role="presentation" onClick={onDeleteClick}>
            Delete
          </li>
        </ul>
      </div>
    );
  }
}
