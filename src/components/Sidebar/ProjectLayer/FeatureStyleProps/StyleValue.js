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

import { connect } from 'react-redux';
import { Edit, Brush } from '../../../../icons';
import { showAlert } from '../../../../actions/mapActions';

import classNames from './StyleValue.scss';

class StyleValue extends Component {
  state = {
    editMode: false,
    edited: false,
    currentValue: this.props.value,
  };

  componentDidUpdate(prevProps) {
    this.setCurrValState(prevProps);
  }

  setCurrValState = prevProps => {
    if (
      this.props.value !== undefined &&
      this.props.value !== prevProps.value
    ) {
      this.setState({
        currentValue: this.props.value,
      });
    }
  };

  save = () => {
    const v = Number(this.state.currentValue)
      ? Number(this.state.currentValue)
      : this.state.currentValue;

    if (this.state.edited) {
      this.props.onEdit(v);
    }

    this.setState({
      edited: false,
      editMode: false,
    });
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.save();
    }
  };

  onEditClick = e => {
    if (!this.props.onEdit || this.props.disabled || this.checkOpenLayer())
      return;
    e.preventDefault();
    this.setState(
      {
        editMode: true,
      },
      () => {
        if (!JSON.parse(localStorage.getItem('alertEditCol'))) {
          this.props.showAlert({
            theme: 'default',
            title: 'Edit dataset',
            text:
              'Any change to a dataset will also appear in all projects that use the same dataset. Changes cannot be undone.',
            checkboxLabel: 'Do not show this message again',
            onCheck: this.onAlertEditChecked,
            cancelLabel: 'Close',
          });
        }
      }
    );
  };

  onRuleCreateClick = e => {
    e.stopPropagation();
    this.props.onRuleCreate();
  };

  onValueChange = e => {
    e.preventDefault();
    const v = e.target.value;

    this.setState(prevState => {
      if (prevState.currentValue !== v) {
        return {
          edited: true,
          currentValue: v,
        };
      }

      return prevState;
    });
  };

  onBackdropClick = e => {
    e.stopPropagation();
    this.save();
  };

  checkOpenLayer() {
    const { currentLayer } = this.props;

    return currentLayer.meta.tags;
  }

  onAlertEditChecked = checked => {
    localStorage.setItem('alertEditCol', checked);
  };

  onInputValueChange = e => {
    this.props.onInput(e.target.value);
  };

  onInputBlur = () => {
    this.props.onInput(Number(this.state.currentValue) || 0);
  };

  render() {
    const { style, onEdit, onRuleCreate, input, disabled, error } = this.props;
    const { editMode, currentValue } = this.state;

    return (
      <div
        role="presentation"
        className={`
          ${classNames.textValue}
          ${onEdit ? classNames.editable : ''}
          ${disabled ? classNames.disabled : ''}
          ${error ? classNames.error : ''}
          ${editMode ? classNames.onEdit : ''}`}
        onClick={this.onEditClick}
        style={style}
      >
        {!editMode ? (
          <div>
            {input ? (
              <input
                type="text"
                className={classNames.value}
                value={currentValue}
                onChange={this.onInputValueChange}
                onBlur={this.onInputBlur}
              />
            ) : (
              <span className={classNames.value}>{currentValue}</span>
            )}
          </div>
        ) : (
          <div className={classNames.edit}>
            <span
              role="presentation"
              className={classNames.backdrop}
              onClick={this.onBackdropClick}
            />
            <input
              type="text"
              onChange={this.onValueChange}
              value={currentValue}
              autoFocus={editMode}
              onKeyPress={this.onKeyPress}
            />
          </div>
        )}
        {onEdit && !this.checkOpenLayer() && (
          <span
            role="presentation"
            className={classNames.editIcon}
            onClick={this.onEditClick}
          >
            <Edit />
          </span>
        )}
        {onRuleCreate && !editMode && (
          <span
            role="presentation"
            data-tip="Create new style rule"
            data-tip-x="right"
            className={classNames.ruleIcon}
            onClick={this.onRuleCreateClick}
          >
            <Brush />
          </span>
        )}
      </div>
    );
  }
}

export default connect(null, {
  showAlert,
})(StyleValue);
