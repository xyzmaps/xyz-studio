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
import AddOnSchema from './AddOnSchema';

import { SchemaWBG } from '../../icons';
import style from './AddDataLayerProSetting.scss';

const AddDataLayerProSetting = props => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        Set your <span>Add On Features</span> to spaces during file upload OR
        even after upload
        <div className={style.featureTab}>
          <div className={`${style.featureSelect} ${style.selected}`}>
            <div className={style.featureIcon}>
              <div className={style.pro}>Add On</div>
              <SchemaWBG />
            </div>
            Schema Validation
          </div>
        </div>
      </div>
      <div className={style.proSetting}>
        <div className={style.fileName}>
          {' '}
          File Name: {props.fileDetails.name}
        </div>
        <AddOnSchema
          onCancel={props.onCancel}
          onApplyClick={props.onApplyClick}
          title={props.fileDetails.name}
          onUpload={props.confirmAlert}
          schemaResponse={props.schemaResponse}
        />
      </div>
    </div>
  );
};

export default AddDataLayerProSetting;
