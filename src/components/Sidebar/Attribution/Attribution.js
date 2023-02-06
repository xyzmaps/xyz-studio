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

import { Edit, Trash } from '../../../icons';
import style from './Attribution.scss';

export default class Description extends Component {
  state = {
    editMode: false,
    description: this.props.description,
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.setState({ editMode: false }, () =>
        this.props.edit(this.state.description, this.props.otherCopyright)
      );
    }
  };

  onEdit = e => {
    e.preventDefault();

    this.setState({ editMode: true });
  };

  onEditChange = e => {
    e.preventDefault();

    this.setState({ description: e.target.value });
  };

  onEditClear = e => {
    e.stopPropagation();

    this.setState({ description: '' }, () =>
      this.props.edit('', this.props.otherCopyright)
    );
  };

  onBackdropClick = e => {
    e.stopPropagation();

    this.setState({ editMode: false }, () =>
      this.props.edit(this.state.description, this.props.otherCopyright)
    );
  };

  getClasses = () => {
    let classes = '';
    if (this.props.disabled) {
      classes = this.state.description
        ? `${style.wrapper} ${style.disabled}`
        : `${style.wrapper} ${style.empty}  ${style.disabled}`;
    } else {
      classes = this.state.description
        ? `${style.wrapper}`
        : `${style.wrapper} ${style.empty}`;
    }
    return classes;
  };

  render() {
    const { disabled, placeholder } = this.props;
    const { description, editMode } = this.state;
    return (
      <div
        role="presentation"
        className={this.getClasses()}
        onClick={!disabled ? this.onEdit : ''}
        data-tut="project-details"
      >
        <div className={style.container}>
          {description && !disabled && (
            <div className={style.icons}>
              <span
                role="presentation"
                className={style.editIcon}
                onClick={this.onEdit}
              >
                <Edit />
              </span>
              <span
                role="presentation"
                className={style.trashIcon}
                onClick={this.onEditClear}
              >
                <Trash />
              </span>
            </div>
          )}

          {!description && !disabled && (
            <div className={style.icons}>
              <span
                role="presentation"
                className={style.editIcon}
                onClick={this.onEdit}
              >
                <Edit />
              </span>
            </div>
          )}

          {!editMode ? (
            <div className={style.description}>
              <span className={style.text}>{description || placeholder}</span>
            </div>
          ) : (
            <div className={style.edit}>
              <span
                role="presentation"
                className={style.backdrop}
                onClick={this.onBackdropClick}
              />

              <input
                className={style.inputfield}
                type="text"
                value={description}
                placeholder={placeholder}
                autoFocus={editMode}
                onKeyPress={this.onKeyPress}
                onChange={this.onEditChange}
                disabled={disabled}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
