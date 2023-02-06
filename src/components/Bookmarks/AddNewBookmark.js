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

import { BookmarkOn, BookmarkOff } from '../../icons/index';

import style from './Bookmarks.scss';

class AddNewBookmark extends Component {
  state = {
    active: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.setState({
        active: false,
      });
      const value = e.target.value.trim();
      if (value) {
        this.props.onBookmarkAdd(e.target.value);
      }
    }
  };

  render() {
    const { active } = this.state;

    return (
      <div
        role="presentation"
        className={`${style.addWrapper} ${active && style.active}`}
        onKeyPress={this.onKeyPress}
        data-tip="Bookmark current view"
        data-tut="bookmark"
      >
        <span
          role="presentation"
          className={style.addBookmark}
          onClick={this.toggle}
        >
          {active ? <BookmarkOn /> : <BookmarkOff />}
        </span>
        {active && (
          <input
            className={style.addInput}
            type="text"
            onBlur={this.toggle}
            placeholder="Name your bookmark"
          />
        )}
      </div>
    );
  }
}

export default AddNewBookmark;
