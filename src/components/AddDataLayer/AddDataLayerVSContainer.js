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

import React from 'react';
import AddDataLayerVirtualSpace from './AddDataLayerVirtualSpace';
import Button from '../Common/Button';

import style from './AddDataLayerVSContainer.scss';

const AddDataLayerVSContainer = props => {
  return (
    <div className={style.popupOverlay}>
      <div className={style.popupContentWrapper}>
        <div className={style.heading}>Add-on features</div>
        <div className={style.addOnContainer}>
          <AddDataLayerVirtualSpace
            items={props.items}
            itemsVirtualMap={props.itemsVirtualMap}
            selectedItems={props.selectedItems}
            loader={props.loader}
            onAddedVirtualSpace={
              props.onAddedVirtualSpace ? props.onAddedVirtualSpace : null
            }
            showAlert={props.showAlert}
            hideAlert={props.hideAlert}
            virtualizeSpace={props.virtualizeSpace}
            updateVirtualSpaces={props.updateVirtualSpaces}
            dataContext={props.dataContext ? props.dataContext : null}
          />
        </div>
        <div className={style.schemaButton}>
          <Button text="Close" type="primary" onClick={props.hideAlert} />
        </div>
      </div>
    </div>
  );
};

export default AddDataLayerVSContainer;
