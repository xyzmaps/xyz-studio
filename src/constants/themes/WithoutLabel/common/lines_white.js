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
const light = {
  mainColors: ['#FFFFFF', '#000000'],
  backgroundColor: '#FFFFFF',
  strokeWidthZoomScale(level) {
    return level > 17 ? 1 : level > 14 ? 0.5 : 0.25;
  },

  styleGroups: {
    water: [
      {
        zIndex: 7,
        type: 'Polygon',
        fill: '#ffffff',
      },
    ],

    boundary: [
      {
        zIndex: 8,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#EBEBEB',
      },
    ],

    boundaryZ7: [
      {
        zIndex: 8,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#ffffff',
      },
    ],

    boundaryZ12: [
      {
        zIndex: 8,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#EBEBEB',
      },
    ],

    earth: [
      {
        zIndex: 1,
        type: 'Polygon',
        fill: '#FFFFFF',
      },
    ],

    countryBoundary: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#E6E6E6',
      },
    ],

    countryBoundaryZ7: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 14,
        stroke: '#E6E6E6',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#E6E6E6',
        strokeDasharray: [3, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 9,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#E6E6E6',
        opacity: 0.75,
      },
    ],

    nature: [
      { zIndex: 3, type: 'Line', strokeWidth: 7, stroke: '#CFCFCF' },
      { zIndex: 3, type: 'Polygon', fill: '#FDFDFD' },
    ],

    highAlbedo: [
      { zIndex: 5, type: 'Line', strokeWidth: 7, stroke: '#CFCFCF' },
      { zIndex: 5, type: 'Polygon', fill: '#FDFDFD' },
    ],

    motorway: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    motorwayZ13: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#000000',
      },
    ],

    trunkRoads: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    trunkRoadsZ13: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#000000',
      },
    ],

    primaryRoads: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    primaryRoadsZ16: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#000000',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    secondaryRoadsZ16: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#000000',
      },
    ],

    highway: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    highwayZ16: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#000000',
      },
    ],

    trunkLink: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    primaryLink: [
      {
        zIndex: 16,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    secondaryLink: [
      {
        zIndex: 16,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    tertiaryRoadsZ16: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#000000',
      },
    ],

    minorRoads: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#000000',
      },
    ],

    minorRoadsZ16: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#000000',
      },
    ],

    pathRoads: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#000000',
        strokeDasharray: [1, 3],
      },
    ],

    pathRoadsZ18: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#000000',
        strokeDasharray: [2, 4],
      },
    ],

    buildings: [
      { zIndex: 31, type: 'Line', strokeWidth: 3, stroke: '#D1D1D1' },
      { zIndex: 32, type: 'Polygon', fill: '#FFFFFF' },
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
        if (level >= 7) {
          return 'boundaryZ7';
        }
        return 'boundary';
      }
      if (geom === 'LineString' || geom === 'MultiLineString') {
        return;
      }

      return 'water';
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 7) {
          if (props.maritime_boundary === true) {
            return;
          }
          return 'countryBoundaryZ7';
        }
        if (level >= 1) {
          return 'countryBoundary';
        }
      }
      if (props.maritime_boundary === true) {
        return;
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
          return 'nature';
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
        return;
      }
      if (feature.properties.min_zoom === 3) {
        if (level >= 6) {
          return 'motorway';
        }
      }
      // if (feature.properties.sort_rank > 380 && feature.properties.sort_rank < 384){
      if (feature.properties.kind_detail === 'motorway') {
        if (level >= 13) {
          return 'motorwayZ13';
        }
        return 'motorway';
      }
      if (feature.properties.kind_detail === 'trunk') {
        if (level >= 13) {
          return 'trunkRoadsZ13';
        }
        return 'trunkRoads';
      }
      if (feature.properties.kind === 'highway') {
        if (level >= 16) {
          return 'highwayZ16';
        }
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
        if (level >= 16) {
          return 'primaryRoadsZ16';
        }
        return 'primaryRoads';
      }
      if (feature.properties.kind_detail === 'secondary') {
        if (level >= 16) {
          return 'secondaryRoadsZ16';
        }
        return 'secondaryRoads';
      }
      if (feature.properties.kind_detail === 'tertiary') {
        if (level >= 16) {
          return 'tertiaryRoadsZ16';
        }
        return 'tertiaryRoads';
      }
      if (feature.properties.kind === 'minor_road') {
        if (level >= 16) {
          return 'minorRoadsZ16';
        }
        return 'minorRoads';
      }
      if (feature.properties.kind === 'path') {
        if (level >= 18) {
          return 'pathRoadsZ18';
        }
        if (level >= 13) {
          return 'pathRoads';
        }
      }
    }

    if (layer === 'buildings') {
      if (level >= 17) {
        return 'buildings';
      }
    }
  },
};

export default light;
