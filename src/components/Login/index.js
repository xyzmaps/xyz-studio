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
// import Slider from './Slider';
// import DuckLoader from './DuckLoader';
import Account from '../../user';
import { getToken } from '../../helpers';
import style from './style.scss';
// import LoaderScreen from '../Loader/Loader';
//
// const LOADING_IFRAME_TITLE = 'Welcome to HERE Studio!';
// const LOADING_IFRAME_MSG =
//   "We're just polishing up for you, you'll be in Studio soon";
// const SIGNING_IN_MSG =
//   "We're getting your account ready and can't wait for you to try out HERE Studio.";

class LoginPage extends Component {
  componentDidMount() {
    const { loggedIn } = this.props;

    if (!loggedIn) {
      Account.reinit();
    }
  }

  render() {
    const { iframe, pending } = this.props;
    const {
      loading,
      // ,signingIn
    } = iframe;

    return (
      <div
        className={`${style.loginPage} ${
          pending || getToken() ? style.loading : ''
        }`}
      >
        <div className={style.bannerContainer}>
          <div className={style.bannerHeader}>
            <h1 className={style.title}>
              Welcome to <br />
              the HERE Studio
            </h1>
            <br />
            <h2 className={style.subtitle}>
              Studio is an interactive, visual, web based application
              <br /> for accessing XYZ Hub and creating maps.
              <br />
              <br />
              Click <a href="https://www.here.xyz/studio/topics/">here</a> to
              learn more
              <br />
              <br />
              Please sign in or create a HERE Account to use HERE Studio
            </h2>
          </div>

          {/* <Slider /> */}

          {/* <footer> */}
          {/*  <span className={style.copyright}>&copy; HERE 2020</span> */}
          {/* </footer> */}
        </div>

        <div className={style.formContainer}>
          <div
            className={`${style.iframeForm} ${loading ? style.hideForm : ''}`}
          >
            <div className={style.loginForm} id="auth" />
          </div>

          {/* {loading && ( */}
          {/*  <DuckLoader */}
          {/*    title={LOADING_IFRAME_TITLE} */}
          {/*    message={signingIn ? SIGNING_IN_MSG : LOADING_IFRAME_MSG} */}
          {/*  /> */}
          {/* )} */}
        </div>
      </div>
    );
  }
}

export default LoginPage;
