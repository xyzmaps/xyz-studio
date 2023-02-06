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

import React from 'react';

import style from './Sort.scss';

import { Arrow } from '../../../icons';

export default class Sort extends React.Component {
  state = {
    toggle: false,
    types: [
      {
        label: 'Date',
        key: 'last_update',
      },
      {
        label: 'Title',
        key: 'meta.name',
      },
    ],
  };

  onToggle = e => {
    e.stopPropagation();

    if (!this.state.toggle) {
      document.addEventListener('click', this.onBlur, false);
    } else {
      document.removeEventListener('click', this.onBlur, false);
    }

    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  onBlur = e => {
    if (this.refs.wrapper && this.refs.wrapper.contains(e.target)) {
      return;
    }

    this.onToggle(e);
  };

  sort = (e, selected) => {
    this.props.onSort(selected);
  };

  render() {
    const { toggle, types } = this.state;
    const { sort } = this.props;

    return (
      <div className={`${style.sort} ${style[toggle && 'show']}`} ref="wrapper">
        <button type="button" className={style.trigger} onClick={this.onToggle}>
          <span>{sort.label}</span>
          <Arrow />
        </button>

        <ul data-testid="sort-select" className={style.container}>
          {types.map(o => {
            if (sort.key !== o.key) {
              return (
                <li key={o.key}>
                  <button
                    type="button"
                    data-testid={`sort-item-${o.label}`}
                    onClick={e => this.sort(e, o)}
                  >
                    {o.label}
                  </button>
                </li>
              );
            }

            return null;
          })}
        </ul>
      </div>
    );
  }
}
