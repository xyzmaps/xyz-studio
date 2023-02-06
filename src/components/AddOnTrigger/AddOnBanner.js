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

import React from 'react';
import Button from '../Common/Button';
import AddOnTrigger from './AddOnTrigger';
import logEvent from '../../utils/amplitudeLogger';
import {
  HexbinAdd,
  VirtualSpace,
  SchemaWBG,
  SchemaBBG,
  ActivityLog,
} from '../../icons';

import style from './AddOnBanner.scss';

const AddOnBanner = ({ addData, account, isPro, showAlert, hideAlert }) => {
  let subWidth = '50%';
  if (addData && isPro) subWidth = '70%';

  return (
    <div
      className={style.proContainer}
      style={addData || account ? { color: 'var(--color-bluegray)' } : {}}
    >
      <div
        className={account ? style.accountHeader : style.proHeader}
        style={addData ? { width: subWidth } : {}}
      >
        <div className={style.title}>Add On Features</div>
        <div className={style.subtitle} style={addData ? { width: '60%' } : {}}>
          The Add on plan provides a much larger increase in transactions and
          expands the features offered within Studio and Data Hub, such as
          Hexbins, Activity Log, Schema Validation, and much more!
        </div>
      </div>
      <div className={account ? style.accountIcons : style.icons}>
        <span
          data-width="large"
          data-tip="Hexbins is a data aggregation and data visualization method, and is well-suited for summarizing and analysing point data in spaces."
        >
          <HexbinAdd fill={`${addData || account ? '#000000' : '#FFFFFF'}`} />
        </span>
        <span
          data-width="large"
          data-tip="Schema Validation allows you to build rules around how the data in your Space is formatted, preventing data management issues."
        >
          {addData || account ? <SchemaBBG /> : <SchemaWBG />}
        </span>
        <span
          data-width="large"
          data-tip="Activity log allows you to keep a track on the changes performed on your space data."
        >
          <ActivityLog fill={`${addData || account ? '#000000' : '#FFFFFF'}`} />
        </span>
        <span
          data-width="large"
          data-tip="A virtual-space is a way of working with multiple spaces at the same time."
        >
          <VirtualSpace
            fill={`${addData || account ? '#000000' : '#FFFFFF'}`}
          />
        </span>
      </div>
      {!isPro && (
        <div className={account ? style.accountButtons : style.buttons}>
          <Button
            text="Get Add On Features"
            onClick={() => {
              logEvent('click_non_pro_user_to_devportal');
              window.open('https://developer.here.com/pricing', '_blank');
            }}
          />
          <Button
            text="Know more"
            type="primary"
            onClick={() =>
              showAlert({
                customAlert: <AddOnTrigger hideAlert={hideAlert} />,
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default AddOnBanner;
