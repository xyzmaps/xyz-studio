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

import style from './Layout.scss';

import { Grid, List } from '../../../icons';

export default class Layout extends React.Component {
  switchLayout = layout => {
    if (this.props.layout !== layout) {
      window.localStorage.setItem('layout', layout); // storing preference to local storage.
      this.props.switchLayout();
    }
  };

  render() {
    const { layout } = this.props;

    return (
      <ul className={style.layout}>
        <li>
          <button
            type="button"
            className={layout === 'card' ? style.active : null}
            onClick={() => this.switchLayout('card')}
          >
            <Grid fill="#FFF" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className={layout === 'list' ? style.active : null}
            onClick={() => this.switchLayout('list')}
          >
            <List fill="#FFF" />
          </button>
        </li>
      </ul>
    );
  }
}
