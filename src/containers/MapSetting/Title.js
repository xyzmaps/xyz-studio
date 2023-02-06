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

import style from './Title.scss';

class Title extends Component {
  state = {
    showElement: this.props.showElement,
    currentValue: this.props.value,
  };

  toggleSelection = () => {
    this.setState(prevState => ({ showElement: !prevState.showElement }));
    if (this.props.dashboard) {
      this.props.onNameToggle(
        this.props.currentProject.id,
        'name',
        !this.state.showElement
      );
    } else {
      this.props.onNameToggle(!this.state.showElement);
    }
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.sendNameToParent();
    }
    return true;
  };

  onFocusOut = () => {
    this.sendNameToParent();
  };

  onNameChange = e => {
    e.preventDefault();
    const newName = e.target.value;
    this.setState({
      currentValue: newName,
    });
  };

  sendNameToParent() {
    const { rename } = this.props;
    const { currentValue } = this.state;
    const newName = currentValue;
    this.setState({ currentValue: newName });
    rename(newName);
  }

  render() {
    const { showElement, currentValue } = this.state;
    const { label, element } = this.props;

    return (
      <div
        className={
          showElement ? `${style.wrapper} ${style.selected}` : style.wrapper
        }
      >
        <strong className={style.title}>{label}</strong>
        <span className={style.field}>
          <input
            type="text"
            className={style.textarea}
            value={currentValue}
            readOnly={element === 'legend'}
            onChange={this.onNameChange}
            onBlur={this.onFocusOut}
            onKeyPress={this.onKeyPress}
          />
        </span>
        <div
          role="presentation"
          className={style.checkbox}
          onClick={this.toggleSelection}
        />
      </div>
    );
  }
}

export default Title;
