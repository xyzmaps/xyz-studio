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
import { Link } from 'react-router-dom';
import { mapConfig } from '../../../constants';

import { setTokenLink } from '../../../helpers';

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
    const {
      layout,
      context,
      to,
      id,
      rot,
      onDelete,
      onDownload,
      title,
      download,
      statistics,
      currentProject,
    } = this.props;

    const { toggle } = this.state;

    return (
      <div
        className={`${style.edit} ${style[layout]} ${style[toggle && 'show']}`}
        ref="wrapper"
      >
        <button
          type="button"
          data-testid={`edit-btn-${id}`}
          className={style.trigger}
          onClick={this.onToggle}
        >
          &bull;
        </button>

        <ul className={style.container}>
          {context === 'project' && (
            <li className={style.editItem}>
              <Link to={setTokenLink(to)}>
                <span>Edit</span>
              </Link>
            </li>
          )}

          <li>
            <button type="button" onClick={() => onDelete(id, rot)}>
              Delete
            </button>
          </li>
          {onDownload && statistics <= mapConfig.maxDownloadableFeatures && (
            <li>
              <button type="button" onClick={() => onDownload(id, title)}>
                {download}
              </button>
            </li>
          )}
          {!onDownload && (
            <li>
              <Link
                to={{
                  ...setTokenLink(`/studio/map-settings/${currentProject.id}`),
                  state: {
                    currentProject: { ...currentProject },
                    fromDashboard: true,
                  },
                }}
              >
                <span>Settings</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
