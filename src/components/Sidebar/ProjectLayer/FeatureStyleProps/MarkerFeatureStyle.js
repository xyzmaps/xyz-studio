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

import SelectInput from '../../SelectInput/SelectInput';
import NumberInput from './NumberInput';
// import FileInputReader from './FileInputReader';
import Toggle from '../../../Common/Toggle';
import styleGroupConfig from '../../../../constants/styleGroupsConfig';

import style from './MarkerFeatureStyle.scss';

class MarkerFeatureStyle extends Component {
  state = {
    active: this.props.currentValue && this.props.currentValue.src,
  };

  toggleBlock = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
    this.props.onMarkerStyleToggle(this.props.geometryType);
  };

  render() {
    const { active } = this.state;
    const { currentValue, geometryType, update } = this.props;

    return (
      <div>
        <div className={style.title}>
          Marker Icons&nbsp;
          <Toggle active={active} onToggle={this.toggleBlock} />
        </div>
        {active && (
          <div className={style.wrapper}>
            <div className={style.block}>
              <SelectInput
                label="Select Marker Icon"
                options={styleGroupConfig.markerIcons}
                geometryType={geometryType}
                update={update}
                currentValue={currentValue && currentValue.src}
                marker
                styleType="src"
              />
            </div>
            <div className={style.block}>
              <NumberInput
                label="Marker Icon Size"
                geometryType={geometryType}
                currentValue={currentValue && currentValue.width}
                marker
                update={update}
                styleType="size"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MarkerFeatureStyle;
