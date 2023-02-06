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
  mainColors: ['#262626', '#E6E6E6'],
  backgroundColor: '#262626',
  strokeWidthZoomScale(level) {
    return level > 17 ? 1 : level > 14 ? 0.5 : 0.25;
  },

  styleGroups: {
    water: [
      {
        zIndex: 7,
        type: 'Polygon',
        fill: '#262626',
      },
    ],

    boundary: [
      {
        zIndex: 8,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#363636',
      },
    ],

    boundaryZ7: [
      {
        zIndex: 8,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#262626',
      },
    ],

    boundaryZ12: [
      {
        zIndex: 8,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#363636',
      },
    ],

    earth: [
      {
        zIndex: 1,
        type: 'Polygon',
        fill: '#262626',
      },
    ],

    countryBoundary: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#363636',
      },
    ],

    countryBoundaryZ7: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 14,
        stroke: '#363636',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#363636',
        strokeDasharray: [3, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 9,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#363636',
        opacity: 0.75,
      },
    ],

    nature: [
      { zIndex: 3, type: 'Line', strokeWidth: 7, stroke: '#3D3D3D' },
      { zIndex: 3, type: 'Polygon', fill: '#262626' },
    ],

    highAlbedo: [
      { zIndex: 5, type: 'Line', strokeWidth: 7, stroke: '#3D3D3D' },
      { zIndex: 5, type: 'Polygon', fill: '#262626' },
    ],

    motorway: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    motorwayZ7: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#A6A6A6',
      },
    ],

    motorwayZ12: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCCCCC',
      },
    ],

    motorwayZ14: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    motorwayZ16: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoads: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoadsZ7: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#A6A6A6',
      },
    ],

    trunkRoadsZ12: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCCCCC',
      },
    ],

    trunkRoadsZ14: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    trunkRoadsZ16: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoads: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoadsZ7: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#A6A6A6',
      },
    ],

    primaryRoadsZ12: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCCCCC',
      },
    ],

    primaryRoadsZ14: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    primaryRoadsZ16: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFFFFF',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#A6A6A6',
      },
    ],

    secondaryRoadsZ12: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCCCCC',
      },
    ],

    secondaryRoadsZ14: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    secondaryRoadsZ16: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFFFFF',
      },
    ],

    highway: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#A6A6A6',
      },
    ],

    highwayZ12: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCCCCC',
      },
    ],

    highwayZ14: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    highwayZ16: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFFFFF',
      },
    ],

    trunkLink: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    primaryLink: [
      {
        zIndex: 16,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    secondaryLink: [
      {
        zIndex: 16,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#A6A6A6',
      },
    ],

    tertiaryRoadsZ12: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCCCCC',
      },
    ],

    tertiaryRoadsZ14: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E6E6E6',
      },
    ],

    tertiaryRoadsZ16: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFFFFF',
      },
    ],

    minorRoads: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#A6A6A6',
      },
    ],

    minorRoadsZ12: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCCCCC',
      },
    ],

    minorRoadsZ14: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E6E6E6',
      },
    ],

    minorRoadsZ16: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    pathRoads: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#FFFFFF',
        strokeDasharray: [1, 3],
      },
    ],

    pathRoadsz17: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#FFFFFF',
        strokeDasharray: [2, 4],
      },
    ],

    buildings: [
      { zIndex: 31, type: 'Line', strokeWidth: 3, stroke: '#525252' },
      { zIndex: 32, type: 'Polygon', fill: '#262626' },
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
      if (feature.properties.kind_detail === 'motorway') {
        if (level >= 16) {
          return 'motorwayZ16';
        }
        if (level >= 14) {
          return 'motorwayZ14';
        }
        if (level >= 12) {
          return 'motorwayZ12';
        }
        if (level >= 7) {
          return 'motorwayZ7';
        }
        return 'motorway';
      }
      if (feature.properties.kind_detail === 'trunk') {
        if (level >= 16) {
          return 'trunkRoadsZ16';
        }
        if (level >= 14) {
          return 'trunkRoadsZ14';
        }
        if (level >= 12) {
          return 'trunkRoadsZ12';
        }
        if (level >= 7) {
          return 'trunkRoadsZ7';
        }
        return 'trunkRoads';
      }
      if (feature.properties.kind === 'highway') {
        if (level >= 16) {
          return 'highwayZ16';
        }
        if (level >= 14) {
          return 'highwayZ14';
        }
        if (level >= 12) {
          return 'highwayZ12';
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
        if (level >= 14) {
          return 'primaryRoadsZ14';
        }
        if (level >= 12) {
          return 'primaryRoadsZ12';
        }
        if (level >= 7) {
          return 'primaryRoadsZ7';
        }
        return 'primaryRoads';
      }
      if (feature.properties.kind_detail === 'secondary') {
        if (level >= 16) {
          return 'secondaryRoadsZ16';
        }
        if (level >= 14) {
          return 'secondaryRoadsZ14';
        }
        if (level >= 12) {
          return 'secondaryRoadsZ12';
        }
        return 'secondaryRoads';
      }
      // known issue with what appear to be tertiary roads not rendering correctly... look to paris for example
      if (feature.properties.kind_detail === 'tertiary') {
        if (level >= 16) {
          return 'tertiaryRoadsZ16';
        }
        if (level >= 14) {
          return 'tertiaryRoadsZ14';
        }
        if (level >= 12) {
          return 'tertiaryRoadsZ12';
        }
        return 'tertiaryRoads';
      }
      if (feature.properties.kind === 'minor_road') {
        if (level >= 16) {
          return 'minorRoadsZ16';
        }
        if (level >= 14) {
          return 'minorRoadsZ14';
        }
        if (level >= 12) {
          return 'minorRoadsZ12';
        }
        return 'minorRoads';
      }
      if (feature.properties.kind === 'path') {
        if (level >= 17) {
          return 'pathRoadsz17';
        }
        if (level >= 13) {
          return 'pathRoads';
        }
      }
    }

    if (layer === 'buildings') {
      if (level >= 16) {
        return 'buildings';
      }
    }
  },
};

export default light;
