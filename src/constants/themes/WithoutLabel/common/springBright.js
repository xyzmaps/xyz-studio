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

    boundary: [
      {
        zIndex: 205,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#89D8F5',
      },
    ],

    boundaryZ12: [
      {
        zIndex: 205,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#669BD4',
      },
    ],

    boundaryZ14: [
      {
        zIndex: 205,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
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
        strokeWidth: 5,
        stroke: '#B9C3C7',
      },
    ],

    countryBoundaryZ7: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 13,
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
        fill: '#A1DB84',
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

    garden: [
      {
        zIndex: 96,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 96,
        type: 'Polygon',
        fill: '#8DD69B',
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

    school: [
      {
        zIndex: 79,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 79,
        type: 'Polygon',
        fill: '#FBF7CB',
      },
    ],

    pitch: [
      {
        zIndex: 100,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 100,
        type: 'Polygon',
        fill: '#DBC6AF',
      },
    ],

    naturalWood: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#669BD4',
      },
      {
        zIndex: 11,
        type: 'Polygon',
        fill: '#D5ECD3',
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

    motorway: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#FFA45E',
      },
    ],

    trunkRoads: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 6,
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

    trunkLink: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFA45E',
      },
    ],

    primaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#C29878',
      },
    ],

    secondaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C29878',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C29878',
      },
    ],

    tertiaryRoads: [
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

    // 'pathRoads': [{
    //   zIndex: 354,
    //   type: 'Line',
    //   strokeWidth: 1,
    //   stroke: '#7BBAFF'
    // }],

    runway: [
      {
        zIndex: 62,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#F2A2D2',
      },
    ],

    taxiway: [
      {
        zIndex: 61,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
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
      // Todo: add area filter for tiny ponds, lakes
      // Todo: boundary: true, add water boundaries

      if (props.boundary === true) {
        if (level >= 14) {
          return 'boundaryZ14';
        }
        if (level >= 12) {
          return 'boundaryZ12';
        }
        if (level >= 1) {
          return 'boundary';
        }
      }
      if (geom === 'LineString' || geom === 'MultiLineString') {
        return '';
      }

      return 'water';
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 7) {
          if (props.maritime_boundary === true) {
            return '';
          }
          return 'countryBoundaryZ7';
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
            return 'regionBoundary';
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
        if (level >= 8) {
          return 'nationalPark';
        }
      }
      if (kind === 'wood' || kind === 'forest') {
        if (level >= 12) {
          return 'nationalForest';
        }
      }
      if (kind === 'natural_wood') {
        if (level >= 10) {
          return 'naturalWood';
        }
      }
      if (kind === 'park') {
        if (level >= 9) {
          return 'park';
        }
      }
      if (kind === 'garden') {
        if (level >= 13) {
          return 'garden';
        }
      }
      if (kind === 'beach') {
        if (level >= 11) {
          return 'beach';
        }
      }
      if (kind === 'university' || kind === 'college') {
        if (level >= 13) {
          return 'university';
        }
      }
      if (kind === 'golf_course') {
        if (level >= 11) {
          return 'golfCourse';
        }
      }
      if (kind === 'hospital') {
        if (level >= 13) {
          return 'hospital';
        }
      }
      if (kind === 'industrial') {
        if (level >= 13) {
          return 'industrial';
        }
      }
      if (kind === 'school') {
        if (level >= 13) {
          return 'school';
        }
      }
      if (kind === 'zoo') {
        if (level >= 13) {
          return 'zoo';
        }
      }
      if (kind === 'pitch') {
        if (level >= 15) {
          return 'pitch';
        }
      }
      if (kind === 'glacier') {
        if (level >= 10) {
          return 'glacier';
        }
      }
      if (kind === 'cemetery') {
        if (level >= 13) {
          return 'cemetery';
        }
      }
      if (kind === 'military') {
        if (level >= 8) {
          return 'military';
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
        return 'motorway';
      }
      if (feature.properties.kind_detail === 'trunk') {
        return 'trunkRoads';
      }
      if (feature.properties.kind === 'highway') {
        return 'highway';
      }
      if (feature.properties.kind_detail === 'trunk_link') {
        return 'trunkLink';
      }
      if (feature.properties.kind_detail === 'primary_link') {
        return 'primaryLink';
      }
      if (feature.properties.kind_detail === 'secondary_link') {
        return 'secondaryLink';
      }
      if (feature.properties.kind_detail === 'tertiary_link') {
        return 'tertiaryLink';
      }
      if (feature.properties.kind_detail === 'primary') {
        return 'primaryRoads';
      }
      if (feature.properties.kind_detail === 'secondary') {
        return 'secondaryRoads';
      }
      if (feature.properties.kind_detail === 'tertiary') {
        return 'tertiaryRoads';
      }
      if (feature.properties.kind === 'minor_road') {
        return 'minorRoads';
      }
      if (feature.properties.kind_detail === 'runway') {
        return 'runway';
      }
      if (feature.properties.kind_detail === 'taxiway') {
        return 'taxiway';
      }
      if (feature.properties.kind === 'path') {
        if (level >= 16) {
          return 'pathRoads';
        }
      }
    }

    return '';
  },
};

export default springBright;
