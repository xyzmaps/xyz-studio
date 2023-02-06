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
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router';
import axios from 'axios';
import Button from '../../components/Common/Button';

import { gateKeeperAPI, apiErrorHandler } from '../../api';
// import { Search } from './../../icons';
import DoughnutChart from './DoughnutChart';
import Edit from './Edit';
import store from '../../store';
import { tokenApiUrl } from '../../constants';
import { switchAppID, updateAppId } from '../../actions/userActions';

import style from './AccountList.scss';
import {
  setTokenLink,
  calculateTotalDataTransfer,
  calculateTotalStorage,
} from '../../helpers';
import SearchPlan from './SearchPlan';

class AccountList extends Component {
  state = {
    apps: '',
    authoringAppId: '',
    loading: true,
    search: '',
  };

  componentDidMount = () => {
    const label = [];
    const transferredGraphData = [];
    const storedGraphData = [];
    let totalStoredData = 0;
    let totalTransferredData = 0;
    let totalStoreDataLabel = '';
    let totalTransferredDataLabel = '';
    this.setState({
      apps: this.props.apps,
      authoringAppId: this.props.defaultAppId,
    });

    _.map(this.props.apps, app => {
      label.push(`${app.dsAppName} (${app.dsAppId})`);
      transferredGraphData.push(app.ioUsage ? app.ioUsage : 0);
      this.appColor.push(app.color);
      storedGraphData.push(app.storageUsage ? app.storageUsage : 0);
      totalStoredData += app.storageUsage ? app.storageUsage : 0;
      totalTransferredData += app.ioUsage ? app.ioUsage : 0;
    });

    totalStoreDataLabel =
      totalStoredData >= 1024
        ? ` ${(totalStoredData / 1024).toFixed(1)} GBh`
        : `${totalStoredData.toFixed(1)} MBh`;
    totalTransferredDataLabel =
      totalTransferredData >= 1024
        ? ` ${(totalTransferredData / 1024).toFixed(2)} GB`
        : `${totalTransferredData} MB`;

    this.setState({
      legendLabel: label,
      transferredGraphData,
      storedGraphData,
      totalStoredData,
      totalTransferredData,
      totalStoreDataLabel,
      totalTransferredDataLabel,
      loading: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultAppId) {
      // eslint-disable-next-line react/destructuring-assignment
      if (nextProps.defaultAppId !== this.state.authoringAppId) {
        this.setState({
          apps: nextProps.apps,
          authoringAppId: nextProps.defaultAppId,
        });
      }
    }
  }

  tokenType = 'TEMPORARY';

  tokenDescription = 'HERE Studio Token';

  ttl = 3600;

  // seconds
  appColor = [];

  getMaxRightsTokens = () => {
    axios
      .get(`${tokenApiUrl}/maxRights`, { withCredentials: true })
      .then(response => {
        const maxRights = response.data;
        this.getToken(maxRights);
      })
      .catch(this.catchInvalidUser);
  };

  getToken = rights => {
    axios
      .post(
        `${tokenApiUrl}/token?tokenType=${this.tokenType}&ttl=${this.ttl}`,
        {
          urm: rights,
          cid: this.props.defaultAppId,
          description: this.tokenDescription,
        },
        { withCredentials: true }
      )
      .then(response => {
        store.dispatch(switchAppID(response.data.tid));
        this.setState({ loading: false });
        // window.location.reload(); //this is workaround just for GA release
      })
      .catch(() => this.openSignIn());
  };

  onSwitchingAuthoringAppId = (appId, aid) => {
    this.setState({ loading: true });
    gateKeeperAPI
      .patch(`/${aid}`, { defaultAppId: `${appId}` }, { withCredentials: true })
      .then(() => {
        this.getMaxRightsTokens();
        store.dispatch(updateAppId(appId));
      })
      .catch(e => apiErrorHandler(e));
  };

  infoIconClass = app => {
    let classes = '';
    const ioUsage = (app.ioUsage ? app.ioUsage : 0) / 1024 / app.tariff.freeIO;
    const storageUsage =
      (app.storageUsage ? app.storageUsage : 0) /
      1024 /
      (app.tariff.freeStorage * 30 * 24);

    if (ioUsage >= 0.8 || storageUsage >= 0.8) {
      classes = `${style.infoIcon} ${style.red}`;
    } else if (
      (ioUsage > 0.5 && ioUsage < 0.8) ||
      (storageUsage > 0.5 && storageUsage < 0.8)
    ) {
      classes = `${style.infoIcon} ${style.green}`;
    } else if (
      ioUsage <= 0.5 ||
      storageUsage <= 0.5 ||
      (app.payMethodName &&
        app.payMethodName.indexOf('Tokenized Credit Card') > -1)
    ) {
      classes = `${style.infoIcon} ${style.noColor}`;
    }
    return classes;
  };

  manageMyPlan = () => {
    window.open(`${process.env.REACT_APP_APP_DEVELOPER}/projects`, '_blank');
  };

  formatDate = date => {
    const formatedDate = date.replace(/-/g, '/');
    const d = new Date(formatedDate);
    const dateArr = d.toDateString().split(' ');
    return `${dateArr[2]} ${dateArr[1].toUpperCase()} ${dateArr[3]}`;
  };

  goToDetailsPage = appId => {
    this.props.history.push(setTokenLink(`/account-dashboard/${appId}`));
  };

  renderPlanList = () => {
    let filteredPlan = this.state.apps;
    filteredPlan = _.orderBy(filteredPlan, ['dsAppName'], ['asc']);

    if (this.state.search.length) {
      filteredPlan = _.filter(
        this.state.apps,
        obj =>
          !_.isEmpty(obj) &&
          obj.dsAppName &&
          new RegExp(_.escapeRegExp(this.state.search), 'gi').test(
            obj.dsAppName
          )
      );
    }

    return _.map(filteredPlan, app => {
      return (
        <div
          role="presentation"
          onClick={() => this.goToDetailsPage(app.dsAppId)}
          key={app.dsAppId}
          className={style.plan}
          style={{ borderLeft: `4px solid ${app.color}` }}
        >
          <div>
            {app.status.toLowerCase() === 'active' ? (
              <span className={this.infoIconClass(app)}>!</span>
            ) : (
              <span className={`${style.infoIcon} ${style.cross}`}>X</span>
            )}
            <div className={style.planDetails}>
              <span className={style.planName}>{app.dsAppName}</span> (APP ID:{' '}
              {app.dsAppId} )<br />
              {app.creationTime && (
                <span className={style.planDate}>
                  Created On:{' '}
                  {app.creationTime && this.formatDate(app.creationTime)}
                </span>
              )}
            </div>
          </div>
          <div>{app.usageEndDate && this.formatDate(app.usageEndDate)}</div>
          <div>
            {typeof app.ioUsage !== 'undefined'
              ? `${(
                  (app.ioUsage /
                    calculateTotalDataTransfer(app.tariff.freeIO)) *
                  100
                ).toFixed(1)}%`
              : '-'}
          </div>
          <div>
            {typeof app.storageUsage !== 'undefined'
              ? `${(
                  (app.storageUsage /
                    calculateTotalStorage(app.tariff.freeStorage)) *
                  100
                ).toFixed(1)}%`
              : '-'}
          </div>
          <div>
            {this.props.defaultAppId === app.dsAppId ? (
              <div className={style.appID}>
                <div className={style.dot} />
                CURRENTLY ACTIVE
              </div>
            ) : (
              ''
            )}
            <Edit
              billingUrl={`${process.env.REACT_APP_APP_DEVELOPER}/billing-management`}
              cancelPlanUrl={`${process.env.REACT_APP_APP_DEVELOPER}/projects/${app.dsProductId}`}
              authoringAppId={this.state.authoringAppId}
              currentAppId={app.dsAppId}
              accountId={app.aid}
              status={app.status}
              onSwitchingAuthoringAppId={this.onSwitchingAuthoringAppId}
            />
          </div>
        </div>
      );
    });
  };

  searchPlan = (query = '') => {
    this.setState({ search: query });
  };

  render() {
    const {
      loading,
      legendLabel,
      totalTransferredData,
      transferredGraphData,
      totalTransferredDataLabel,
      totalStoredData,
      storedGraphData,
      totalStoreDataLabel,
    } = this.state;

    return loading ? (
      <div className="login-spin" />
    ) : (
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.header}>
            <div>
              <span className={style.pageTitle}>Account Dashboard</span>
            </div>
            <div>
              <Button onClick={this.manageMyPlan} text="Manage My Plans" />
            </div>
          </div>
          <div className={style.graphContainer}>
            <div className={style.transferredGraph}>
              {totalTransferredData > 1 ? (
                <DoughnutChart
                  labels={legendLabel}
                  data={transferredGraphData}
                  colors={this.appColor}
                  title="Total Data Transfer"
                  totalUsage={totalTransferredDataLabel}
                  labelAlign="left"
                />
              ) : (
                <div className={style.noGraphData}>
                  <span>No data transferred yet!</span>
                </div>
              )}
            </div>
            <div className={style.storedGraph}>
              {totalStoredData > 1 ? (
                <DoughnutChart
                  labels={legendLabel}
                  data={storedGraphData}
                  title="Total Database Storage"
                  colors={this.appColor}
                  totalUsage={totalStoreDataLabel}
                  labelAlign="right"
                />
              ) : (
                <div className={style.noGraphData}>
                  <span>No data stored yet!</span>
                </div>
              )}
            </div>
          </div>
          <div className={style.planListContainer}>
            <div className={style.header}>
              <div>Plan Name</div>
              <div>Billing Date</div>
              <div>
                Data Transfer
                <br />
                (% of free limit)
              </div>
              <div>
                Database Storage
                <br />
                (% of free limit)
              </div>
              <SearchPlan onSearch={this.searchPlan} />
            </div>
            {this.renderPlanList()}
          </div>
        </div>
      </div>
    );
  }
}

const s2p = state => ({
  defaultAppId: state.user.defaultAppId,
  apps: state.user.apps,
  payMethodName: state.user.payMethodName,
});

export default connect(s2p, null)(withRouter(AccountList));
