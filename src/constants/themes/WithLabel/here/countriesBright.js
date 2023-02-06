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
const countriesBright = {
  mainColors: ['#67D2C8', '#F7F7F7'],

  backgroundColor: '#67D2C8',

  strokeWidthZoomScale: function(level) {
    return level > 17 ? 1 : level > 14 ? 0.5 : 0.25;
  },

  styleGroups: {
    waterArea: [
      {
        zIndex: 4,
        type: 'Polygon',
        fill: '#F7F7F7',
      },
    ],

    riverLines: [
      {
        zIndex: 4,
        type: 'Line',
        strokeWidth: 1,
        stroke: '#F7F7F7',
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
        stroke: '#F7F7F7',
        fill: '#67D2C8',
        collide: false,
      },
    ],

    earth: [
      {
        zIndex: 1,
        type: 'Polygon',
        fill: '#67D2C8',
      },
    ],

    countryBoundary: [
      {
        zIndex: 5,
        type: 'Line',
        strokeWidth: 6,
        stroke: '#F7F7F7',
      },
    ],

    countryBoundaryZ9: [
      {
        zIndex: 5,
        type: 'Line',
        strokeWidth: 14,
        stroke: '#F7F7F7',
      },
    ],

    dashed_boundary: [
      {
        zIndex: 5,
        type: 'Line',
        strokeWidth: 5,
        stroke: '#F7F7F7',
        strokeDasharray: [3, 4],
      },
    ],

    buildings: [
      {
        zIndex: 4,
        type: 'Polygon',
        fill: '#F7F7F7',
      },
    ],

    countryL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        text: feature => feature.properties.name.toUpperCase(),
        stroke: '#67D2C8',
        fill: '#F7F7F7',
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
        stroke: '#67D2C8',
        fill: '#F7F7F7',
        font: 'bold 9px "OpenSans", sans-serif',
        strokeWidth: 4,
        collide: false,
      },
    ],

    capitalXL: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#67D2C8',
        fill: '#F7F7F7',
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
        text: f => f.properties['name:en'],
        stroke: '#67D2C8',
        fill: '#F7F7F7',
        // fill: '#0000ff',
        font: 'bold 14px "OpenSans", sans-serif',
        strokeWidth: 3,
        collide: false,
      },
    ],

    population10m: [
      {
        zIndex: 'top',
        type: 'Text',
        text: f => f.properties['name:en'],
        stroke: '#67D2C8',
        fill: '#F7F7F7',
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
        stroke: '#67D2C8',
        fill: '#F7F7F7',
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
        stroke: '#67D2C8',
        fill: '#F7F7F7',
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
        stroke: '#67D2C8',
        fill: '#F7F7F7',
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
        stroke: '#67D2C8',
        fill: '#F7F7F7',
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
        stroke: '#67D2C8',
        fill: '#F7F7F7',
        // fill: '#ffff00',
        font: '16px "OpenSans", sans-serif',
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
          if (level <= 6) {
            return 'waterArea';
          }
          return 'oceanLabels';
        }
        if (feature.properties.min_zoom === 8) {
          if (level <= 7) {
            return 'waterArea';
          }
          return 'oceanLabels';
        }
        if (feature.properties.min_zoom === 9) {
          if (level <= 7) {
            return 'waterArea';
          }
          return 'oceanLabels';
        }
        if (feature.properties.min_zoom === 10) {
          if (level <= 9) {
            return 'waterArea';
          }
          return 'oceanLabels';
        }
      }

      return 'waterArea';
    }

    if (layer === 'boundaries') {
      if (kind === 'country') {
        if (level >= 9) {
          return 'countryBoundaryZ9';
        }
        if (level >= 1) {
          return 'countryBoundary';
        }
      }
      if (kind === 'disputed') {
        return 'dashed_boundary';
      }
    }

    if (layer === 'buildings') {
      return layer;
    }

    if (layer === 'places') {
      if (kind === 'country') {
        if (level >= 4) {
          return 'countryL';
        }
        if (level >= 2) {
          return 'countryS';
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
      }
    }
  },
};

export default countriesBright;
