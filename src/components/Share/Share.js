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
// import { ShareButton } from 'react-custom-share';
// import { css } from 'emotion';
import { apiConfig } from '../../constants';

import style from './Share.scss';

import { Facebook, Linkedin, Twitter } from '../../icons';

export default function Share({ id, vertical }) {
  // Viewer URL
  const url = `${apiConfig.viewer}?project_id=${id}`;
  // URL patterns for Social media sites to share
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

  return (
    <div
      className={vertical ? `${style.share} ${style.vertical}` : style.share}
    >
      <div
        role="presentation"
        onClick={() => window.open(facebookUrl, '_blank')}
      >
        <Facebook />
      </div>
      <div
        role="presentation"
        onClick={() => window.open(linkedinUrl, '_blank')}
      >
        <Linkedin />
      </div>
      <div
        role="presentation"
        onClick={() => window.open(twitterUrl, '_blank')}
      >
        <Twitter />
      </div>
    </div>
  );
}
