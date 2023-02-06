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

/* eslint-disable */
const countriesBright = {
  mainColors: ['#67D2C8', '#F7F7F7'],
  backgroundColor: '#67D2C8',
  strokeWidthZoomScale(level) {
    let value = 0.25;
    if (level > 17) {
      value = 1;
    } else if (level > 14) {
      value = 0.5;
    }

    return value;
  },

  styleGroups: {
    water: [
      {
        zIndex: 4,
        type: 'Polygon',
        fill: '#F7F7F7',
      },
    ],

    earth: [
      {
        zIndex: 1,
        type: 'Polygon',
        fill: '#67D2C8',
      },
    ],

    countryBoundary: [
      {
        zIndex: 5,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#F7F7F7',
      },
    ],

    countryBoundaryZ9: [
      {
        zIndex: 5,
        type: 'Line',
        strokeWidth: 14,
        stroke: '#F7F7F7',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 5,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#F7F7F7',
        strokeDasharray: [3, 4],
      },
    ],

    buildings: [
      {
        zIndex: 4,
        type: 'Polygon',
        fill: '#F7F7F7',
      },
    ],
  },

  assign(feature, level) {
    const props = feature.properties;
    const { kind } = props;
    const { layer } = props;
    const geom = feature.geometry.type;

    if (layer === 'earth') {
      return 'earth';
    }

    if (layer === 'water') {
      if (geom === 'LineString' || geom === 'MultiLineString') {
        return '';
      }

      return 'water';
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 9) {
          if (props.maritime_boundary === true) {
            return '';
          }
          return 'countryBoundaryZ9';
        }
        if (level >= 1) {
          return 'countryBoundary';
        }
      }
      if (props.maritime_boundary === true) {
        return '';
      }
      if (kind === 'disputed') {
        return 'dashed_boundary';
      }
      if (kind === 'line_of_control') {
        return 'dashed_boundary';
      }
      if (kind === 'indefinite') {
        return 'dashed_boundary';
      }
      if (kind === 'indeterminate') {
        return 'dashed_boundary';
      }
    }

    if (layer === 'buildings') {
      return layer;
    }

    return '';
  },
};

export default countriesBright;
