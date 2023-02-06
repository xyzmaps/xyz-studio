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

import { LegendLine, LegendPolygon, LegendMultiple } from '../../icons';
import style from './LegendIcon.scss';

export default class LegendIcon extends Component {
  state = {
    geometry:
      this.props.featureType === 'Circle' ? 'Point' : this.props.featureType,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.featureType !== prevState.geometry) {
      return {
        geometry:
          nextProps.featureType === 'Circle' ? 'Point' : nextProps.featureType,
      };
    }

    return null;
  }

  icon = () => {
    let icon;
    let geometryPrefix = 'polygonStyle';

    if (this.state.geometry === 'Point') {
      geometryPrefix = 'pointStyle';
    } else if (this.state.geometry === 'Line') {
      geometryPrefix = 'lineStyle';
    }

    const ruleId = this.props.ruleId ? `_${this.props.ruleId}` : '';

    const legendStyles = this.props.currentLayer.styleGroups[
      `${geometryPrefix}${ruleId}`
    ];
    if (!legendStyles) return false;

    const iconFill = legendStyles[0].fill || legendStyles[0].stroke;

    if (this.state.geometry === 'Point' || this.state.geometry === 'Circle') {
      const pointType = legendStyles[0].type;
      const iconOutlineWidth =
        legendStyles[0].width !== legendStyles[1].width ? 2 : 0;
      const borderColor =
        legendStyles[0].fill === '#ffffff' ? '#ECEBED' : legendStyles[1].fill;
      const borderStyle =
        legendStyles[1] && iconOutlineWidth
          ? `2px solid ${borderColor}`
          : '2px solid transparent';
      const iconVisibility =
        !legendStyles[0].type ||
        (legendStyles[0].type !== 'none' && legendStyles[0].width > 0);
      let iconImgStyles = iconVisibility
        ? {
            background: legendStyles[0].fill,
            border: borderStyle,
            borderRadius: legendStyles[0].type === 'Circle' ? '50%' : 0,
          }
        : null;

      icon = iconVisibility && (
        <span
          className={pointType === 'Rect' ? style.iconRect : style.icon}
          style={iconImgStyles}
        />
      );

      if (legendStyles[2].opacity === 1 && legendStyles[2].width > 0) {
        iconImgStyles = iconVisibility
          ? {
              background: legendStyles[0].fill,
              border: borderStyle,
              borderRadius: legendStyles[0].type === 'Circle' ? '50%' : 0,
            }
          : {
              background: 'transparent',
              border: '2px solid transparent',
              borderRadius: legendStyles[0].type === 'Circle' ? '50%' : 0,
            };

        icon = (
          <span className={style.icon} style={iconImgStyles}>
            <img src={legendStyles[2].src} alt="icon" />
          </span>
        );
      }
    } else if (this.state.geometry === 'Line') {
      const iconOutlineWidth = legendStyles[0].strokeWidth;

      icon = (
        <LegendLine
          className={iconOutlineWidth ? style.line : style.hideLine}
          fill={iconFill}
        />
      );
    } else if (this.state.geometry === 'Polygon') {
      const iconOutline = legendStyles[0].stroke;
      const iconOutlineWidth = legendStyles[0].strokeWidth ? 2 : 0;

      icon = (
        <LegendPolygon
          className={style.polygon}
          fill={iconFill}
          outline={iconOutlineWidth ? iconOutline : iconFill}
          outlineWidth="2"
        />
      );
    }

    return icon;
  };

  renderIcons(type) {
    const { currentLayer } = this.props;
    const { geometry } = this.state;

    const isStyleRuleAvailable =
      currentLayer.styleRules &&
      currentLayer.styleRules[geometry] &&
      currentLayer.styleRules[geometry].length;

    if (type === 'featureType') {
      if (isStyleRuleAvailable) {
        return <LegendMultiple className={style.multiple} />;
      }
      return this.icon();
    }

    return this.icon();
  }

  render() {
    const { ruleId, accordionAction } = this.props;

    const renderComponent = () => {
      if (ruleId) {
        return this.renderIcons('styleRule');
      }
      if (accordionAction === 'edit') {
        return this.renderIcons('defaultStyle');
      }
      return this.renderIcons('featureType');
    };

    return <span className={style.wrapper}>{renderComponent()}</span>;
  }
}
