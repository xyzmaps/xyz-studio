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
import moment from 'moment';

import AddNewBtn from '../../Common/AddNewBtn';
import style from './ProjectLayersTitle.scss';

const ProjectLayersTitle = ({ lastSave, onAdd, onNew }) => {
  return (
    <div className={style.layersTitle}>
      {lastSave && (
        <span className={style.lastSave}>
          {`Saved at ${moment(lastSave).format('HH:mm')}`}
        </span>
      )}
      <AddNewBtn
        onBtnClick={onAdd}
        text="Data"
        toolTip="Add Dataset"
        siteTourId="add-data"
      />
      <AddNewBtn
        onBtnClick={onNew}
        text="Layer"
        toolTip="Add Empty Layer"
        showNewLayer
        hidePlus
        siteTourId="add-empty-layer"
      />
    </div>
  );
};

export default ProjectLayersTitle;
