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

import { SchemaWBG, UploadNew } from '../../icons';
import logEvent from '../../utils/amplitudeLogger';

import style from './AddDataLayerProFeature.scss';

const AddDataLayerProFeature = ({ fileDetails, addSpaces, onApplyPro }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.fileName}>File Name: {fileDetails.name}</div>
        <div className={style.subtitle}>
          Apply <span>Add On features</span> (Schema Validation) to selected
          file OR <span>continue to upload</span> without applying Add On
          features.
        </div>
        <div className={style.actionWrapper}>
          <div className={style.actionContainer}>
            <SchemaWBG />
            <Button
              text="Apply Add On features"
              onClick={() => {
                logEvent('apply_addon');
                onApplyPro();
              }}
            />
          </div>
          <div className={style.actionContainer}>
            <UploadNew className={style.upload} fill="#fff" />
            <Button
              text="Skip and continue upload"
              onClick={() => {
                logEvent('skip_to_upload');
                addSpaces();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDataLayerProFeature;
