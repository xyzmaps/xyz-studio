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
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import { Arrow } from '../../../icons';
import StyleLabel from '../ProjectLayer/FeatureStyleProps/StyleLabel';
import ScrollbarStyle from '../../../config/ScrollbarStyle';

import style from './SelectInput.scss';

class SelectInput extends Component {
  state = {
    value: this.props.currentValue,
    options: [],
    toggle: false,
  };

  componentWillMount() {
    this.setOptions();
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props;

    if (prevProps.options && prevProps.options.length !== options.length) {
      this.setOptions();
    }

    this.setValueState(prevProps);
  }

  setValueState = prevProps => {
    if (this.props.currentValue !== prevProps.currentValue) {
      this.setState({ value: this.props.currentValue });
    }
  };

  handleChange = e => {
    e.persist();

    this.setState(
      {
        value: e.target.value,
      },
      () => {
        this.props.update({
          geometry: this.props.geometryType,
          styleProp: this.props.styleProp,
          styleType: this.props.styleType,
          value: this.state.value,
        });
        this.onToggle(e);
      }
    );
  };

  onSelect = e => {
    e.persist();

    this.setState(
      {
        value: e.target.value,
      },
      () => {
        this.props.onSelect(e);
        this.onToggle(e);
      }
    );
  };

  onSelectBookmark = (e, bookmark) => {
    if (bookmark) {
      this.setState({ value: bookmark }, () => {
        this.props.onSelect(bookmark, this.props.id);
        this.onToggle(e);
      });
    } else {
      this.setState({ value: '' }, () => {
        this.props.onSelect(null, this.props.id);
        this.onToggle(e);
      });
    }
  };

  onSelectPlan = (e, publishId, publishName) => {
    this.setState({ value: publishName }, () => {
      this.props.onSelect(publishId);
      this.onToggle(e);
    });
  };

  setOptions = () => {
    let options;
    switch (this.props.styleProp) {
      case 'strokeLinejoin':
        options = [
          {
            label: 'Miter',
            value: 'miter',
          },
          {
            label: 'Round',
            value: 'round',
          },
          {
            label: 'Beve',
            value: 'beve',
          },
        ];
        break;
      case 'strokeLinecap':
        options = [
          {
            label: 'Butt',
            value: 'butt',
          },
          {
            label: 'Square',
            value: 'square',
          },
          {
            label: 'Round',
            value: 'round',
          },
        ];
        break;
      default:
        options = this.props.options || [];
        break;
    }
    if (
      this.props.allowNull &&
      this.props.options[0].value !== 'none' &&
      this.props.name !== 'Select Property'
    ) {
      options.unshift({
        label: this.props.nullLabel || 'none',
        value: 'none',
      });
    }
    this.setState({
      options: this.props.plan ? options : [...options],
    });
  };

  // getOptions = () => {
  //   return this.state.options.map((item, i) => (
  //     <option key={i} value={item.value} disabled={item.value === ''}>
  //       {item.label}
  //     </option>
  //   ));
  // };

  getStyleValue = () => {
    return {
      background: 'rgb(54,58,66)',
      fontStyle: `${!this.state.value ? 'italic' : 'normal'}`,
      color: `${!this.state.value ? 'var(--color-white-30)' : 'inherit'}`,
    };
  };

  onToggle = () => {
    if (!this.state.toggle) {
      document.addEventListener('click', this.onBlur, false);
    } else {
      document.removeEventListener('click', this.onBlur, false);
    }
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  onBlur = e => {
    if (this.refs.wrapper && this.refs.wrapper.contains(e.target)) {
      return;
    }

    this.onToggle(e);
  };

  render() {
    const { options, value, toggle } = this.state;
    const {
      label,
      required,
      name,
      styleProp,
      placeholder,
      bookmark,
      plan,
      disabled,
    } = this.props;
    const defaultAppId = !(Object.keys(options).length > 1);
    let current = '';
    let imgName1 = '';

    current = _.find(options, o => o.value === value);
    if (styleProp === 'baseSrc')
      current = _.find(options, o => o.value.indexOf(value) !== -1);
    if (bookmark) current = value;

    if (current) {
      imgName1 = current ? current.label : '';
      if (current.label === 'Pin') imgName1 = 'destinationpin';
      if (current.label === 'Pizza') imgName1 = 'foodpizza';
      if (current.label === 'Car') imgName1 = 'cardrivemode';
    }

    return (
      <div
        className={`${style.wrapper} ${toggle ? style.show : null}`}
        ref="wrapper"
      >
        {label && <StyleLabel text={label} required={required} />}

        {plan && (defaultAppId || disabled) ? (
          <button
            type="button"
            disabled
            className={`${style.trigger} ${disabled && style.disabled}`}
          >
            {`${value}`}
          </button>
        ) : (
          <button
            type="button"
            className={style.trigger}
            value={current && current.label}
            onClick={this.onToggle}
          >
            {styleProp === 'baseSrc' && (
              <span>
                <img
                  src={`../../../..${
                    process.env.PUBLIC_URL
                  }/icons/lui-icon-${imgName1
                    .toLowerCase()
                    .replace(/ /g, '')}.svg`}
                  className={`${style.imgStyle} ${style.main}`}
                  alt="icon"
                />
              </span>
            )}
            <span>{current ? current.label : placeholder || value}</span>
            <Arrow />
          </button>
        )}

        <div className={style.container}>
          <Scrollbars
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
            }}
            renderTrackVertical={props => (
              <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
            )}
            renderThumbVertical={props => (
              <div {...props} style={ScrollbarStyle.thumbStyle} />
            )}
          >
            <ul>
              {_.map(options, (item, i) => {
                let imgName;

                if (!plan) {
                  imgName = item.label;
                  if (item.label === 'Pin') imgName = 'destinationpin';
                  if (item.label === 'Pizza') imgName = 'foodpizza';
                  if (item.label === 'Car') imgName = 'cardrivemode';
                }

                let clickfun = this.onSelect;
                if (!name) clickfun = this.handleChange;
                if (bookmark) clickfun = e => this.onSelectBookmark(e, item);
                if (plan)
                  clickfun = e =>
                    this.onSelectPlan(e, item.dsAppId, item.dsAppName);

                return (
                  <li key={bookmark ? item.id : i}>
                    <button
                      type="button"
                      onClick={clickfun}
                      className={value === item.value ? style.active : null}
                      value={item.value}
                      name={name}
                    >
                      {styleProp === 'baseSrc' && (
                        <span>
                          <img
                            src={`../../../..${
                              process.env.PUBLIC_URL
                            }/icons/lui-icon-${imgName
                              .toLowerCase()
                              .replace(/ /g, '')}.svg`}
                            className={`${style.imgStyle} ${style.option}`}
                            alt="icon"
                          />
                        </span>
                      )}
                      {plan ? item.dsAppName : item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        </div>
        {disabled && !defaultAppId && (
          <p className={style.note}>
            Note: To change the plan, first unpublish the map.
          </p>
        )}
      </div>
    );
  }
}

export default SelectInput;
