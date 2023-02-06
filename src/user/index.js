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
import React, { Component } from 'react';
import _ from 'lodash';
import amp from 'amplitude-js';
import Dropdown from '../components/Dropdown';
import { showAlert, hideAlert } from '../actions/mapActions';
import { showLoadingScreen } from '../actions/commonActions';
import {
  login,
  logout,
  accountMe,
  showIframeLoader,
} from '../actions/userActions';
import store from '../store';
import { gateKeeperAPI, apiErrorHandler } from '../api';
import { calculateTotalDataTransfer, calculateTotalStorage } from '../helpers';
import { tokenApiUrl } from '../constants/index';
import style from './style.scss';

const { here } = window;
const tokenType = 'TEMPORARY';
const tokenDescription = 'XYZ Studio Token';
const ttl = 3600; // seconds

const DEVELOPER_URL = process.env.REACT_APP_APP_DEVELOPER;
const CONTACT_US_URL = `${process.env.REACT_APP_APP_DEVELOPER}/contact-us`;
// const TWO_POINT_FIVE_GB_IN_MB = 2560; // 2.5 * 1024
// const FIVE_GBH_IN_MBH = 3686400; // 5*30*24 * 1024 ((5gb * 30 days * 24 hours) * 1024)
const USAGE_EXCEEDED_TITLE = 'Usage Exceeded';
const USAGE_EXCEEDED_MSG =
  "You've reached the limit of Freemium projects for this account. Please visit your plans page to manage your plans.";
const APP_CANCELLED_TITLE = 'Cancelled';
const APP_CANCELLED_MSG =
  'Your plan has been cancelled. To reactivate your plan, please contact us.';
const LOGOUT_TIMEOUT = 86400;

const convertNullToZero = value => {
  return typeof value === 'number' ? value : 0;
};

const checkIfAppActive = app => {
  return app.status.toLowerCase() === 'active';
};

const checkIfUsageExceeded = app => {
  const storageUsage = convertNullToZero(app.storageUsage);
  const ioUsage = convertNullToZero(app.ioUsage);

  return (
    storageUsage > calculateTotalStorage(app.tariff.freeStorage) ||
    ioUsage > calculateTotalDataTransfer(app.tariff.freeIO)
  );
};

class User extends Component {
  constructor(props) {
    super(props);

    this.hereAccount = null;
    this.planExpired = false;
  }

  onAppPlanAlertConfirm = (url = '') => {
    if (url) {
      window.location.href = url;
    }
  };

  onAppIdChangeSubmit = () => {
    gateKeeperAPI
      .patch(
        `/${this.accountId}`,
        { defaultAppId: this.selectedAppData.dsAppId },
        { withCredentials: true }
      )
      .then(() => {
        this.hereAccount.signOut();
        window.location.reload();
      })
      .catch(() => {
        store.dispatch(hideAlert());

        showAlert({
          title: 'OOPS',
          text: "The App ID couldn't be updated. Please try again",
          componentName: 'dashboard',
          renderContent: () => (
            <button
              type="button"
              className={[style.appPlanBtn]}
              onClick={() => {
                this.hereAccount.signOut();
                store.dispatch(hideAlert());
              }}
            >
              DONE
            </button>
          ),
        })(store.dispatch, store.getState);

        this.passiveAuth();
      });
  };

  onAppIdChange = selectedAppData => {
    this.selectedAppData = selectedAppData;
  };

  // Handle alerts for the default app id
  handleDefaultPlanAlert(defaultApp) {
    if (!checkIfAppActive(defaultApp)) {
      // The app is inactive

      showAlert({
        title: APP_CANCELLED_TITLE,
        text: APP_CANCELLED_MSG,
        confirmLabel: 'CONTACT US',
        componentName: 'dashboard',
        confirm: () => this.onAppPlanAlertConfirm(CONTACT_US_URL),
      })(store.dispatch, store.getState);

      this.hereAccount.signOut();

      return true;
    }

    if (checkIfUsageExceeded(defaultApp)) {
      showAlert({
        title: USAGE_EXCEEDED_TITLE,
        text: USAGE_EXCEEDED_MSG,
        confirmLabel: 'Go To Developer Portal',
        componentName: 'dashboard',
        confirm: () => this.onAppPlanAlertConfirm(DEVELOPER_URL),
      })(store.dispatch, store.getState);

      this.hereAccount.signOut();

      return true;
    }

    return false;
  }

  // Handle alerts for a single plan and all the user plans
  handleAppPlanAlerts = (appData, authoringAppId, isSinglePlan) => {
    const defaultApp = { ...appData[authoringAppId] };

    // If we have a single plan, let handleDefaultPlanAlert() handle the case
    if (isSinglePlan) {
      return this.handleDefaultPlanAlert(defaultApp);
    }

    const activeApps = [];
    const usageNotExceededApps = [];

    // Check for active apps and then check for apps that has not exceeded usage
    _.forEach(appData, app => {
      const storageUsage = convertNullToZero(app.storageUsage);
      const ioUsage = convertNullToZero(app.ioUsage);

      if (checkIfAppActive(app)) {
        activeApps.push(app);
      }

      if (
        storageUsage < calculateTotalStorage(app.tariff.freeStorage) &&
        ioUsage < calculateTotalDataTransfer(app.tariff.freeIO)
      ) {
        usageNotExceededApps.push(app);
      }
    });

    // If all the apps are inactive, show alert
    if (!activeApps.length) {
      // The app is inactive
      showAlert({
        title: APP_CANCELLED_TITLE,
        text: APP_CANCELLED_MSG,
        confirmLabel: 'CONTACT US',
        componentName: 'dashboard',
        confirm: () => this.onAppPlanAlertConfirm(CONTACT_US_URL),
      })(store.dispatch, store.getState);

      this.hereAccount.signOut();

      return true;
    }

    // If all the apps have exceeded the limit, show alert
    if (!usageNotExceededApps.length) {
      showAlert({
        title: USAGE_EXCEEDED_TITLE,
        text: USAGE_EXCEEDED_MSG,
        confirmLabel: 'Go To Developer Portal',
        componentName: 'dashboard',
        confirm: () => this.onAppPlanAlertConfirm(DEVELOPER_URL),
      })(store.dispatch, store.getState);

      this.hereAccount.signOut();

      return true;
    }

    // If there are multi plans and default App is inactive,
    // check whether the others plan are active or not.
    // If they are active, provide an option to switch to that plan.
    if (!checkIfAppActive(defaultApp)) {
      const filteredActiveApps = [];

      _.forEach(activeApps, activeApp => {
        if (!checkIfUsageExceeded(activeApp) && checkIfAppActive(activeApp)) {
          filteredActiveApps.push(activeApp);
        }
      });

      if (filteredActiveApps.length) {
        showAlert({
          title: 'Change Authoring AppID',
          text: `Your current Authoring App ID ${defaultApp.dsAppName}  (App ID ${defaultApp.dsAppId}) is cancelled OR deactivated.\n\nSelect another Plan/App ID for Authoring App ID`,
          componentName: 'dashboard',
          renderContent: () => {
            return (
              <div>
                <Dropdown
                  list={filteredActiveApps}
                  itemName="dsAppName"
                  defaultVal={filteredActiveApps[0]}
                  placeholder="Select Plan/App ID"
                  onChange={this.onAppIdChange}
                />

                <button
                  type="button"
                  className={[style.appPlanBtn]}
                  onClick={this.onAppIdChangeSubmit}
                >
                  DONE
                </button>
              </div>
            );
          },
        })(store.dispatch, store.getState);
      } else {
        showAlert({
          title: APP_CANCELLED_TITLE,
          text: APP_CANCELLED_MSG,
          confirmLabel: 'CONTACT US',
          componentName: 'dashboard',
          confirm: () => this.onAppPlanAlertConfirm(CONTACT_US_URL),
        })(store.dispatch, store.getState);

        this.hereAccount.signOut();

        return false;
      }

      return false;
    }

    if (checkIfUsageExceeded(defaultApp)) {
      const filteredUsageNotExceededApps = [];

      _.forEach(activeApps, activeApp => {
        if (!checkIfUsageExceeded(activeApp) && checkIfAppActive(activeApp)) {
          filteredUsageNotExceededApps.push(activeApp);
        }
      });

      if (filteredUsageNotExceededApps.length) {
        showAlert({
          title: 'Change Authoring AppID',
          text: `Your current Authoring App ID ${defaultApp.dsAppName}  (App ID ${defaultApp.dsAppId}) is cancelled OR deactivated.\n\nSelect another Plan/App ID for Authoring App ID`,
          componentName: 'dashboard',
          renderContent: () => {
            return (
              <div>
                <Dropdown
                  list={filteredUsageNotExceededApps}
                  itemName="dsAppName"
                  defaultVal={filteredUsageNotExceededApps[0]}
                  placeholder="Select Plan/App ID"
                  onChange={this.onAppIdChange}
                />

                <button
                  type="button"
                  className={[style.appPlanBtn]}
                  onClick={this.onAppIdChangeSubmit}
                >
                  DONE
                </button>
              </div>
            );
          },
        })(store.dispatch, store.getState);
      } else {
        showAlert({
          title: USAGE_EXCEEDED_TITLE,
          text: USAGE_EXCEEDED_MSG,
          confirmLabel: 'Go To Developer Portal',
          componentName: 'dashboard',
          confirm: () => this.onAppPlanAlertConfirm(DEVELOPER_URL),
        })(store.dispatch, store.getState);

        this.hereAccount.signOut();

        return false;
      }
    }

    return false;
  };

  catchInvalidUser = e => {
    const { alert } = store.getState().map;

    if (e.response) {
      if (!alert || !alert.toggle) {
        const message = `${e.response.data.message} Something went wrong. If reloading the page doesn't fix the problem, please fill out an error report.`;
        showAlert({
          title: 'Error',
          text: message,
          theme: 'negative',
          cancelLabel: 'Got it',
          cancel: () => {
            this.hereAccount.signOut();
          },
        })(store.dispatch, store.getState);
      }
    }
  };

  signOut = (err = null, id = 'trackUPMUI') => {
    if (err) {
      console.info('There was an error.', err);
    }

    if (id) {
      this.hereAccount.signOut(id);
    } else {
      this.hereAccount.signOut(id);
    }
    this.openSignIn();
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  getTokenFromApi = async userData => {
    let retries = 7;

    // Poll 7 times if the token cannot be retrieved
    const poll = async apiCallback => {
      let response = {};

      try {
        response = await apiCallback();

        if (response.status === 202) {
          if (retries > 0) {
            retries -= 1;

            await this.sleep(3000);
            return poll(apiCallback);
          }

          return Promise.reject(new Error('Login unsuccessfull'));
        }
      } catch (err) {
        console.info('getTokenFromApi', err);
        apiErrorHandler(err, store.dispatch, 'register#accounts/me#500');
        this.signOut(err, '');
        return err;
      }

      return response;
    };

    const response = await poll(
      () => gateKeeperAPI.get('/me', { withCredentials: true }),
      userData
    );

    if (response.status === 200) {
      store.dispatch(
        accountMe(
          response.data.tcAcceptedAt,
          response.data.apps,
          response.data.defaultAppId,
          response.data.payMethodName,
          response.data.aid,
          response.data.urm
        )
      );

      console.info('getTokenFromApi TOKEN calling...');

      try {
        const responseToken = await axios.post(
          `${tokenApiUrl}/token?tokenType=${tokenType}&ttl=${ttl}`,
          {
            urm: response.data.urm,
            cid: response.data.defaultAppId,
            description: tokenDescription,
          },
          { withCredentials: true }
        );
        // console.log("getTokenFromApi TOKEN", responseToken)
        store.dispatch(login(userData, responseToken.data.tid));
        store.dispatch(showLoadingScreen());
      } catch (error) {
        if (!this.planExpired) {
          this.accountId = response.data.aid;
          this.authoringAppId = response.data.defaultAppId;
          this.multResponse = { ...response.data.apps };
          this.isSinglePlan = Object.keys(this.multResponse).length === 1;

          this.handleAppPlanAlerts(
            this.multResponse,
            this.authoringAppId,
            this.isSinglePlan
          );

          this.planExpired = true;
        }

        this.signOut(error, '');
      }
    }
  };

  onSSOAuth = (err, result) => {
    if (!result) {
      return;
    }

    if (result.flow === 'sign-in') {
      if (result.action === 'aborted') {
        store.dispatch(logout());
        store.dispatch(showIframeLoader(true));
        this.openSignIn();
      }

      if (result.action === 'opened') {
        store.dispatch(showIframeLoader());
        store.dispatch(showLoadingScreen());
      }

      if (result.action === 'completed') {
        store.dispatch(showIframeLoader(true, true));
      }

      if (
        result.action === 'completed' ||
        result.action === 'already signed in' ||
        result.action === 'refresh failed'
      ) {
        this.getTokenFromApi(result.data);

        const identify = new amp.Identify().set('userEmail', result.data.email);
        amp.getInstance().identify(identify);
      }
    }

    if (result.flow === 'sign-out') {
      if (result.action === 'completed') {
        store.dispatch(showIframeLoader());
        store.dispatch(logout());
      }
    }

    if (result.flow === 'sign-up') {
      if (result.action === 'completed') {
        this.openSignIn();
        store.dispatch(showIframeLoader(true, true));
        window.Bizible = window.Bizible || {
          _queue: [],
          Push(o, p) {
            // eslint-disable-next-line no-underscore-dangle
            this._queue.push({ type: o, data: p });
            // eslint is disable for above line as '_queue' cant be changed as it is external lib variable name
          },
        };
        window.Bizible.Push('User', { eMail: result.data.email });
      }
    }

    if (result.flow === 'reset-password' && result.action === 'completed') {
      this.openSignIn();
    }
  };

  openSignIn = () => {
    this.hereAccount.openSignIn('trackUPMUI');
  };

  passiveAuth = () => {
    console.info('passive auth');

    if (this.hereAccount) {
      this.hereAccount.passiveAuth('trackUPMUI');
    }
  };

  reinit = () => {
    if (this.hereAccount) {
      this.hereAccount.destruct();
    }

    this.init();
    this.passiveAuth();
  };

  init() {
    console.info('init account');

    this.hereAccount = new here.Account({
      node: document.getElementById('auth'),
      noCloseFrameButton: true,
      clientId: 'es1HEn2LGqFocvfD1eEt',
      environment: '',
      type: 'frame',
      callback: this.onSSOAuth,
      lang: 'en-us',
      version: 4,
      signInScreenConfig: ['password', 'heread'],
      uatDuration: `${LOGOUT_TIMEOUT}`,
      // theme:              'light'
    });

    window.hereAccount = this.hereAccount;
  }
}

const account = new User();
export default account;
