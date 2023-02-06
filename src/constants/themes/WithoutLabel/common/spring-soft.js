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
const springSoft = {
  mainColors: ['#CEE1E1', '#E8EFD4'],
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
        fill: '#CCE4E3',
      },
    ],

    boundary: [
      {
        zIndex: 205,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCE4E3',
      },
    ],

    boundaryZ12: [
      {
        zIndex: 205,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#b5c8de',
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
        strokeWidth: 4,
        stroke: '#C5CED1',
      },
    ],

    countryBoundaryZ7: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 12,
        stroke: '#CFD6D4',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#CFD6D4',
        strokeDasharray: [3, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 256,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#CFD6D4',
        opacity: 0.75,
      },
    ],

    nationalForest: [
      {
        zIndex: 31,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#B0CFC8',
      },
      {
        zIndex: 31,
        type: 'Polygon',
        fill: '#E5EEDE',
      },
    ],

    nationalPark: [
      {
        zIndex: 18,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#CADBAF',
      },
      {
        zIndex: 18,
        type: 'Polygon',
        fill: '#E6F0D1',
      },
    ],

    park: [
      {
        zIndex: 24,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#BEDBD5',
      },
      {
        zIndex: 24,
        type: 'Polygon',
        fill: '#E3EEDF',
      },
    ],

    beach: [
      {
        zIndex: 95,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#f5d6a1',
      },
      {
        zIndex: 95,
        type: 'Polygon',
        fill: '#F2E5C6',
      },
    ],

    university: [
      {
        zIndex: 39,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#F2E3A8',
      },
      {
        zIndex: 39,
        type: 'Polygon',
        fill: '#F2ECCC',
      },
    ],

    garden: [
      {
        zIndex: 96,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#C2D4A1',
      },
      {
        zIndex: 96,
        type: 'Polygon',
        fill: '#DFEACA',
      },
    ],

    golfCourse: [
      {
        zIndex: 56,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#A3D4D6',
      },
      {
        zIndex: 56,
        type: 'Polygon',
        fill: '#DBEADC',
      },
    ],

    zoo: [
      {
        zIndex: 51,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D0DEA6',
      },
      {
        zIndex: 51,
        type: 'Polygon',
        fill: '#E8F1CF',
      },
    ],

    hospital: [
      {
        zIndex: 54,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#F7C9BA',
      },
      {
        zIndex: 54,
        type: 'Polygon',
        fill: '#EFE1CC',
      },
    ],

    industrial: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D4CEC7',
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
        stroke: '#EBE0B2',
      },
      {
        zIndex: 79,
        type: 'Polygon',
        fill: '#F4F0D5',
      },
    ],

    pitch: [
      {
        zIndex: 100,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#DAD7BF',
      },
      {
        zIndex: 100,
        type: 'Polygon',
        fill: '#EEECD7',
      },
    ],

    motorway: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#F0AE67',
      },
    ],

    trunkRoads: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#F0AE67',
      },
    ],

    primaryRoads: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCBEBA',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
      },
    ],

    highway: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
      },
    ],

    trunkLink: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
      },
    ],

    primaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
      },
    ],

    secondaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
      },
    ],

    minorRoads: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
      },
    ],

    runway: [
      {
        zIndex: 62,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#F5BFCB',
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

    pathRoads: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C2D7FC',
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
      if (props.boundary === true) {
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

      // later todo might be fixing the weird tilezen data transition with GB
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
      if (kind === 'nature') {
        if (level > 6) {
          return 'nature';
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

export default springSoft;
