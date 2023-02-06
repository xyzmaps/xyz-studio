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
import SelectInput from '../Sidebar/SelectInput/SelectInput';
import logEvent from '../../utils/amplitudeLogger';
import { tokenAPI, apiErrorHandler } from '../../api';
import store from '../../store';

import style from './Hexbin.scss';

export default class Hexbin extends Component {
  state = {
    propertyOptions: [],
    toggleRevert: false,
    showPropertyOptions: this.props.currentLayer.clustering.property !== '',
    clustering: {
      hexbin: this.props.currentLayer.clustering.hexbin,
      theme: this.props.currentLayer.clustering.theme,
      label: this.props.currentLayer.clustering.label,
      featureCount: this.props.currentLayer.clustering.featureCount,
      property: this.props.currentLayer.clustering.property,
      shape: this.props.currentLayer.clustering.shape,
    },
  };

  componentDidMount() {
    const propertyOptions = [];
    if (this.props.properties) {
      this.props.properties.forEach(property => {
        if (property.datatype === 'number') {
          propertyOptions.push({ value: property.key, label: property.key });
        }
      });
    }
    this.setState({ propertyOptions });
  }

  onHexbinToggle = () => {
    let otherLayerFound = false;
    const { currentProject, currentLayer } = this.props;
    currentProject.layers.forEach(layer => {
      if (layer.id !== currentLayer.id) {
        if (layer.clustering && layer.clustering.hexbin) {
          const clustering = {
            ...layer.clustering,
            hexbin: false,
          };

          this.props.showAlert({
            theme: 'default',
            title: 'Enable Hexbin',
            text:
              'Are you sure you want to enable  hexbin on current layer? This would remove hexbin clustering from other layer of the same project',
            cancelLabel: 'Cancel',
            cancel: onExited => {
              this.closeAlert(onExited);
            },
            confirmLabel: 'Enable',
            confirm: () => {
              this.selectCurrentLayerForHexbin(clustering, layer.id);
            },
          });
          otherLayerFound = true;
        }
      }
    });

    if (!otherLayerFound) this.updateLocalLayerForHexbin();
  };

  closeAlert = onExited => {
    this.props.hideAlert();
    if (!onExited) this.setState({ toggleRevert: true });
  };

  selectCurrentLayerForHexbin = (c, id) => {
    this.props.removeHexbin(c, id);
    this.updateLocalLayerForHexbin();
  };

  updateLocalLayerForHexbin = () => {
    const { status, rot } = this.props.currentProject;
    this.setState(prevState => {
      const clustering = {
        ...prevState.clustering,
        hexbin: !prevState.clustering.hexbin,
      };

      if (prevState.clustering.hexbin) {
        this.removeHexbin();
      } else {
        // For already published project and having token with no hexbin capabilites
        if (status === 'PUBLISHED') {
          tokenAPI
            .get(`/${rot}.json`)
            .then(r => {
              let hexbinCapability = true;
              if (
                r.data.urm['xyz-hub'] &&
                r.data.urm['xyz-hub'].useCapabilities
              ) {
                hexbinCapability = r.data.urm['xyz-hub'].useCapabilities.some(
                  c => c.id.indexOf('hexbinClustering') > -1
                );
              } else {
                setTimeout(() => this.republishPopup(), 1500);
              }

              if (!hexbinCapability)
                setTimeout(() => this.republishPopup(), 1500);
            })
            .catch(e => apiErrorHandler(e, store.dispatch));
        }
        logEvent('click_hexbin_enabled');
      }

      this.props.updateHexbin(clustering);
      return {
        toggleRevert: false,
        clustering,
      };
    });
  };

  republishPopup = () => {
    this.props.showAlert({
      theme: 'default',
      title: 'Please republish this project',
      text:
        'Looks like the project is already published. Please republish this project to reflect changes for Hexbin clustering in viewer',
      cancelLabel: 'Ok',
      cancel: () => {
        this.props.hideAlert();
      },
    });
  };

  onHexbinCountToggle = () => {
    this.setState(prevState => {
      const clustering = {
        ...prevState.clustering,
        label: !prevState.clustering.label,
      };
      this.props.updateHexbin(clustering);

      return { clustering };
    });
    window.mapObject.refresh();
  };

  setColorForHexbin = color => {
    this.setState(prevState => {
      const clustering = {
        ...prevState.clustering,
        theme: color,
      };
      this.props.updateHexbin(clustering);
      return { clustering };
    });
    window.mapObject.refresh();
  };

  onRadioBtnClick = type => {
    switch (type) {
      case 'property':
        if (this.state.propertyOptions.length)
          this.setState({ showPropertyOptions: true });
        break;
      case 'feature':
        this.setState(prevState => {
          const clustering = {
            ...prevState.clustering,
            property: '',
            featureCount: true,
          };
          this.props.updateHexbin(clustering);
          return { clustering, showPropertyOptions: false };
        });
        break;
      case 'centroid':
        this.setState(prevState => {
          const clustering = {
            ...prevState.clustering,
            shape: 'centroid',
          };
          logEvent('click_hexbin_centroid');
          this.props.updateHexbin(clustering);
          return { clustering };
        });
        break;
      case 'hexagon':
        this.setState(prevState => {
          const clustering = {
            ...prevState.clustering,
            shape: 'hexagon',
          };
          logEvent('click_hexbin_hexagon');
          this.props.updateHexbin(clustering);
          return { clustering };
        });
        break;
      default:
    }
  };

  onPropertySelect = e => {
    this.setState(prevState => {
      const clustering = {
        ...prevState.clustering,
        featureCount: false,
        property: e.target.value,
      };
      this.props.updateHexbin(clustering);
      return { clustering };
    });
  };

  removeHexbin = () => {
    // console.log('inside hexbin comp removehexbin');
    window.mapObject.getLayers().forEach(l => {
      if (l.name.indexOf('Hexbin') !== -1) {
        window.mapObject.removeEventListener(
          'mapviewchangestart',
          this.setStyleGroupForHexbin
        );
        window.mapObject.removeLayer(l);
      }
    });
  };

  render() {
    const {
      clustering,
      propertyOptions,
      showPropertyOptions,
      toggleRevert,
    } = this.state;
    const { hexbin, label, theme, property, featureCount, shape } = clustering;

    const hexbinColors = [
      'rgba(227,74,51,1)',
      'rgba(255,172,2,1)',
      'rgba(146,207,72,1)',
      'rgba(91,165,198,1)',
      'rgba(209,132,239,1)',
      'rgba(89,86,85,1)',
      'rgba(97,54,255,1)',
      'rgba(149,174,96,1)',
      'rgba(19,88,193,1)',
      'rgba(255,117,2,1)',
    ];

    return (
      <div className={style.hexbinWrapper}>
        <Toggle
          featureType="Point"
          label="Enable"
          onToggle={this.onHexbinToggle}
          active={hexbin}
          style={{ margin: '20px 0' }}
          toggleRevert={toggleRevert}
        />
        {hexbin && (
          <div className={style.typeSelection}>
            <div className={style.radioBtnContainer}>
              <button
                type="button"
                onClick={() => this.onRadioBtnClick('feature')}
                className={`${style.radioBtn} ${
                  featureCount && !showPropertyOptions ? style.selected : ''
                }`}
              />
              <span
                onClick={() => this.onRadioBtnClick('feature')}
                role="presentation"
                className={style.buttonName}
              >
                Feature Count
              </span>
            </div>
            <div
              data-tip={
                propertyOptions.length === 0
                  ? 'Disabled when property found with non numeric value'
                  : 'Select propery'
              }
              data-tip-x="center"
              className={style.radioBtnContainer}
            >
              <button
                type="button"
                disabled={propertyOptions.length === 0}
                onClick={() => this.onRadioBtnClick('property')}
                className={`${style.radioBtn} ${
                  showPropertyOptions ? style.selected : ''
                }`}
              />
              <span
                onClick={() => this.onRadioBtnClick('property')}
                role="presentation"
                className={style.buttonName}
              >
                property
              </span>
            </div>
            {propertyOptions.length > 0 && showPropertyOptions && (
              <div className={style.typeAheadWrapper}>
                <SelectInput
                  currentValue={property === '' ? 'Select Property' : property}
                  allowNull
                  options={propertyOptions}
                  name="Select Property"
                  onSelect={e => this.onPropertySelect(e)}
                />
              </div>
            )}
          </div>
        )}
        {hexbin && (
          <div>
            <span className={style.hexbinShapeLable}>Shape</span>
            <div className={`${style.typeSelection} ${style.hexbinShape}`}>
              <div className={style.radioBtnContainer}>
                <button
                  type="button"
                  onClick={() => this.onRadioBtnClick('hexagon')}
                  className={`${style.radioBtn} ${
                    shape === 'hexagon' ? style.selected : ''
                  }`}
                />
                <span
                  onClick={() => this.onRadioBtnClick('hexagon')}
                  role="presentation"
                  className={style.buttonName}
                >
                  Hexagon
                </span>
              </div>
              <div
                className={`${style.radioBtnContainer} ${style.alignButton}`}
              >
                <button
                  type="button"
                  onClick={() => this.onRadioBtnClick('centroid')}
                  className={`${style.radioBtn} ${
                    shape === 'centroid' ? style.selected : ''
                  }`}
                />
                <span
                  onClick={() => this.onRadioBtnClick('centroid')}
                  role="presentation"
                  className={style.buttonName}
                >
                  Centroid
                </span>
              </div>
            </div>
          </div>
        )}
        <Toggle
          featureType="Point"
          label="Show count"
          onToggle={this.onHexbinCountToggle}
          active={label}
          toolTipText="It will be available after Hexbin is enabled"
          disabled={!hexbin}
          style={{ margin: '25px 0' }}
        />
        <div className={style.selectColorWrapper}>
          <span>Select Color</span>
          <div className={style.colorPalette}>
            {_.map(hexbinColors, (color, i) => {
              return (
                <div
                  className={`${style.colorBox} ${
                    theme === color ? style.selected : ''
                  } `}
                  style={{ backgroundColor: color }}
                  role="presentation"
                  key={i}
                  onClick={() => hexbin && this.setColorForHexbin(color)}
                />
              );
            })}
            {shape === 'hexagon' && (
              <div className={style.scaleWrapper}>
                <span>Opacity</span>
                <div className={style.opacityImg} />
                <div
                  className={style.opacityScale}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${theme.replace(
                      '1)',
                      '0)'
                    )}, ${theme})`,
                  }}
                  role="presentation"
                />
                <div className={style.scaleValue}>
                  <span>Min.</span>
                  <span>Max.</span>
                </div>
              </div>
            )}
            {shape === 'centroid' && (
              <div className={style.scaleWrapper}>
                <span>Radius</span>
                <div className={style.radiusScale} role="presentation">
                  <div style={{ background: `${theme}` }} />
                  <div style={{ background: `${theme}` }} />
                  <div style={{ background: `${theme}` }} />
                  <div style={{ background: `${theme}` }} />
                  <div style={{ background: `${theme}` }} />
                  <div style={{ background: `${theme}` }} />
                  <div style={{ background: `${theme}` }} />
                </div>
                <div
                  className={`${style.scaleValue} ${style.radiusScaleValue}`}
                >
                  <span>Min.</span>
                  <span>Max.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
