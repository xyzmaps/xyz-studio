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
import { find, escapeRegExp, throttle } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import { Arrow } from '../../../../icons';
import StyleLabel from './StyleLabel';
import StyleValue from './StyleValue';
import ScrollbarStyle from '../../../../config/ScrollbarStyle';

import style from './TypeAhead.scss';

class TypeAhead extends Component {
  state = {
    value: this.props.currentValue,
    options: [],
    selectionIndex: null,
  };

  componentDidUpdate(prevProps) {
    const { dirty } = this.props;
    this.setValueState(prevProps);
    if (dirty !== prevProps.dirty) {
      this.refs.input.value = '';
    }
  }

  searchBoxClasses = `${style.searchBox}`;

  setValueState = prevProps => {
    if (this.props.currentValue !== prevProps.currentValue) {
      this.setState({
        value: this.props.currentValue,
      });
    }
  };

  onSelect = e => {
    if (e.persist) e.persist();

    this.setState({
      value: e.target.innerText,
    });
    this.props.onSelect(e);
    this.clearList();
    this.refs.input.value = e.target.innerText;
  };

  setOptions = () => {
    const options = this.props.options || [];
    this.setState({
      options: [...options],
    });
  };

  getOptions = () => {
    return this.state.options.map((item, i) => (
      <option key={i} value={item.value} disabled={item.value === ''}>
        {item.label}
      </option>
    ));
  };

  getStyleValue = () => {
    return {
      background: 'rgb(54,58,66)',
      fontStyle: `${!this.state.value ? 'italic' : 'normal'}`,
      color: `${!this.state.value ? 'var(--color-white-30)' : 'inherit'}`,
      height: '40px',
    };
  };

  onSearch = e => {
    e.persist();

    throttle(() => {
      const query = encodeURIComponent(e.target.value);

      if (query.length > 1) {
        this.searchProperty(query);
      } else {
        this.setState({
          options: this.props.options,
        });
      }
    }, 250)();
  };

  showList = () => {
    if (this.state.value.length > 1) {
      if (this.refs.input.value !== this.state.value) {
        this.refs.input.value = this.state.value;
      }
      this.searchProperty(this.refs.input.value);
    } else {
      this.setOptions();
    }
    this.searchBoxClasses = `${style.searchBox} ${style.showList}`;
  };

  clearList = () => {
    this.setState({
      options: [],
    });
    this.searchBoxClasses = `${style.searchBox}`;
  };

  searchProperty = value => {
    if (this.props.options && this.props.options.length) {
      const reg = new RegExp(escapeRegExp(value), 'gi');
      const filteredOptions = this.props.options.filter(option =>
        option.label.match(reg)
      );
      this.setState({
        options: filteredOptions,
      });
    }
  };

  onKeyEvent = e => {
    const { selectionIndex, options } = this.state;
    const { scrollbar } = this.refs;
    if (e.key === 'ArrowDown') {
      this.highlightSelection(1);

      if (selectionIndex > 5) {
        scrollbar.scrollTop(scrollbar.getScrollTop() + 40);
      }
      if (selectionIndex + 1 === options.length) {
        scrollbar.scrollTop();
      }
    } else if (e.key === 'ArrowUp') {
      this.highlightSelection(-1);

      scrollbar.scrollTop(scrollbar.getScrollTop() - 40);
      if (scrollbar.getScrollTop() === 0 && selectionIndex === 0) {
        scrollbar.scrollToBottom();
      }
    }

    if (e.key === 'Enter' && options[selectionIndex]) {
      const { value } = options[selectionIndex];

      const fakeEvent = {
        target: {
          innerText: value,
        },
      };
      this.onSelect(fakeEvent);
    }
  };

  highlightSelection = delta => {
    const { selectionIndex, options } = this.state;
    let newIndex;

    if (selectionIndex === null) {
      newIndex = delta === 1 ? 0 : delta;
    } else {
      newIndex = selectionIndex + delta;
    }

    if (newIndex < 0) {
      newIndex += options.length;
    } else if (newIndex >= options.length) {
      newIndex -= options.length;
    }

    this.setState({ selectionIndex: newIndex });
  };

  render() {
    const { options, value, selectionIndex } = this.state;
    const { options: _options, label, required, error } = this.props;

    const current = find(_options, o => o.value === value);
    return (
      <div className={style.wrapper}>
        <StyleLabel text={label} required={required} />
        <div className={style.fakeSelect}>
          <div>
            <StyleValue
              value={current && current.label}
              style={this.getStyleValue()}
              error={!!error}
            />
            <Arrow />
          </div>
        </div>
        <div className={this.searchBoxClasses}>
          <div className={style.searchBoxInput}>
            <div>
              <input
                type="text"
                size="35"
                onChange={this.onSearch}
                onFocus={this.showList}
                onKeyDown={this.onKeyEvent}
                placeholder={`Select ${label}`}
                onClick={this.showList}
                ref="input"
              />
              <Arrow />
            </div>
          </div>

          {options && options.length > 0 && (
            <div className={style.searchResults}>
              <span
                role="presentation"
                onClick={this.clearList}
                className={style.searchResultsBackdrop}
              />

              <Scrollbars
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                }}
                ref="scrollbar"
                renderTrackVertical={props => (
                  <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
                )}
                renderThumbVertical={props => (
                  <div {...props} style={ScrollbarStyle.thumbStyle} />
                )}
              >
                {options.map((option, index) => {
                  return (
                    option.value !== '' && (
                      <div
                        role="presentation"
                        key={index}
                        className={`${style.searchResultItem} ${
                          selectionIndex === index ? style.active : ''
                        }`}
                        onClick={this.onSelect}
                      >
                        <span value={option.label}>{option.label}</span>
                      </div>
                    )
                  );
                })}
              </Scrollbars>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TypeAhead;
