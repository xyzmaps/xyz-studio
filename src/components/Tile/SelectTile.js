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
import { mapConfig } from '../../constants';

import { Arrow } from '../../icons';

import ScrollbarStyle from '../../config/ScrollbarStyle';
import style from './SelectTile.scss';

export default class SelectTile extends Component {
  state = {
    selected: this.props.selected,
    toggle: false,
  };

  onToggle = () => {
    if (!this.state.toggle) {
      document.addEventListener('click', this.onBlur, false);
    } else {
      document.removeEventListener('click', this.onBlur, false);
    }

    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  };

  onBlur = e => {
    if (this.refs.wrapper && this.refs.wrapper.contains(e.target)) {
      return;
    }

    this.onToggle();
  };

  onSelect = tileLayer => {
    this.setState({
      selected: tileLayer,
    });

    this.props.onSelect(tileLayer);
  };

  render() {
    const { toggle, selected } = this.state;

    return (
      <div
        className={`${style.wrapper} ${toggle ? style.show : null}`}
        ref="wrapper"
      >
        <h3 className={style.title}>Tile Layer</h3>

        <button type="button" className={style.trigger} onClick={this.onToggle}>
          <span>{mapConfig.tileUrl[selected].label}</span>
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
              {_.map(mapConfig.tileUrl, (obj, key) => {
                return (
                  selected !== key && (
                    <li key={key}>
                      <button type="button" onClick={() => this.onSelect(key)}>
                        <strong>{obj.label}</strong>
                      </button>
                    </li>
                  )
                );
              })}
            </ul>
          </Scrollbars>
        </div>
        {selected === 'osm' && (
          <p className={style.disclaimerText}>
            <span>
              By selecting Tilezen as your basemap data provider you are
              required to comply with the applicable{' '}
            </span>
            <a
              href="https://github.com/tilezen/vector-datasource/blob/master/docs/attribution.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              license requirements
            </a>
            <span>.</span>
          </p>
        )}
      </div>
    );
  }
}
