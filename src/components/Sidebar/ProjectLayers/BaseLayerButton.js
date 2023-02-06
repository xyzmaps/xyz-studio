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
import _, { map } from 'lodash';

import { themes, basemaps } from '../../../constants/themes';
import { mapConfig } from '../../../constants';

// import {Triangle} from '../../../icons';
import Accordion from '../ProjectLayer/Accordion';

import style from './BaseLayerButton.scss';
import Toggle from '../../Common/Toggle';
import RadioButton from '../../Common/RadioButton';
import logEvent from '../../../utils/amplitudeLogger';

class BaseLayerButton extends Component {
  state = {
    showLabels: this.props.base.showLabels || false,
    isTilezenMapInfoVisible: false,
  };

  onBasemapChange = label => {
    const {
      base,
      onTileLayerChange,
      onThemeChange,
      onBaseViewChange,
    } = this.props;

    const labels = this.state.showLabels ? 'withLabel' : 'withoutlabel';

    if (_.has(themes[labels][base.tileLayer], label)) {
      onTileLayerChange(base.tileLayer);
      onThemeChange(label);
    } else {
      onBaseViewChange(label);
    }
  };

  toggleSelection = () => {
    this.setState(prevState => {
      this.props.onShowLabels(!prevState.showLabels);
      logEvent('click_show_labels', { show: !prevState.showLabels });
      return { showLabels: !prevState.showLabels };
    });
  };

  showMapInfo = () => {
    this.setState({ isTilezenMapInfoVisible: true });
  };

  hideMapInfo = () => {
    this.setState({ isTilezenMapInfoVisible: false });
  };

  render() {
    const {
      onBaseLayerToggle,
      baseLayerOpen,
      base,
      onTileLayerChange,
    } = this.props;
    const { showLabels, isTilezenMapInfoVisible } = this.state;
    return (
      <div className={style.baseButton} data-tut="base-map">
        <Accordion
          title="Base Map"
          onToggle={onBaseLayerToggle}
          isOpen={baseLayerOpen}
          noShape
        >
          <div className={style.baseButtonSwatches}>
            {map(basemaps, (themetype, label) => (
              <div
                role="presentation"
                key={label}
                className={`${style.switcherContent}
                  ${
                    base.template &&
                    base.template !== 'here' &&
                    base.template !== 'osm'
                      ? base.template === label && style.active
                      : base.theme === label && style.active
                  }`}
                onClick={() => this.onBasemapChange(label)}
              >
                <div>
                  <img className={style.mapImg} src={themetype} alt={label} />
                </div>
                <div className={style.switcherLabel}>{label}</div>
              </div>
            ))}
          </div>

          <div className={style.showLabelWrapper}>
            <span>Show Labels on Map</span>{' '}
            <Toggle active={showLabels} onToggle={this.toggleSelection} />
          </div>

          <span className={style.separator} />

          <div className={style.tileLayerContainer}>
            <h3 className={style.title}>Tile Layer</h3>

            <div className={style.radioBtnContainer}>
              {_.map(mapConfig.tileUrl, (obj, key) => {
                return (
                  <div
                    className={style.mainContainer}
                    key={key}
                    onMouseLeave={() => this.hideMapInfo(key)}
                  >
                    <RadioButton
                      label={obj.label}
                      selected={base.tileLayer === key}
                      onClick={() => {
                        logEvent('click_tile_layer', { layer: key });
                        onTileLayerChange(key);
                      }}
                    />
                    {key === 'osm' && (
                      <span
                        onMouseEnter={() => this.showMapInfo(key)}
                        className={style.info}
                      >
                        i
                      </span>
                    )}
                    {isTilezenMapInfoVisible && key === 'osm' && (
                      <div
                        className={`${style.mapInfo} ${style.tilezenMap}`}
                        onMouseLeave={() => this.hideMapInfo(key)}
                      >
                        <p className={style.disclaimerText}>
                          <span>
                            By selecting Tilezen as your basemap data provider
                            you are required to comply with the applicable{' '}
                          </span>
                          <a
                            href="https://github.com/tilezen/vector-datasource/blob/master/docs/attribution.md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            license requirements
                          </a>
                          <span>.</span>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Accordion>
      </div>
    );
  }
}

export default BaseLayerButton;
