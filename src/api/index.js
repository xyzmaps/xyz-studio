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

import axios from 'axios';
import * as types from '../actions/types';
import { apiConfig, tokenApiUrl } from '../constants';
import { getToken, clearToken } from '../helpers';
import { showAlert, hideAlert } from '../actions/mapActions';
// import { loader } from '../actions/commonActions';
import Account from '../user';
import store from '../store';

export const spacesAPI = axios.create({
  baseURL: `${apiConfig.spaces}`,
  params: {
    clientId: 'studio',
  },
});

export const projectsAPI = axios.create({
  baseURL: `${apiConfig.projects}`,
});

export const tokenAPI = axios.create({
  baseURL: `${apiConfig.token}`,
});

export const gateKeeperAPI = axios.create({
  baseURL: `${apiConfig.gatekeeper}`,
});

// Hub API Health
export const hubHealthAPI = axios.create({
  baseURL: `${apiConfig.hub}`,
});

export const statisticsApi = {
  fetch: (id, accessToken, success, error = () => {}) => {
    return spacesAPI
      .get(`/${id}/statistics`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(response => success(response.status, response.data))
      .catch(response => error(response));
  },
};

export const apiErrorHandler = (e, dispatch, context = '') => {
  console.info('Error', e);
  localStorage.removeItem('at2');

  store.dispatch({
    type: types.LOADING_SCREEN,
    payload: false,
  });

  if (e && e.response && e.response.status === 401) {
    clearToken();

    store.dispatch({
      type: types.LOGOUT,
    });

    Account.passiveAuth();
  } else if (dispatch) {
    let msg = {
      title: 'Error',
      text:
        "Something went wrong. If reloading the page doesn't fix the problem, please fill out an error report.",
    };

    if (e && e.response) {
      msg = {
        title:
          e.response.data.reasonPhrase || e.response.data.error || msg.title,
        text:
          e.response.data.message || e.response.data.errorMessage || msg.text,
      };
    }

    if (context === 'register#accounts/me#202') {
      console.info('error 202');
      msg = {
        // title: e.response.data.error || "Account setup in progress",
        // text: "Please, try to refresh, your account creation is in progress"
        title: 'Oops!',
        text:
          'We’re sorry, but it seems we have hit a snag while creating your account. Please try reloading the page and logging in, using the username and password you just chose. If this does not work, please try again in a few minutes. Finally, if you are still not able to log in, please fill out an error report and we will help find a solution.',
      };
      return showAlert({
        title: msg.title,
        text: msg.text,
        theme: 'negative',
        cancelLabel: 'Report',
        cancel: () => {
          window.location.href =
            'https://survey.research-feedback.com/jfe/form/SV_cClyIk2Bolh2RRH';
        },
        confirmLabel: 'Reload',
        confirm: () => window.location.reload(),
      })(dispatch, store.getState);
    }

    if (
      e &&
      e.response &&
      e.response.status === 500 &&
      context === 'register#accounts/me#500'
    ) {
      msg = {
        // title: e.response.data.error || "Account setup in progress",
        // text: "Please, try to refresh, your account creation is in progress"
        title: 'Sorry, something went wrong.',
        text:
          'We are working on getting this fixed as soon as we can. Please try again later or report this issue.',
      };
      return showAlert({
        title: msg.title,
        text: msg.text,
        theme: 'negative',
        // cancelLabel: 'Cancel',
        cancelLabel: 'Report this issue',
        cancel: () => {
          window.location.href =
            'https://survey.research-feedback.com/jfe/form/SV_cClyIk2Bolh2RRH';
        },
        confirmLabel: 'Reload',
        confirm: () => window.location.reload(),
      })(dispatch, store.getState);
    }

    const schemaAlertPopup = () =>
      showAlert({
        title: 'Schema Validation Failed',
        subText:
          'Your edit is not allowed given the schema that has been assigned for this space. You can see this schema in Data Hub CLI using <br /> <i>here xyz config spaceID --schema</i>  command.',
        theme: 'negative',
        // confirmLabel: 'Go to Data Hub CLI',
        // confirm: () => {
        //   window.open('https://www.here.xyz/cli/cli/', '_blank');
        // },
        cancelLabel: 'OK',
        cancel: () => {
          hideAlert();
        },
      })(dispatch, store.getState);

    if (e && e.response) {
      if (typeof e.response === 'string') {
        if (e.response.indexOf('schema validations') !== -1) {
          store.dispatch({
            type: types.LOADING,
          });
          return schemaAlertPopup();
        }
      }

      if (e.response.data && e.response.data.errorMessage) {
        if (e.response.data.errorMessage.indexOf('schema validations') !== -1) {
          store.dispatch({
            type: types.LOADING,
          });
          return schemaAlertPopup();
        }
      }
    }

    if (e && e.responseText && typeof e.responseText === 'string') {
      if (e.responseText.indexOf('schema validations') !== -1) {
        store.dispatch({
          type: types.LOADING,
        });
        return schemaAlertPopup();
      }
    }

    return showAlert({
      title: msg.title,
      text: msg.text,
      theme: 'negative',
      confirmLabel: 'Report this issue',
      confirm: () => {
        window.location.href =
          'https://survey.research-feedback.com/jfe/form/SV_cClyIk2Bolh2RRH';
      },
    })(dispatch, store.getState);
  } else {
    console.info(`Network Error:${e}`);
  }

  return false;
};

export const headers = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};

export const getReadOnlyToken = (aid, spaces, cid, name, pid, urms) => {
  const hexbinCapabilities =
    urms['xyz-hub'].useCapabilities &&
    urms['xyz-hub'].useCapabilities.some(o => o.id === 'hexbinClustering');
  const virtualSpaceConnector =
    urms['xyz-hub'].accessConnectors &&
    urms['xyz-hub'].accessConnectors.some(o => o.id === 'virtualspace');

  const spacesObject = spaces.map(space => ({ owner: aid, space }));
  let urm;
  if (hexbinCapabilities || virtualSpaceConnector) {
    urm = {
      'xyz-hub': {
        readFeatures: spacesObject,
        useCapabilities: [{ id: 'hexbinClustering' }],
      },
    };

    if (virtualSpaceConnector) {
      urm['xyz-hub'].accessConnectors = [{ id: 'virtualspace' }];
    }
  } else {
    urm = {
      'xyz-hub': {
        readFeatures: spacesObject,
        // "readFeatures": [{"owner": aid}]
      },
    };
  }
  return axios.post(
    `${tokenApiUrl}/token?tokenType=PERMANENT`,
    {
      urm,
      cid,
      description: `XYZ Viewer Token for Project ${name}(${pid})`,
    },
    { withCredentials: true }
  );
};

export const deleteReadOnlyToken = token => {
  return axios
    .delete(`${tokenApiUrl}/tokens/${encodeURIComponent(token)}`, {
      withCredentials: true,
    })
    .catch(() => {
      // console.log('Token is not present...', e);
    });
};

export const getTokenDetails = (token, success, error) => {
  return axios
    .get(`${tokenApiUrl}/tokens/${encodeURIComponent(token)}`)
    .then(success)
    .catch(error);
};
