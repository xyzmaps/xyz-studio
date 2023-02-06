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

import style from './Select.scss';
import SelectInput from '../../components/Sidebar/SelectInput/SelectInput';

class Select extends Component {
  state = {
    showTitle: false,
  };

  toggleSelection = () => {
    this.setState(prevState => ({ showTitle: !prevState.showTitle }));
    if (this.props.dashboard) {
      this.props.onNameToggle(
        this.props.currentProject.id,
        'name',
        !this.state.showTitle
      );
    } else {
      this.props.onNameToggle(!this.state.showTitle);
    }
  };

  render() {
    const { showTitle } = this.state;
    const {
      label,
      currentValue,
      options,
      onSelect,
      placeholder,
      bookmark,
      id,
      publishAppId,
      disabled,
      plan,
    } = this.props;

    return (
      <div
        className={
          showTitle ? `${style.wrapper} ${style.selected}` : style.wrapper
        }
      >
        <strong className={style.title}>{label}</strong>
        <div className={style.select}>
          <SelectInput
            currentValue={currentValue}
            options={options}
            onSelect={onSelect}
            placeholder={placeholder}
            bookmark={bookmark}
            id={id}
            publishAppId={publishAppId}
            disabled={disabled}
            plan={plan}
          />
        </div>
      </div>
    );
  }
}

export default Select;
