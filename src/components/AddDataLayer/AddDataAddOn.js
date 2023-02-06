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
import { Scrollbars } from 'react-custom-scrollbars';
import { SchemaBBG, ActivityLog, VirtualIcon } from '../../icons';
import Button from '../Common/Button';
import AddOnSchema from './AddOnSchema';
import ScrollbarStyle from '../../config/ScrollbarStyle';
import AddOnActivityLog from './AddOnActivityLog';
import logEvent from '../../utils/amplitudeLogger';

import style from './AddDataAddOn.scss';
import AddDataLayerVirtualSpace from './AddDataLayerVirtualSpace';

export default class AddDataAddOn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'schema',
    };
  }

  render() {
    const { item } = this.props;

    let isVsSpace;

    if (this.props.itemsVirtualMap.indexOf(item.id) !== -1) isVsSpace = true;
    else isVsSpace = false;

    return (
      <div className={style.popupOverlay}>
        <div className={style.popupContentWrapper}>
          <div className={style.heading}>Add-on features</div>
          <div className={style.addOnContainer}>
            <Scrollbars
              className={style.container}
              renderTrackVertical={props => (
                <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
              )}
              renderThumbVertical={props => (
                <div {...props} style={ScrollbarStyle.thumbStyle} />
              )}
              ref={scrollbarElem => {
                this.scrollbarElem = scrollbarElem;
              }}
            >
              <div className={style.addOnTab}>
                <div
                  role="presentation"
                  className={`${style.featureSelect} ${
                    this.state.selected === 'schema' ? style.selected : ''
                  }`}
                  onClick={() => {
                    logEvent('add_on_tab_schema');
                    this.setState({ selected: 'schema' });
                  }}
                >
                  <div className={style.featureIcon}>
                    <SchemaBBG />
                  </div>
                  Schema Validation
                </div>
                <div
                  role="presentation"
                  className={`${style.featureSelect} ${
                    this.state.selected === 'activityLog' ? style.selected : ''
                  }`}
                  onClick={() => {
                    logEvent('add_on_tab_activityLog');
                    this.setState({ selected: 'activityLog' });
                  }}
                >
                  <div className={style.featureIcon}>
                    <ActivityLog fill="#000000" />
                  </div>
                  Activity Log
                </div>
                {!isVsSpace && (
                  <div
                    role="presentation"
                    className={`${style.featureSelect} ${
                      this.state.selected === 'virtual' ? style.selected : ''
                    }`}
                    onClick={() => {
                      logEvent('add_on_tab_virtual');
                      this.setState({ selected: 'virtual' });
                    }}
                  >
                    <div className={style.virtualfeatureIcon}>
                      <VirtualIcon />
                    </div>
                    Virtual Spaces
                  </div>
                )}
              </div>
              <div className={style.addOnContent}>
                {this.state.selected === 'schema' && (
                  <AddOnSchema
                    item={this.props.item}
                    itemsProMap={this.props.itemsProMap}
                    existing
                  />
                )}
                {this.state.selected === 'activityLog' && (
                  <AddOnActivityLog item={this.props.item} />
                )}
                {this.state.selected === 'virtual' && (
                  <AddDataLayerVirtualSpace
                    selectedItems={this.props.item.id}
                    items={this.props.items}
                    itemsVirtualMap={this.props.itemsVirtualMap}
                    showAlert={this.props.showAlert}
                    hideAlert={this.props.hideAlert}
                    loader={this.props.loader}
                    onAddedVirtualSpace={this.props.onAddedVirtualSpace}
                    virtualizeSpace={this.props.virtualizeSpace}
                    updateVirtualSpaces={this.props.updateVirtualSpaces}
                    dataContext={this.props.dataContext}
                  />
                )}
              </div>
            </Scrollbars>
          </div>
          <div className={style.schemaButton}>
            <Button
              text="Close"
              type="primary"
              onClick={this.props.hideAlert}
            />
          </div>
        </div>
      </div>
    );
  }
}
