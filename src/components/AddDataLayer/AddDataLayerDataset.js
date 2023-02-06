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
import axios from 'axios';
import { Close } from '../../icons';
import Button from '../Common/Button';
import { geoCoderAPI, credentials } from '../../constants';
import { getFormatedMSLabel } from '../../helpers';

import style from './AddDataLayerDataset.scss';
import logEvent from '../../utils/amplitudeLogger';

export default class AddDataLayerDataset extends Component {
  state = {
    cursor: 0,
    inputValue: '',
    tempLocationData: [],
    prevSelectedLocations: [...this.props.selectedTags],
    selectedLocations: [...this.props.selectedTags],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTags) {
      const { selectedLocations } = this.state;
      if (nextProps.selectedTags.length !== selectedLocations.length) {
        this.setState({
          prevSelectedLocations: [...nextProps.selectedTags],
          selectedLocations: [...nextProps.selectedTags],
        });
      }
    }
  }

  onInputChange(event) {
    let { value } = event.target;
    this.setState({ inputValue: value });
    value = value.split(' ').join('+');

    logEvent('type_search', { query: value });

    axios
      .get(
        `${geoCoderAPI.suggestion}?app_id=${credentials.APP_ID}&app_code=${credentials.APP_CODE}&country=USA,CAN&query=${value}`
      )
      .then(response => response.data)
      .then(autoCompleteRes => {
        if (autoCompleteRes.suggestions) {
          const newArr = autoCompleteRes.suggestions.filter(item => {
            if (item.matchLevel === 'street') {
              return false;
            }
            let flag = true;
            const { selectedLocations } = this.state;
            selectedLocations.map(sItem => {
              if (sItem.label === item.label) {
                flag = false;
              }
              return sItem;
            });
            return flag;
          });
          this.setState({
            tempLocationData: newArr,
          });
          this.bindKeyBoardEvent();
        }
      });

    this.unbindKeyBoardEvent();
  }

  onSelect(index) {
    const { tempLocationData, selectedLocations } = this.state;
    const selected = tempLocationData[index];
    const locationid = selected.locationId;
    // const label = selected.label;
    this.resetState();

    axios
      .get(
        `${geoCoderAPI.autocomplete}?gen=8&locationattributes=mapReference&app_id=${credentials.APP_ID}&app_code=${credentials.APP_CODE}&mode=retrieveAreas&locationid=${locationid}`
      )
      .then(response => response.data)
      .then(idRes => {
        const propsToSend = {
          label: selected.label,
          address: idRes.Response.View[0].Result[0].Location.Address,
          locationid,
          matchLevel: selected.matchLevel,
          // labels: idRes.Response.View[0].Result[0].Location.Address,
          mapReference: idRes.Response.View[0].Result[0].Location.MapReference,
          mapView: idRes.Response.View[0].Result[0].Location.MapView,
          // adminType: adminType
        };
        selectedLocations.push({ ...propsToSend });
        this.setState({
          selectedLocations,
        });
      });
  }

  resetState() {
    this.setState({
      cursor: 0,
      inputValue: '',
      tempLocationData: [],
    });
  }

  onRomveItem(key) {
    const { selectedLocations } = this.state;
    selectedLocations.splice(key, 1);

    this.setState({
      selectedLocations,
    });
  }

  onClearAll() {
    this.setState({
      cursor: 0,
      inputValue: '',
      selectedLocations: [],
    });
  }

  onCancel() {
    const { selectedTags, onHideAddDataset } = this.props;

    if (selectedTags.length > 0) {
      // this.props.onAddDataset(this.props.selectedTags);
    } else {
      this.onClearAll();
      onHideAddDataset([]);
    }

    onHideAddDataset(selectedTags);
  }

  onAddDataset() {
    const { onAddDataset } = this.props;
    const { selectedLocations } = this.state;

    onAddDataset(selectedLocations);
  }

  bindKeyBoardEvent() {
    window.addEventListener('keydown', this.keyDownHandler, false);
  }

  unbindKeyBoardEvent() {
    window.removeEventListener('keydown', this.keyDownHandler, false);
  }

  keyDownHandler = e => {
    const { cursor, tempLocationData } = this.state;
    if (tempLocationData.length > 0) {
      if (e.keyCode === 38 && cursor > 0) {
        // up
        this.setState(prevState => ({
          cursor: prevState.cursor - 1,
        }));
      }
      if (e.keyCode === 40 && cursor < tempLocationData.length - 1) {
        // down
        this.setState(prevState => ({
          cursor: prevState.cursor + 1,
        }));
      }
      if (e.keyCode === 13) {
        // Enter
        this.onSelect(cursor);
      }
      if (e.keyCode === 27) {
        // Escape
        this.resetState();
      }
      if (
        e.keyCode === 38 ||
        e.keyCode === 40 ||
        e.keyCode === 13 ||
        e.keyCode === 27
      ) {
        e.preventDefault();
      }
    }
  };

  checkForChange() {
    const { selectedLocations, prevSelectedLocations } = this.state;
    if (selectedLocations.length !== prevSelectedLocations.length) {
      return false;
    }

    let flag = true;
    selectedLocations.map(item => {
      let innerFlag = false;
      prevSelectedLocations.map(prevItem => {
        if (prevItem.label === item.label) {
          innerFlag = true;
          return true;
        }
        return prevItem;
      });
      if (!innerFlag) {
        flag = false;
        return true;
      }
      return item;
    });
    return flag;
  }

  render() {
    const {
      cursor,
      inputValue,
      tempLocationData,
      selectedLocations,
      prevSelectedLocations,
    } = this.state;

    let layerBtnLabel = 'Add Layer';

    if (prevSelectedLocations.length > 0) {
      layerBtnLabel =
        selectedLocations.length === 0 && prevSelectedLocations.length !== 0
          ? 'Delete layer'
          : 'Update layer';
    }

    return (
      <div className={style.wrapper}>
        <div className={style.row}>
          <div className={`${style.content} ${style.cardHolder}`}>
            <div className={`${style.card} ${style.active} ${style.msCard}`}>
              <h3>Microsoft Building Footprint Data</h3>
              <p>(Visible at zoom level 15-20)</p>
            </div>
            <div className={`${style.card} ${style.disabled}`}>
              <h3>
                {' '}
                More coming
                <br />
                soon!{' '}
              </h3>
            </div>
          </div>
        </div>
        <div className={`${style.row} ${style.whiteBg}`}>
          <div className={style.content}>
            <div className={style.description}>
              This data was created by Microsoft and is being provided to you in
              a Space.
              <br />
              Data sources:{' '}
              <a href="https://github.com/Microsoft/USBuildingFootprints">
                https://github.com/Microsoft/USBuildingFootprints
              </a>
              ,{' '}
              <a href="https://github.com/Microsoft/CanadianBuildingFootprints">
                https://github.com/Microsoft/CanadianBuildingFootprints
              </a>
            </div>
            {/* <div className={style.filterItems}> */}
            {/*  <div> */}
            {/*    <div className={style.state} /> */}
            {/*    State */}
            {/*  </div> */}
            {/*  <div> */}
            {/*    <div className={style.county} /> */}
            {/*    County */}
            {/*  </div> */}
            {/*  <div> */}
            {/*    <div className={style.city} /> */}
            {/*    City */}
            {/*  </div> */}
            {/*  <div> */}
            {/*    <div className={style.district} /> */}
            {/*    District */}
            {/*  </div> */}
            {/*  <div> */}
            {/*    <div className={style.zipcode} /> */}
            {/*    Zipcode */}
            {/*  </div> */}
            {/* </div> */}
            <div className={style.inputBoxWrapper}>
              <div className={style.inputBox}>
                <input
                  onChange={this.onInputChange.bind(this)}
                  className={style.searchInput}
                  value={inputValue}
                  type="text"
                  placeholder="Type search for a state, county, city, district, zipcode"
                />

                {inputValue !== '' && (
                  <button
                    type="button"
                    className={style.close}
                    onClick={() => this.resetState()}
                  >
                    <Close />
                  </button>
                )}

                <ul className={style.autoSuggesionList}>
                  {_.map(tempLocationData, (obj, key) => {
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => this.onSelect(key)}
                          className={cursor === key ? style.active : null}
                        >
                          <strong>{getFormatedMSLabel(obj)}</strong>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <ul className={style.selectedList}>
              {_.map(selectedLocations, (obj, key) => {
                return (
                  <li key={key}>
                    <strong>{getFormatedMSLabel(obj)}</strong>
                    <button
                      type="button"
                      data-key={key}
                      className={style.close}
                      onClick={() => this.onRomveItem(key)}
                    >
                      <Close />
                    </button>
                  </li>
                );
              })}
            </ul>
            {selectedLocations.length > 0 && (
              <button
                type="button"
                className={style.clearAll}
                onClick={() => this.onClearAll()}
              >
                Clear all
              </button>
            )}
          </div>
        </div>
        <div className={`${style.row} ${style.transparent} ${style.footer}`}>
          <Button
            text={layerBtnLabel}
            onClick={() => this.onAddDataset()}
            disabled={
              (selectedLocations.length === 0 &&
                prevSelectedLocations.length === 0) ||
              this.checkForChange()
            }
          />
        </div>
      </div>
    );
  }
}
