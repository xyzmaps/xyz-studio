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
const springBright = {
  mainColors: ['#89D8F5', '#C1E07E'],
  backgroundColor: '#F4F1ED',
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
        zIndex: 200,
        type: 'Polygon',
        fill: '#89D8F5',
      },
    ],

    waterZ8: [
      {
        zIndex: 200,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#669BD4',
      },
      {
        zIndex: 200,
        type: 'Polygon',
        fill: '#89D8F5',
      },
    ],

    waterZ14: [
      {
        zIndex: 200,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#669BD4',
      },
      {
        zIndex: 200,
        type: 'Polygon',
        fill: '#89D8F5',
      },
    ],

    earth: [
      {
        zIndex: 1,
        type: 'Polygon',
        fill: '#F4F1ED',
      },
    ],

    countryBoundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#B9C3C7',
      },
    ],

    countryBoundaryZ7: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 14,
        stroke: '#B9C3C7',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#B9C3C7',
        strokeDasharray: [3, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 256,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#B9C3C7',
        opacity: 0.75,
      },
    ],

    nationalForest: [
      {
        zIndex: 31,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 31,
        type: 'Polygon',
        fill: '#B4E092',
      },
    ],

    nationalPark: [
      {
        zIndex: 18,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 18,
        type: 'Polygon',
        fill: '#ABE884',
      },
    ],

    park: [
      {
        zIndex: 24,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 24,
        type: 'Polygon',
        fill: '#C1E07E',
      },
    ],

    beach: [
      {
        zIndex: 95,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 95,
        type: 'Polygon',
        fill: '#FFEA87',
      },
    ],

    university: [
      {
        zIndex: 39,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 39,
        type: 'Polygon',
        fill: '#FFD399',
      },
    ],

    golfCourse: [
      {
        zIndex: 56,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 56,
        type: 'Polygon',
        fill: '#B4E070',
      },
    ],

    zoo: [
      {
        zIndex: 51,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 51,
        type: 'Polygon',
        fill: '#E2F0AA',
      },
    ],

    hospital: [
      {
        zIndex: 54,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 54,
        type: 'Polygon',
        fill: '#EED5F5',
      },
    ],

    industrial: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 21,
        type: 'Polygon',
        fill: '#ECEBE1',
      },
    ],

    glacier: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 29,
        type: 'Polygon',
        fill: '#FFFFFF',
      },
    ],

    cemetery: [
      {
        zIndex: 78,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 78,
        type: 'Polygon',
        fill: '#DAE7C0',
      },
    ],

    military: [
      {
        zIndex: 45,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 45,
        type: 'Polygon',
        fill: '#E9EBEC',
      },
    ],

    runway: [
      {
        zIndex: 65,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#F2AAD5',
      },
      {
        zIndex: 65,
        type: 'Polygon',
        fill: '#F0E6E8',
      },
    ],

    motorway: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#FFA45E',
      },
    ],

    trunkRoads: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#FFA45E',
      },
    ],

    primaryRoads: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#C29878',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C29878',
      },
    ],

    highway: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFA45E',
      },
    ],

    minorRoadsTertiary: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C29878',
      },
    ],

    minorRoads: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C29878',
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
      if (level >= 14) {
        return 'waterZ14';
      }
      if (level >= 8) {
        return 'waterZ8';
      }
      if (level >= 1) {
        return 'water';
      }
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 7) {
          return 'countryBoundaryZ7';
        }
        if (level >= 1) {
          return 'countryBoundary';
        }
      }
      if (kind === 'disputed') {
        return 'dashed_boundary';
      }

      if (kind === 'region') {
        if (feature.properties.min_zoom <= 5) {
          if (level > 4) {
            return 'regionBoundary';
          }
        }
        if (feature.properties.min_zoom >= 5) {
          if (level >= 8) {
            return 'regionBoundary';
          }
        }
      }
    }

    if (layer === 'landuse') {
      if (kind === 'national_park' || kind === 'nature_reserve') {
        return 'nationalPark';
      }
      if (kind === 'forest') {
        if (level >= 9) {
          return 'nationalForest';
        }
      }
      if (kind === 'park') {
        return 'park';
      }
      if (kind === 'beach') {
        return 'beach';
      }
      if (kind === 'university') {
        return 'university';
      }
      if (kind === 'golf_course') {
        return 'golfCourse';
      }
      if (kind === 'hospital') {
        return 'hospital';
      }
      if (kind === 'industrial') {
        return 'industrial';
      }
      if (kind === 'zoo') {
        return 'zoo';
      }
      if (kind === 'glacier') {
        return 'glacier';
      }
      if (kind === 'cemetery') {
        return 'cemetery';
      }
      if (kind === 'military') {
        return 'military';
      }
      if (kind === 'runway') {
        return 'runway';
      }
    }

    if (layer === 'roads') {
      if (kind === 'rail' || kind === 'ferry') {
        return '';
      }
      if (feature.properties.min_zoom === 3) {
        if (level >= 6) {
          return 'motorway';
        }
      }
      if (feature.properties.kind_detail === 'motorway') {
        return 'motorway';
      }
      if (feature.properties.kind_detail === 'trunk') {
        return 'trunkRoads';
      }
      if (feature.properties.kind === 'highway') {
        return 'highway';
      }
      if (feature.properties.kind_detail === 'primary') {
        return 'primaryRoads';
      }
      if (feature.properties.kind_detail === 'secondary') {
        return 'secondaryRoads';
      }
      if (
        feature.properties.kind === 'minor_road' ||
        feature.properties.kind_detail === 'tertiary'
      ) {
        return 'minorRoadsTertiary';
      }
      if (feature.properties.kind === 'minor_road') {
        return 'minorRoads';
      }

      // }
    }

    return '';
  },
};

export default springBright;
