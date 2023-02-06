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
import Toggle from '../Common/Toggle';
import style from './GisAnalysis.scss';
import Accordion from '../Sidebar/ProjectLayer/Accordion';

export default class GisAnalysis extends Component {
  state = {
    lineLength: this.props.currentLayer.lineLength,
    polygonArea: this.props.currentLayer.polygonArea,
  };

  componentWillUpdate(prevProps, prevState) {
    this.updateConfig(prevState);
  }

  updateConfig(prevState) {
    const { lineLength, polygonArea } = this.props.currentLayer;
    if (
      !_.isEqual(lineLength, prevState.lineLength) ||
      !_.isEqual(polygonArea, prevState.polygonArea)
    ) {
      this.setState({ lineLength, polygonArea });
    }
  }

  updateGisFeatures = options => () => {
    const { type, persistent } = options;
    this.setState(prevState => {
      if (
        (!prevState[type] && persistent) ||
        (prevState[type] && prevState[type].persistent !== persistent)
      ) {
        this.props.toggleGisPersist({
          ...options,
        });
      } else {
        this.props.onGisUpdate(options);
      }
      return { [type]: options };
    });
  };

  hideForType(type) {
    const { currentLayer, estimatedGeometry } = this.props;
    return (
      !estimatedGeometry &&
      currentLayer.geometriesFromStats &&
      currentLayer.geometries.join(' ').indexOf(type) === -1
    );
  }

  getGisOptions(type) {
    if (
      (type === 'lineLength' && this.hideForType('Line')) ||
      (type === 'polygonArea' && this.hideForType('Polygon'))
    ) {
      return <></>;
    }
    let tMetrics;
    if (type === 'lineLength') {
      tMetrics = ['Km.', 'M.', 'Mi.'];
    } else {
      tMetrics = ['Sq.Km.', 'Sq.M.', 'Sq.Mi.'];
    }
    const options = { type, ...this.state[type] } || {
      type,
      enabled: false,
      metrics: tMetrics[0],
      persistent: false,
    };
    const title = type === 'lineLength' ? 'Line Length' : 'Polygon Area';
    const hintType = type === 'lineLength' ? 'lines' : 'polygons';
    const hintUnit = type === 'lineLength' ? 'length' : 'area';
    const toolTipText = this.props.largeData
      ? 'Due to large size, We cannot update GIS units on your space'
      : '';

    return (
      <Accordion title={title} isOpen className={style.gisSubAccordion}>
        <Toggle
          active={options.enabled}
          label="Preview on Map"
          onToggle={this.updateGisFeatures({
            ...options,
            enabled: !options.enabled,
            metrics: !options.enabled ? tMetrics[0] : '',
          })}
          className={[`${style.toggleSwitch}`]}
        />
        {options.enabled ? (
          <span className={style.previewHint}>
            Click on the {hintType} on the map to view {hintUnit}.
          </span>
        ) : (
          <></>
        )}

        <div className={style.metricsWrapper}>
          <span className={style.gisMetricsLable}>Metrics</span>
          <div className={style.typeSelection}>
            <div className={style.radioBtnContainer}>
              <button
                type="button"
                onClick={this.updateGisFeatures({
                  ...options,
                  metrics: tMetrics[0],
                })}
                className={`${style.radioBtn} ${
                  options.enabled && options.metrics === tMetrics[0]
                    ? style.selected
                    : ''
                }`}
              />
              <span
                onClick={this.updateGisFeatures({
                  ...options,
                  metrics: tMetrics[0],
                })}
                role="presentation"
                className={style.buttonName}
              >
                {tMetrics[0]}
              </span>
            </div>
            <div className={style.radioBtnContainer}>
              <button
                type="button"
                onClick={this.updateGisFeatures({
                  ...options,
                  metrics: tMetrics[1],
                })}
                className={`${style.radioBtn} ${
                  options.enabled && options.metrics === tMetrics[1]
                    ? style.selected
                    : ''
                }`}
              />
              <span
                onClick={this.updateGisFeatures({
                  ...options,
                  metrics: tMetrics[1],
                })}
                role="presentation"
                className={style.buttonName}
              >
                {tMetrics[1]}
              </span>
            </div>
            <div className={style.radioBtnContainer}>
              <button
                type="button"
                onClick={this.updateGisFeatures({
                  ...options,
                  metrics: tMetrics[2],
                })}
                className={`${style.radioBtn} ${
                  options.enabled && options.metrics === tMetrics[2]
                    ? style.selected
                    : ''
                }`}
              />
              <span
                onClick={this.updateGisFeatures({
                  ...options,
                  metrics: tMetrics[2],
                })}
                role="presentation"
                className={style.buttonName}
              >
                {tMetrics[2]}
              </span>
            </div>
          </div>
        </div>

        <Toggle
          active={options.persistent}
          label="Add to Space"
          disabled={this.props.largeData}
          toolTipText={toolTipText}
          onToggle={this.updateGisFeatures({
            ...options,
            persistent: !options.persistent,
          })}
          className={[`${style.toggleSwitch}`]}
        />
      </Accordion>
    );
  }

  render() {
    return (
      <div className={style.gisToggleWrapper}>
        {this.getGisOptions('lineLength')}
        {this.getGisOptions('polygonArea')}
      </div>
    );
  }
}
