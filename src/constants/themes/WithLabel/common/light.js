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

  strokeWidthZoomScale: function(level) {
    return level > 17 ? 1 : level > 14 ? 0.5 : 0.25;
  },

  styleGroups: {
    waterArea: [
      {
        zIndex: 9,
        type: 'Polygon',
        fill: '#B0ABA9',
      },
    ],

    riverLines: [
      {
        zIndex: 9,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#B0ABA9',
      },
    ],

    riverLinesLabels: [
      {
        zIndex: 9,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#B0ABA9',
      },
      {
        zIndex: 9,
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#94908E',
        collide: false,
      },
    ],

    playa: [
      {
        zIndex: 9,
        type: 'Polygon',
        fill: '#C4C2C2',
      },
    ],

    waterAreaLabels: [
      {
        zIndex: 9,
        type: 'Polygon',
        fill: '#B0ABA9',
      },
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#787878',
        collide: false,
      },
    ],

    waterAreaLabelsZ12: [
      {
        zIndex: 9,
        type: 'Polygon',
        fill: '#B0ABA9',
      },
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 11px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#787878',
        collide: false,
      },
    ],

    seaLabels: [
      {
        zIndex: 'top',
        type: 'Text',
        font: '10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        text: f => f.properties['name:en'],
        text: feature => feature.properties.name.toUpperCase(),
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#696969',
        collide: false,
      },
    ],

    seaLabelsZ7: [
      {
        zIndex: 'top',
        type: 'Text',
        font: '12px "OpenSans", sans-serif',
        text: f => f.properties.name,
        text: f => f.properties['name:en'],
        text: feature => feature.properties.name.toUpperCase(),
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#696969',
        collide: false,
      },
    ],

    river: [
      {
        zIndex: 9,
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
        zIndex: 11,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#999999',
      },
    ],

    countryBoundaryZ4: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 7,
        stroke: '#999999',
      },
    ],

    countryBoundaryZ6: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#999999',
      },
    ],

    countryBoundaryZ9: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 13,
        stroke: '#999999',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 13,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#999999',
        strokeDasharray: [6, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 10,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#A39F9D',
      },
    ],

    regionBoundaryZ8: [
      {
        zIndex: 10,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#A39F9D',
      },
    ],

    nature: [
      {
        zIndex: 3,
        type: 'Polygon',
        fill: '#D9D7D7',
      },
    ],

    park: [
      {
        zIndex: 3,
        type: 'Polygon',
        fill: '#C4C2C2',
      },
    ],

    parkLabels: [
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#393939',
        fill: '#696969',
        collide: false,
      },
    ],

    highAlbedo: [
      {
        zIndex: 4,
        type: 'Polygon',
        fill: '#F5E6DA',
      },
    ],

    motorway: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    motorwayZ10: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    motorwayZ12: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#FFFFFF',
      },
    ],

    motorwayZ16: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 13,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoads: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#E6E5E5',
      },
    ],

    trunkRoadsZ9: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoadsZ10: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoadsZ12: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoadsZ16: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 13,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoads: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#F7F7F7',
      },
    ],

    primaryRoadsZ11: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoadsZ14: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoadsZ17: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 9,
        stroke: '#FFFFFF',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#F7F7F7',
      },
    ],

    secondaryRoadsZ12: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#F7F7F7',
      },
    ],

    secondaryRoadsZ14: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#FFFFFF',
      },
    ],

    secondaryRoadsZ17: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#FFFFFF',
      },
    ],

    highway: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    trunkLink: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    primaryLink: [
      {
        zIndex: 16,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    secondaryLink: [
      {
        zIndex: 16,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 16,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#FFEDDE',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#FFFFFF',
      },
    ],

    tertiaryRoadsZ14: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    tertiaryRoadsZ16: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#FFFFFF',
      },
    ],

    minorRoads: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#FFFFFF',
      },
    ],

    minorRoadsZ14: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    minorRoadsZ16: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    minorRoadsZ17: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#FFFFFF',
      },
    ],

    pathRoads: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#99A19D',
      },
    ],

    pier: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#CCD9D1',
      },
    ],

    pierZ18: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B9C7BE',
      },
    ],

    runway: [
      {
        zIndex: 6,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#C7BEB3',
      },
    ],

    runwayZ12: [
      {
        zIndex: 6,
        type: 'Line',
        strokeWidth: 15,
        stroke: '#C7BEB3',
      },
    ],

    runwayZ14: [
      {
        zIndex: 6,
        type: 'Line',
        strokeWidth: 40,
        stroke: '#C7BEB3',
      },
    ],

    taxiway: [
      {
        zIndex: 5,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#C7BEB3',
      },
    ],

    airportLabels: [
      {
        zIndex: 'top',
        type: 'Text',
        font: 'bold 11px "OpenSans", sans-serif',
        text: f => f.properties.iata,
        strokeWidth: 3,
        // stroke: '#393939',
        fill: '#787878',
        collide: false,
      },
    ],

    buildings: [
      {
        zIndex: 31,
        type: 'Polygon',
        fill: '#D9D7D7',
      },
    ],

    countryL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#D1CFCF',
        fill: '#A19891',
        font: 'bold 13px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    countryS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#D1CFCF',
        fill: '#A19891',
        font: 'bold 9px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    region: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#ADACAC',
        font: 'bold 13px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    capitalXL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#4D4C4C',
        // fill: '#0000ff',
        font: 'bold 16px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    capitalL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#666565',
        // fill: '#0000ff',
        font: 'bold 14px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    capitalM: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#666565',
        // fill: '#0000ff',
        font: 'bold 12px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    capitalS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#797878',
        // fill: '#0000ff',
        font: 'bold 10px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population10m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#383838',
        // fill: '#ffff00',
        font: '16px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population10mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#383838',
        // fill: '#ffff00',
        font: '18px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population5m10m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#383838',
        // fill: '#ffff00',
        font: '14px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population5m10mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#383838',
        // fill: '#ffff00',
        font: '17px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population1m5m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#403F3F',
        // fill: '#ffff00',
        font: '13px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population1m5mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        fill: '#403F3F',
        // fill: '#ffff00',
        font: '16px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population500k1m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#545353',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population500k1mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#545353',
        font: '15px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population200k500k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#666565',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population200k500kLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#666565',
        font: '15px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population100k200k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#666565',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population100k200kLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#666565',
        font: '14px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population50k100k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#666565',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population50k100kLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#666565',
        font: '14px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population20k50k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#6E6D6D',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population10k20k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#6E6D6D',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population5k10k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#7A7979',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population1k5k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#D1CFCF',
        // fill: '#ff0000',
        fill: '#8A8888',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    neighbourhoodS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#D1CFCF',
        // fill: '#D4D4D4',
        fill: '#A19891',
        font: '9px "OpenSans", sans-serif',
        strokeWidth: 2,
        collide: false,
      },
    ],

    neighbourhoodL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#D1CFCF',
        // fill: '#D4D4D4',
        fill: '#A19891',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],
  },

  assign: function(feature, level) {
    var props = feature.properties;
    var kind = props.kind;
    var layer = props.layer;
    var geom = feature.geometry.type;

    if (layer === 'earth') {
      return 'earth';
    }

    if (layer === 'water') {
      if (kind === 'river') {
        if (level >= 14) {
          return 'riverLinesLabels';
        }
        return 'riverLines';
      }
      if (kind === 'riverbank' || kind === 'stream' || kind === 'canal') {
        return 'river';
      }
      if (kind === 'playa') {
        return 'playa';
      }
      if (geom === 'LineString' || geom === 'MultiLineString') {
        return;
      }
      if (
        kind === 'water' ||
        kind === 'riverbank' ||
        kind === 'lake' ||
        'bay' ||
        kind === 'reservoir'
      ) {
        var area = props.area;

        if (level == 1 && area >= 10000000000) {
          return 'waterArea';
        }
        if (level == 2 && area >= 7000000000) {
          return 'waterArea';
        }
        if (level == 3 && area >= 5000000000) {
          return 'waterArea';
        }
        if (level == 4 && area >= 300000000) {
          return 'waterArea';
        }
        if (level == 5 && area >= 50000000) {
          return 'waterArea';
        }
        if (level == 6 && area >= 50000000) {
          if (area >= 10000000000) {
            return 'waterAreaLabels';
          }
          return 'waterArea';
        }
        if (level == 7 && area >= 50000000) {
          if (area >= 7000000000) {
            return 'waterAreaLabels';
          }
          return 'waterArea';
        }
        if (level == 8 && area >= 50000000) {
          if (area >= 300000000) {
            return 'waterAreaLabels';
          }
          return 'waterArea';
        }
        if (level == 9 && area >= 15000000) {
          if (area >= 100000000) {
            return 'waterAreaLabels';
          }
          return 'waterArea';
        }
        if (level == 10 && area >= 4000000) {
          if (area >= 50000000) {
            return 'waterAreaLabels';
          }
          return 'waterArea';
        }
        if (level == 11 && area >= 1000000) {
          if (area >= 4000000) {
            return 'waterAreaLabels';
          }
          return 'waterArea';
        }
        if (level == 12 && area >= 250000) {
          if (area >= 1000000) {
            return 'waterAreaLabelsZ12';
          }
          return 'waterArea';
        }
        if (level == 13 && area >= 75000) {
          if (area >= 250000) {
            return 'waterAreaLabelsZ12';
          }
          return 'waterArea';
        }
        if (level == 14 && area >= 40000) {
          if (area >= 75000) {
            return 'waterAreaLabelsZ12';
          }
          return 'waterArea';
        }
        if (level >= 15) {
          if (area >= 20000) {
            return 'waterAreaLabelsZ12';
          }
          return 'waterArea';
        }
        if (kind === 'sea' || kind === 'ocean') {
          if (level >= 7) {
            return 'seaLabelsZ7';
          }
          if (level >= 3) {
            return 'seaLabels';
          }
        }
        return;
      }
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 9) {
          if (props.maritime_boundary === true) {
            return;
          }
          return 'countryBoundaryZ9';
        }
        if (level >= 6) {
          if (props.maritime_boundary === true) {
            return;
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

      //later todo might be fixing the weird tilezen data transition with GB
      if (kind === 'region' || kind === 'macroregion') {
        if (feature.properties.min_zoom <= 5) {
          if (level > 4) {
            return 'regionBoundary';
          }
        }
        if (feature.properties.min_zoom >= 5) {
          if (level >= 7) {
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

    if (layer === 'pois') {
      if (
        kind === 'national_park' ||
        kind === 'park' ||
        kind === 'protected_area' ||
        kind === 'forest' ||
        kind === 'beach'
      ) {
        var area = props.area;
        var min_zoom = props.min_zoom;

        if (level === 8 && min_zoom === 5) {
          return 'parkLabels';
        }
        if (level === 9 && min_zoom === 6) {
          return 'parkLabels';
        }
        if (level === 11 && min_zoom === 7) {
          return 'parkLabels';
        }
        if (level === 11 && min_zoom === 8) {
          return 'parkLabels';
        }
        if (level === 11 && min_zoom === 9) {
          return 'parkLabels';
        }
        if (level === 12 && min_zoom === 9) {
          return 'parkLabels';
        }
        if (level === 13 && min_zoom === 12) {
          return 'parkLabels';
        }
        if (level === 14 && min_zoom === 13) {
          return 'parkLabels';
        }
        if (level === 15 && min_zoom === 15) {
          return 'parkLabels';
        }
      }

      if (kind === 'airport' || kind === 'aerodrome') {
        if (level >= 12) {
          return 'airportLabels';
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
        if (level >= 9) {
          return 'trunkRoadsZ9';
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
      //known issue with what appear to be tertiary roads not rendering correctly... look to paris for example
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
        // if (feature.properties.kind_detail === 'footway' || feature.properties.kind_detail === 'steps'){
        //   return;
        // }
        if (level >= 16) {
          if (feature.properties.kind_detail === 'pier') {
            if (level >= 18) {
              return 'pierZ18';
            }
            return 'pier';
          }
          return 'pathRoads';
        }
      }

      if (feature.properties.kind_detail === 'runway') {
        if (level >= 14) {
          return 'runwayZ14';
        }
        if (level >= 12) {
          return 'runwayZ12';
        }
        if (level >= 11) {
          return 'runway';
        }
      }
      if (feature.properties.kind_detail === 'taxiway') {
        if (level >= 14) {
          return 'taxiway';
        }
      }
    }

    if (layer === 'buildings') {
      // if (feature.properties.kind_detail === 'hospital' || feature.properties.kind_detail === 'university' || feature.properties.kind_detail === 'stadium' || feature.properties.kind_detail === 'museum' || feature.properties.kind_detail === 'college'){
      //   if (level >= 17){
      //     return 'buildingOutline';
      //   }
      // }
      // if (feature.properties.kind_detail === 'train_station'){
      //   if (level >= 17){
      //     return 'trainStation';
      //   }
      // }
      // if (feature.properties.kind_detail === 'cathedral' || feature.properties.kind_detail === 'church' || feature.properties.kind_detail === 'mosque' || feature.properties.kind_detail === 'synagogue' || feature.properties.kind_detail === 'temple'){
      //   if (level >= 17){
      //     return 'placeOfWorship';
      //   }
      // }
      if (level >= 18) {
        return 'buildings';
      }
    }

    if (layer === 'places') {
      if (kind === 'country') {
        if (props.population >= 5000000) {
          if (level >= 5) {
            return 'countryL';
          }
          if (level >= 2) {
            return 'countryS';
          }
        }
      }

      if (kind === 'region') {
        if (level > 5) {
          return 'region';
        }
      }

      if (kind === 'locality') {
        if (props.population >= 10000000) {
          if (level >= 9) {
            return 'population10mLarge';
          }
          if (level >= 4) {
            if (props.country_capital === true) {
              return 'capitalXL';
            }
            return 'population10m';
          }
        }

        if (props.population >= 5000000 && props.population < 10000000) {
          if (level >= 9) {
            return 'population5m10mLarge';
          }
          if (level >= 4) {
            if (props.country_capital === true) {
              return 'capitalL';
            }
            return 'population5m10m';
          }
        }

        if (props.population >= 1000000 && props.population < 5000000) {
          if (level >= 10) {
            return 'population1m5mLarge';
          }
          if (level >= 4) {
            if (props.country_capital === true) {
              return 'capitalL';
            }
            return 'population1m5m';
          }
        }

        if (props.population >= 500000 && props.population < 1000000) {
          if (level >= 11) {
            return 'population500k1mLarge';
          }
          if (level >= 5) {
            if (props.country_capital === true) {
              return 'capitalM';
            }
            return 'population500k1m';
          }
        }

        if (props.population >= 200000 && props.population < 500000) {
          if (level >= 12) {
            return 'population200k500kLarge';
          }
          if (level >= 6) {
            if (props.country_capital === true) {
              return 'capitalM';
            }
            return 'population200k500k';
          }
        }

        if (props.population >= 100000 && props.population < 200000) {
          if (level >= 12) {
            return 'population100k200kLarge';
          }
          if (level >= 6) {
            if (props.country_capital === true) {
              return 'capitalS';
            }
            return 'population100k200k';
          }
        }

        if (props.population >= 50000 && props.population < 100000) {
          if (level >= 12) {
            return 'population50k100kLarge';
          }
          if (level >= 6) {
            if (props.country_capital === true) {
              return 'capitalS';
            }
            return 'population50k100k';
          }
        }

        if (props.population >= 20000 && props.population < 50000) {
          if (level >= 9) {
            if (props.country_capital === true) {
              return 'capitalS';
            }
            return 'population20k50k';
          }
        }

        if (props.population >= 10000 && props.population < 20000) {
          if (level >= 10) {
            return 'population10k20k';
          }
        }

        if (props.population >= 5000 && props.population < 10000) {
          if (level >= 11) {
            return 'population5k10k';
          }
        }

        if (props.population >= 1000 && props.population < 5000) {
          if (level >= 12) {
            return 'population2k5k';
          }
        }
      }

      if (
        kind === 'borough' ||
        kind === 'macrohood' ||
        kind === 'neighbourhood'
      ) {
        if (level >= 15) {
          return 'neighbourhoodL';
        }
        if (level >= 13) {
          return 'neighbourhoodS';
        }
      }
    }
  },
};

export default light;
