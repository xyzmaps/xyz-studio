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

import style from './CookiesFooter.scss';
import { Close } from '../../icons';

export default class CookiesFooter extends Component {
  state = {
    CookiesAccepted: localStorage.getItem('HERE_COOKIE_NOTICE') || false,
  };

  onClose = () => {
    localStorage.setItem('HERE_COOKIE_NOTICE', true);
    this.setState({
      CookiesAccepted: true,
    });
  };

  render() {
    const { CookiesAccepted } = this.state;

    return (
      !CookiesAccepted && (
        <div className={style.wrapper}>
          <div className={style.container}>
            <p className={style.heading}>WE USE COOKIES</p>
            <p className={style.text}>
              HERE uses cookies from our websites to bring you services and info
              that matters more to you,
              <br />
              including advertising from our partners.
              <a
                href="https://legal.here.com/en-gb/privacy/cookies"
                target="_blank"
                rel="noopener noreferrer"
                title="Find out more"
              >
                {' '}
                Find out more
              </a>
            </p>
          </div>

          <button type="button" className={style.close} onClick={this.onClose}>
            <Close />
          </button>
        </div>
      )
    );
  }
}
