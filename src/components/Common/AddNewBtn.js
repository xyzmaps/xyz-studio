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

import { Plus, NewEmptyLayer } from '../../icons';
import style from './AddNewBtn.scss';

const AddNewBtn = ({
  onBtnClick,
  text,
  hidePlus,
  showNewLayer,
  toolTip = '',
  siteTourId,
}) => {
  return (
    <span
      role="presentation"
      className={style.AddBtn}
      onClick={onBtnClick}
      data-tip={toolTip}
      data-tut={siteTourId || null}
    >
      {showNewLayer && (
        <NewEmptyLayer className={style.newLayer} color="var(--color-green)" />
      )}
      {!hidePlus && <Plus />}
      {text}
    </span>
  );
};

export default AddNewBtn;
