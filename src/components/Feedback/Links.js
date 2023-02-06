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
import { Dialogue } from '../../icons';
import style from './Links.scss';

const Links = ({ margin }) => {
  return (
    <p className={`${style.feedback} ${margin && style.margin}`}>
      <Dialogue />
      <span>Help us improve your experience</span>{' '}
      <strong>
        <a
          href="https://survey.research-feedback.com/jfe/form/SV_cClyIk2Bolh2RRH"
          target="_blank"
          rel="noopener noreferrer"
        >
          report an issue
        </a>{' '}
        or{' '}
        <a
          href="https://survey.research-feedback.com/jfe/form/SV_eg5YanWmbcDq7Mp"
          target="_blank"
          rel="noopener noreferrer"
        >
          provide feedback
        </a>
      </strong>
    </p>
  );
};

export default Links;
