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
import { withRouter, NavLink } from 'react-router-dom';

import { setTokenLink } from '../../helpers';
import SignOutBtn from './SignOutBtn';

import style from './TopBar.scss';

const TopBar = props => {
  const {
    authoringAppIdName,
    authoringAppColor,
    authoringAppId,
    accountURL,
  } = props;

  return (
    <div>
      <div className={style.topbar}>
        <div className={style.mainNav}>
          <NavLink
            data-tut="dashboard"
            exact
            to={setTokenLink('/studio/')}
            activeClassName="active-topbar-item"
          >
            <span className={style.tab}>Projects</span>
          </NavLink>
          <NavLink
            data-tut="data-hub"
            exact
            to={setTokenLink('/studio/your-data')}
            activeClassName="active-topbar-item"
          >
            <span className={style.tab}>Data</span>
          </NavLink>
          <a
            data-tut="documents"
            href="http://here.xyz/studio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={style.tab}>Documentation</span>
          </a>

          <a
            data-tut="beta-feedback"
            href="https://survey.research-feedback.com/jfe/form/SV_eg5YanWmbcDq7Mp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Support</span>
          </a>
        </div>

        <div className={style.account}>
          <SignOutBtn
            authoringAppIdName={authoringAppIdName}
            authoringAppColor={authoringAppColor}
            authoringAppId={authoringAppId}
            accountURL={accountURL}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(TopBar);
