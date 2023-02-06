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
        strokeWidth: 8,
        stroke: '#2E2E2E',
      },
    ],

    countryBoundaryZ6: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 11,
        stroke: '#2E2E2E',
      },
    ],

    countryBoundaryZ9: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 15,
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

    highAlbedo: [
      {
        zIndex: 25,
        type: 'Polygon',
        fill: '#484646',
      },
    ],

    runway: [
      {
        zIndex: 65,
        type: 'Polygon',
        fill: '#404040',
      },
    ],

    motorway: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#707070',
      },
    ],

    motorwayZ11: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 7,
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
        strokeWidth: 3,
        stroke: '#707070',
      },
    ],

    trunkRoadsZ11: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 7,
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
        stroke: '#707070',
      },
    ],

    primaryRoadsZ9: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#707070',
      },
    ],

    primaryRoadsZ12: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#707070',
      },
    ],

    primaryRoadsZ14: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#707070',
      },
    ],

    primaryRoadsZ17: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 10,
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

    secondaryRoadsZ12: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#575757',
      },
    ],

    secondaryRoadsZ14: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#707070',
      },
    ],

    highway: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#616161',
      },
    ],

    highwayZ14: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#707070',
      },
    ],

    minorRoadsTertiary: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#5C5C5C',
      },
    ],

    minorRoadsTertiaryZ14: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#707070',
      },
    ],

    minorRoads: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#575757',
      },
    ],

    minorRoadsZ15: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#5E5E5E',
      },
    ],

    minorRoadsZ17: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#666666',
      },
    ],

    pathRoads: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#545454',
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

    if (layer === 'water') {
      if (geom === 'LineString' || geom === 'MultiLineString') {
        return '';
      }
      return 'waterArea';
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 9) {
          return 'countryBoundaryZ9';
        }
        if (level >= 6) {
          return 'countryBoundaryZ6';
        }
        if (level >= 1) {
          return 'countryBoundary';
        }
      }
      if (kind === 'disputed') {
        return 'dashed_boundary';
      }

      if (kind === 'region') {
        if (level >= 6) {
          return 'regionBoundary';
        }
      }
    }

    if (layer === 'landuse') {
      if (kind === 'national_park' || kind === 'nature_reserve') {
        if (level > 3) {
          return 'nature';
        }
      }
      if (kind === 'park' || kind === 'forest') {
        if (level > 6) {
          return 'nature';
        }
      }
      if (kind === 'beach' || kind === 'glacier') {
        if (level > 3) {
          return 'highAlbedo';
        }
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
      if (feature.properties.kind === 'highway') {
        if (level >= 14) {
          return 'highwayZ14';
        }
        if (level >= 7) {
          return 'highway';
        }
      }
      if (feature.properties.kind_detail === 'primary') {
        if (level >= 17) {
          return 'primaryRoadsZ17';
        }
        if (level >= 14) {
          return 'primaryRoadsZ14';
        }
        if (level >= 12) {
          return 'primaryRoadsZ12';
        }
        if (level >= 9) {
          return 'primaryRoadsZ9';
        }
        if (level >= 7) {
          return 'primaryRoads';
        }
      }
      if (feature.properties.kind_detail === 'secondary') {
        if (level >= 14) {
          return 'secondaryRoadsZ14';
        }
        if (level >= 12) {
          return 'secondaryRoadsZ12';
        }
        if (level >= 10) {
          return 'secondaryRoads';
        }
      }
      // known issue with what appear to be tertiary roads not rendering correctly... look to paris for example
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
          return 'minorRoadsZ15';
        }
        if (level >= 13) {
          return 'minorRoads';
        }
      }

      if (feature.properties.kind === 'path') {
        if (level >= 17) {
          return 'pathRoads';
        }
      }
    }

    if (layer === 'buildings') {
      if (level >= 15) {
        return 'buildings';
      }
    }

    return '';
  },
};

export default dark;
