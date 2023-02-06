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

import { find } from 'lodash';
import { parseStyleRule } from '../helpers/index';

const cssColors = [
  'red',
  'yellow',
  'black',
  'orange',
  'blue',
  'white',
  'gray',
  'green',
  'pink',
  'navy',
  'maroon',
  'brown',
  'aqua',
];

const checkRules = (
  styleKey,
  featureStyleKey,
  geometry,
  styleRules,
  feature,
  geometryStyle
) => {
  let ruleApplied = null;

  if (styleRules) {
    if (styleRules[geometry]) {
      // loop through all point stylegroups and find the last rule that applies
      ruleApplied = find(styleRules[geometry], stylerule =>
        stylerule.r.some(
          // loop through all point rule groups (in OR)
          stylegroup =>
            stylegroup.every(
              // loop through all rule groups rules (in AND)
              ({ property, operator, value }) => {
                let p = null;
                if (property === 'id') {
                  p = feature.id;
                } else if (property === '__id') {
                  p = feature.properties.id;
                } else {
                  p = feature.properties[property];
                }
                // const p = property === 'id' ? feature['id'] : feature.properties[property]; //id is not a property!
                return parseStyleRule(p, operator, value); // parse rule operator
              }
            )
        )
      );
    }
  }

  if (ruleApplied) {
    return `${styleKey}_${ruleApplied.id}`;
  }

  if (
    geometryStyle &&
    geometryStyle.includes(geometry) &&
    feature.properties.color &&
    (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(feature.properties.color) ||
      /([0-9A-F]{6}$)|([0-9A-F]{3}$)/i.test(feature.properties.color) ||
      cssColors.includes(feature.properties.color.toLowerCase()))
  ) {
    return featureStyleKey;
  }

  return styleKey;
};

const styleGroupConfig = {
  labels: {
    fill: 'Color',
    stroke: 'Outline',
    strokeWidth: 'Outline Thickness',
    strokeLinecap: 'Line cap',
    strokeLinejoin: 'Line join',
    opacity: 'Opacity',
    offsetX: 'Offset X',
    offsetY: 'Offset Y',
    radius: 'Radius',
    height: 'Height',
    font: 'Typeface',
  },
  typeLabels: {
    Polygon: 'Polygons',
    Rect: 'Rect',
    Text: 'Text',
    Image: 'Marker Icon',
    Line: 'Lines',
    Circle: 'Points',
  },
  layerFeaturesTypes: ['Circle', 'Line', 'Polygon'],
  pointShapeTypes: [
    {
      label: 'Circle',
      value: 'Circle',
    },
    {
      label: 'Square',
      value: 'Rect',
    },
  ],
  styleAssignFunction: (feature, styleRules, geometryStyle) => {
    // console.log(feature);
    if (
      feature.editState &&
      feature.editState() &&
      feature.editState().selected
    ) {
      switch (feature.geometry.type) {
        case 'LineString':
        case 'MultiLineString':
          return [
            {
              type: 'Line',
              stroke: '#2DD5c9',
              zIndex: 10,
              opacity: 1,
              strokeWidth: 6,
            },
          ];
        default:
          return [
            {
              fill: '#2DD5c9',
              type: 'Polygon',
              stroke: '#0F1621',
              strokeWidth: 3,
              zIndex: 10,
              opacity: 1,
            },
          ];
      }
    } else {
      switch (feature.geometry.type) {
        case 'LineString':
        case 'MultiLineString':
          return checkRules(
            'lineStyle',
            'lineFeature',
            'Line',
            styleRules,
            feature,
            geometryStyle
          );
        case 'Polygon':
        case 'MultiPolygon':
          return checkRules(
            'polygonStyle',
            'polygonFeature',
            'Polygon',
            styleRules,
            feature,
            geometryStyle
          );
        case 'Point':
        case 'MultiPoint':
          return checkRules(
            'pointStyle',
            'pointFeature',
            'Point',
            styleRules,
            feature,
            geometryStyle
          );
        default:
          return 'pointStyle';
      }
    }
  },
  geometryToLayerStyle: layerGeometryType => {
    switch (layerGeometryType) {
      case 'Point':
        return 'pointStyle';
      case 'Text':
        return 'textStyle';
      case 'Image':
        return 'imageStyle';
      case 'Line':
        return 'lineStyle';
      case 'Polygon':
      case 'Rect':
        return 'polygonStyle';
      default:
        return 'pointStyle';
    }
  },
  layerStyleToGeometry: geometryType => {
    switch (geometryType) {
      case 'pointStyle':
        return 'Point';
      case 'lineStyle':
        return 'Line';
      case 'polygonStyle':
        return 'Polygon';
      default:
        return 'Point';
    }
  },
  geometryToFeatureStyleType: geometry => {
    switch (geometry) {
      case 'LineString':
      case 'MultiLineString':
        return 'Line';
      case 'Polygon':
      case 'MultiPolygon':
        return 'Polygon';
      case 'MultiPoint':
      case 'Point':
        return 'Point';
      default:
        return 'Point';
    }
  },
  strokeWidthZoomScale: zoomlevel => {
    if (zoomlevel >= 18) {
      return 1;
    }
    if (zoomlevel >= 15) {
      return 0.8;
    }
    if (zoomlevel >= 10) {
      return 0.7;
    }
    if (zoomlevel >= 8) {
      return 0.6;
    }
    if (zoomlevel >= 5) {
      return 0.5;
    }
    if (zoomlevel >= 2) {
      return 0.3;
    }

    return 0;
  },
  selectedFeatureStyle: (feature, filter) => {
    switch (feature.geometry.type) {
      case 'LineString':
      case 'MultiLineString':
        return [
          {
            stroke: filter ? '#A3ECE7' : '#2DD5c9',
            strokeWidth: filter ? 7 : 6,
            type: 'Line',
            zIndex: 10,
          },
        ];
      case 'Polygon':
      case 'MultiPolygon':
        return [
          {
            fill: filter ? '#A3ECE7' : '#2DD5c9',
            type: 'Polygon',
            stroke: '#0F1621',
            strokeWidth: filter ? 2 : 3,
            zIndex: 999,
            opacity: 1,
          },
        ];
      case 'Point':
      case 'MultiPoint':
        return [
          {
            fill: filter ? '#A3ECE7' : '#2DD5c9',
            radius: filter ? 11 : 10,
            stroke: '#0F1621',
            strokeWidth: filter ? 2 : 3,
            type: 'Circle',
            zIndex: 999,
          },
        ];
      default:
        return [
          {
            fill: filter ? '#A3ECE7' : '#2DD5c9',
            radius: filter ? 11 : 10,
            stroke: '#0F1621',
            strokeWidth: filter ? 2 : 3,
            type: 'Circle',
            zIndex: 10,
          },
        ];
    }
  },
  selectedLayerStyleGroups: {
    polygonStyle: [
      {
        fill: '#00908A',
        type: 'Polygon',
        zIndex: 10,
        strokeWidth: 1,
        stroke: '#0F1621',
        opacity: 0.8,
      },
    ],
    lineStyle: [
      {
        type: 'Line',
        stroke: '#00908A',
        zIndex: 10,
        opacity: 1,
        strokeWidth: 6,
      },
    ],
    pointStyle: [
      {
        fill: '#00908A',
        type: 'Circle',
        height: 16,
        width: 16,
        radius: 8,
        zIndex: 10,
      },
    ],
  },
  featureStyleGroups: stylegroups => {
    return {
      lineFeature: [
        {
          type: 'Line',
          stroke: f => {
            if (
              f.properties.color.toString().indexOf('#') !== 0 &&
              !cssColors.includes(f.properties.color.toString().toLowerCase())
            )
              return `#${f.properties.color}`;
            return f.properties.color;
          },
          zIndex: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].zIndex
            : 10,
          opacity: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].opacity
            : 1,
          strokeWidth: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].strokeWidth
            : 6,
          strokeLinecap: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].strokeLinecap
            : '',
          strokeLinejoin: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].strokeLinejoin
            : '',
          strokeDasharray: stylegroups.lineStyle[0]
            ? [...stylegroups.lineStyle[0].strokeDasharray]
            : [],
        },
        {
          fill: stylegroups.lineStyle[1] ? stylegroups.lineStyle[1].fill : '',
          font: stylegroups.lineStyle[1] ? stylegroups.lineStyle[1].font : '',
          type: 'Text',
          stroke: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].stroke
            : 0,
          zIndex: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].zIndex
            : 10,
          offsetX: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].offsetX
            : 0,
          offsetY: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].offsetY
            : 0,
          opacity: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].opacity
            : 0,
          textRef: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].textRef
            : '',
          strokeWidth: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].strokeWidth
            : 0,
        },
      ],
      pointFeature: [
        {
          fill: f => {
            if (
              f.properties.color.toString().indexOf('#') !== 0 &&
              !cssColors.includes(f.properties.color.toString().toLowerCase())
            )
              return `#${f.properties.color}`;
            return f.properties.color;
          },
          type: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].type
            : 'Circle',
          width: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].width
            : 16,
          height: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].height
            : 16,
          radius: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].radius
            : 8,
          zIndex: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].zIndex
            : 10,
          opacity: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].opacity
            : 1,
        },
        {
          fill: stylegroups.pointStyle[1] ? stylegroups.pointStyle[1].fill : '',
          type: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].type
            : 'Circle',
          width: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].width
            : 0,
          height: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].height
            : 0,
          radius: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].radius
            : 0,
          zIndex: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].zIndex
            : 10,
          opacity: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].opacity
            : 0,
        },
        {
          src: stylegroups.pointStyle[2] ? stylegroups.pointStyle[2].src : '',
          type: 'Image',
          width: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].width
            : 0,
          height: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].height
            : 0,
          zIndex: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].zIndex
            : 1,
          baseSrc: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].baseSrc
            : '/icons/lui-icon-destinationpin',
          offsetX: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].offsetX
            : 0,
          offsetY: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].offsetY
            : 0,
          opacity: stylegroups.pointStyle[2].opacity,
          iconColor: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].iconColor
            : '',
        },
        {
          fill: stylegroups.pointStyle[3] ? stylegroups.pointStyle[3].fill : '',
          font: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].font
            : 'normal 12px Arial',
          type: 'Text',
          stroke: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].stroke
            : 0,
          zIndex: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].zIndex
            : 1,
          offsetX: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].offsetX
            : 0,
          offsetY: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].offsetY
            : 0,
          opacity: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].opacity
            : 0,
          textRef: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].textRef
            : '',
          strokeWidth: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].strokeWidth
            : 0,
        },
      ],
      polygonFeature: [
        {
          fill: f => {
            if (
              f.properties.color.toString().indexOf('#') !== 0 &&
              !cssColors.includes(f.properties.color.toString().toLowerCase())
            )
              return `#${f.properties.color}`;
            return f.properties.color;
          },
          type: 'Polygon',
          stroke: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].stroke
            : '',
          zIndex: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].zIndex
            : 10,
          opacity: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].opacity
            : 0.8,
          strokeWidth: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].strokeWidth
            : 1,
          strokeLinecap: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].strokeLinecap
            : '',
          strokeLinejoin: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].strokeLinejoin
            : '',
          strokeDasharray: stylegroups.polygonStyle[0]
            ? [...stylegroups.polygonStyle[0].strokeDasharray]
            : [],
        },
        {
          fill: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].fill
            : '',
          font: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].font
            : '',
          type: 'Text',
          stroke: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].stroke
            : 0,
          zIndex: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].zIndex
            : 1,
          offsetX: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].offsetX
            : 0,
          offsetY: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].offsetY
            : 0,
          opacity: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].opacity
            : 0,
          textRef: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].textRef
            : '',
          strokeWidth: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].strokeWidth
            : 0,
        },
      ],
    };

    // {
    //   polygonFeature: [
    //     {
    //       fill: f => f.properties.color,
    //       type: 'Polygon',
    //       zIndex: 10,
    //       strokeWidth: 1,
    //       stroke: f => f.properties.color,
    //       opacity: 0.8,
    //     },
    //   ],
    //   lineFeature: [
    //     {
    //       type: 'Line',
    //       stroke: f => f.properties.color,
    //       zIndex: 10,
    //       opacity: 1,
    //       strokeWidth: 6,
    //     },
    //   ],
    //   pointFeature: [
    //     {
    //       fill: f => f.properties.color,
    //       type: 'Circle',
    //       height: 16,
    //       width: 16,
    //       radius: 8,
    //       zIndex: 10,
    //     },
    //   ],
    // };
  },
  drawingBoard: {
    polygons: [
      {
        fill: '#2DD5c9',
        type: 'Polygon',
        stroke: '#0F1621',
        strokeWidth: 2,
        zIndex: 1,
        opacity: 1,
      },
      {
        fill: '#2DD5c9',
        radius: 5,
        stroke: '#0F1621',
        strokeWidth: 2,
        type: 'Circle',
        zIndex: 2,
      },
    ],
    lines: [
      {
        type: 'Line',
        stroke: '#2DD5c9',
        zIndex: 1,
        opacity: 1,
        strokeWidth: 2,
      },
      {
        fill: '#2DD5c9',
        radius: 5,
        stroke: '#0F1621',
        strokeWidth: 2,
        type: 'Circle',
        zIndex: 2,
      },
    ],
    points: [
      {
        fill: '#00908A',
        type: 'Circle',
        radius: 80,
        zIndex: 10,
      },
    ],
  },
  markerIcons: [
    {
      label: 'Pin',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-destinationpin`,
    },
    {
      label: 'Airport',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-airport`,
    },
    {
      label: 'Attraction',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-attraction`,
    },
    {
      label: 'Bar',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-bar`,
    },
    {
      label: 'Bike',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-bike`,
    },
    {
      label: 'Bus',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-bus`,
    },
    {
      label: 'Business',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-business`,
    },
    {
      label: 'Camping',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-camping`,
    },
    {
      label: 'Car',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-cardrivemode`,
    },
    {
      label: 'Coffee',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-coffee`,
    },
    {
      label: 'Eat and drink',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-eatanddrink`,
    },
    {
      label: 'Facilities',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-facilities`,
    },
    {
      label: 'Pizza',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-foodpizza`,
    },
    {
      label: 'Home',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-home`,
    },
    {
      label: 'Nature',
      value: `${process.env.PUBLIC_URL}/icons/lui-icon-nature`,
    },
  ],
  colors: [
    '#755da5',
    '#5e7ad8',
    '#50a0c4',
    '#95ae60',
    '#92cf48',
    '#e39e3c',
    '#bf323a',
    '#ffffff',
    '#595655',
    '#000000',
    '#F4290C',
    '#6236FF',
    '#FF7600',
    '#FF00A9',
    '#1458C1',
    '#FF605C',
    '#D184EF',
    '#FFAC00',
    '#8058D0',
    '#799816',
  ],
  colorProperty: [
    'F4290C',
    '6236FF',
    'FF7600',
    'FF00A9',
    '1458C1',
    'FF605C',
    'D184EF',
    'FFAC00',
    '8058D0',
    '799816',
    '8058DF',
    'FF5900',
    'BB4A55',
    'B620E0',
    '6D6315',
    '757DC0',
    'A7523D',
    '00883B',
    'ED51CC',
    '419093',
  ],
  geometryToLabel: label => {
    switch (label) {
      case 'Point':
        return 'Circle';
      default:
        return label;
    }
  },
  hexbinStyleGroups: (min, max, color, property) => {
    return {
      label: [
        {
          zIndex: 0,
          type: 'Polygon',
          fill: feature => {
            let hexbinParameter;
            const value = property
              ? feature.properties.aggregation[property].sum
              : feature.properties.aggregation.qty;

            if (value && value >= 1) {
              hexbinParameter = Math.round(value * 10) / 10;
            } else {
              hexbinParameter = 0;
            }

            return color.replace(
              ',1)',
              `,${Math.round((hexbinParameter / (max === 0 ? 1 : max)) * 10) /
                10})`
            );
          },
          stroke: 'black',
          strokeWidth: 1,
        },
        {
          zIndex: 1,
          type: 'Text',
          text: feature =>
            property
              ? feature.properties.aggregation[property].sum || '0'
              : feature.properties.aggregation.qty,
          fill: 'black',
          font: '11px "FiraGO", sans-serif',
          stroke: 'white',
          strokeWidth: 3,
        },
      ],
      noLabel: [
        {
          zIndex: 0,
          type: 'Polygon',
          fill: feature => {
            let hexbinParameter;
            const value = property
              ? feature.properties.aggregation[property].sum
              : feature.properties.aggregation.qty;

            if (value && value >= 1) {
              hexbinParameter = Math.round(value * 10) / 10;
            } else {
              hexbinParameter = 0;
            }

            return color.replace(
              ',1)',
              `,${Math.round((hexbinParameter / (max === 0 ? 1 : max)) * 10) /
                10})`
            );
          },
          stroke: 'black',
          strokeWidth: 1,
        },
      ],
      centroid: [
        {
          zIndex: 0,
          type: 'Circle',
          fill: color,
          opacity: 0.7,
          stroke: 'black',
          strokeWidth: 1,
          radius: feature => {
            const hexbinParameter = property
              ? feature.properties.aggregation[property].sum
              : feature.properties.aggregation.qty;
            if (hexbinParameter > 1) {
              return Math.round(
                ((hexbinParameter || 0) / (max === 0 ? 1 : max)) * 25
              );
            }

            return 3;
          },
        },
      ],
      centroid_label: [
        {
          zIndex: 0,
          type: 'Circle',
          fill: color,
          opacity: 0.7,
          stroke: 'black',
          strokeWidth: 1,
          radius: feature => {
            const hexbinParameter = property
              ? feature.properties.aggregation[property].sum
              : feature.properties.aggregation.qty;
            if (hexbinParameter > 1) {
              return Math.round(
                ((hexbinParameter || 0) / (max === 0 ? 1 : max)) * 25
              );
            }

            return 3;
          },
        },
        {
          zIndex: 1,
          type: 'Text',
          text: feature =>
            property
              ? feature.properties.aggregation[property].sum || '0'
              : feature.properties.aggregation.qty,
          fill: 'black',
          font: '11px "FiraGO", sans-serif',
          stroke: 'white',
          strokeWidth: 3,
        },
      ],
    };
  },
  hexbinAssignFunction: (feature, label) => {
    if (feature.geometry.type === 'Point') {
      if (label) {
        return 'centroid_label';
      }
      return 'centroid';
    }
    if (label) {
      return 'label';
    }
    return 'noLabel';
  },
};

export default styleGroupConfig;
