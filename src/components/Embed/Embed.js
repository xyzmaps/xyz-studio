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

import { apiConfig } from '../../constants';

import Share from '../Share/Share';

import style from './Embed.scss';
import { ShareIcon, Copy } from '../../icons';

export default class Iframe extends Component {
  state = {
    code: false,
    shareToggle: false,
    copied: false,
  };

  componentDidMount() {
    const { id, iframe } = this.props;
    const link = `${apiConfig.viewer}?project_id=${id}`;

    this.setState({
      code: iframe ? `<iframe src="${link}" frameborder="0"></iframe>` : link,
    });
  }

  onShareToggle = () => {
    if (!this.state.shareToggle) {
      document.addEventListener('click', this.onBlur, false);
    } else {
      document.removeEventListener('click', this.onBlur, false);
    }

    this.setState(prevState => ({ shareToggle: !prevState.shareToggle }));
  };

  onBlur = e => {
    if (this.refs.wrapper && this.refs.wrapper.contains(e.target)) {
      return;
    }

    this.onShareToggle();
  };

  onCopyText = () => {
    const textArea = document.createElement('textarea');
    textArea.value = this.state.code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  };

  render() {
    const { label, iframe, id, studio, setting } = this.props;
    const { code, shareToggle, copied } = this.state;

    return (
      code && (
        <div className={style.wrapper}>
          <div
            className={iframe ? `${style.title} ${style.normal}` : style.title}
          >
            {`${label}:`}
          </div>
          <div
            className={style.textarea}
            role="presentation"
            onClick={this.selectAll}
          >
            <span>
              {iframe ? (
                code
              ) : (
                <a
                  className={style.viewerLink}
                  href={code}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {code}
                </a>
              )}
            </span>
          </div>
          <div
            role="presentation"
            className={style.copyIcon}
            onClick={this.onCopyText}
          >
            <span>
              <Copy />
            </span>
          </div>

          {!iframe && !studio && (
            <div
              role="presentation"
              className={style.share}
              onClick={this.onShareToggle}
            >
              <span>
                <ShareIcon />
              </span>
            </div>
          )}

          {shareToggle && !iframe && (
            <div className={style.social} ref="wrapper">
              <Share id={id} vertical />
            </div>
          )}

          {copied && (
            <div
              className={
                !setting ? `${style.copied} ${style.studio}` : style.copied
              }
            >
              Copied
            </div>
          )}
        </div>
      )
    );
  }
}
