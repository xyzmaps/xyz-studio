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
const miamiDay = {
  mainColors: ['#F4F7F9', '#98C9E5'],
  backgroundColor: '#F4F7F9',
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
        fill: '#98C9E5',
      },
    ],

    river: [
      {
        zIndex: 200,
        type: 'Polygon',
        fill: '#98C9E5',
        opacity: 0.5,
      },
    ],

    swimmingPool: [
      {
        zIndex: 200,
        type: 'Polygon',
        fill: '#A1E3E3',
      },
    ],

    earth: [
      {
        zIndex: 1,
        type: 'Polygon',
        fill: '#F4F7F9',
      },
    ],

    countryBoundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D6CDC1',
      },
    ],

    countryBoundaryZ4: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#D6CDC1',
      },
    ],

    countryBoundaryZ6: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#D6CDC1',
      },
    ],

    countryBoundaryZ9: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 14,
        stroke: '#D6CDC1',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D6CDC1',
        strokeDasharray: [3, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 256,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D9C9B4',
        opacity: 0.5,
      },
    ],

    regionBoundaryZ8: [
      {
        zIndex: 256,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#D9C9B4',
        opacity: 0.5,
      },
    ],

    nationalForest: [
      {
        zIndex: 31,
        type: 'Polygon',
        fill: '#AFE0A4',
        opacity: 0.65,
      },
    ],

    nationalPark: [
      {
        zIndex: 18,
        type: 'Polygon',
        fill: '#C1F0B6',
        opacity: 0.75,
      },
    ],

    park: [
      {
        zIndex: 24,
        type: 'Polygon',
        fill: '#C7EDA8',
        opacity: 0.85,
      },
    ],

    beach: [
      {
        zIndex: 95,
        type: 'Polygon',
        fill: '#FCFADE',
        opacity: 0.75,
      },
    ],

    glacier: [
      {
        zIndex: 29,
        type: 'Polygon',
        fill: '#E8F2FF',
        opacity: 0.85,
      },
    ],

    golfCourse: [
      {
        zIndex: 56,
        type: 'Polygon',
        fill: '#B5E8B6',
        opacity: 0.85,
      },
    ],

    university: [
      {
        zIndex: 39,
        type: 'Polygon',
        fill: '#EBE6DD',
        opacity: 0.45,
      },
    ],

    hospital: [
      {
        zIndex: 54,
        type: 'Polygon',
        fill: '#FFF5F9',
        opacity: 0.75,
      },
    ],

    builtup: [
      {
        zIndex: 21,
        type: 'Polygon',
        fill: '#E1EAF0',
        opacity: 0.75,
      },
    ],

    military: [
      {
        zIndex: 45,
        type: 'Polygon',
        fill: '#EBEDF2',
        opacity: 0.75,
      },
    ],

    stadium: [
      {
        zIndex: 66,
        type: 'Polygon',
        fill: '#E3D0BA',
        opacity: 0.75,
      },
    ],

    motorway: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#BFBAB8',
      },
    ],

    motorwayZ11: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    motorwayZ14: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#B7B2AF',
      },
    ],

    motorwayZ17: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 16,
        stroke: '#B7B2AF',
      },
    ],

    trunkRoads: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#BFBAB8',
      },
    ],

    trunkRoadsZ11: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    trunkRoadsZ14: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#B7B2AF',
      },
    ],

    trunkRoadsZ17: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 16,
        stroke: '#B7B2AF',
      },
    ],

    primaryRoads: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#D1CCC9',
      },
    ],

    primaryRoadsZ10: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C2BDBA',
      },
    ],

    primaryRoadsZ13: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    primaryRoadsZ17: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#B7B2AF',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C2BDBA',
      },
    ],

    secondaryRoadsZ13: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    highway: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    highwayZ14: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    trunkLink: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    primaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    secondaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C2BDBA',
      },
    ],

    tertiaryRoadsZ14: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    minorRoads: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#C7C1BF',
      },
    ],

    minorRoadsZ17: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    pathRoads: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#D1CCC9',
      },
    ],

    runway: [
      {
        zIndex: 62,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#D1BCBD',
      },
    ],

    taxiway: [
      {
        zIndex: 61,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#D1BCBD',
      },
    ],

    buildings: [
      {
        zIndex: 475,
        type: 'Polygon',
        fill: '#EDF3F5',
      },
    ],

    hospitalBuilding: [
      {
        zIndex: 475,
        type: 'Polygon',
        fill: '#FCE1EB',
        opacity: 0.75,
      },
    ],

    universityBuilding: [
      {
        zIndex: 475,
        type: 'Polygon',
        fill: '#F5EEC4',
      },
    ],

    schoolBuilding: [
      {
        zIndex: 475,
        type: 'Polygon',
        fill: '#F7E5D2',
        opacity: 0.75,
      },
    ],

    stadiumBuilding: [
      {
        zIndex: 475,
        type: 'Polygon',
        fill: '#F2CAB1',
      },
    ],

    trainStation: [
      {
        zIndex: 2,
        type: 'Polygon',
        fill: '#E8EFFA',
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
      if (kind === 'swimming_pool') {
        return 'swimmingPool';
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
        if (level >= 4) {
          return 'countryBoundaryZ4';
        }
        if (level >= 1) {
          return 'countryBoundary';
        }
      }
      if (props.maritime_boundary === true) {
        return '';
      }
      // had an error that using || to combine all the dashed_boundary lines and it turned ALL countries into dashed lines... so there's a reason these are separated!
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
          return 'nationalPark';
        }
      }
      if (kind === 'wood' || kind === 'forest') {
        if (level > 6) {
          return 'nationalForest';
        }
      }
      if (kind === 'park') {
        if (level > 3) {
          return 'park';
        }
      }
      if (kind === 'beach') {
        if (level > 3) {
          return 'beach';
        }
      }
      if (kind === 'glacier') {
        if (level > 3) {
          return 'glacier';
        }
      }
      if (kind === 'hospital') {
        if (level >= 13) {
          return 'hospital';
        }
      }
      if (kind === 'college' || kind === 'university') {
        return 'university';
      }
      if (kind === 'golf_course') {
        return 'golfCourse';
      }
      if (kind === 'military') {
        return 'military';
      }
      if (kind === 'industrial') {
        return 'builtup';
      }
      if (kind === 'stadium') {
        return 'stadium';
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
        if (level >= 11) {
          return 'secondaryLink';
        }
      }
      if (feature.properties.kind_detail === 'tertiary_link') {
        if (level >= 13) {
          return 'tertiaryLink';
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
        if (level >= 13) {
          return 'primaryRoadsZ13';
        }
        if (level >= 10) {
          return 'primaryRoadsZ10';
        }
        if (level >= 8) {
          return 'primaryRoads';
        }
      }
      if (feature.properties.kind_detail === 'secondary') {
        if (level >= 13) {
          return 'secondaryRoadsZ13';
        }
        if (level >= 11) {
          return 'secondaryRoads';
        }
      }
      if (feature.properties.kind_detail === 'tertiary') {
        if (level >= 14) {
          return 'tertiaryRoadsZ14';
        }
        if (level >= 13) {
          return 'tertiaryRoads';
        }
      }
      if (feature.properties.kind === 'minor_road') {
        if (level >= 17) {
          return 'minorRoadsZ17';
        }
        if (level >= 14) {
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
      // }
    }

    if (layer === 'buildings') {
      if (feature.properties.kind_detail === 'hospital') {
        return 'hospitalBuilding';
      }
      if (feature.properties.kind_detail === 'university') {
        return 'universityBuilding';
      }
      if (feature.properties.kind_detail === 'school') {
        return 'schoolBuilding';
      }
      if (feature.properties.kind_detail === 'stadium') {
        return 'stadiumBuilding';
      }
      if (feature.properties.kind_detail === 'train_station') {
        return 'trainStation';
      }
      return layer;
    }

    return '';
  },
};

export default miamiDay;
