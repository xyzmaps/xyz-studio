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

import { Scrollbars } from 'react-custom-scrollbars';
import { Edit, Trash } from '../../../icons';
import ScrollbarStyle from '../../../config/ScrollbarStyle';
import style from './Description.scss';

export default class Description extends Component {
  state = {
    editMode: false,
    description: this.props.description,
  };

  resizeTextarea = () => {
    this.refs.textarea.style.height = 'auto';
    this.refs.textarea.style.height = `${Math.round(
      this.refs.textarea.scrollHeight
    )}px`;
  };

  onKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.setState({ editMode: false }, () =>
        this.props.edit(this.state.description)
      );
    }
  };

  onEdit = e => {
    e.preventDefault();

    this.setState({ editMode: true }, this.resizeTextarea);
  };

  onEditChange = e => {
    e.preventDefault();

    this.setState({ description: e.target.value }, this.resizeTextarea);
  };

  onEditClear = e => {
    e.stopPropagation();

    this.setState({ description: '' }, () => this.props.edit(''));
  };

  onBackdropClick = e => {
    e.stopPropagation();

    this.setState({ editMode: false }, () =>
      this.props.edit(this.state.description)
    );
  };

  render() {
    const { label, placeholder, removeHeader } = this.props;
    const { description, editMode } = this.state;

    return (
      <div
        role="presentation"
        className={
          description ? `${style.wrapper}` : `${style.wrapper} ${style.empty}`
        }
        onClick={this.onEdit}
        data-tut="project-details"
      >
        {!removeHeader && (
          <div className={style.heading}>
            <h3 className={style.title}>{label}</h3>

            {description ? (
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
            ) : (
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
          </div>
        )}

        <div className={style.container}>
          {!editMode ? (
            <div className={style.description}>
              <Scrollbars
                autoHeight
                autoHeightMax={removeHeader && 45}
                renderTrackVertical={props => (
                  <div
                    {...props}
                    className={style.srollbarFix}
                    style={ScrollbarStyle.trackVerticalStyle}
                  />
                )}
                renderThumbVertical={props => (
                  <div {...props} style={ScrollbarStyle.thumbStyle} />
                )}
              >
                <span className={style.text}>{description || placeholder}</span>
              </Scrollbars>
            </div>
          ) : (
            <div className={style.edit}>
              <span
                role="presentation"
                className={style.backdrop}
                onClick={this.onBackdropClick}
              />

              <textarea
                type="text"
                value={description}
                placeholder={placeholder}
                autoFocus={editMode}
                onKeyPress={this.onKeyPress}
                onChange={this.onEditChange}
                ref="textarea"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
