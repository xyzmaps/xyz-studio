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
import logEvent from '../../utils/amplitudeLogger';
import { HexbinAdd, VirtualSpace, SchemaWBG, ActivityLog } from '../../icons';

import style from './AddOnTrigger.scss';

const AddOnTrigger = ({ hideAlert }) => {
  const closeProTrigger = () => {
    hideAlert();
  };

  const gotoProFeatures = () => {
    window.open('https://developer.here.com/pricing', '_blank');
    logEvent('click_non_pro_user_to_devportal');
    hideAlert();
  };

  return (
    <div className={style.popupOverlay}>
      <div className={style.popupContentWrapper}>
        <div className={style.header}>
          <span className={style.title}>Add On Features</span>
          <div className={style.subtitle}>
            The Add on plan provides a much larger increase in transactions and
            expands the features offered within Studio and Data Hub, such as
            Hexbins, Activity Log, Schema Validation, and much more!
          </div>
        </div>
        <div className={style.popupContent}>
          <div className={style.featContent}>
            <span>
              <HexbinAdd />
              <div>Hexbin</div>
            </span>
            <p>
              Hexbins is a data simplification and data visualization method,
              and is well-suited for summarizing and analysing point data in
              spaces.{' '}
            </p>
          </div>
          <div className={style.featContent}>
            <span>
              <VirtualSpace />
              <div>Virtual Spaces</div>
            </span>
            <p>
              A virtual-space is described by a definition which references
              other existing spaces (the upstream spaces). Queries being done to
              a virtual-space will return the features of its upstream spaces
              combined. There are different predefined operations of how to
              combine the features of the upstream spaces. Additionally using
              the custom operation a Javascript style lambda expression can be
              specified to describe exactly how to do the combination.{' '}
            </p>
          </div>
          <div className={style.featContent}>
            <span>
              <ActivityLog />
              <div>Activity Log</div>
            </span>
            <p>
              Activity log allows you to keep a track on the changes performed
              on your space data.{' '}
            </p>
          </div>
          <div className={style.featContent}>
            <span>
              <SchemaWBG />
              <div>Schema Validation</div>
            </span>
            <p>
              Schema Validation is the contract definition to which your data
              must adhere to.{' '}
            </p>
          </div>
          <div className={style.pricing}>
            <span>Pricing and Plans:</span>
            <p>
              {' '}
              We&apos;ve got options to fit your needs now and in the future.
            </p>
          </div>
          <div className={style.buttonSet}>
            <Button
              type="primary"
              text="Cancel"
              onClick={() => closeProTrigger()}
            />
            <Button
              type="secondary-negitive"
              text="Get Add On Features"
              onClick={() => gotoProFeatures()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnTrigger;
