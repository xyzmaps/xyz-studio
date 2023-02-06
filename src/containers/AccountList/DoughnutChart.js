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
import DonutChart from 'react-donut-chart';

import style from './DoughnutChart.scss';

export default function DoughnutChart({
  labels,
  data: _data,
  colors,
  labelAlign,
  title,
}) {
  const createData = () => {
    const chartData = [];

    colors.forEach((color, index) => {
      chartData.push({
        label: labels[index],
        value: _data[index],
      });
    });
    return chartData;
  };

  const createLegend = () => {
    return _.map(colors, (color, index) => {
      return (
        <li key={index}>
          <span style={{ borderColor: color }} />
          {labels[index]}
        </li>
      );
    });
  };

  return (
    <div className={labelAlign === 'left' ? style.leftSide : style.rightSide}>
      <div className={`${style.chartInfo} ${style.leftSideInfo}`}>
        <div className={style.chartTitle}>{title}</div>
        <ul>{createLegend()}</ul>
      </div>
      {
        <DonutChart
          height={220}
          width={220}
          colors={colors}
          data={createData()}
          clickToggle={false}
          legend={false}
          innerRadius={0.74}
          strokeColor="transparent"
          selectedOffset={0}
        />
      }
      <div className={`${style.chartInfo} ${style.rightSideInfo}`}>
        <div className={style.chartTitle}>{title}</div>
        <ul>{createLegend()}</ul>
      </div>
    </div>
  );
}
