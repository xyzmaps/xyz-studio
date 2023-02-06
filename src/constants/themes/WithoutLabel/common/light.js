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
  mainColors: ['#D1CFCF', '#B0ABA9'],
  backgroundColor: '#D1CFCF',
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
        fill: '#B0ABA9',
      },
    ],

    river: [
      {
        zIndex: 200,
        type: 'Polygon',
        fill: '#B0ABA9',
        opacity: 0.5,
      },
    ],

    earth: [
      {
        zIndex: 1,
        type: 'Polygon',
        fill: '#D1CFCF',
      },
    ],

    countryBoundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#999999',
      },
    ],

    countryBoundaryZ4: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#999999',
      },
    ],

    countryBoundaryZ6: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#999999',
      },
    ],

    countryBoundaryZ9: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 13,
        stroke: '#999999',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 262,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#999999',
        strokeDasharray: [3, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 256,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#A39F9D',
      },
    ],

    regionBoundaryZ8: [
      {
        zIndex: 256,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#A39F9D',
      },
    ],

    nature: [
      {
        zIndex: 18,
        type: 'Polygon',
        fill: '#D9D7D7',
      },
    ],

    park: [
      {
        zIndex: 18,
        type: 'Polygon',
        fill: '#C4C2C2',
      },
    ],

    highAlbedo: [
      {
        zIndex: 25,
        type: 'Polygon',
        fill: '#F5E6DA',
      },
    ],

    motorway: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    motorwayZ10: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    motorwayZ12: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#FFFFFF',
      },
    ],

    motorwayZ16: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 13,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoads: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoadsZ10: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoadsZ12: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoadsZ16: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 13,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoads: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#F7F7F7',
      },
    ],

    primaryRoadsZ11: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoadsZ14: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoadsZ17: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#FFFFFF',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#F7F7F7',
      },
    ],

    secondaryRoadsZ12: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#F7F7F7',
      },
    ],

    secondaryRoadsZ14: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#FFFFFF',
      },
    ],

    secondaryRoadsZ17: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    highway: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    trunkLink: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    primaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    secondaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 355,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#FFFFFF',
      },
    ],

    tertiaryRoadsZ14: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    tertiaryRoadsZ16: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#FFFFFF',
      },
    ],

    minorRoads: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#FFFFFF',
      },
    ],

    minorRoadsZ14: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    minorRoadsZ16: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    minorRoadsZ17: [
      {
        zIndex: 360,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    pathRoads: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#858C89',
      },
    ],

    pathRoadsZ18: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#7A807D',
      },
    ],

    pier: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCD9D1',
      },
    ],

    pierZ18: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B9C7BE',
      },
    ],

    runway: [
      {
        zIndex: 62,
        type: 'Line',
        strokeWidth: 12,
        stroke: '#C7BEB3',
      },
    ],

    runwayZ15: [
      {
        zIndex: 62,
        type: 'Line',
        strokeWidth: 24,
        stroke: '#C7BEB3',
      },
    ],

    runwayZ17: [
      {
        zIndex: 62,
        type: 'Line',
        strokeWidth: 48,
        stroke: '#C7BEB3',
      },
    ],

    taxiway: [
      {
        zIndex: 61,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#C7BEB3',
      },
    ],

    buildings: [
      {
        zIndex: 475,
        type: 'Polygon',
        fill: '#D9D7D7',
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
      // todo: add more landuse for urban areas, then specialized kinds for city levels
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
      // if (feature.properties.sort_rank > 380 && feature.properties.sort_rank < 384){
      if (feature.properties.kind_detail === 'motorway') {
        if (level >= 16) {
          return 'motorwayZ16';
        }
        if (level >= 12) {
          return 'motorwayZ12';
        }
        if (level >= 10) {
          return 'motorwayZ10';
        }
        if (level >= 6) {
          return 'motorway';
        }
      }
      if (feature.properties.kind_detail === 'trunk') {
        if (level >= 16) {
          return 'trunkRoadsZ16';
        }
        if (level >= 12) {
          return 'trunkRoadsZ12';
        }
        if (level >= 10) {
          return 'trunkRoadsZ10';
        }
        if (level >= 6) {
          return 'trunkRoads';
        }
      }
      if (feature.properties.kind === 'highway') {
        if (level >= 7) {
          return 'highway';
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
      if (feature.properties.kind_detail === 'primary') {
        if (level >= 17) {
          return 'primaryRoadsZ17';
        }
        if (level >= 14) {
          return 'primaryRoadsZ14';
        }
        if (level >= 11) {
          return 'primaryRoadsZ11';
        }
        if (level >= 8) {
          return 'primaryRoads';
        }
      }
      if (feature.properties.kind_detail === 'secondary') {
        if (level >= 17) {
          return 'secondaryRoadsZ17';
        }
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
        if (level >= 16) {
          return 'tertiaryRoadsZ16';
        }
        if (level >= 14) {
          return 'tertiaryRoadsZ14';
        }
        if (level >= 12) {
          return 'tertiaryRoads';
        }
      }
      if (feature.properties.kind === 'minor_road') {
        if (level >= 17) {
          return 'minorRoadsZ17';
        }
        if (level >= 16) {
          return 'minorRoadsZ16';
        }
        if (level >= 14) {
          return 'minorRoadsZ14';
        }
        if (level >= 13) {
          return 'minorRoads';
        }
      }

      if (feature.properties.kind === 'path') {
        if (level >= 16) {
          if (feature.properties.kind_detail === 'pier') {
            if (level >= 18) {
              return 'pierZ18';
            }
            return 'pier';
          }
          if (level >= 18) {
            return 'pathRoadsZ18';
          }
          return 'pathRoads';
        }
      }

      if (feature.properties.kind_detail === 'runway') {
        if (level >= 17) {
          return 'runwayZ17';
        }
        if (level >= 15) {
          return 'runwayZ15';
        }
        if (level >= 12) {
          return 'runway';
        }
      }
      if (feature.properties.kind_detail === 'taxiway') {
        if (level >= 15) {
          return 'taxiway';
        }
      }
    }

    if (layer === 'buildings') {
      if (level >= 18) {
        return 'buildings';
      }
    }

    return '';
  },
};

export default light;
