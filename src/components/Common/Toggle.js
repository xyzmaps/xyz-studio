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

import style from './Toggle.scss';

export default class Toggle extends Component {
  state = {
    active: this.props.active,
  };

  componentDidUpdate(prevProps) {
    const { active, toggleRevert } = this.props;

    if (active !== prevProps.active) {
      this.updateActive(active);
    }

    if (toggleRevert && toggleRevert !== prevProps.toggleRevert) {
      this.updateActive(false);
    }
  }

  updateActive = active => {
    this.setState({
      active,
    });
  };

  onToggle = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));

    this.props.onToggle(this.props.featureType, !this.state.active);
  };

  render() {
    const { active } = this.state;
    const {
      className,
      disabled,
      label,
      small,
      toolTipText,
      toolTipX,
      noTooltip,
    } = this.props;
    let toolTip;

    if (toolTipText) toolTip = toolTipText;

    const classNames = [style.toggle];
    if (active) {
      classNames.push(style.active);
      toolTip = undefined;
    }

    if (className) {
      classNames.push(...className);
    }

    if (disabled) {
      classNames.push(style.disabled);
      if (noTooltip) toolTip = undefined;
    }

    return (
      <div
        role="presentation"
        className={classNames.join(' ')}
        onClick={() => {
          if (!disabled) {
            this.onToggle();
          }
        }}
        data-tip={toolTip}
        data-tip-x={toolTipX || 'right'}
        data-width="large"
        style={this.props.style}
      >
        <span className={style.label}>{label}</span>
        <span
          className={small ? `${style.switch} ${style.small}` : style.switch}
        />
      </div>
    );
  }
}
