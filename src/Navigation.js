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

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNotificationBar } from './actions/commonActions';

import { hubHealthAPI } from './api';
import { apiConfig } from './constants';

import { isMobile, isViewer } from './helpers';
import Home from './containers/Home';
import Studio from './containers/Studio/Studio';
import Spaces from './containers/Spaces';
import Space from './containers/Space/Space';
import AccountDetail from './containers/AccountDetail';
import AccountDashboard from './containers/AccountDashboard';
import MapSetting from './containers/MapSetting/MapSetting';
import Login from './containers/Login/Login';
import Alert from './containers/Alert/Alert';
import NotificationBar from './containers/NotificationBar/NotificationBar';
import Notice from './components/Notice/Notice';
import NotFound from './containers/NotFound';
import WindowSizeAlert from './components/WindowSizeAlert/WindowSizeAlert';
import LoadingScreen from './components/Loader/Loader';
import Viewer from './containers/Viewer/Viewer';

const PrivateRoute = ({ component: Comp, ...rest }) => (
  <Route {...rest} render={props => <Login component={Comp} {...props} />} />
);

const verifyAPIHealth = async callback => {
  try {
    const response = await hubHealthAPI.get('');

    return response;
  } catch (error) {
    console.info(error);

    callback(error);

    return error;
  }
};

const Navigation = props => {
  const { showNotificationBar: _showNotificationBar } = props;

  useEffect(() => {
    // Verify if all APIs are working and show notification if APIs are failing
    verifyAPIHealth(() => {
      _showNotificationBar({
        message:
          "Oops! We didn't anticipate this. Not all our APIs are working as expected.",
        visible: true,
        type: 'error',
        btnLabel: 'View Detail',
        onBtnClick: () => {
          window.open(`${apiConfig.apiHealthUrl}`, '_blank');
        },
        onClose: () => _showNotificationBar(),
      });
    });
  }, []);

  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <React.Fragment>
        <NotificationBar />

        <Switch>
          <PrivateRoute exact path={['/', '/studio/']} component={Home} />
          <PrivateRoute exact path="/studio/your-data" component={Spaces} />
          <PrivateRoute exact path="/studio/data/:space_id" component={Space} />
          <PrivateRoute
            exact
            path="/studio/project/:project_id"
            component={Studio}
          />
          <PrivateRoute
            exact
            path="/account-dashboard"
            component={AccountDashboard}
          />
          <PrivateRoute
            exact
            path="/account-dashboard/:app_id"
            component={AccountDetail}
          />
          <PrivateRoute
            exact
            path="/studio/map-settings/:project_id"
            component={MapSetting}
          />
          <Route exact path="/viewer/" component={Viewer} />
          <Route component={NotFound} />
        </Switch>

        <LoadingScreen />
        <Notice />
        {!isMobile() && !isViewer() && <WindowSizeAlert />}
        <Alert />
      </React.Fragment>
    </Router>
  );
};

export default connect(null, {
  showNotificationBar,
})(Navigation);
