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

import styleGroupConfig from './styleGroupsConfig';
import base64Svg from '../icons/svgBase64Obj.json';

/* eslint-disable */
const hex2rgb = hex =>
  `rgba(${[
    `0x${hex[1]}${hex[2]}` | 0,
    `0x${hex[3]}${hex[4]}` | 0,
    `0x${hex[5]}${hex[6]}` | 0,
    1,
  ]})`;
/* eslint-enable */

const getRandomColor = () =>
  hex2rgb(
    styleGroupConfig.colors[
      Math.floor(Math.random() * styleGroupConfig.colors.length)
    ]
  );

const basicLayerStyle = (
  id = null,
  geometry = null,
  count = 0,
  defaultStyle = null
) => {
  const slug = id ? `_${id}` : '';
  const zIndexPrefix = defaultStyle
    ? `${defaultStyle[0].zIndex.toString()[0]}`
    : 0;
  if (id) {
    switch (geometry) {
      case 'Point': {
        let geometryType = 'Circle';
        const { type } = defaultStyle[0];
        if (defaultStyle && defaultStyle[0].type !== 'none') {
          geometryType = type;
        }
        return {
          [`pointStyle${slug}`]: [
            {
              fill: getRandomColor(),
              type: geometryType,
              height: defaultStyle ? defaultStyle[0].height : 16,
              width: defaultStyle ? defaultStyle[0].width : 16,
              radius: defaultStyle ? defaultStyle[0].radius : 8,
              zIndex: Number(zIndexPrefix + (3 + count * 10)),
              opacity: 1,
            },
            {
              fill: defaultStyle ? defaultStyle[1].fill : getRandomColor(),
              type: geometryType,
              height: defaultStyle ? defaultStyle[1].height : 20,
              width: defaultStyle ? defaultStyle[1].width : 20,
              radius: defaultStyle ? defaultStyle[1].radius : 10,
              zIndex: Number(zIndexPrefix + (2 + count * 10)),
              opacity: 1,
            },
            {
              src: base64Svg['lui-icon-destinationpin-ffffff'],
              baseSrc: styleGroupConfig.markerIcons[0].value,
              type: 'Image',
              height: 10,
              width: 10,
              zIndex: Number(zIndexPrefix + (4 + count * 10)),
              opacity: 0,
              offsetX: 0,
              offsetY: 0,
              iconColor: '#ffffff',
            },
          ],
        };
      }
      case 'Line':
        return {
          [`lineStyle${slug}`]: [
            {
              type: 'Line',
              stroke: getRandomColor(),
              zIndex: Number(zIndexPrefix + (1 + count * 10)),
              opacity: 1,
              strokeWidth: defaultStyle ? defaultStyle[0].strokeWidth : 6,
              strokeLinecap: 'round',
              strokeLinejoin: 'miter',
              strokeDasharray: [0, 0],
            },
          ],
        };
      case 'Polygon':
        return {
          [`polygonStyle${slug}`]: [
            {
              fill: getRandomColor(),
              type: 'Polygon',
              stroke: defaultStyle ? defaultStyle[0].stroke : getRandomColor(),
              zIndex: Number(zIndexPrefix + (0 + count * 10)),
              opacity: 1,
              strokeWidth: defaultStyle ? defaultStyle[0].strokeWidth : 1,
              strokeLinecap: 'square',
              strokeLinejoin: 'round',
              strokeDasharray: [0, 0],
            },
          ],
        };
      default:
        return {};
    }
  }
  return {
    polygonStyle: [
      {
        fill: getRandomColor(),
        type: 'Polygon',
        stroke: getRandomColor(),
        zIndex: 70,
        opacity: 1,
        strokeWidth: 1,
        strokeLinecap: 'square',
        strokeLinejoin: 'round',
        strokeDasharray: [0, 0],
      },
    ],
    lineStyle: [
      {
        type: 'Line',
        stroke: getRandomColor(),
        zIndex: 81,
        opacity: 1,
        strokeWidth: 6,
        strokeLinecap: 'round',
        strokeLinejoin: 'miter',
        strokeDasharray: [0, 0],
      },
    ],
    pointStyle: [
      {
        fill: getRandomColor(),
        type: 'Circle',
        height: 16,
        width: 16,
        radius: 8,
        zIndex: 93,
        opacity: 1,
      },
      {
        fill: getRandomColor(),
        type: 'Circle',
        height: 20,
        width: 20,
        radius: 10,
        zIndex: 92,
        opacity: 1,
      },
      {
        src: base64Svg['lui-icon-destinationpin-ffffff'],
        baseSrc: styleGroupConfig.markerIcons[0].value,
        type: 'Image',
        height: 10,
        width: 10,
        zIndex: 94,
        opacity: 0,
        offsetX: 0,
        offsetY: 0,
        iconColor: '#ffffff',
      },
    ],
  };
};

export default basicLayerStyle;
