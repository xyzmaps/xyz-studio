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

import { Arrow } from '../../icons';
import style from './PropertyFilterInfo.scss';

export default class PropertyFilterInfo extends Component {
  state = {
    showList: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      showList: !prevState.showList,
    }));
  };

  mapOperator = operator => {
    switch (operator) {
      case 'eq':
        return '=';
      case 'neq':
        return '!=';
      case 'gt':
        return '>';
      case 'lt':
        return '<';
      case 'gte':
        return '>=';
      case 'lte':
        return '<=';
      default:
        return '=';
    }
  };

  render() {
    const { filterRules, filteredFeatures } = this.props;
    const { showList } = this.state;

    return (
      <div className={style.filterInfoWrapper}>
        <div
          role="presentation"
          className={`${style.header} ${showList ? style.upArrow : ''}`}
          onClick={this.toggle}
        >
          <Arrow /> Filtered feature(s):{' '}
          {filteredFeatures.length.toLocaleString()}
        </div>
        {showList && (
          <div className={style.filterlist}>
            {filterRules[0].map((filter, index) => {
              return (
                <div key={index} className={style.filter}>
                  <div>Property:</div>
                  <div>{filter.property}</div>
                  <div>Condition:</div>
                  <div>{this.mapOperator(filter.operator)}</div>
                  <div>Value:</div>
                  <div>{filter.value}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
