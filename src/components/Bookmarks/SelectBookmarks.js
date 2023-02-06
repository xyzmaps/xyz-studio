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
import { Arrow } from '../../icons';

import style from './SelectBookmarks.scss';
import ScrollbarStyle from '../../config/ScrollbarStyle';

export default class SelectBookmarks extends Component {
  state = {
    selected:
      this.props.publishSettings && this.props.publishSettings.bookmark
        ? this.props.publishSettings.bookmark
        : {},
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

  onSelect = (e, bookmark) => {
    if (bookmark) {
      this.setState({ selected: bookmark }, () => {
        this.props.onSelect(bookmark, this.props.id);
        this.onToggle(e);
      });
    } else {
      this.setState({ selected: '' }, () => {
        this.props.onSelect(null, this.props.id);
        this.onToggle(e);
      });
    }
  };

  onClear = () => {
    this.setState({ selected: '' }, () => {
      this.props.onSelect(null, this.props.id);
      this.setState({ toggle: false });
    });
  };

  render() {
    const { toggle, selected } = this.state;
    const { placeholder, bookmarks } = this.props;

    return (
      <div
        className={`${style.wrapper} ${toggle ? style.show : null}`}
        ref="wrapper"
      >
        <h3 className={style.title}>INITIAL MAP LOCATION</h3>

        <button type="button" className={style.trigger} onClick={this.onToggle}>
          <span>{selected.label || placeholder}</span>
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
              {!bookmarks.length && (
                <li>
                  <em role="presentation" onClick={e => this.onSelect(e)}>
                    No bookmarks have been created
                  </em>
                </li>
              )}
              {_.map(bookmarks, bookmark => {
                return (
                  <li key={bookmark.id}>
                    <button
                      className={
                        bookmark.id === selected.id ? style.active : null
                      }
                      type="button"
                      onClick={e => this.onSelect(e, bookmark)}
                    >
                      {bookmark.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        </div>

        {!_.isEmpty(selected) && (
          <button
            type="button"
            className={style.clear}
            onClick={e => this.onClear(e)}
          >
            Clear selection
          </button>
        )}
      </div>
    );
  }
}
