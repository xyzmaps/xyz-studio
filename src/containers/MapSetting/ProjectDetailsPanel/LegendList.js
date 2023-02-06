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

import React, { Component } from 'react';
import _ from 'lodash';

import { Scrollbars } from 'react-custom-scrollbars';
import {
  LegendPoint,
  LegendLine,
  LegendPolygon,
  LegendPointRect,
} from '../../../icons';
import ScrollbarStyle from '../../../config/ScrollbarStyle';

import { spacesAPI } from '../../../api';

import style from './LegendList.scss';

export default class LegendList extends Component {
  state = {
    geoMap: {},
  };

  componentDidMount = () => {
    const geoHashMap = {};
    this.props.layers.forEach(layer => {
      spacesAPI
        .get(`/${layer.geospace.id}/statistics`, {
          headers: {
            'Content-Type': 'application/geo+json',
          },
          withCredentials: true,
        })
        .then(response => {
          geoHashMap[layer.geospace.id] = response.data.geometryTypes.value;
          this.setState({
            geoMap: geoHashMap,
          });
        });
    });
  };

  // reorder style group object in desired order 1)Point 2)Line 3)Polygon
  sortStyleGroup = styleGroups => {
    const arr = _.toPairs(styleGroups);

    if (arr[0][0] === 'lineStyle' && arr[1][0] === 'pointStyle') {
      const temp = arr[0];
      arr[0] = arr[1];
      arr[1] = temp;
    } else if (arr[0][0] === 'polygonStyle' && arr[1][0] === 'lineStyle') {
      const temp = arr[0];
      arr[0] = arr[2];
      arr[2] = temp;
    } else if (arr[0][0] === 'pointStyle' && arr[1][0] === 'polygonStyle') {
      const temp = arr[1];
      arr[1] = arr[2];
      arr[2] = temp;
    }

    return _.fromPairs(arr);
  };

  // match if geometry is present
  matchGeometry = (geometry, type) => {
    let match = 0;
    if (typeof geometry !== 'undefined') {
      if (type.indexOf('point') !== -1) {
        match =
          geometry.Point ||
          geometry.MultiPoint ||
          geometry.includes('Point') ||
          geometry.includes('MultiPoint');
      } else if (type.indexOf('line') !== -1) {
        match =
          geometry.LineString ||
          geometry.MultiLineString ||
          geometry.includes('LineString') ||
          geometry.includes('MultiLineString');
      } else if (type.indexOf('polygon') !== -1) {
        match =
          geometry.Polygon ||
          geometry.MultiPolygon ||
          geometry.includes('Polygon') ||
          geometry.includes('MultiPolygon');
      }
    }

    return match;
  };

  renderLegend = (
    type,
    shape,
    bgColor,
    borderColor,
    borderWidth,
    opacity,
    imgSrc,
    imgAlt,
    imgWidth,
    width
  ) => {
    if (type === 'point') {
      if (opacity && imgWidth) {
        const imgStyles =
          shape !== 'none' && width !== 0
            ? {
                background: bgColor,
                border: `${borderWidth}px solid ${borderColor}`,
                borderRadius: shape === 'circle' ? '50%' : 0,
              }
            : null;

        return (
          <span className={style.image} style={imgStyles}>
            <img src={imgSrc} alt={imgAlt} />
          </span>
        );
      }
      if (shape === 'rect') {
        return (
          <LegendPointRect
            fill={bgColor}
            outline={borderColor}
            outlineWidth={borderWidth}
          />
        );
      }
      if (shape === 'circle') {
        return (
          <LegendPoint
            fill={bgColor}
            outline={borderColor}
            outlineWidth={borderWidth}
          />
        );
      }
    } else if (type === 'line') {
      return <LegendLine fill={bgColor} />;
    } else if (type === 'polygon') {
      return (
        <LegendPolygon
          fill={bgColor}
          outline={borderWidth === 1 ? bgColor : borderColor}
          outlineWidth="2"
        />
      );
    }
    return <div />;
  };

  renderLegendList = ({ id, index, type, label, legend }) => {
    const shape = (legend && legend[0].type) || '';
    const width =
      shape === 'Polygon'
        ? 1
        : (legend && legend[0].width) || (legend && legend[0].strokeWidth);
    const bgColor = (legend && legend[0].fill) || (legend && legend[0].stroke);
    const borderColor =
      shape === 'Polygon'
        ? legend && legend[0].stroke
        : legend && legend[1] && legend[1].fill;
    let borderWidth = 0;
    if (legend && legend[0] && legend[0].strokeWidth) borderWidth = 2;
    else if (legend && legend[1] && legend[0].width !== legend[1].width)
      borderWidth = 2;
    else if (shape === 'Polygon') borderWidth = 1;

    const opacity =
      legend && legend[2] && legend[2].opacity ? legend[2].opacity : 0;
    const imgWidth =
      legend && legend[2] && legend[2].width ? legend[2].width : 0;
    const imgSrc = legend && legend[2] && legend[2].src ? legend[2].src : '';
    const imgAlt = imgSrc
      ? legend && legend[2].baseSrc.replace('/icons/lui-icon-', '')
      : '';

    // (has shape or image is visible) and (width or width with border or image is visible with border)
    if (
      (shape !== 'none' || (opacity && imgWidth)) &&
      (width || (width && borderWidth) || (opacity && imgWidth))
    ) {
      return (
        <li key={`${type}-${index}-${id || 0}`}>
          <span className={`${style.icon} ${style[type] ? style[type] : ''}`}>
            {this.renderLegend(
              type,
              shape.toLowerCase(),
              bgColor,
              borderColor,
              borderWidth,
              opacity,
              imgSrc,
              imgAlt,
              imgWidth,
              legend[0].width
            )}
          </span>
          <strong className={style.label}>{label}</strong>
        </li>
      );
    }
    return <div />;
  };

  // styleGroups
  // styleRules
  showLegend = () => {
    const legendArray = [];
    let colorProp = false;

    // layer
    _.each(this.props.layers, (layer, index) => {
      if (layer.geometryStyle && layer.geometryStyle.length >= 1)
        colorProp = true;
      // style group - default styles
      _.each(this.sortStyleGroup(layer.styleGroups), (legend, key) => {
        const type = key.replace('Style', '');
        const typeCapitalized = _.capitalize(type);
        let matchedGeometry;

        if (this.state.geoMap) {
          matchedGeometry = this.matchGeometry(
            this.state.geoMap[layer.geospace.id],
            type
          );
        }

        if (matchedGeometry && type.indexOf('_') === -1) {
          const label =
            layer.geometriesLabels &&
            layer.geometriesLabels[typeCapitalized] &&
            layer.geometriesLabels[typeCapitalized].defaultStyleLabel
              ? layer.geometriesLabels[typeCapitalized].defaultStyleLabel
              : `Default ${type} style`;

          // style rules - user styles
          _.each(layer.styleRules, (rule, geometryType) => {
            if (type.indexOf(geometryType.toLowerCase()) !== -1) {
              _.each(rule, obj => {
                legendArray.push(
                  this.renderLegendList({
                    id: obj.id,
                    index,
                    type,
                    label: obj.name,
                    legend: layer.styleGroups[`${key}_${obj.id}`],
                  })
                );
              });
            }
          });

          // style group - default styles
          legendArray.push(
            this.renderLegendList({ index, type, label, legend })
          );
        }
      });
    });

    if (colorProp) {
      legendArray.push(
        <li key="color prop">
          {/* <span className={`${style.icon} ${(style[type]) ? style[type] : ""}`}>
            {this.renderLegend(type, shape.toLowerCase(), bgColor, borderColor, borderWidth, opacity, imgSrc, imgAlt, imgWidth, legend[0].width)}
          </span> */}
          <div className={style.rgb} />
          <strong className={style.label}>Color Property</strong>
        </li>
      );
    }

    return legendArray;
  };

  render() {
    const { label } = this.props;
    return (
      <div className={style.wrapper}>
        <div className={style.header}>
          <h2 className={`desktop ${style.title}`}>{label}</h2>
        </div>

        <div className={style.container}>
          <Scrollbars
            autoHeight
            autoHeightMin={92}
            autoHeightMax={148}
            renderTrackVertical={props => (
              <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
            )}
            renderThumbVertical={props => (
              <div
                {...props}
                style={{
                  ...ScrollbarStyle.thumbStyle,
                  background: 'rgba(255, 255, 255, 0.5)',
                }}
              />
            )}
          >
            <ul>{this.showLegend()}</ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
