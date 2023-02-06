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
import React, { Component } from 'react';
import Wkt from 'wicket';
import axios from 'axios';
import _ from 'lodash';
import { credentials, geoCoderAPI } from '../../constants';

import style from './AddDataLayerGeocoding.scss';
import RadioButton from '../Common/RadioButton';
import Button from '../Common/Button';

export default class AddDataLayerGeocoding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sampleColumnInputs: 'Ex: Sacramento, CA',
      geometrySelected: 'point',
      geocodingWithErrors: 0,
      geocodeFileDetails: { ...this.props.fileDetails },
      geocodingComplete: false,
      totalFeaturesCreated: [],
      totalFeaturesCreatedProgress: 0,
      totalFeaturesFailed: [],
      selectedTags: [],
      isPolygonInfoVisible: false,
      isErrorFileDownloadInProcess: false,
    };
  }

  componentDidMount() {
    this.getColumnTags();
  }

  shapeGeocodeUrl = (latitude, longitude, level) => {
    return `${geoCoderAPI.reverse}?app_id=${credentials.APP_ID}&app_code=${credentials.APP_CODE}&mode=retrieveAddresses&maxresults=1&additionaldata=IncludeShapeLevel%2C${level}&prox=${latitude},${longitude}`;
  };

  cancelGeocoding = () => {
    this.props.hideAlert();
    this.props.loader(false);
    this.props.cancelGeocoding();
  };

  getSampleAddressString = (selectedTags, record) => {
    const sampleAddress = selectedTags
      .filter(tag => tag.selected === true)
      .map(currentTag => {
        return `${record[currentTag.title]}`;
      });

    return sampleAddress;
  };

  getColumnTags = () => {
    // get the already present address tags from the file data column
    const { geocodeFileDetails } = this.state;

    const predefinedTags = [
      'state',
      'district',
      'city',
      'postalcode',
      'postal-code',
      'pincode',
      'pin-code',
      'zipcode',
      'zip-code',
      'zip',
      'country',
      'county',
    ];

    const firstRow = geocodeFileDetails.features[0];

    const selectedTags = Object.keys(firstRow).map((column, index) => {
      if (predefinedTags.indexOf(column.toLocaleLowerCase()) !== -1) {
        return {
          id: index,
          title: column,
          selected: true,
          key: 'selectedTags',
        };
      }

      return {
        id: index,
        title: column,
        selected: false,
        key: 'selectedTags',
      };
    });

    const sampleaddressString = this.getSampleAddressString(
      // Form the example address string from the first record value
      selectedTags,
      firstRow
    );

    this.setState({
      selectedTags,
      sampleColumnInputs: sampleaddressString.join(', '), // Ex: Alabama, US
    });
  };

  downloadErrorRecords = () => {
    try {
      this.setState({
        isErrorFileDownloadInProcess: true,
      });

      let csvbody = this.state.totalFeaturesFailed.map(record => {
        const currentRecord = record;
        delete currentRecord.geocoded;
        delete currentRecord.key;
        let currentLine = '';
        const currentLineObjects = Object.values(currentRecord);
        currentLineObjects.forEach((value, index) => {
          if (index === currentLineObjects.length - 1) {
            currentLine += `${JSON.stringify(value)}`;
          } else {
            currentLine += `${JSON.stringify(value)},`;
          }
        });
        return currentLine;
      });
      csvbody = csvbody.join('\r\n');

      // Format CSV column headers
      const colHeaders = this.state.geocodeFileDetails.features[0];

      let csvHeader = '';
      const columnHeaders = Object.keys(colHeaders);
      columnHeaders.forEach((value, index) => {
        if (index === columnHeaders.length - 1) {
          csvHeader += `${JSON.stringify(value)}`;
        } else {
          csvHeader += `${JSON.stringify(value)},`;
        }
      });

      const csvData = `${csvHeader}\r\n${csvbody}`;

      // Download the CSV Errored File
      const element = document.createElement('a');
      const file = new Blob([csvData], {
        type: 'text/csv',
      });
      element.href = URL.createObjectURL(file);
      element.download = 'geocoding_error_reocrds.csv';
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();

      this.setState({
        isErrorFileDownloadInProcess: false,
      });
    } catch (e) {
      this.setState({
        isErrorFileDownloadInProcess: false,
      });
      throw new Error();
    }
  };

  geocodeAddressString = (columns, record) => {
    const properties = _.transform(record, (result, val, key) => {
      let temp = result;
      temp[key.toLowerCase()] = val;
    });

    const address = columns.map(col => {
      return `${properties[col.toLowerCase()]}`;
    });

    return address.join(',');
  };

  getGeocodingData = url => {
    return new Promise(async resolve => {
      try {
        const forwardGeocodeRes = await axios.get(url); // api call to forward geocoding to get lat long

        const fwdresponse = forwardGeocodeRes.data.Response;

        const pointcoordinates = {
          latitude:
            fwdresponse.View[0].Result[0].Location.DisplayPosition.Latitude,
          longitude:
            fwdresponse.View[0].Result[0].Location.DisplayPosition.Longitude,
        };

        const matchLevel = fwdresponse.View[0].Result[0].MatchLevel;

        if (this.state.geometrySelected === 'polygon') {
          let polygoncoordinates = {};

          try {
            const addressString = this.shapeGeocodeUrl(
              pointcoordinates.latitude,
              pointcoordinates.longitude,
              matchLevel
            );

            const reverseGeocoderRes = await axios.get(addressString); // api call to reverse geocoding to get lat long

            const revresponse = reverseGeocoderRes.data.Response;

            polygoncoordinates = {
              shape: revresponse.View[0].Result[0].Location.Shape.Value,
            };
          } catch (e) {
            resolve(pointcoordinates); // resolve forward geocoding point coordinates response to show point geometry for failed reverse shape geocoding
          }

          resolve(polygoncoordinates); // resolve reverse geocoding polygon shape response
        } else {
          resolve(pointcoordinates); // resolve forward geocoding point coordinates response
        }
      } catch (e) {
        resolve({ error: 'error' }); // resolve forward geocoding errors
      }
    });
  };

  geocode = async () => {
    const { geocodeFileDetails, selectedTags } = this.state;

    this.setState({
      totalFeaturesCreatedProgress: 0,
      totalFeaturesFailedProgress: 0,
    });

    const requestBuffer = [];
    const featuresArray = [];
    const failedfeaturesArray = [];
    const requestChunks = _.chunk(
      // chunk the entire records array
      Object.values(geocodeFileDetails.features),
      500
    );

    const wkt = new Wkt.Wkt();

    for (let chunk = 0; chunk < requestChunks.length; chunk += 1) {
      // looping over array of chunks
      const currentChunk = requestChunks[chunk];

      for (
        // looping over each 500 chunk array
        let dataRecord = 0;
        dataRecord < currentChunk.length;
        dataRecord += 1
      ) {
        const columnInput = selectedTags
          .filter(tag => tag.selected === true)
          .map(currentTag => {
            return `${currentTag.title}`;
          });

        if (columnInput) {
          this.props.loader(true);

          const addressString = this.geocodeAddressString(
            columnInput,
            currentChunk[dataRecord]
          );

          const geocodeUrl = `${geoCoderAPI.autocomplete}?app_id=${credentials.APP_ID}&app_code=${credentials.APP_CODE}&searchtext=${addressString}`;

          if (geocodeUrl) {
            requestBuffer.push(this.getGeocodingData(geocodeUrl)); // Sending parallel api requests - 500 requests
          }
        }
      }

      // eslint-disable-next-line no-await-in-loop
      await Promise.all(requestBuffer.map(p => p.catch(e => e))).then(
        geocodingResponses => {
          geocodingResponses.forEach((response, index) => {
            // Create features for point coordinates
            if (response.latitude && response.longitude) {
              const feature = {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [response.longitude, response.latitude],
                },
                properties: currentChunk[index],
              };

              featuresArray.push(feature);
            }

            // Create features for polygon coordinates
            if (response.shape) {
              wkt.read(response.shape);

              const feature = {
                type: 'Feature',
                geometry: wkt.toJson(),
                properties: currentChunk[index],
              };

              featuresArray.push(feature);
            }

            // Store failed features for download
            if (response.error) {
              failedfeaturesArray.push(currentChunk[index]);
            }
          });
        }
      );

      this.setState({
        totalFeaturesCreatedProgress: featuresArray.length,
        totalFeaturesFailedProgress: failedfeaturesArray.length,
      });

      requestBuffer.splice(0, requestBuffer.length); // clear buffer after each chunk request
    }

    this.setState({
      geocodingComplete: true,
      totalFeaturesCreated: featuresArray,
      totalFeaturesFailed: failedfeaturesArray,
    });

    this.props.loader(false);
  };

  customButtons = () => {
    return (
      <div className={style.customButton}>
        <Button text="Cancel" type="primary" onClick={this.cancelGeocoding} />
        {this.props.isPro && !this.props.schemaResponse && (
          <Button
            text="AddOn"
            onClick={() => {
              this.props.hideAlert();
              this.props.togglePro(
                this.state.geocodeFileDetails.name,
                this.state.totalFeaturesCreated
              );
            }}
          />
        )}
        <Button
          text="Upload"
          onClick={() => {
            this.props.hideAlert();
            this.props.addSpaces({
              name: this.state.geocodeFileDetails.name,
              features: this.state.totalFeaturesCreated,
            });
          }}
        />
      </div>
    );
  };

  startGeocoding = async () => {
    await this.geocode();

    if (
      this.state.geocodingComplete &&
      this.state.totalFeaturesFailed.length === 0
    ) {
      this.props.showAlert({
        title: 'Geocoding completed successfully',
        text: 'Do you wish to continue with upload?',
        customSave: {
          maxWidth: 'none',
        },
        renderContent: this.customButtons,
      });
    }

    if (this.state.totalFeaturesFailed.length > 0) {
      this.props.showAlert({
        title: 'Geocoding completed with errors',
        text: `Geocoding process for your file is completed but with ${this.state.totalFeaturesFailed.length} errors, \nYou can download the error file to reprocess it.`,
        cancelLabel: 'Got it',
        cancel: this.props.hideAlert,
        toggle: true,
      });
    }
  };

  toggleSelected = (id, key) => {
    const { selectedTags, geocodeFileDetails } = this.state;
    // eslint-disable-next-line react/no-access-state-in-setstate
    const temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp,
    });

    const sampleaddressString = this.getSampleAddressString(
      selectedTags,
      geocodeFileDetails.features[0]
    );

    this.setState({
      sampleColumnInputs: sampleaddressString.join(', '),
    });
  };

  onSelectInput = e => {
    const polygonLevel = e.target.value;
    this.setState({ polygonTypeLevel: polygonLevel });
  };

  onSelectedGeometry = geometry => {
    this.setState({ geometrySelected: geometry });
  };

  showGeocodingInfo = () => {
    this.setState({
      isPolygonInfoVisible: true,
    });
  };

  hideGeocodingInfo = () => {
    this.setState({
      isPolygonInfoVisible: false,
    });
  };

  render() {
    const { loading, isPro, schemaResponse } = this.props;

    const {
      geocodeFileDetails,
      sampleColumnInputs,
      geometrySelected,
      totalFeaturesCreated,
      totalFeaturesCreatedProgress,
      totalFeaturesFailedProgress,
      totalFeaturesFailed,
      selectedTags,
      isPolygonInfoVisible,
      geocodingComplete,
    } = this.state;

    const addressTabs = selectedTags.map((tag, index) => {
      // address tabs with column header names from file
      return (
        <span
          role="presentation"
          className={tag.selected ? style.selected : null}
          onClick={() => this.toggleSelected(tag.id, tag.key)}
          key={index}
        >
          {tag.title}
        </span>
      );
    });

    // -- MERGED code from CMEKB-3512-A --
    // Get ProgressBar percentage for processedData
    const progressBarPercentage =
      (totalFeaturesCreatedProgress / geocodeFileDetails.features.length) * 100;

    // Get ProgressBar percentage for failedData
    const progressBarErrored =
      (totalFeaturesFailedProgress / geocodeFileDetails.features.length) * 100;

    // Form the style object for progressBar
    const progressBarStyle = `linear-gradient(to right,
                              var(--color-green) ${progressBarPercentage}%,
                              var(--color-red) ${progressBarPercentage}%,
                              var(--color-red) ${progressBarPercentage +
                                progressBarErrored}%,
                                var(--color-lightgray-3) ${progressBarPercentage}%,
                                var(--color-lightgray-3) 100%)`;

    // Set status bar text when there is a progress if any failures display those

    let statusBarText;
    if (progressBarPercentage !== 0) {
      statusBarText = (
        <div className={style.geocodingProgessText}>
          Geocoded {progressBarPercentage.toFixed(2)}%
          {progressBarErrored !== 0
            ? `, Failures: ${progressBarErrored.toFixed(
                2
              )}% [${totalFeaturesFailedProgress} features failed]`
            : ''}
        </div>
      );
    }

    const predefinedMatchedTags = selectedTags.filter(
      tag => tag.selected === true
    );

    const geocodingApplyButton =
      // eslint-disable-next-line no-nested-ternary
      geocodingComplete &&
      totalFeaturesFailed.length > 0 &&
      totalFeaturesCreated.length !== 0 ? (
        <Button
          className={[style.buttonStyle]}
          text="Continue Upload"
          onClick={() => {
            this.props.addSpaces({
              name: geocodeFileDetails.name,
              features: totalFeaturesCreated,
            });
          }}
        />
      ) : totalFeaturesFailed.length === 0 ? (
        <Button
          className={[style.buttonStyle]}
          text="Apply"
          onClick={this.startGeocoding}
          disabled={loading || predefinedMatchedTags.length === 0}
        />
      ) : null;

    const downloadFileButton = geocodingComplete &&
      totalFeaturesFailed.length > 0 && (
        <div className={style.customButton}>
          <Button
            className={[style.buttonStyle]}
            type="secondary-negative"
            text="Download Error File"
            onClick={this.downloadErrorRecords}
          />
          {isPro && !schemaResponse && (
            <Button
              type="primary"
              text="Add On"
              onClick={() => {
                this.props.hideAlert();
                this.props.togglePro(
                  this.state.geocodeFileDetails.name,
                  this.state.totalFeaturesCreated
                );
              }}
            />
          )}
        </div>
      );

    return (
      <div className={style.wrapper}>
        <div
          className={style.progress}
          style={{ background: `${progressBarStyle}` }}
        />
        {statusBarText}
        <div className={style.description}>
          <span>Filename: {geocodeFileDetails.name}</span>
        </div>
        <div className={style.container}>
          <div className={style.geocodingInfo}>
            <div className={style.title}>
              <h2>Apply Geocoding</h2>
              <div className={style.descInfo}>
                Below columns will be used to geocode the addresses from your
                dataset.
                <br />
                Click the tags to toggle it for using it in automatic geocoding.
              </div>
            </div>
            {geometrySelected === 'point' ? (
              <div className={style.descImagePoint} />
            ) : (
              <div className={style.descImagePolygon} />
            )}
          </div>
          <div className={style.row}>
            <div className={style.column}>
              <h2>Select Addresses Tags:</h2>
            </div>
            <div className={style.column}>
              <div className={style.selectBoxContainer}>
                <div className={style.addressTabs}>{addressTabs}</div>
              </div>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.column}>
              <h2>Geometry Type:</h2>
            </div>
            <div className={style.column}>
              <div
                className={style.radioBtnContainer}
                onMouseLeave={() => this.hideGeocodingInfo()}
              >
                <RadioButton
                  label="Point"
                  selected={geometrySelected === 'point'}
                  onClick={() => this.onSelectedGeometry('point')}
                />
                {/* Polygon geometry option disable for now */}
                <RadioButton
                  label="Polygon"
                  selected={geometrySelected === 'polygon'}
                  onClick={() => this.onSelectedGeometry('polygon')}
                />
                <span
                  onMouseEnter={() => this.showGeocodingInfo()}
                  className={style.info}
                >
                  i
                </span>
                {isPolygonInfoVisible && (
                  <div
                    className={`${style.mapInfo} ${style.polygonInfo}`}
                    onMouseLeave={() => this.hideGeocodingInfo()}
                  >
                    <p className={style.disclaimerText}>
                      <span>
                        Enabling geometry would reduce performance of upload
                        speed for large polygon data
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className={style.lineText}>* Line is not applicable</div>
            </div>
          </div>

          <div className={style.row}>
            <div className={style.column}>
              <h2>Example Address Fields:</h2>
            </div>
            <div className={style.column}>
              <div className={style.sampleInputs}>
                Ex: {sampleColumnInputs || '[Example address fields]'}
              </div>
            </div>
          </div>
        </div>
        <div className={style.buttonrow}>
          <div>
            <Button
              className={[style.buttonStyle]}
              type="primary"
              text="Cancel"
              onClick={this.cancelGeocoding}
            />
          </div>

          <div className={style.buttonrowRight}>
            {downloadFileButton}
            {geocodingApplyButton}
          </div>
        </div>
      </div>
    );
  }
}
