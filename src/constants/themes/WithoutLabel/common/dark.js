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
const dark = {
  mainColors: ['#393939', '#252525'],
  backgroundColor: '#393939',
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
    waterArea: [
      {
        zIndex: 200,
        type: 'Polygon',
        fill: '#252525',
      },
    ],

    river: [
      {
        zIndex: 200,
        type: 'Polygon',
        fill: '#252525',
        opacity: 0.75,
      },
    ],

    earth: [
      {
        zIndex: 1,
        type: 'Polygon',
        fill: '#393939',
      },
    ],

    countryBoundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#2E2E2E',
      },
    ],

    countryBoundaryZ6: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 12,
        stroke: '#2E2E2E',
      },
    ],

    countryBoundaryZ9: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 14,
        stroke: '#2E2E2E',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#2E2E2E',
        strokeDasharray: [3, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 256,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#2B2B2B',
      },
    ],

    regionBoundaryZ8: [
      {
        zIndex: 256,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#2B2B2B',
      },
    ],

    nature: [
      {
        zIndex: 18,
        type: 'Polygon',
        fill: '#363636',
      },
    ],

    park: [
      {
        zIndex: 18,
        type: 'Polygon',
        fill: '#333333',
      },
    ],

    highAlbedo: [
      {
        zIndex: 25,
        type: 'Polygon',
        fill: '#484646',
      },
    ],

    motorway: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#6B6B6B',
      },
    ],

    motorwayZ11: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#707070',
      },
    ],

    motorwayZ14: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#707070',
      },
    ],

    motorwayZ17: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 16,
        stroke: '#707070',
      },
    ],

    trunkRoads: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#6B6B6B',
      },
    ],

    trunkRoadsZ11: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#707070',
      },
    ],

    trunkRoadsZ14: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#707070',
      },
    ],

    trunkRoadsZ17: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 16,
        stroke: '#707070',
      },
    ],

    primaryRoads: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#575757',
      },
    ],

    primaryRoadsZ11: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#707070',
      },
    ],

    primaryRoadsZ17: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#707070',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#575757',
      },
    ],

    secondaryRoadsZ14: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#707070',
      },
    ],

    highway: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#707070',
      },
    ],

    trunkLink: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#707070',
      },
    ],

    primaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#707070',
      },
    ],

    secondaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#707070',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#707070',
      },
    ],

    minorRoadsTertiary: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#5C5C5C',
      },
    ],

    minorRoadsTertiaryZ14: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#707070',
      },
    ],

    minorRoads: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#616161',
      },
    ],

    minorRoadsZ17: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#707070',
      },
    ],

    pathRoads: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#575757',
      },
    ],

    runway: [
      {
        zIndex: 62,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#5C5C5C',
      },
    ],

    taxiway: [
      {
        zIndex: 61,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#5C5C5C',
      },
    ],

    buildingsZ16: [
      {
        zIndex: 475,
        type: 'Polygon',
        fill: '#3E3E3E',
      },
    ],

    trainStation: [
      {
        zIndex: 2,
        type: 'Polygon',
        fill: '#333333',
      },
    ],

    buildings: [
      {
        zIndex: 475,
        type: 'Polygon',
        fill: '#424242',
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
      if (
        kind === 'water' ||
        kind === 'ocean' ||
        kind === 'riverbank' ||
        kind === 'lake' ||
        kind === 'reservoir'
      ) {
        const { area } = props;

        if (level === 1 && area >= 10000000000) {
          return 'waterArea';
        }
        if (level === 2 && area >= 7000000000) {
          return 'waterArea';
        }
        if (level === 3 && area >= 5000000000) {
          return 'waterArea';
        }
        if (level === 4 && area >= 300000000) {
          return 'waterArea';
        }
        if (level === 5 && area >= 50000000) {
          return 'waterArea';
        }
        if (level === 6 && area >= 50000000) {
          return 'waterArea';
        }
        if (level === 7 && area >= 50000000) {
          return 'waterArea';
        }
        if (level === 8 && area >= 50000000) {
          return 'waterArea';
        }
        if (level === 9 && area >= 15000000) {
          return 'waterArea';
        }
        if (level === 10 && area >= 4000000) {
          return 'waterArea';
        }
        if (level === 11 && area >= 1000000) {
          return 'waterArea';
        }
        if (level === 12 && area >= 250000) {
          return 'waterArea';
        }
        if (level === 13 && area >= 75000) {
          return 'waterArea';
        }
        if (level === 14 && area >= 40000) {
          return 'waterArea';
        }
        if (level >= 15) {
          return 'waterArea';
        }
        return '';
      }
      if (kind === 'riverbank' || kind === 'stream' || kind === 'canal') {
        return 'river';
      }
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 9) {
          if (props.maritime_boundary === true) {
            return '';
          }
          return 'countryBoundaryZ9';
        }
        if (level >= 6) {
          if (props.maritime_boundary === true) {
            return '';
          }
          return 'countryBoundaryZ6';
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

      if (kind === 'region' || kind === 'macroregion') {
        if (feature.properties.min_zoom <= 5) {
          if (level > 4) {
            return 'regionBoundary';
          }
        }

        if (feature.properties.min_zoom >= 5) {
          if (level >= 8) {
            return 'regionBoundaryZ8';
          }
        }
      }
    }

    if (layer === 'landuse') {
      if (
        kind === 'protected_area' ||
        kind === 'national_park' ||
        kind === 'nature_reserve'
      ) {
        if (level > 3) {
          return 'nature';
        }
      }
      if (
        kind === 'wood' ||
        kind === 'park' ||
        kind === 'nature' ||
        kind === 'forest'
      ) {
        if (level > 6) {
          return 'park';
        }
      }
      if (kind === 'beach' || kind === 'glacier') {
        if (level > 3) {
          return 'highAlbedo';
        }
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
        if (level >= 17) {
          return 'motorwayZ17';
        }
        if (level >= 14) {
          return 'motorwayZ14';
        }
        if (level >= 11) {
          return 'motorwayZ11';
        }
        if (level >= 6) {
          return 'motorway';
        }
      }
      if (feature.properties.kind_detail === 'trunk') {
        if (level >= 17) {
          return 'trunkRoadsZ17';
        }
        if (level >= 14) {
          return 'trunkRoadsZ14';
        }
        if (level >= 11) {
          return 'trunkRoadsZ11';
        }
        if (level >= 6) {
          return 'trunkRoads';
        }
      }
      if (feature.properties.kind_detail === 'trunk_link') {
        if (level >= 6) {
          return 'trunkLink';
        }
      }
      if (feature.properties.kind_detail === 'primary_link') {
        if (level >= 8) {
          return 'primaryLink';
        }
      }
      if (feature.properties.kind_detail === 'secondary_link') {
        if (level >= 10) {
          return 'secondaryLink';
        }
      }
      if (feature.properties.kind_detail === 'tertiary_link') {
        if (level >= 12) {
          return 'tertiaryLink';
        }
      }
      if (feature.properties.kind === 'highway') {
        if (level >= 6) {
          return 'highway';
        }
      }
      if (feature.properties.kind_detail === 'primary') {
        if (level >= 17) {
          return 'primaryRoadsZ17';
        }
        if (level >= 11) {
          return 'primaryRoadsZ11';
        }
        if (level >= 8) {
          return 'primaryRoads';
        }
      }
      if (feature.properties.kind_detail === 'secondary') {
        if (level >= 14) {
          return 'secondaryRoadsZ14';
        }
        if (level >= 10) {
          return 'secondaryRoads';
        }
      }
      if (feature.properties.kind_detail === 'tertiary') {
        if (level >= 14) {
          return 'minorRoadsTertiaryZ14';
        }
        if (level >= 12) {
          return 'minorRoadsTertiary';
        }
      }
      if (feature.properties.kind === 'minor_road') {
        if (level >= 17) {
          return 'minorRoadsZ17';
        }
        if (level >= 15) {
          return 'minorRoads';
        }
      }

      if (feature.properties.kind === 'path') {
        if (level >= 17) {
          return 'pathRoads';
        }
      }

      if (feature.properties.kind_detail === 'runway') {
        if (level >= 12) {
          return 'runway';
        }
      }
      if (feature.properties.kind_detail === 'taxiway') {
        if (level >= 12) {
          return 'taxiway';
        }
      }
    }

    if (layer === 'buildings') {
      if (level >= 16) {
        if (feature.properties.kind_detail === 'train_station') {
          return 'trainStation';
        }
        return 'buildingsZ16';
      }
      if (level >= 13) {
        return 'buildings';
      }
    }

    return '';
  },
};

export default dark;
