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

  strokeWidthZoomScale: function(level) {
    return level > 17 ? 1 : level > 14 ? 0.5 : 0.25;
  },

  styleGroups: {
    waterArea: [
      {
        zIndex: 80,
        type: 'Polygon',
        fill: '#98C9E5',
      },
    ],

    riverLines: [
      {
        zIndex: 80,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#98C9E5',
      },
    ],

    riverLinesLabels: [
      {
        zIndex: 80,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#98C9E5',
      },
      {
        zIndex: 80,
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#7B99AD',
        collide: false,
      },
    ],

    playa: [
      {
        zIndex: 80,
        type: 'Polygon',
        fill: '#E6EFF5',
      },
    ],

    waterAreaLabels: [
      {
        zIndex: 80,
        type: 'Polygon',
        fill: '#98C9E5',
      },
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        fill: '#728EA1',
        collide: false,
      },
    ],

    waterAreaLabelsZ12: [
      {
        zIndex: 80,
        type: 'Polygon',
        fill: '#98C9E5',
      },
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 11px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        fill: '#728EA1',
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
        fill: '#7693A6',
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
        fill: '#7693A6',
        collide: false,
      },
    ],

    river: [
      {
        zIndex: 80,
        type: 'Polygon',
        fill: '#98C9E5',
      },
    ],

    swimmingPool: [
      {
        zIndex: 80,
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
        zIndex: 90,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D6CDC1',
      },
    ],

    countryBoundaryZ4: [
      {
        zIndex: 90,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#D6CDC1',
      },
    ],

    countryBoundaryZ6: [
      {
        zIndex: 90,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#D6CDC1',
      },
    ],

    countryBoundaryZ9: [
      {
        zIndex: 90,
        type: 'Line',
        strokeWidth: 14,
        stroke: '#D6CDC1',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 95,
        type: 'Line',
        strokeWidth: 8,
        stroke: '#D6CDC1',
        strokeDasharray: [6, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 85,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#D9C9B4',
        opacity: 0.5,
      },
    ],

    regionBoundaryZ8: [
      {
        zIndex: 85,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#D9C9B4',
        opacity: 0.5,
      },
    ],

    nationalForest: [
      {
        zIndex: 35,
        type: 'Polygon',
        fill: '#AFE0A4',
        opacity: 0.65,
      },
    ],

    nationalPark: [
      {
        zIndex: 10,
        type: 'Polygon',
        fill: '#C1F0B6',
        opacity: 0.75,
      },
    ],

    park: [
      {
        zIndex: 20,
        type: 'Polygon',
        fill: '#C7EDA8',
        opacity: 0.85,
      },
    ],

    parkLabels: [
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        stroke: '#F4F7F9',
        fill: '#948F87',
        collide: false,
      },
    ],

    beach: [
      {
        zIndex: 75,
        type: 'Polygon',
        fill: '#FCFADE',
        opacity: 0.75,
      },
    ],

    glacier: [
      {
        zIndex: 30,
        type: 'Polygon',
        fill: '#E8F2FF',
        opacity: 0.85,
      },
    ],

    golfCourse: [
      {
        zIndex: 55,
        type: 'Polygon',
        fill: '#B5E8B6',
        opacity: 0.85,
      },
    ],

    university: [
      {
        zIndex: 40,
        type: 'Polygon',
        fill: '#EBE6DD',
        opacity: 0.45,
      },
    ],

    hospital: [
      {
        zIndex: 50,
        type: 'Polygon',
        fill: '#FFF5F9',
        opacity: 0.75,
      },
    ],

    builtup: [
      {
        zIndex: 15,
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
        zIndex: 70,
        type: 'Polygon',
        fill: '#E3D0BA',
        opacity: 0.75,
      },
    ],

    motorway: [
      {
        zIndex: 150,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#BFBAB8',
      },
    ],

    motorwayZ11: [
      {
        zIndex: 150,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    motorwayZ14: [
      {
        zIndex: 150,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#B7B2AF',
      },
    ],

    motorwayZ17: [
      {
        zIndex: 150,
        type: 'Line',
        strokeWidth: 16,
        stroke: '#B7B2AF',
      },
    ],

    trunkRoads: [
      {
        zIndex: 145,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#EBE4E1',
      },
    ],

    trunkRoadsZ9: [
      {
        zIndex: 145,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#BFBAB8',
      },
    ],

    trunkRoadsZ11: [
      {
        zIndex: 145,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    trunkRoadsZ14: [
      {
        zIndex: 145,
        type: 'Line',
        strokeWidth: 10,
        stroke: '#B7B2AF',
      },
    ],

    trunkRoadsZ17: [
      {
        zIndex: 145,
        type: 'Line',
        strokeWidth: 16,
        stroke: '#B7B2AF',
      },
    ],

    primaryRoads: [
      {
        zIndex: 140,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#D1CCC9',
      },
    ],

    primaryRoadsZ10: [
      {
        zIndex: 140,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C2BDBA',
      },
    ],

    primaryRoadsZ13: [
      {
        zIndex: 140,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    primaryRoadsZ17: [
      {
        zIndex: 140,
        type: 'Line',
        strokeWidth: 4,
        stroke: '#B7B2AF',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 135,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C2BDBA',
      },
    ],

    secondaryRoadsZ13: [
      {
        zIndex: 135,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    highway: [
      {
        zIndex: 155,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    highwayZ14: [
      {
        zIndex: 155,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    trunkLink: [
      {
        zIndex: 160,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    primaryLink: [
      {
        zIndex: 110,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    secondaryLink: [
      {
        zIndex: 110,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    tertiaryLink: [
      {
        zIndex: 110,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 130,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#C2BDBA',
      },
    ],

    tertiaryRoadsZ14: [
      {
        zIndex: 130,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#B7B2AF',
      },
    ],

    minorRoads: [
      {
        zIndex: 125,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#EDE6E4',
      },
    ],

    minorRoadsZ14: [
      {
        zIndex: 125,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#C7C1BF',
      },
    ],

    minorRoadsZ17: [
      {
        zIndex: 125,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#B7B2AF',
      },
    ],

    pathRoads: [
      {
        zIndex: 100,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#D1CCC9',
      },
    ],

    runway: [
      {
        zIndex: 65,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#D1BCBD',
      },
    ],

    runwayZ12: [
      {
        zIndex: 65,
        type: 'Line',
        strokeWidth: 12,
        stroke: '#D1BCBD',
      },
    ],

    runwayZ14: [
      {
        zIndex: 65,
        type: 'Line',
        strokeWidth: 25,
        stroke: '#D1BCBD',
      },
    ],

    taxiway: [
      {
        zIndex: 60,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#D1BCBD',
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
        fill: '#807B74',
        collide: false,
      },
    ],

    buildings: [
      {
        zIndex: 165,
        type: 'Polygon',
        fill: '#EDF3F5',
      },
    ],

    hospitalBuilding: [
      {
        zIndex: 165,
        type: 'Polygon',
        fill: '#FCE1EB',
        opacity: 0.75,
      },
    ],

    universityBuilding: [
      {
        zIndex: 165,
        type: 'Polygon',
        fill: '#F5EEC4',
        opacity: 0.75,
      },
    ],

    schoolBuilding: [
      {
        zIndex: 165,
        type: 'Polygon',
        fill: '#F7E5D2',
        opacity: 0.75,
      },
    ],

    stadiumBuilding: [
      {
        zIndex: 165,
        type: 'Polygon',
        fill: '#F2CAB1',
        opacity: 0.75,
      },
    ],

    trainStation: [
      {
        zIndex: 2,
        type: 'Polygon',
        fill: '#E8EFFA',
      },
    ],

    countryL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#F4F7F9',
        fill: '#A19B92',
        font: 'bold 13px "OpenSans", sans-serif',
        strokeWidth: 0,
        collide: false,
      },
    ],

    countryS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#F4F7F9',
        fill: '#99938B',
        font: 'bold 9px "OpenSans", sans-serif',
        strokeWidth: 0,
        collide: false,
      },
    ],

    region: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F7F9',
        fill: '#CCC4BA',
        font: 'bold 13px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    capitalXL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F7F9',
        fill: '#4D4945',
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
        stroke: '#F4F7F9',
        fill: '#5C5853',
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
        stroke: '#F4F7F9',
        fill: '#5C5853',
        // fill: '#0000ff',
        font: 'bold 12px "OpenSans", sans-serif',
        strokeWidth: 2,
        collide: false,
      },
    ],

    capitalS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F7F9',
        fill: '#66625C',
        // fill: '#0000ff',
        font: 'bold 10px "OpenSans", sans-serif',
        strokeWidth: 2,
        collide: false,
      },
    ],

    population10m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        stroke: '#F4F7F9',
        fill: '#4D4945',
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
        stroke: '#F4F7F9',
        fill: '#4D4945',
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
        stroke: '#F4F7F9',
        fill: '#4D4945',
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
        stroke: '#F4F7F9',
        fill: '#4D4945',
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
        stroke: '#F4F7F9',
        fill: '#5C5853',
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
        stroke: '#F4F7F9',
        fill: '#5C5853',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#66625C',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#66625C',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#7A766F',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#7A766F',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#7A766F',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#7A766F',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#7A766F',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#7A766F',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#87827B',
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
        stroke: '#F4F7F9',
        // fill: '#ff0000',
        fill: '#87827B',
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
        stroke: '#F4F7F9',
        // fill: '#D4D4D4',
        fill: '#918C84',
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
        stroke: '#F4F7F9',
        // fill: '#D4D4D4',
        fill: '#9C968E',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 2,
        collide: false,
      },
    ],

    neighbourhoodS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties.name,
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#F4F7F9',
        // fill: '#D4D4D4',
        fill: '#ADA79E',
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
        stroke: '#F4F7F9',
        // fill: '#D4D4D4',
        fill: '#ADA79E',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 4,
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
        if (level >= 9) {
          return 'trunkRoadsZ9';
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
          return 'minorRoadsZ14';
        }
        if (level >= 12) {
          return 'minorRoads';
        }
      }
      if (feature.properties.kind === 'path') {
        if (level >= 17) {
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
        if (level >= 10) {
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

export default miamiDay;
