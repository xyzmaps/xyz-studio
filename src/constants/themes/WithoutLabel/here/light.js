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
        strokeWidth: 4,
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

    runway: [
      {
        zIndex: 65,
        type: 'Polygon',
        fill: '#C7BEB3',
      },
    ],

    motorway: [
      {
        zIndex: 383,
        type: 'Line',
        strokeWidth: 5,
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
        strokeWidth: 12,
        stroke: '#FFFFFF',
      },
    ],

    motorwayLink: [
      {
        zIndex: 382,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFEDDE',
      },
    ],

    trunkRoads: [
      {
        zIndex: 381,
        type: 'Line',
        strokeWidth: 5,
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
        strokeWidth: 12,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoads: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#F7F7F7',
      },
    ],

    primaryRoadsZ9: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#FAFAFA',
      },
    ],

    primaryRoadsZ12: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoadsZ14: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoadsZ17: [
      {
        zIndex: 380,
        type: 'Line',
        strokeWidth: 11,
        stroke: '#FFFFFF',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#F7F7F7',
      },
    ],

    secondaryRoadsZ12: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#F7F7F7',
      },
    ],

    secondaryRoadsZ14: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    secondaryRoadsZ17: [
      {
        zIndex: 379,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#FFFFFF',
      },
    ],

    highway: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    highwayZ14: [
      {
        zIndex: 443,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    // 'trunkLink': [{
    //   zIndex: 443,
    //   type: 'Line',
    //   strokeWidth: 3,
    //   stroke: '#Ff0000'
    // }],

    // 'primaryLink': [{
    //   zIndex: 355,
    //   type: 'Line',
    //   strokeWidth: 3,
    //   stroke: '#Ff0000'
    // }],

    tertiaryRoads: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFFFFF',
      },
    ],

    tertiaryRoadsZ13: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    tertiaryRoadsZ14: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#FFFFFF',
      },
    ],

    tertiaryRoadsZ16: [
      {
        zIndex: 377,
        type: 'Line',
        strokeWidth: 8,
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
        strokeWidth: 5,
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

    pathRoadsZ17: [
      {
        zIndex: 354,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#7A807D',
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
        if (level >= 4) {
          return 'countryBoundaryZ4';
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
          return 'park';
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
      if (feature.properties.kind_detail === 'motorway_link') {
        return 'motorwayLink';
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
        // if ( props.is_link === true){
        //   return 'primaryLink';
        // }
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
        if (level >= 9) {
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
        if (level >= 13) {
          return 'tertiaryRoadsZ13';
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
        if (level >= 17) {
          return 'pathRoadsZ17';
        }
        if (level >= 16) {
          return 'pathRoads';
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
