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
import ReactTable from 'react-table';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import Button from '../../components/Common/Button';

import ProgressBar from './ProgressBar/ProgressBar';
import { spacesAPI, apiErrorHandler } from '../../api';
import { hideAlert, showAlert } from '../../actions/mapActions';

import {
  setTokenLink,
  calculateTotalDataTransfer,
  calculateTotalStorage,
} from '../../helpers';
import { Arrow } from '../../icons';

import 'react-table/react-table.css';

import style from './AccountDashboard.scss';
import AddOnBanner from '../../components/AddOnTrigger/AddOnBanner';

class AccountDashboard extends Component {
  state = {
    currentAppId: this.props.match.params.app_id,
    authoringAppId: '',
    currentApp: '',

    spaceTableData: [],
    loading: true,
  };

  componentDidMount() {
    const { apps, defaultAppId } = this.props;
    const { currentAppId } = this.state;

    this.setState(prevState => ({
      currentApp: _.filter(
        apps,
        app => app.dsAppId === prevState.currentAppId
      )[0],
      authoringAppId: defaultAppId,
    }));

    spacesAPI
      .get('', { withCredentials: true })
      .then(spaces => {
        if (spaces.data.length === 0) this.setState({ loading: false });
        else {
          const matchedSpaces = [];

          _.forEach(spaces.data, space => {
            if (space.cid === currentAppId) {
              matchedSpaces.push(`${space.id} / ${space.title}`);
            } else {
              this.setState({ loading: false });
            }
          });

          const tableData = [];
          _.forEach(matchedSpaces, space => {
            spacesAPI
              .get(`/${space.split('/')[0].trim()}/statistics`, {
                withCredentials: true,
              })
              .then(statistics => {
                tableData.push({
                  space: space.split('/')[1].trim(),
                  features: statistics.data.count.value,
                  storage: `${(
                    statistics.data.byteSize.value /
                    (1024 * 1024 * 1024)
                  ).toFixed(4)} GB`,
                });
                this.setState({
                  spaceTableData: _.orderBy(tableData, ['features'], ['desc']),
                  loading: false,
                });
              })
              .catch(e => apiErrorHandler(e));
          });
        }
      })
      .catch(e => apiErrorHandler(e));
  }

  manageMyPlan = () => {
    window.open(
      `${process.env.REACT_APP_APP_DEVELOPER}/projects/${this.state.currentApp.dsProductId}`,
      '_blank'
    );
  };

  formatDate = (date, year, format) => {
    const d = format ? new Date(date.replace(/-/g, '/')) : date;
    // console.log(d);
    const dateArr = d.toDateString().split(' ');
    return year
      ? `${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`
      : `${dateArr[1].toUpperCase()} ${dateArr[2]}`;
  };

  getBillingPeriod = () => {
    const currentDate = new Date();

    let startDate;
    if (this.state.currentApp.usageStartDate)
      startDate = this.formatDate(
        this.state.currentApp.usageStartDate,
        false,
        true
      );

    let billingDate;
    if (this.state.currentApp.usageEndDate)
      billingDate = new Date(
        this.state.currentApp.usageEndDate.replace(/-/g, '/')
      );

    if (!startDate || !billingDate || billingDate < currentDate)
      return '(Month To Date)';

    billingDate = this.formatDate(billingDate, false, false);
    return `${startDate} - ${billingDate}`;
  };

  render() {
    const {
      loading,
      currentApp,
      currentAppId,
      authoringAppId,
      spaceTableData,
    } = this.state;
    const { isSinglePlan, payMethodName } = this.props;
    const { tariff } = currentApp;
    const isPayMethodAvailable =
      payMethodName && payMethodName.indexOf('Tokenized Credit Card') > -1;
    const columns = [
      {
        Header: 'SPACES',
        accessor: 'space',
      },
      {
        Header: 'SIZE (NO. FEATURES)',
        accessor: 'features',
      },
      {
        Header: 'SIZE (GB)',
        accessor: 'storage',
      },
    ];

    return loading ? (
      <div className="login-spin" />
    ) : (
      <div className={style.wrapper}>
        <div
          style={{ borderLeft: `4px solid ${currentApp.color}` }}
          className={style.content}
        >
          <div className={style.header}>
            <div className={style.subHeader}>
              <div>
                {isSinglePlan ? (
                  <span className={style.title}>Account Dashboard</span>
                ) : (
                  <Link to={setTokenLink('/account-dashboard')}>
                    <span className={style.backLink}>
                      <Arrow fill="#00B6B2" /> Account Dashboard
                    </span>
                  </Link>
                )}
              </div>
              <div>
                <Button onClick={this.manageMyPlan} text="Manage My Plans" />
              </div>
            </div>
            <div className={style.headerText}>
              <span className={style.appName}>
                {currentApp.dsAppName}
                <span> (APP ID: {currentApp.dsAppId})</span>
              </span>
              <br />
              {currentApp.creationTime && (
                <span>
                  Created On:{' '}
                  {currentApp.creationTime &&
                    this.formatDate(currentApp.creationTime, true, true)}
                </span>
              )}
            </div>
          </div>
          <div className={style.myPlan}>
            {/* <span>My Plan</span> */}
            <div className={style.accInfo}>
              <div className={style.layout}>
                <div className={style.container}>
                  <div className={style.leftContainer}>
                    <div className={style.date}>
                      {currentApp.usageStartDate && currentApp.usageEndDate && (
                        <span className={style.billingDate}>
                          Billing Period:{' '}
                          {`${this.formatDate(
                            currentApp.usageStartDate,
                            true,
                            true
                          )} - ${this.formatDate(
                            currentApp.usageEndDate,
                            true,
                            true
                          )}`}
                        </span>
                      )}
                      {isPayMethodAvailable ||
                      tariff.freeIO === '0 GB' ||
                      tariff.freeIO === '10 GB' ? (
                        <span className={style.astrik}>
                          *Now in pay-as-you-grow
                        </span>
                      ) : (
                        <span className={style.astrikPlan}>
                          To{' '}
                          <button
                            type="button"
                            className={style.astrikLink}
                            onClick={() =>
                              window.open(
                                'https://developer.here.com/plans',
                                '_blank'
                              )
                            }
                          >
                            Pay-as-you-grow
                          </button>{' '}
                          add your&nbsp;
                          <button
                            type="button"
                            className={style.astrikLink}
                            onClick={() =>
                              window.open(
                                'https://developer.here.com/billing-management',
                                '_blank'
                              )
                            }
                          >
                            credit card
                          </button>
                        </span>
                      )}
                    </div>
                    <div className={style.detail}>
                      <span className={style.heading1}>
                        Plan Details
                        <br />
                      </span>
                      <span className={style.heading2}>
                        Studio
                        <br />
                        <br />
                      </span>
                      {tariff.freeIO !== '0 GB' && (
                        <div>
                          <span className={style.data}>{tariff.freeIO} </span>
                          total data transfer per month
                          <br />
                          <span className={style.data}>
                            {tariff.freeStorage}
                          </span>{' '}
                          total database storage per month
                          <br />
                          <br />
                          <span className={style.data}>Pay as you grow</span>
                          <br />
                          <br />
                        </div>
                      )}
                      {tariff.freeIO !== '0 GB' ? (
                        <div>
                          Over {tariff.freeIO} total data transfer, pay $
                          {tariff.ioUnitCharges}/€
                          {tariff.ioUnitCharges} per additional {tariff.ioUnit}
                          <br />
                          Over {tariff.freeStorage} total database storage, pay
                          ${tariff.storageUnitCharges}/€
                          {tariff.storageUnitCharges} per additional{' '}
                          {tariff.storageUnit}
                          <br />
                        </div>
                      ) : (
                        <div>
                          Pay ${tariff.ioUnitCharges}/€
                          {tariff.ioUnitCharges} per additional {tariff.ioUnit}
                          <br />
                          Pay ${tariff.storageUnitCharges}/€
                          {tariff.storageUnitCharges} per additional{' '}
                          {tariff.storageUnit}
                          <br />
                        </div>
                      )}
                    </div>
                    {true && (
                      <AddOnBanner
                        account
                        showAlert={this.props.showAlert}
                        hideAlert={this.props.hideAlert}
                      />
                    )}
                  </div>
                  <div className={style.rightContainer}>
                    {!isSinglePlan && currentAppId === authoringAppId && (
                      <div className={style.appID}>
                        <div className={style.dot} />
                        CURRENTLY ACTIVE
                      </div>
                    )}
                    <span className={style.progressBarTitle}>
                      Billable usage
                    </span>
                    <div className={style.progressBar}>
                      <ProgressBar
                        tariff={tariff.freeIO}
                        payAsYouGo={
                          payMethodName &&
                          payMethodName.indexOf('Tokenized Credit Card') > -1
                        }
                        current={currentApp.ioUsage ? currentApp.ioUsage : 0.0}
                        total={calculateTotalDataTransfer(tariff.freeIO)}
                        label="Data Transfer"
                        billingPeriod={this.getBillingPeriod()}
                      />

                      <ProgressBar
                        tariff={tariff.freeStorage}
                        payAsYouGo={
                          payMethodName &&
                          payMethodName.indexOf('Tokenized Credit Card') > -1
                        }
                        current={
                          currentApp.storageUsage
                            ? currentApp.storageUsage
                            : 0.0
                        }
                        total={calculateTotalStorage(tariff.freeStorage)}
                        label="Database Storage"
                        billingPeriod={this.getBillingPeriod()}
                      />
                    </div>
                    {spaceTableData.length > 0 && (
                      <div>
                        <span className={style.tableTitle}>
                          Current storage size
                        </span>
                        <ReactTable
                          columns={columns}
                          data={spaceTableData}
                          minRows={0}
                          className="-striped -highlight"
                          showPagination={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
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

export default connect(s2p, { hideAlert, showAlert })(
  withRouter(AccountDashboard)
);
