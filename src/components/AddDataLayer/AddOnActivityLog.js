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
import Button from '../Common/Button';
import Toggle from '../Common/Toggle';
import { Copy } from '../../icons';
import { spacesAPI } from '../../api';

import logEvent from '../../utils/amplitudeLogger';

// import { Info } from '../../icons';
import style from './AddOnActivityLog.scss';

export default class AddOnActivityLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityLog: false,
      disableActivityLog: false,
      disableApply: true,
      storageMode: 'FULL',
      logSpaceId: '',
      loading: false,
      error: false,
      success: false,
    };
  }

  componentDidMount() {
    this.getSpaceMeta();
  }

  getSpaceMeta = generating => {
    const { item } = this.props;

    spacesAPI
      .get(`/${item.id}`, {
        headers: {
          'Content-Type': 'application/geo+json',
        },
        withCredentials: true,
      })
      .then(response => {
        if (!response.data.enableUUID) {
          this.setState({ disableActivityLog: true });
        }

        if (
          response.data &&
          response.data.listeners &&
          response.data.listeners['activity-log-writer']
        ) {
          this.setState({
            loading: false,
            activityLog: true,
            disableApply: false,
            storageMode:
              response.data.listeners['activity-log-writer'][0].params
                .storageMode,
            logSpaceId:
              response.data.listeners['activity-log-writer'][0].params.spaceId,
          });
        } else if (generating) {
          setTimeout(() => {
            this.getSpaceMeta(null);
          }, 4000);
        } else {
          this.setState({ activityLog: false, disableApply: true });
        }
      })
      .catch(() => {
        this.setState({ error: true }, () => {
          setTimeout(() => {
            this.setState({ error: false });
          }, 4000);
        });
      });
  };

  onActivityLogToggle = () => {
    this.setState(prevState => {
      if (!prevState.activityLog) {
        return { activityLog: !prevState.activityLog, disableApply: false };
      }
      return { activityLog: !prevState.activityLog };
    });
  };

  onRadioBtnClick = type => {
    if (type === 'FULL') {
      this.setState({ storageMode: 'FULL' });
      logEvent('full_activity_log');
    } else {
      this.setState({ storageMode: 'DIFF_ONLY' });
      logEvent('diff_activity_log');
    }
  };

  selectAll = () => {
    if (this.refs.inputId.select) {
      this.refs.inputId.select();
    } else {
      this.refs.inputId.setSelectionRange(0, this.refs.inputId.value.length);
    }
  };

  copyText = () => {
    this.selectAll();
    document.execCommand('copy');
  };

  onApply = () => {
    const { storageMode, activityLog } = this.state;
    const { item } = this.props;
    let payload = {};

    if (activityLog) {
      payload = {
        listeners: {
          'activity-log': [
            {
              eventTypes: ['ModifySpaceEvent.request'],
              id: 'activity-log',
              params: {
                storageMode,
              },
            },
          ],
        },
      };
    } else {
      payload = { listeners: { 'activity-log': null } };
    }

    this.setState(
      {
        loading: true,
      },
      () => {
        spacesAPI
          .patch(`/${item.id}`, JSON.stringify(payload), {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(() => {
            let logSpaceIdText;
            let disableApplyState;
            if (activityLog) {
              logSpaceIdText = 'Generating';
              disableApplyState = false;
              logEvent('enable_activity_log');
            } else {
              logSpaceIdText = '';
              disableApplyState = true;
            }
            this.setState(
              {
                loading: false,
                success: true,
                logSpaceId: logSpaceIdText,
                disableApply: disableApplyState,
              },
              () => {
                setTimeout(() => {
                  this.setState({ success: false });
                  if (activityLog) this.getSpaceMeta('generating');
                }, 4000);
              }
            );
          })
          .catch(() => {
            this.setState({ loading: false, error: true }, () => {
              setTimeout(() => {
                this.setState({ error: false });
              }, 4000);
            });
          });
      }
    );
  };

  render() {
    const {
      activityLog,
      storageMode,
      logSpaceId,
      loading,
      disableActivityLog,
      disableApply,
    } = this.state;
    const { id, title } = this.props.item;

    return (
      <div>
        {loading ? (
          <div className={style.loading}>
            <div className={style.spinner} />
          </div>
        ) : (
          <div className={style.activityWrapper}>
            <div className={style.header}>Activity Log </div>
            <div className={style.subHeader}>
              <span className={style.spaceMeta}>{`${title} (id: ${id})`}</span>
              <span className={style.activityInfo}>
                Allows you to maintain a history change log for your data in
                this space.
              </span>
            </div>
            <div className={style.activityContent}>
              <div>Activity Log:</div>
              <div>
                <Toggle
                  featureType="Point"
                  onToggle={this.onActivityLogToggle}
                  active={activityLog}
                  toolTipText="Activity log can not be enable for this space."
                  toolTipX="left"
                  disabled={disableActivityLog}
                  style={{ margin: '0', justifyContent: 'left' }}
                />
              </div>
              <div>Storage Mode:</div>
              <div>
                <div className={style.radioBtnContainer}>
                  <button
                    type="button"
                    onClick={() => this.onRadioBtnClick('FULL')}
                    className={`${style.radioBtn} ${
                      storageMode === 'FULL' ? style.selected : ''
                    }`}
                  />
                  <span
                    onClick={() => this.onRadioBtnClick('FULL')}
                    role="presentation"
                    className={style.buttonName}
                  >
                    Full
                  </span>
                </div>
                <div className={style.radioBtnContainer}>
                  <button
                    type="button"
                    onClick={() => this.onRadioBtnClick('DIFF_ONLY')}
                    className={`${style.radioBtn} ${
                      storageMode === 'DIFF_ONLY' ? style.selected : ''
                    }`}
                  />
                  <span
                    onClick={() => this.onRadioBtnClick('DIFF_ONLY')}
                    role="presentation"
                    className={style.buttonName}
                  >
                    only Changed
                  </span>
                </div>
              </div>
              <div>Log SpaceId: </div>
              <div>
                {activityLog && logSpaceId ? (
                  <div className={style.copyContainer}>
                    <input
                      className={style.inputfield}
                      type="text"
                      ref="inputId"
                      value={logSpaceId}
                      readOnly
                    />
                    <div
                      role="presentation"
                      title="Copy spaceId"
                      className={style.copyIcon}
                      onClick={this.copyText}
                    >
                      <span>
                        <Copy />
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className={style.logSpaceInfo}>
                    Enable the Activity Log to generate the log space.
                  </span>
                )}
              </div>
            </div>
            <div className={style.apply}>
              <Button
                disabled={disableActivityLog || disableApply}
                text="Apply"
                title={
                  disableActivityLog
                    ? 'Activity log can not be enable for this space.'
                    : ''
                }
                onClick={this.onApply}
              />
            </div>
            {this.state.success && (
              <div className={style.success}>
                Changes were applied Successfully!!
              </div>
            )}
            {this.state.error && (
              <div className={style.error}>
                Something went wrong, changes were not applied. Try Again!!
              </div>
            )}
            {this.state.disableActivityLog && (
              <div className={style.warning}>
                Activity log can not be enable for this space. As UUID was not
                enabled at time of sapce creation. Please create new space to
                use Activity Log.
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
