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

import React, { useState, useEffect } from 'react';
import style from './DataTableButton.scss';
import { Table } from '../../../icons';

const DataTableButton = ({ message, onClick }) => {
  const [expand, toggleExpand] = useState(false);
  const dataAavailableStyle =
    !message && !expand ? `${style.tableAvailable} ${style.rippleFx}` : '';
  const expandStyle = expand ? `${style.expand}` : '';
  let clearExpandTimeout = null;

  // Shrink when the message is available
  useEffect(() => {
    if (expand && !message) {
      toggleExpand(!!message);
    }
  }, [message]);

  // Shrink the data table button after 3 seconds
  useEffect(() => {
    if (expand) {
      clearExpandTimeout = setTimeout(() => {
        toggleExpand(false);
      }, 5000);
    }
  }, [expand]);

  const onTableClick = () => {
    if (!message && !expand) {
      onClick();
    } else {
      clearTimeout(clearExpandTimeout);
      toggleExpand(!expand);
    }
  };

  return (
    <button
      type="button"
      onClick={onTableClick}
      className={`${style.tableIconWrapper} ${dataAavailableStyle} ${expandStyle}`}
    >
      <Table className={style.table} />

      <span>{expand ? message : ''}</span>
    </button>
  );
};

export default DataTableButton;
