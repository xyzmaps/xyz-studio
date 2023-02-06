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

  strokeWidthZoomScale: function(level) {
    return level > 17 ? 1 : level > 14 ? 0.5 : 0.25;
  },

  styleGroups: {
    waterArea: [
      {
        zIndex: 7,
        type: 'Polygon',
        fill: '#1F1F1F',
      },
    ],

    riverLines: [
      {
        zIndex: 7,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#1F1F1F',
      },
    ],

    riverLinesLabels: [
      {
        zIndex: 7,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#1F1F1F',
      },
      {
        zIndex: 7,
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#5E5E5E',
        collide: false,
      },
    ],

    oceanLabels: [
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

    bayLabels: [
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#807F7F',
        collide: false,
      },
    ],

    lakeLabels: [
      {
        zIndex: 'top',
        type: 'Text',
        font: 'italic 10px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#707070',
        fill: '#807F7F',
        collide: false,
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
        strokeWidth: 4,
        stroke: '#363636',
      },
    ],

    countryBoundaryZ5: [
      {
        zIndex: 11,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#363636',
      },
    ],

    countryBoundaryZ8: [
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
        strokeWidth: 1,
        stroke: '#1F1F1F',
        strokeDasharray: [6, 4],
      },
    ],

    regionBoundary: [
      {
        zIndex: 9,
        type: 'Line',
        strokeWidth: 3,
        stroke: '#363636',
        opacity: 0.75,
      },
    ],

    runway: [
      {
        zIndex: 6,
        type: 'Polygon',
        fill: '#333333',
      },
    ],

    airportLabels: [
      {
        zIndex: 'top',
        type: 'Text',
        font: 'bold 11px "OpenSans", sans-serif',
        text: f => f.properties.name,
        strokeWidth: 3,
        // stroke: '#393939',
        fill: '#B3B2B2',
        collide: false,
      },
    ],

    motorway: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#7A7A7A',
      },
    ],

    motorwayZ7: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#9C9C9C',
      },
    ],

    motorwayZ12: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#9C9C9C',
      },
    ],

    motorwayZ14: [
      {
        zIndex: 27,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    trunkRoads: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#7A7A7A',
      },
    ],

    trunkRoadsZ7: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#9C9C9C',
      },
    ],

    trunkRoadsZ12: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#9C9C9C',
      },
    ],

    trunkRoadsZ14: [
      {
        zIndex: 25,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#FFFFFF',
      },
    ],

    primaryRoads: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#5E5D5D',
      },
    ],

    primaryRoadsZ7: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#807F7F',
      },
    ],

    primaryRoadsZ12: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#807F7F',
      },
    ],

    primaryRoadsZ14: [
      {
        zIndex: 23,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#ADADAD',
      },
    ],

    secondaryRoads: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#4F4F4F',
      },
    ],

    secondaryRoadsZ12: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#6E6E6E',
      },
    ],

    secondaryRoadsZ14: [
      {
        zIndex: 21,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#919191',
      },
    ],

    highway: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#5E5D5D',
      },
    ],

    highwayZ12: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#5E5D5D',
      },
    ],

    highwayZ14: [
      {
        zIndex: 29,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#ADADAD',
      },
    ],

    tertiaryRoads: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#474747',
      },
    ],

    tertiaryRoadsZ12: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#474747',
      },
    ],

    tertiaryRoadsZ14: [
      {
        zIndex: 19,
        type: 'Line',
        strokeWidth: 2,
        stroke: '#7A7A7A',
      },
    ],

    minorRoads: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#474747',
      },
    ],

    minorRoadsZ12: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#474747',
      },
    ],

    minorRoadsZ14: [
      {
        zIndex: 17,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#7A7A7A',
      },
    ],

    pathRoads: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#2E2E2E',
        strokeDasharray: [1, 3],
      },
    ],

    pathRoadsz16: [
      {
        zIndex: 15,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#363636',
        strokeDasharray: [2, 4],
      },
    ],

    buildings: [
      { zIndex: 31, type: 'Line', strokeWidth: 3, stroke: '#3D3D3D' },
      { zIndex: 32, type: 'Polygon', fill: '#262626' },
    ],

    countryL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#262626',
        fill: '#666666',
        font: 'bold 13px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    countryS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#262626',
        fill: '#666666',
        font: 'bold 9px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    region: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#595959',
        font: 'bold 13px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    capitalXL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#ffffff',
        // fill: '#0000ff',
        font: 'bold 16px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    capitalL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#D9D9D9',
        // fill: '#0000ff',
        font: 'bold 14px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    capitalM: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#CCCCCC',
        // fill: '#0000ff',
        font: 'bold 12px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    capitalS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#BFBFBF',
        // fill: '#0000ff',
        font: 'bold 10px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population10m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#ffffff',
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
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#ffffff',
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
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#ffffff',
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
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#ffffff',
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
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#E6E5E5',
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
        text: f => f.properties['name:en'],
        stroke: '#262626',
        fill: '#E6E5E5',
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
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#CCCCCC',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population500k1mLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#CCCCCC',
        font: '15px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population200k500k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#BDBDBD',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population200k500kLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#BDBDBD',
        font: '15px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population100k200k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#BDBDBD',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population100k200kLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#BDBDBD',
        font: '14px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population50k100k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#BDBDBD',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population50k100kLarge: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#BDBDBD',
        font: '14px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population20k50k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#ADADAD',
        font: '12px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population10k20k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#ff0000',
        fill: '#ADADAD',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population5k10k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#D4D4D4',
        fill: '#A6A6A6',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    population1k5k: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#262626',
        // fill: '#D4D4D4',
        fill: '#9C9C9C',
        font: '11px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    neighbourhoodS: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#262626',
        // fill: '#D4D4D4',
        fill: '#666666',
        font: '10px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    neighbourhoodL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#262626',
        // fill: '#D4D4D4',
        fill: '#666666',
        font: '13px "OpenSans", sans-serif',
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

    if (layer === 'water') {
      if (kind === 'river') {
        if (level >= 12) {
          return 'riverLinesLabels';
        }
        return 'riverLines';
      }

      if (geom === 'LineString' || geom === 'MultiLineString') {
        return;
      }

      if (kind === 'ocean') {
        if (feature.properties.min_zoom <= 6) {
          return 'oceanLabels';
        }
        if (feature.properties.min_zoom === 7) {
          if (level >= 6) {
            return 'oceanLabels';
          }
        }
        if (feature.properties.min_zoom >= 8) {
          if (level >= 9) {
            return 'oceanLabels';
          }
        }
      }
      if (kind === 'bay') {
        if (feature.properties.min_zoom <= 9) {
          return 'bayLabels';
        }
        if (feature.properties.min_zoom >= 10) {
          if (level >= 11) {
            return 'bayLabels';
          }
        }
      }
      if (kind === 'lake') {
        if (feature.properties.min_zoom <= 9) {
          return 'lakeLabels';
        }
        if (feature.properties.min_zoom >= 10) {
          if (level >= 13) {
            return 'lakeLabels';
          }
        }
      }
      return 'waterArea';
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 8) {
          return 'countryBoundaryZ8';
        }
        if (level >= 5) {
          return 'countryBoundaryZ5';
        }
        if (level >= 1) {
          return 'countryBoundary';
        }
      }

      if (kind === 'disputed') {
        if (level >= 4) {
          return 'dashed_boundary';
        }
      }

      if (kind === 'region') {
        if (level >= 5) {
          return 'regionBoundary';
        }
      }
    }

    if (layer === 'landuse') {
      if (kind === 'runway') {
        return 'runway';
      }
    }

    if (layer === 'pois') {
      if (kind === 'airport') {
        if (level >= 15) {
          return 'airportLabels';
        }
      }
    }

    if (layer === 'roads') {
      if (kind === 'rail' || kind === 'ferry') {
        return;
      }
      if (feature.properties.kind_detail === 'motorway') {
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
        if (level >= 14) {
          return 'highwayZ14';
        }
        if (level >= 12) {
          return 'highwayZ12';
        }
        return 'highway';
      }
      if (feature.properties.kind_detail === 'primary') {
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
        if (level >= 14) {
          return 'secondaryRoadsZ14';
        }
        if (level >= 12) {
          return 'secondaryRoadsZ12';
        }
        return 'secondaryRoads';
      }
      if (feature.properties.kind_detail === 'tertiary') {
        if (level >= 14) {
          return 'tertiaryRoadsZ14';
        }
        if (level >= 12) {
          return 'tertiaryRoadsZ12';
        }
        return 'tertiaryRoads';
      }
      if (feature.properties.kind === 'minor_road') {
        if (level >= 14) {
          return 'minorRoadsZ14';
        }
        if (level >= 12) {
          return 'minorRoadsZ12';
        }
        return 'minorRoads';
      }
      if (feature.properties.kind === 'path') {
        if (level >= 16) {
          return 'pathRoadsz16';
        }
        if (level >= 14) {
          return 'pathRoads';
        }
      }
    }

    if (layer === 'buildings') {
      if (level >= 16) {
        return 'buildings';
      }
    }

    if (layer === 'places') {
      if (kind === 'country') {
        if (level >= 5) {
          return 'countryL';
        }
        if (level >= 2) {
          return 'countryS';
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

      if (kind === 'neighbourhood') {
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
