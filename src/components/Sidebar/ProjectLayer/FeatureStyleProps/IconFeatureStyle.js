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
import Color from './Color';
import Toggle from '../../../Common/Toggle';
import styleGroupConfig from '../../../../constants/styleGroupsConfig';

import style from './IconFeatureStyle.scss';
import layoutStyle from '../FeatureStyleGeometries/Layout.scss';

class IconFeatureStyle extends Component {
  state = {
    active: this.props.currentValue && this.props.currentValue.opacity === 1,
  };

  toggleBlock = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
    this.props.onIconStyleToggle(this.props.geometryType, this.props.ruleId);
  };

  render() {
    const { active } = this.state;
    const { currentValue, geometryType, update } = this.props;

    return (
      <div className={style.border}>
        <div className={style.title}>
          ICON <Toggle active={active} onToggle={this.toggleBlock} small />
        </div>
        {active && (
          <div className={style.wrapper}>
            <div className={layoutStyle.row}>
              <SelectInput
                currentValue={currentValue.baseSrc}
                label="Image"
                options={styleGroupConfig.markerIcons}
                geometryType={geometryType}
                styleProp="baseSrc"
                styleType="Image"
                update={update}
              />
            </div>
            <div className={layoutStyle.row}>
              <div className={layoutStyle.col}>
                <Color
                  currentValue={currentValue.iconColor}
                  label="Color"
                  type="hex"
                  styleProp="iconColor"
                  styleType="Image"
                  geometryType={geometryType}
                  update={update}
                />
              </div>
              <div className={layoutStyle.col}>
                <NumberInput
                  min={0}
                  currentValue={currentValue.height}
                  label="Size"
                  geometryType={geometryType}
                  marker
                  update={update}
                  styleType="Image"
                  styleProp="height"
                  right
                />
              </div>
            </div>
            <div className={layoutStyle.row}>
              <div className={layoutStyle.col}>
                <NumberInput
                  currentValue={currentValue.offsetX}
                  label="Offset X"
                  geometryType={geometryType}
                  update={update}
                  styleProp="offsetX"
                  styleType="Image"
                />
              </div>
              <div className={layoutStyle.col}>
                <NumberInput
                  currentValue={currentValue.offsetY}
                  negative
                  label="Offset Y"
                  geometryType={geometryType}
                  update={update}
                  styleProp="offsetY"
                  styleType="Image"
                  right
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default IconFeatureStyle;
