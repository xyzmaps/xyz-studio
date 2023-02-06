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
import { licenses } from '../../constants/licenses';

import { Arrow, ExternalLink } from '../../icons';

import style from './SelectLicense.scss';
import ScrollbarStyle from '../../config/ScrollbarStyle';

export default class SelectLicense extends Component {
  state = {
    selected:
      this.props.publishSettings && this.props.publishSettings.license
        ? this.props.publishSettings.license
        : '',
    toggle: false,
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

    this.onToggle();
  };

  onSelect = (e, license) => {
    if (license) {
      this.setState({ selected: license }, () => {
        this.props.onSelect(license);
        this.onToggle(e);
      });
    } else {
      this.setState({ selected: '' }, () => {
        this.props.onSelect();
        this.onToggle(e);
      });
    }
  };

  render() {
    const { toggle, selected } = this.state;
    const { placeholder } = this.props;

    return (
      <div
        className={`${style.wrapper} ${toggle ? style.show : null}`}
        ref="wrapper"
      >
        <h3 className={style.title}>LICENSE</h3>

        <button type="button" className={style.trigger} onClick={this.onToggle}>
          <span>{selected.name || placeholder}</span>
          <Arrow />
        </button>

        <div className={style.container}>
          <Scrollbars
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            renderTrackVertical={props => (
              <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
            )}
            renderThumbVertical={props => (
              <div {...props} style={ScrollbarStyle.thumbStyle} />
            )}
          >
            <ul>
              <li>
                <button
                  type="button"
                  className={
                    !selected || !selected.name.length ? style.active : null
                  }
                  onClick={e => this.onSelect(e)}
                >
                  <strong>- NO LICENSE -</strong>
                </button>
              </li>
              {_.map(licenses, license => {
                return (
                  <li key={license.name}>
                    <button
                      type="button"
                      className={
                        selected.name === license.name ? style.active : null
                      }
                      onClick={e => this.onSelect(e, license)}
                    >
                      <strong>{license.name}</strong>
                    </button>
                    <a
                      href={license.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
