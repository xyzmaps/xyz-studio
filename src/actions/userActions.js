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

import _ from 'lodash';
import * as types from './types';
import { setToken, clearToken } from '../helpers';
import { tokenAPI, apiErrorHandler } from '../api';
import logEvent from '../utils/amplitudeLogger';

const appColors = ['#3E94B6', '#31D59E', '#EF8A4A', '#1C2379'];

export const accountMe = (
  tc,
  apps,
  defaultAppId,
  pay,
  aid,
  urm
) => dispatch => {
  let colCount = 0;
  const sortedApps = _.orderBy(apps, ['dsAppName'], ['asc']);
  _.forEach(sortedApps, app => {
    /* eslint-disable */
    _.assign(app, { color: `${appColors[colCount++]}` });
    /* eslint-disable */
  });

  return dispatch({
    type: types.ACCOUNT_ME,
    payload: {
      tc,
      apps,
      defaultAppId,
      pay,
      aid,
      urm,
    },
  });
};

export const updateAppId = appid => dispatch => {
  return dispatch({
    type: types.UPDATE_APPID,
    payload: {
      appid,
    },
  });
};

export const tcUpdate = tc => dispatch => {
  return dispatch({
    type: types.TC_UPDATE,
    payload: {
      tc,
    },
  });
};

export const switchAppID = token => dispatch => {
  setToken(token);
  tokenAPI
    .get(`/${token}.json`)
    .then(r => {
      return dispatch({
        type: types.SWITCH_APP_ID,
        payload: {
          token,
          spaceLimit: r.data.limits ? r.data.limits.maxSpaces : -1,
        },
      });
    })
    .catch(e => apiErrorHandler(e, dispatch));
};

export const login = (userData, token) => dispatch => {
  if (!localStorage.getItem('at')) {
    window.utag.view({ linkEvent: 'sign_in', sLogin: 'user_sign_in' }); // Sign in event for Omniture
    console.log(userData.email);
    logEvent('Logged_in', { email: userData.email });
  } else {
    window.utag.view({
      linkEvent: 'already_sign_in',
      sLogin: 'user_already_sign_in',
    }); // Already sign in event for Omniture
  }
  setToken(token);
  tokenAPI
    .get(`/${token}.json`)
    .then(r => {
      return dispatch({
        type: types.LOGIN,
        payload: {
          userData,
          token,
          spaceLimit: r.data.limits ? r.data.limits.maxSpaces : -1,
        },
      });
    })
    .catch(e => apiErrorHandler(e, dispatch));
};

export const logout = () => {
  clearToken();
  return {
    type: types.LOGOUT,
  };
};

export const showIframeLoader = (loading = false, signingIn = false) => {
  return {
    type: types.IFRAME_LOADER,
    payload: {
      loading,
      signingIn,
    },
  };
};
