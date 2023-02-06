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

import * as types from '../actions/types';

const initialState = {
  status: 'checking',
  iframe: {
    loading: false,
    signingIn: false,
  },
  loggedIn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ACCOUNT_ME:
      return {
        ...state,
        tcAcceptedAt: action.payload.tc,
        apps: action.payload.apps,
        defaultAppId: action.payload.defaultAppId,
        payMethodName: action.payload.pay,
        aid: action.payload.aid,
        urm: action.payload.urm,
      };

    case types.UPDATE_APPID:
      return {
        ...state,
        defaultAppId: action.payload.appid,
      };

    case types.TC_UPDATE:
      return {
        ...state,
        tcAcceptedAt: action.payload.tc,
      };

    case types.SWITCH_APP_ID:
      return {
        ...state,
        loggedIn: action.payload.token,
      };

    case types.LOGIN:
      return {
        ...state,
        loggedIn: action.payload.token,
        user: action.payload.userData,
      };

    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null,
      };

    case types.UPDATE_USER_DATA:
      return {
        ...state,
        user: {
          ...action.payload.userData,
          token: action.payload.token,
          spaceLimit: action.payload.spaceLimit,
        },
      };

    case types.IFRAME_LOADER:
      return {
        ...state,
        iframe: action.payload,
      };

    default:
      return state;
  }
};
