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
import _ from 'lodash';

import Button from '../Common/Button';
// import {Close} from '../../icons';
import style from './AddDataLayerSection.scss';
import { trunc, getFormatedMSLabel } from '../../helpers';

const appendItem = tags => {
  return _.map(tags, (obj, key) => {
    return (
      <li key={key}>
        <strong>{trunc(getFormatedMSLabel(obj))}</strong>
      </li>
    );
  });
};

const AddDataLayerSection = ({
  loading,
  text,
  onButtonClick,
  buttonText,
  disabled,
  tags,
  onRomveItem,
}) => {
  return (
    <div className={`${style.wrapper} ${loading && style.loading}`}>
      <div className={`${style.row}`}>
        <p>{text}</p>
        <Button onClick={onButtonClick} text={buttonText} disabled={disabled} />
      </div>
      {tags && tags.length > 0 && (
        <ul className={style.selectedList}>
          <li className={style.title}>Microsoft Building Footprint Data</li>
          {appendItem(tags, onRomveItem)}
        </ul>
      )}
    </div>
  );
};

export default AddDataLayerSection;
