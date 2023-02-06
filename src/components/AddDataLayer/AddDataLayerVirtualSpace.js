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
import Button from '../Common/Button';

import { Info, Close } from '../../icons';
import style from './AddDataLayerVirtualSpace.scss';
import MultiSelectInput from '../Common/MultiSelectInput';
import RadioButton from '../Common/RadioButton';
import logEvent from '../../utils/amplitudeLogger';

export default class AddDataLayerVirtualSpace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      vsType: 'group',
      spaces: this.props.items,
      selectedSpaces: [],
      listofSpaces: [],
      itemsVirtualMap: this.props.itemsVirtualMap,
      showInfo: false,
      success: false,
      successMsg: '',
      error: false,
      errorMsg: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getSpaces();
  }

  getSpaces = () => {
    const { spaces } = this.state;
    const { selectedItems } = this.props;

    // filter out the virtual spaces
    const spacesWithoutVS = spaces.filter(
      item => !this.state.itemsVirtualMap.includes(item.id)
    );

    // filter out the activity log
    const singleSpaces = spacesWithoutVS.filter(
      item => item.title.indexOf('activity-log for space') === -1
    );

    // show non virtual spaces in dropdown
    const listofSpaces = singleSpaces.map((space, index) => {
      if (selectedItems.indexOf(space.id) !== -1) {
        return {
          id: index,
          title: `${space.id} : ${space.title}`,
          spaceId: space.id,
          selected: true,
          key: 'listofSpaces',
        };
      }

      return {
        id: index,
        title: `${space.id} - ${space.title}`,
        spaceId: space.id,
        selected: false,
        key: 'listofSpaces',
      };
    });

    const selectedSpaces = listofSpaces.filter(
      space => space.selected === true
    );

    this.setState({
      listofSpaces,
      selectedSpaces,
    });
  };

  toggleSelected = (id, key) => {
    const temp = this.state[key];
    temp[id].selected = !temp[id].selected;

    const selectedSpace = this.state.selectedSpaces.find(
      space => space.id === id
    );

    if (selectedSpace) {
      this.setState(prevState => ({
        [key]: temp,
        selectedSpaces: prevState.selectedSpaces.filter(
          space => space.id !== id
        ),
      }));
    } else {
      this.setState(prevState => ({
        [key]: temp,
        selectedSpaces: [...prevState.selectedSpaces, temp[id]],
      }));
    }
  };

  removeSelectedSpace = (id, key) => {
    const temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState(prevState => ({
      [key]: temp,
      selectedSpaces: prevState.selectedSpaces.filter(space => space.id !== id),
    }));
  };

  onInputChange = event => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  onDescChange = event => {
    const { value } = event.target;

    this.setState({
      desc: value,
    });
  };

  onSelectedType = type => {
    this.setState({ vsType: type });
  };

  createVirtualSpace = vsInput => {
    const {
      dataContext, // flag context to denote data section
      loader,
      onAddedVirtualSpace,
      updateVirtualSpaces,
    } = this.props;

    this.props.virtualizeSpace(
      vsInput.title,
      vsInput.desc,
      vsInput.vsType,
      vsInput.spaces,
      id => {
        loader(false);

        if (id) {
          updateVirtualSpaces(id); // update newly added virtual space to redux store

          if (!dataContext) {
            this.props.hideAlert();
            onAddedVirtualSpace(id, vsInput);
          } else {
            this.setState(
              {
                success: true,
                successMsg: `Virtual Space - ${vsInput.title} (${id}) is created!`,
                loading: false,
              },
              () => {
                setTimeout(() => {
                  this.setState({ success: false });
                }, 4000);
              }
            );
            // this.props.showAlert({
            //   // success popup for data section
            //   theme: 'default',
            //   title: 'Virtual Space Created',
            //   text: `Virtual Space ${vsInput.title} (${id}) is created.`,
            //   cancelLabel: 'Got it',
            //   cancel: this.props.hideAlert,
            // });
          }
        } else {
          this.setState(
            {
              error: true,
              errorMsg: 'Something went wrong. Please try again!',
              loading: false,
            },
            () => {
              setTimeout(() => {
                this.setState({ error: false });
              }, 4000);
            }
          );
        }
      }
    );
  };

  onConfirm = () => {
    const { desc, vsType, selectedSpaces } = this.state;
    logEvent('_i_createVirtualSpace_');

    const selectedSpaceIds = selectedSpaces.map(currentSpace => {
      return currentSpace.spaceId;
    });

    // Default title if no title provided
    const title =
      this.state.title === ''
        ? `Virtual Space ${selectedSpaceIds.join()} (${vsType})`
        : this.state.title;

    const vsInput = {
      title,
      desc,
      vsType,
      spaces: selectedSpaceIds,
    };
    // this.props.onApply(vsInput);
    this.setState({ loading: true });
    this.createVirtualSpace(vsInput);
  };

  showInfo = () => {
    this.setState({
      showInfo: true,
    });
  };

  hideInfo = () => {
    this.setState({
      showInfo: false,
    });
  };

  render() {
    const {
      title,
      desc,
      vsType,
      listofSpaces,
      selectedSpaces,
      showInfo,
      success,
      error,
      successMsg,
      errorMsg,
      loading,
    } = this.state;

    const selectedTabs = selectedSpaces.map((space, index) => {
      // selected tabs
      return (
        <span>
          <div>{space.title} </div>
          <button
            type="button"
            data-key={index}
            className={style.close}
            onClick={() => this.removeSelectedSpace(space.id, space.key)}
          >
            <Close />
          </button>
        </span>
      );
    });

    return (
      <div className={style.virtualSpaceWrapper}>
        <div className={style.header} onMouseLeave={() => this.hideInfo()}>
          Create a Virtual Space{' '}
          <span className={style.infoIcon} onMouseEnter={() => this.showInfo()}>
            <Info />
          </span>
          {showInfo && (
            <div
              className={`${style.mapInfo} ${style.tooltipInfo}`}
              onMouseLeave={() => this.hideInfo()}
            >
              <p className={style.disclaimerText}>
                <span>
                  <ul>
                    <li>
                      {' '}
                      Group: Combines the content of the specified spaces
                    </li>
                    <li>
                      {' '}
                      Merge: Objects of the specified spaces having the same ID
                      will be merged together
                    </li>
                  </ul>
                </span>
              </p>
            </div>
          )}
          <div className={style.subInfo}>
            Virtual Spaces will allow you to group or associate (merge)
            geospatial features from multiple spaces and present them as a
            single space
          </div>
        </div>
        <div className={style.row}>
          <div className={style.column}>
            <h2>Title:</h2>
          </div>
          <div className={style.column}>
            <div className={style.inputBoxContainer}>
              <input
                onChange={e => this.onInputChange(e)}
                className={style.inputBox}
                value={title}
                type="text"
                placeholder="Enter a title for the space"
              />
            </div>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.column}>
            <h2>Description:</h2>
          </div>
          <div className={style.column}>
            <div className={style.inputBoxContainer}>
              <input
                onChange={e => this.onDescChange(e)}
                className={style.inputBox}
                value={desc}
                type="text"
                placeholder="Enter a description for the space"
              />
            </div>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.column}>
            <h2>Type of Space:</h2>
          </div>
          <div className={style.column}>
            <div className={style.radioBtnContainer}>
              <RadioButton
                label="Group"
                selected={vsType === 'group'}
                onClick={() => this.onSelectedType('group')}
              />

              <RadioButton
                label="Merge"
                selected={vsType === 'merge'}
                onClick={() => this.onSelectedType('merge')}
              />
            </div>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.column}>
            <h2>Select Spaces for Virtual Space:</h2>
          </div>
          <div className={style.column}>
            <div className={style.selectBoxContainer}>
              <MultiSelectInput
                title="Select spaces"
                list={listofSpaces}
                toggleItem={this.toggleSelected}
                titleHelper="space"
              />
            </div>
          </div>
        </div>

        <hr />

        <div className={style.row}>
          <div className={style.column}>
            <h2>Selected Space:</h2>
          </div>
          <div className={style.column}>
            <div className={style.selectedSpacesContainer}>
              {selectedTabs.length > 0 ? (
                <div className={style.selectedTabs}>{selectedTabs}</div>
              ) : (
                <div className={style.nospaces}>
                  No Spaces Selected for Virtual Space
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={style.button}>
          {success && <div className={style.success}>{successMsg}</div>}
          {error && <div className={style.error}>{errorMsg}</div>}

          <Button
            text="Submit"
            onClick={this.onConfirm}
            disabled={selectedTabs.length < 2 || loading}
          />
        </div>
      </div>
    );
  }
}
