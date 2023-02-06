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
import { debounce } from 'lodash';

import StyleLabel from './StyleLabel';
import StyleValue from './StyleValue';
import { Arrow } from '../../../../icons';

import style from './NumberInput.scss';

class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.sign = props.negative ? -1 : 1;
    this.state = {
      value: props.currentValue * this.sign,
    };
  }

  componentDidUpdate(prevProps) {
    this.setValueState(prevProps);
  }

  setValueState = prevProps => {
    if (this.props.currentValue !== prevProps.currentValue) {
      this.setState({
        value: this.props.currentValue * this.sign,
      });
    }
  };

  bounds = {
    max: this.props.max || 50,
    min: this.props.min === undefined ? -50 : this.props.min,
  };

  handleChange = debounce(() => {
    this.props.update({
      geometry: this.props.geometryType,
      styleProp: this.props.styleProp,
      styleType: this.props.styleType,
      value: this.state.value * this.sign,
    });
  }, 500);

  onControlClick = dir => {
    if (dir === 'up') {
      if (this.state.value < this.bounds.max) {
        this.setState(prevState => ({ value: prevState.value + 1 }));
      }
    } else if (this.state.value > this.bounds.min) {
      this.setState(prevState => ({ value: prevState.value - 1 }));
    }
    this.handleChange();
  };

  onInput = val => {
    if (this.bounds.min < 0 && (val === '' || (isNaN(val) && val === '-'))) {
      this.setState({ value: val });
    } else {
      this.setState({
        value: Math.max(this.bounds.min, Math.min(this.bounds.max, val)) || 0,
      });
    }
    this.handleChange();
  };

  render() {
    const { label, hideUnit, right } = this.props;
    const { value } = this.state;

    return (
      <div className={style.container}>
        <StyleLabel text={!hideUnit ? `${label}(px)` : { label }} />
        <div
          className={`${style.numberInputWrapper} ${right ? style.right : ''}`}
        >
          <div className={style.numberInput}>
            <span
              role="presentation"
              className={style.numberControl}
              onClick={() => this.onControlClick('up')}
            >
              <Arrow />
            </span>
            <span
              role="presentation"
              className={style.numberControl}
              onClick={() => this.onControlClick('down')}
            >
              <Arrow />
            </span>
            <StyleValue
              input
              onInput={this.onInput}
              value={value}
              style={{ width: '70px', minWidth: 0 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NumberInput;
