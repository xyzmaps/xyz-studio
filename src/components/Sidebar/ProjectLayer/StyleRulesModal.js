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
import { flatten, concat, find } from 'lodash';
import operators from '../../../constants/rulesCompareOperators';
import SelectInput from '../SelectInput/SelectInput';
import StyleLabel from './FeatureStyleProps/StyleLabel';
import { Trash } from '../../../icons';
import Button from '../../Common/Button';

import style from './StyleRulesModal.scss';
import TextAreaInput from './FeatureStyleProps/TextAreaInput';

class StyleRulesModal extends Component {
  constructor(props) {
    super(props);

    this.rowTemplateObj = {
      property: '',
      operator: '',
      value: '',
    };

    this.state = {
      rules: props.rules || [
        [{ ...this.rowTemplateObj, ...props.modalRulePreset }],
      ],
      errors: [],
      dirty: false,
      name: props.name || '',
    };
  }

  getProps = () => {
    const pp = this.props.featureProps.map(prop => {
      return { label: prop === '__id' ? 'id' : prop, value: prop };
    });
    pp.unshift(
      { label: 'Select a property', value: '' },
      { label: 'Feature ID', value: 'id' }
    );
    return pp;
  };

  getRow = (groupIndex, rule, index) => {
    const isRulesAvailable =
      index > 0 ||
      groupIndex > 0 ||
      this.state.rules[0].length > 1 ||
      this.state.rules.length > 1;

    return (
      <div key={index}>
        <div
          className={`${style.rulesRow} ${
            index === this.state.rules[groupIndex].length - 1
              ? style.rulesRowLast
              : ''
          }`}
        >
          {isRulesAvailable && (
            <span
              role="presentation"
              onClick={this.removeRow.bind(null, groupIndex, index)}
              data-tip="Remove "
              data-tip-x="right"
              className={style.rulesRowTrash}
            >
              <Trash />
            </span>
          )}
          <SelectInput
            label="Property"
            error={this.hasError(groupIndex, index, 'property')}
            required
            name="property"
            options={this.getProps()}
            onSelect={e => this.onRuleParamSet(groupIndex, index, e)}
            currentValue={rule.property}
          />
          <SelectInput
            label="Condition"
            error={this.hasError(groupIndex, index, 'operator')}
            required
            name="operator"
            options={concat(
              operators.map(({ label, code }) => {
                return { label, value: code };
              }),
              [{ label: 'Select the condition', value: '' }]
            )}
            onSelect={e => this.onRuleParamSet(groupIndex, index, e)}
            currentValue={rule.operator}
          />
          <div>
            <StyleLabel text="Value" required />
            <TextAreaInput
              save={e => this.onRuleParamSet(groupIndex, index, e)}
              className={this.hasError(groupIndex, index, 'value') ? true : ''}
              placeholder="Enter a value"
              name="value"
              editable
              updating={!this.isValueNeeded(rule)}
              currentValue={this.isValueNeeded(rule) ? rule.value : ''}
            />
          </div>
          <div className={`${style.rulesRowControls}`}>
            {
              <span
                role="presentation"
                data-tip="Add an additional condition that must also match"
                className={style.rulesRowControlsBtn}
                onClick={this.addRow.bind(null, groupIndex)}
              >
                AND
              </span>
            }
            {/* <span data-tip="Or statement"  className={style.rulesRowControlsBtn} onClick={this.addGroup}>OR</span> */}
          </div>
        </div>
      </div>
    );
  };

  getGroup = (rowGroup, groupIndex) => {
    return (
      <div className={style.rulesGroup} key={groupIndex}>
        {this.getRows(rowGroup, groupIndex)}
        {groupIndex !== this.state.rules.length - 1 && (
          <span className={style.orLabel}>OR</span>
        )}
      </div>
    );
  };

  getRows = (rowGroup, groupIndex) =>
    rowGroup.map(this.getRow.bind(null, groupIndex));

  getRules = () => this.state.rules.map(this.getGroup);

  addGroup = () => {
    this.setState(prevState => ({
      rules: [...prevState.rules, [{ ...this.rowTemplateObj }]],
    }));
  };

  addRow = groupIndex => {
    this.setState(prevState => {
      const newRules = prevState.rules.map(r => [...r]);
      newRules[groupIndex].push({ ...this.rowTemplateObj });

      return { rules: newRules };
    });
  };

  removeRow = (groupIndex, rowIndex) => {
    this.setState(prevState => {
      const newRules = [...prevState.rules];
      const newRuleGroup = prevState.rules[groupIndex].filter(
        (el, k) => k !== rowIndex
      );
      newRules[groupIndex] = newRuleGroup;

      return {
        rules: newRules.filter(g => g.length > 0),
      };
    });
  };

  onRuleParamSet = (groupIndex, index, e) => {
    const value = e.nativeEvent ? e.nativeEvent.target.value : e;
    const name = e.nativeEvent ? e.nativeEvent.target.name : 'value';

    this.setState(prevState => {
      const newRules = [...prevState.rules];
      newRules[groupIndex][index][name] = value;

      return { rules: newRules };
    }, this.validate);
  };

  isValueNeeded = rule => {
    return ['em', 'nem'].indexOf(rule.operator) === -1;
  };

  isValid = () => {
    const error = find(flatten(this.state.errors), e => {
      return !!e.property || !!e.operator || !!e.value;
    });
    return this.state.dirty && !error;
  };

  hasName = () => !!this.state.name;

  hasError = (groupIndex, ruleIndex, key) => {
    if (this.state.errors.length > 0) {
      const ruleErrorGroupObject = this.state.errors[groupIndex];
      if (ruleErrorGroupObject) {
        return ruleErrorGroupObject[ruleIndex]
          ? ruleErrorGroupObject[ruleIndex][key]
          : false;
      }
      return false;
    }
    return false;
  };

  validate = onValid => {
    this.setState({ dirty: true });
    const errors = [];
    this.state.rules.forEach(group => {
      const g = [];
      group.forEach(({ property, operator, value }, k) => {
        g.push({
          index: k,
          property: property === '',
          operator: operator === '',
          value:
            this.isValueNeeded({ operator }) && value.toString().trim() === '',
        });
      });
      errors.push(g);
    });

    this.setState({ errors: [...errors] }, () => {
      if (this.isValid() && onValid) {
        onValid(this.state.rules, this.state.name);
      }
    });
  };

  onConfirm = () => {
    this.validate(this.props.onConfirmClick);
  };

  onEdit = () => {
    this.validate(this.props.onEditClick);
  };

  render() {
    const { rules, onDeleteClick, onCloseClick } = this.props;
    const { dirty, name } = this.state;

    return (
      <div className={style.modal}>
        <span className={style.modalBackdrop} />
        <div>
          <div className={style.modalContent}>
            <div className={style.title}>
              {rules ? <h2>Edit style rule</h2> : <h2>Add new style group</h2>}

              <p>
                This style group will include any map features that match all
                conditions specified below.
              </p>
              <p>
                <i>
                  <span>*</span> Required field
                </i>
              </p>
            </div>
            <div className={style.ruleName}>
              {/*! this.hasName() && <span data-tip="Missing rule name" data-tip-x="right" className={style.rulesRowError}><ExclamationPoint/></span> */}
              <StyleLabel text="Style group name" required />
              <input
                onChange={e =>
                  this.setState({ name: e.target.value, dirty: true })
                }
                name="name"
                className={`${style.inputText} ${
                  !this.hasName() && dirty ? style.inputError : ''
                }`}
                value={name}
                type="text"
                placeholder="e.g. Built before 2009"
              />
            </div>
            <div className={style.rulesRows}>{this.getRules()}</div>
            <div
              className={`${style.rulesControls} ${
                rules ? style.editMode : ''
              }`}
            >
              {rules && (
                <Button type="danger" text="Delete" onClick={onDeleteClick} />
              )}
              <div>
                <Button text="Cancel" type="primary" onClick={onCloseClick} />
                {rules ? (
                  <Button text="Update" onClick={this.onEdit} />
                ) : (
                  <Button text="Confirm" onClick={this.onConfirm} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StyleRulesModal;
