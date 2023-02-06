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
import { showAlert } from '../../../../actions/mapActions';
import { Edit, Brush } from '../../../../icons';
import style from './TextAreaInput.scss';

const ALERT_EDIT_COL = 'alertEditCol';

class TextAreaInput extends Component {
  state = {
    editMode: false,
    value: this.props.currentValue,
  };

  componentDidUpdate(prevProps) {
    this.setValueState(prevProps);
  }

  setValueState = prevProps => {
    if (this.props.currentValue !== prevProps.currentValue) {
      this.setState({
        value: this.props.currentValue,
      });
    }
  };

  resizeTextarea = () => {
    this.refs.textarea.style.height = 'auto';
    this.refs.textarea.style.height = `${Math.round(
      this.refs.textarea.scrollHeight
    )}px`;
  };

  handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.setState({ editMode: false });
      if (this.edited) {
        this.props.save(e);
      }
      this.edited = false;
    }
  };

  onChange = e => {
    e.preventDefault();

    this.edited = true;

    this.setState({
      value: e.target.value,
    });
  };

  onEdit = e => {
    if (
      !this.props.editable ||
      this.props.updating ||
      this.props.checkOpenLayer
    )
      return;
    e.preventDefault();
    this.setState(
      {
        editMode: true,
      },
      () => {
        if (!JSON.parse(localStorage.getItem(ALERT_EDIT_COL))) {
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
        this.resizeTextarea();
      }
    );
  };

  onAlertEditChecked = checked => {
    localStorage.setItem(ALERT_EDIT_COL, checked);
  };

  onRuleCreateClick = e => {
    e.stopPropagation();
    this.props.onRuleCreate();
  };

  onBackdropClick = e => {
    e.stopPropagation();

    if (this.edited) {
      this.props.save(this.state.value);
    }

    this.setState({ editMode: false });
    this.edited = false;
  };

  render() {
    const {
      updating,
      placeholder,
      name,
      className,
      editable,
      canStyle,
      checkOpenLayer,
    } = this.props;
    const { editMode, value } = this.state;

    return (
      <div
        role="presentation"
        className={style.container}
        onClick={this.onEdit}
        onKeyPress={this.handleKeyPress}
      >
        <div
          className={`${style.textareaContainer}
        ${updating ? style.disabled : ''}`}
        >
          {editMode ? (
            <div className={style.edittextarea}>
              <span
                role="presentation"
                className={style.backdrop}
                onClick={this.onBackdropClick}
              />

              <textarea
                onChange={this.onChange}
                className={`${style.inputTextArea} ${
                  className ? style.inputTextError : ''
                }`}
                disabled={updating}
                name={name}
                value={value}
                autoFocus={editMode}
                type="text"
                ref="textarea"
              />
            </div>
          ) : (
            <div
              className={`
                ${style.description}
                ${style.inputTextArea}
                ${className ? style.inputTextError : ''}
                ${!editable ? style.noedit : ''}`}
            >
              <span className={style.text}>{value || placeholder}</span>
            </div>
          )}
          {editable && !checkOpenLayer && (
            <span
              role="presentation"
              className={style.editIcon}
              onClick={this.onEdit}
            >
              <Edit />
            </span>
          )}
          {canStyle && !editMode && (
            <span
              role="presentation"
              data-tip="Create new style rule"
              data-tip-x="right"
              className={style.ruleIcon}
              onClick={this.onRuleCreateClick}
            >
              <Brush />
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, {
  showAlert,
})(TextAreaInput);
