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
import { Link, Redirect } from 'react-router-dom';
import { setTokenLink, isMobile } from '../../helpers';
import Account from '../../user';
import style from './Edit.scss';

export default class Edit extends Component {
  state = {
    toggle: false,
    redirect: false,
  };

  componentWillUnmout() {
    document.removeEventListener('click', this.onBlur, false);
  }

  signOut = e => {
    e.stopPropagation();
    Account.signOut();
    this.setState({
      redirect: true,
    });
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

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return null;
  };

  render() {
    const { layout, firstname, lastname, accountURL } = this.props;
    const { toggle } = this.state;

    return (
      <div
        className={`${style.edit} ${style[layout] ? style[layout] : ''} ${
          toggle ? style.show : ''
        }`}
        ref="wrapper"
        data-tut="account"
      >
        {this.renderRedirect()}

        <div
          role="presentation"
          className={style.trigger}
          onClick={this.onToggle}
        >
          <span className={style.userName}>
            {firstname} {lastname}
          </span>
        </div>

        <ul className={style.container}>
          {!isMobile() && (
            <li>
              <Link className="linkButton" to={setTokenLink(accountURL)}>
                <span>Account dashboard</span>
              </Link>
            </li>
          )}

          <li>
            <button type="button" onClick={this.signOut}>
              Sign out
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
