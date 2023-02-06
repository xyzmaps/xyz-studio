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

import style from './Edit.scss';

class Edit extends Component {
  state = {
    toggle: false,
  };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  mounted = false;

  onToggle = e => {
    e.stopPropagation();

    if (this.mounted) {
      if (!this.state.toggle) {
        document.addEventListener('click', this.onBlur, false);
      } else {
        document.removeEventListener('click', this.onBlur, false);
      }

      this.setState(prevState => ({ toggle: !prevState.toggle }));
    }
  };

  onBlur = e => {
    if (this.refs.wrapper && this.refs.wrapper.contains(e.target)) {
      return;
    }

    this.onToggle(e);
  };

  onCardToggle = e => {
    e.stopPropagation();

    this.props.onCardToggle(this.props.cardLabel);
  };

  render() {
    const { cardLabel, currentLayer, deleteCol } = this.props;
    const { toggle } = this.state;

    return (
      <div
        className={`toggle-card ${style.edit} ${toggle ? style.show : ''}`}
        ref="wrapper"
      >
        <button type="button" className={style.trigger} onClick={this.onToggle}>
          &bull;
        </button>

        <ul className={style.container}>
          {!!currentLayer && !!Object.keys(currentLayer).length && (
            <li>
              <button type="button" onClick={this.onCardToggle}>
                {currentLayer.hiddenCards.indexOf(cardLabel) !== -1
                  ? 'Show'
                  : 'Hide'}{' '}
                on card
              </button>
            </li>
          )}

          {!!deleteCol && (
            <li>
              <button
                type="button"
                onClick={() => {
                  deleteCol(cardLabel);
                }}
              >
                Delete Column
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Edit;
