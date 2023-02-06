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

export default class Edit extends Component {
  state = {
    toggle: false,
  };

  onToggle = e => {
    e.stopPropagation();

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
    const { toggle } = this.state;
    const {
      billingUrl,
      status,
      cancelPlanUrl,
      authoringAppId,
      currentAppId,
      accountId,
      onSwitchingAuthoringAppId,
    } = this.props;

    return (
      <div
        className={`${style.edit} ${style.list} ${style[toggle && 'show']}`}
        ref="wrapper"
      >
        <button type="button" className={style.trigger} onClick={this.onToggle}>
          &bull;
        </button>

        <ul className={style.container}>
          <li>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                window.open(billingUrl, '_blank');
              }}
            >
              Billing Details
            </button>
          </li>

          {status.toLowerCase() === 'active' && (
            <li>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  window.open(cancelPlanUrl, '_blank');
                }}
              >
                Cancel Plan
              </button>
            </li>
          )}

          {authoringAppId !== currentAppId &&
          status.toLowerCase() === 'active' ? (
            <li>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  onSwitchingAuthoringAppId(currentAppId, accountId);
                }}
              >
                Activate
              </button>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    );
  }
}
