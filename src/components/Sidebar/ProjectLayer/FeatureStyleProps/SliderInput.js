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
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { debounce } from 'lodash';

import StyleLabel from './StyleLabel';
import StyleValue from './StyleValue';

import './SliderInput.scss';

class SliderInput extends Component {
  state = {
    value: parseFloat(this.props.currentValue),
  };

  componentDidUpdate(prevProps) {
    this.setValueState(prevProps);
  }

  setValueState = prevProps => {
    if (this.props.currentValue !== prevProps.currentValue) {
      this.setState({
        value: parseFloat(this.props.currentValue),
      });
    }
  };

  handleChange = value => {
    this.setState({
      value,
    });
  };

  onChangeCompleted = () => {
    debounce(() => {
      this.props.update({
        geometry: this.props.geometryType,
        styleProp: this.props.styleProp,
        value: this.state.value,
      });
    }, 800)();
  };

  render() {
    const { label } = this.props;
    const { value } = this.state;

    return (
      <div>
        <StyleLabel text={label} />
        <div className="slider-wrapper">
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            value={value}
            onChangeComplete={val => this.onChangeCompleted(val)}
            onChange={val => this.handleChange(val)}
          />
          <StyleValue
            value={`${Math.round(value * 100)}%`}
            style={{ minWidth: 0, width: '30%', marginLeft: '10px' }}
          />
        </div>
      </div>
    );
  }
}

export default SliderInput;
