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

  strokeWidthZoomScale: function(level) {
    return level > 17 ? 1 : level > 14 ? 0.5 : 0.25;
  },

  styleGroups: {
    waterArea: [
      {
        zIndex: 100,
        type: 'Polygon',
        fill: '#CCE4E3',
      },
    ],

    riverLines: [
      {
        zIndex: 100,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCE4E3',
      },
    ],

    riverLinesLabels: [
      {
        zIndex: 100,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCE4E3',
      },
      {
        zIndex: 100,
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#B5C4C4',
        collide: false,
      },
    ],

    playa: [
      {
        zIndex: 100,
        type: 'Polygon',
        fill: '#EDEAE6',
      },
    ],

    waterAreaLabels: [
      {
        zIndex: 100,
        type: 'Polygon',
        fill: '#CCE4E3',
      },
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#A4B3B3',
        collide: false,
      },
    ],

    waterAreaLabelsZ12: [
      {
        zIndex: 100,
        type: 'Polygon',
        fill: '#CCE4E3',
      },
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 11px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#A4B3B3',
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
        fill: '#A4B3B3',
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
        fill: '#A4B3B3',
        collide: false,
      },
    ],

    river: [
      {
        zIndex: 100,
        type: 'Polygon',
        fill: '#CCE4E3',
      },
    ],

    boundary: [
      {
        zIndex: 105,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCE4E3',
      },
    ],

    boundaryZ12: [
      {
        zIndex: 105,
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
        zIndex: 115,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D2D7D9',
      },
    ],

    countryBoundaryZ7: [
      {
        zIndex: 115,
        type: 'Line',
        strokeWidth: 12,
        stroke: '#D9DEDD',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 115,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#CFD6D4',
        strokeDasharray: [6, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 110,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#E3E8E7',
        opacity: 0.75,
      },
    ],

    parkLabels: [
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        stroke: '#F4F1ED',
        fill: '#A1A6A4',
        collide: false,
      },
    ],

    nationalForest: [
      {
        zIndex: 34,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#B0CFC8',
        opacity: 0.75,
      },
      { zIndex: 35, type: 'Polygon', fill: '#E5EEDE' },
    ],

    nationalPark: [
      {
        zIndex: 4,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#CADBAF',
        opacity: 0.75,
      },
      { zIndex: 5, type: 'Polygon', fill: '#E6F0D1' },
    ],

    park: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#BEDBD5',
        opacity: 0.75,
      },
      { zIndex: 20, type: 'Polygon', fill: '#E3EEDF' },
    ],

    beach: [
      {
        zIndex: 84,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#f5d6a1',
        opacity: 0.75,
      },
      { zIndex: 85, type: 'Polygon', fill: '#F2E5C6' },
    ],

    university: [
      {
        zIndex: 39,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#F2E3A8',
        opacity: 0.75,
      },
      { zIndex: 40, type: 'Polygon', fill: '#F2ECCC' },
    ],

    garden: [
      {
        zIndex: 89,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#C2D4A1',
        opacity: 0.75,
      },
      { zIndex: 90, type: 'Polygon', fill: '#DFEACA' },
    ],

    golfCourse: [
      {
        zIndex: 59,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#A3D4D6',
        opacity: 0.75,
      },
      { zIndex: 60, type: 'Polygon', fill: '#DBEADC' },
    ],

    zoo: [
      {
        zIndex: 49,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D0DEA6',
        opacity: 0.75,
      },
      { zIndex: 50, type: 'Polygon', fill: '#E8F1CF' },
    ],

    hospital: [
      {
        zIndex: 54,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#F7C9BA',
        opacity: 0.75,
      },
      { zIndex: 55, type: 'Polygon', fill: '#EFE1CC' },
    ],

    industrial: [
      {
        zIndex: 9,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D4CEC7',
        opacity: 0.75,
      },
      { zIndex: 10, type: 'Polygon', fill: '#ECEBE1' },
    ],

    school: [
      {
        zIndex: 79,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#EBE0B2',
        opacity: 0.75,
      },
      { zIndex: 80, type: 'Polygon', fill: '#F4F0D5' },
    ],

    pitch: [
      {
        zIndex: 94,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#DAD7BF',
        opacity: 0.75,
      },
      { zIndex: 95, type: 'Polygon', fill: '#EEECD7' },
    ],

    motorway: [
      {
        zIndex: 155,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#EDBF8E',
      },
    ],

    trunkRoads: [
      {
        zIndex: 150,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#EDBF8E',
      },
    ],

    primaryRoads: [
      {
        zIndex: 145,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#E0D6D3',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 140,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E0D6D3',
      },
    ],

    highway: [
      {
        zIndex: 160,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E0D6D3',
      },
    ],

    trunkLink: [
      {
        zIndex: 160,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E0D6D3',
      },
    ],

    primaryLink: [
      {
        zIndex: 125,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E0D6D3',
      },
    ],

    secondaryLink: [
      {
        zIndex: 125,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E0D6D3',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 125,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E0D6D3',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 135,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E0D6D3',
      },
    ],

    minorRoads: [
      {
        zIndex: 130,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#EDE2DF',
      },
    ],

    minorRoadsZ13: [
      {
        zIndex: 130,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#E0D6D3',
      },
    ],

    runway: [
      {
        zIndex: 70,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#CCBEBA',
      },
    ],

    runwayZ12: [
      {
        zIndex: 70,
        type: 'Line',
        strokeWidth: 12,
        stroke: '#CCBEBA',
      },
    ],

    runwayZ14: [
      {
        zIndex: 70,
        type: 'Line',
        strokeWidth: 25,
        stroke: '#CCBEBA',
      },
    ],

    taxiway: [
      {
        zIndex: 65,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCBEBA',
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
        fill: '#6F7273',
        collide: false,
      },
    ],

    pathRoads: [
      {
        zIndex: 120,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#CCD9F0',
      },
    ],

    countryL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#F4F1ED',
        fill: '#C5CED1',
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
        stroke: '#F4F1ED',
        fill: '#C5CED1',
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
        stroke: '#F4F1ED',
        fill: '#C4CFCC',
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
        stroke: '#F4F1ED',
        fill: '#7C807E',
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
        stroke: '#F4F1ED',
        fill: '#7C807E',
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
        stroke: '#F4F1ED',
        fill: '#7C807E',
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
        stroke: '#F4F1ED',
        fill: '#949998',
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
        stroke: '#F4F1ED',
        fill: '#7C807E',
        // fill: '#ffff00',
        font: '16px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population10mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        fill: '#7C807E',
        // fill: '#ffff00',
        font: '18px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population5m10m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        fill: '#7C807E',
        // fill: '#ffff00',
        font: '14px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population5m10mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        fill: '#7C807E',
        // fill: '#ffff00',
        font: '17px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population1m5m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        fill: '#8B8F8E',
        // fill: '#ffff00',
        font: '13px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population1m5mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        fill: '#8B8F8E',
        // fill: '#ffff00',
        font: '16px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population500k1m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#949998',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population500k1mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#949998',
        font: '15px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population200k500k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#A1A6A4',
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
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#A1A6A4',
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
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#A1A6A4',
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
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#A1A6A4',
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
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#A1A6A4',
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
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#A1A6A4',
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
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#A6ABA9',
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
        stroke: '#F4F1ED',
        // fill: '#ff0000',
        fill: '#A6ABA9',
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
        stroke: '#F4F1ED',
        // fill: '#D4D4D4',
        fill: '#ADB3B1',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population1k5k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F1ED',
        // fill: '#D4D4D4',
        fill: '#B2B8B6',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    neighbourhoodS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#F4F1ED',
        // fill: '#D4D4D4',
        fill: '#CCB9A5',
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
        stroke: '#F4F1ED',
        // fill: '#D4D4D4',
        fill: '#CCB9A5',
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

      //later todo might be fixing the weird tilezen data transition with GB
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
        return;
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
        if (level >= 13) {
          return 'minorRoadsZ13';
        }
        return 'minorRoads';
      }
      if (feature.properties.kind_detail === 'runway') {
        if (level >= 14) {
          return 'runwayZ14';
        }
        if (level >= 12) {
          return 'runwayZ12';
        }
        if (level >= 10) {
          return 'runway';
        }
      }
      if (feature.properties.kind_detail === 'taxiway') {
        if (level >= 12) {
          return 'taxiway';
        }
      }
      if (feature.properties.kind === 'path') {
        if (level >= 16) {
          return 'pathRoads';
        }
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

export default springSoft;
