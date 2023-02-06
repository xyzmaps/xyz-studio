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

import style from './ProgressBar.scss';

export default class ProgressBar extends Component {
  state = {
    exceptionTxt: '',
    exceptionType: '',
    action: false,
    usage:
      this.props.total === 0
        ? this.props.current
        : this.props.current / this.props.total,
  };

  componentDidMount() {
    const { usage } = this.state;
    const { payAsYouGo } = this.props;

    if (usage > 0.5 && usage <= 0.8) {
      this.setState({
        exceptionType: style.lowWarning,
        action: true,
        exceptionTxt: 'You will reach your data limit soon!',
      });
    } else if (usage >= 0.81 && usage <= 0.9999) {
      this.setState({
        exceptionType: style.highWarning,
        action: true,
        exceptionTxt: 'You will reach your data limit soon!',
      });
    } else if (usage >= 1) {
      if (payAsYouGo) {
        this.setState({
          exceptionType: style.payAsYouGo,
          exceptionTxt: 'You are now using Pay As You Grow billing',
        });
      } else {
        this.setState({
          exceptionType: style.exceeded,
          action: true,
          exceptionTxt: 'You have exceeded the data limit!',
        });
      }
    } else {
      this.setState({
        exceptionType: '',
        exceptionTxt: null,
      });
    }
  }

  remainingData = () => {
    let s = '';
    if (Math.sign(this.props.total - this.props.current) >= 0) {
      s = `(${((this.props.total - this.props.current) / 1024).toFixed(
        1
      )} GB Remaining)`;
    } else {
      s = `(${((this.props.current - this.props.total) / 1024).toFixed(
        1
      )} GB exceeded)`;
    }

    return s;
  };

  render() {
    const { usage, exceptionType, action, exceptionTxt } = this.state;
    const {
      payAsYouGo,
      billingPeriod,
      label,
      current,
      total,
      tariff,
    } = this.props;
    return (
      <div className={`${style.wrapper} ${exceptionType}`}>
        <div className={style.barInfo}>
          <span className={style.label}>
            {label} {`(${billingPeriod})`}
          </span>

          {tariff !== '0 GB' ? (
            <span className={style.usage}>
              <span>{`${(usage * 100).toFixed(1)}%`}</span>

              <span>&nbsp;of Free Limit</span>
            </span>
          ) : (
            <span className={style.usage}>
              <span>
                {label === 'Database Storage'
                  ? `${usage.toFixed(3)} GBh`
                  : `${(usage / 1024).toFixed(3)} GB`}
              </span>
            </span>
          )}
        </div>

        {tariff !== '0 GB' && (
          <div className={style.bar}>
            <div
              className={`${style.progress} ${
                label.indexOf('Storage') > -1 ? style.stored : style.transfrred
              }`}
              style={{
                width: `${usage > 1 ? 100 : usage * 100}%`,
              }}
            />
          </div>
        )}

        {exceptionTxt && tariff !== '0 GB' && (
          <span className={style.exception}>
            {payAsYouGo && current > total ? (
              <span className={style.smileIcon}>&#9786;</span>
            ) : (
              <span className={style.infoIcon}>!</span>
            )}
            &nbsp;
            {exceptionTxt}
            &nbsp;
            {!payAsYouGo && action && (
              <button
                type="button"
                className={style.progressLink}
                onClick={() =>
                  window.open(
                    'https://developer.here.com/billing-management',
                    '_blank'
                  )
                }
              >
                Upgrade Now
              </button>
            )}
          </span>
        )}
      </div>
    );
  }
}
