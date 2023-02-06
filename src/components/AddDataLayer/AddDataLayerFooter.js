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
import style from './AddDataLayerFooter.scss';

export default class AddDataLayerFooter extends Component {
  onAddLayer = () => {
    this.props.onAddLayer(this.props.selectedItems);
    this.props.onHideAddDataLayer();
  };

  render() {
    const {
      items,
      toggleDropzone,
      toggleGeocoding,
      onToggleDropzone,
      selectedItems,
      selectable,
      // onHideAddDataLayer,
      loading,
      overflowFlag,
      disableAdd,
    } = this.props;

    return (
      <div
        className={`${style.wrapper} ${(!items.length ||
          toggleDropzone ||
          !selectable) &&
          style.centered} ${loading && style.loading}`}
      >
        {overflowFlag && <div className={style.shadow} />}
        <div className={style.container}>
          {(toggleDropzone || !selectable) && (
            <Button
              className={[style.button]}
              type="primary"
              text="Go Back"
              onClick={onToggleDropzone}
            />
          )}

          {!toggleDropzone &&
            !toggleGeocoding &&
            selectable &&
            items.length && (
              <Button
                text={`Add ${selectedItems.length || ''} dataset${
                  selectedItems.length > 1 ? 's' : ''
                }`}
                onClick={() => !disableAdd && this.onAddLayer()}
                disabled={disableAdd}
              />
            )}
        </div>
      </div>
    );
  }
}
