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
import _ from 'lodash';

import { Search as IcoSearch } from '../../icons';
import style from './Search.scss';

export default class Search extends React.Component {
  search = e => {
    e.persist();

    _.throttle(() => {
      this.props.onSearch(e.target.value);
    }, 250)();
  };

  render() {
    const {
      placeholder,
      searchWrapperStyle,
      searchInputStyle,
      theme,
      iconColor,
      iconClassName,
    } = this.props;

    let color = '#fff';

    if (theme === 'light') {
      color = '#ccc';
    }

    if (iconColor) {
      color = iconColor;
    }

    return (
      <div className={`${style.search} ${searchWrapperStyle}`}>
        <div>
          <IcoSearch fill={color} className={iconClassName} />

          <input
            type="text"
            onChange={this.search}
            placeholder={placeholder}
            className={searchInputStyle}
          />
        </div>
      </div>
    );
  }
}
