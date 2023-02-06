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

import React from 'react';

import FeedbackLinks from '../Feedback/Links';

import style from './Footer.scss';

const Footer = () => (
  <footer className={style.wrapper}>
    <FeedbackLinks />

    <nav>
      <ul>
        <li>
          <a
            href="https://developer.here.com/terms-and-conditions"
            traget="_blank"
            rel="noopener noreferrer"
          >
            Terms of Use
          </a>
        </li>
        <li>
          <a
            href="https://legal.here.com/en-gb/privacy"
            traget="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="https://legal.here.com/en-gb/privacy/cookies"
            traget="_blank"
            rel="noopener noreferrer"
          >
            Cookie Policy
          </a>
        </li>
        <li>
          <a
            href="https://legal.here.com/en-gb/terms/imprint-impressum"
            traget="_blank"
            rel="noopener noreferrer"
          >
            &copy; 2020 HERE
          </a>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
