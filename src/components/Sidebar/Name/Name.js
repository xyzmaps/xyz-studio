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

import { Edit } from '../../../icons';
import style from './Name.scss';

export default class Name extends Component {
  state = {
    editMode: false,
    currentName: this.props.name,
  };

  componentDidMount = () => {
    const { name } = this.props;
    if (!name) {
      this.setState({ editMode: true });
      this.nameInput.focus();
    }
  };

  shouldComponentUpdate(newProps) {
    const { name } = this.props;
    if (newProps.name !== name) {
      this.setState({
        currentName: newProps.name,
      });
    }
    return true;
  }

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.sendNameToParent();
    }
    return true;
  };

  onEdit = e => {
    e.preventDefault();
    this.setState({ editMode: true });
  };

  onFocusOut = () => {
    this.sendNameToParent();
  };

  onNameChange = e => {
    e.preventDefault();
    const newName = e.target.value;
    this.setState({
      currentName: newName,
    });
  };

  sendNameToParent() {
    const { rename, placeholder } = this.props;
    const { currentName } = this.state;
    const newName = currentName || placeholder;
    this.setState({ editMode: false, currentName: newName });
    rename(newName);
  }

  render() {
    const { editMode, currentName } = this.state;
    const { name, subTitle, placeholder, readyOnly, siteTourId } = this.props;

    return (
      <div>
        {subTitle && <div className={style.projectTitle}>{subTitle}</div>}

        {readyOnly ? (
          <div className={style.MSTitle}>{name}</div>
        ) : (
          <div
            role="presentation"
            className={style.wrapper}
            onClick={this.onEdit}
            data-tut={siteTourId || null}
          >
            {!editMode && currentName ? (
              <div className={style.Name}>
                <span>{currentName}</span>
              </div>
            ) : (
              <div className={style.edit}>
                <span
                  role="presentation"
                  className={style.backdrop}
                  onClick={this.onFocusOut}
                />
                <input
                  ref={input => {
                    this.nameInput = input;
                  }}
                  type="text"
                  placeholder={placeholder}
                  onChange={this.onNameChange}
                  onBlur={this.onFocusOut}
                  value={currentName}
                  autoFocus={editMode}
                  onKeyPress={this.onKeyPress}
                />
              </div>
            )}
            <span
              role="presentation"
              onClick={this.onEdit}
              className={style.editIcon}
            >
              <Edit />
            </span>
          </div>
        )}
      </div>
    );
  }
}
