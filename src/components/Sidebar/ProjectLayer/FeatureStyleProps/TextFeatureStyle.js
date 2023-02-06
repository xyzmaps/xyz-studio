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
import Color from './Color';
import NumberInput from './NumberInput';
import Toggle from '../../../Common/Toggle';

import style from './TextFeatureStyle.scss';
import layoutStyle from '../FeatureStyleGeometries/Layout.scss';

class TextFeatureStyle extends Component {
  state = {
    active: this.props.currentValue && this.props.currentValue.opacity === 1,
  };

  componentDidUpdate(prevProps) {
    this.setActiveState(prevProps);
  }

  setActiveState = prevProps => {
    if (this.props.currentValue !== prevProps.currentValue) {
      this.setState({
        active: this.props.currentValue && this.props.currentValue.textRef,
      });
    }
  };

  toggleBlock = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));

    this.props.onTextStyleToggle(this.props.geometryType, this.props.ruleId);
  };

  getTextOptions = () => {
    return this.props.featureProps.map(f => {
      return {
        label: f === '__id' ? 'id' : f,
        value: `properties['${f === '__id' ? 'id' : f}'] || ''`,
      };
    });
  };

  render() {
    const { active } = this.state;
    const { geometryType, update, currentValue, fontSize, offset } = this.props;

    return (
      <div className={style.border}>
        <div className={style.title}>
          LABEL&nbsp;
          <Toggle active={active} onToggle={this.toggleBlock} small />
        </div>
        {active && (
          <div className={style.wrapper}>
            <div className={layoutStyle.row}>
              <SelectInput
                label="Select Text property"
                options={this.getTextOptions()}
                geometryType={geometryType}
                styleProp="textRef"
                styleType="Text"
                update={update}
                currentValue={currentValue && currentValue.textRef}
              />
            </div>
            <div className={layoutStyle.row}>
              <div className={layoutStyle.col}>
                <Color
                  label="Color"
                  hue
                  alpha
                  geometryType={geometryType}
                  currentValue={currentValue && currentValue.fill}
                  update={update}
                  styleProp="fill"
                  styleType="Text"
                />
              </div>
              <div className={layoutStyle.col}>
                {fontSize && (
                  <NumberInput
                    min={0}
                    label="Font size"
                    geometryType={geometryType}
                    currentValue={
                      (currentValue &&
                        currentValue.font.match(/\d+/g) &&
                        currentValue.font.match(/\d+/g).map(Number)[0]) ||
                      0
                    }
                    update={update}
                    styleProp="font"
                    styleType="Text"
                    right
                  />
                )}
              </div>
            </div>
            <div className={layoutStyle.row}>
              <div className={layoutStyle.col}>
                <Color
                  label="Outline Color"
                  hue
                  alpha
                  geometryType={geometryType}
                  currentValue={currentValue && (currentValue.stroke || 0)}
                  update={update}
                  styleProp="stroke"
                  styleType="Text"
                />
              </div>
              <div className={layoutStyle.col}>
                <NumberInput
                  min={0}
                  label="Thickness"
                  geometryType={geometryType}
                  currentValue={currentValue && (currentValue.strokeWidth || 0)}
                  update={update}
                  styleProp="strokeWidth"
                  styleType="Text"
                  right
                />
              </div>
            </div>
            {offset && (
              <div className={layoutStyle.row}>
                <div className={layoutStyle.col}>
                  <NumberInput
                    label="Offset X"
                    geometryType={geometryType}
                    currentValue={currentValue && (currentValue.offsetX || 0)}
                    update={update}
                    styleProp="offsetX"
                    styleType="Text"
                  />
                </div>
                <div className={layoutStyle.col}>
                  <NumberInput
                    label="Offset Y"
                    negative
                    geometryType={geometryType}
                    currentValue={currentValue && (currentValue.offsetY || 0)}
                    update={update}
                    styleProp="offsetY"
                    styleType="Text"
                    right
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default TextFeatureStyle;
