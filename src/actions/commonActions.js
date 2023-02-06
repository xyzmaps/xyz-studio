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

import * as types from './types';

export const loader = (loading = false) => {
  return {
    type: types.LOADING,
    payload: loading,
  };
};

export const showLoadingScreen = (loading = false) => {
  return {
    type: types.LOADING_SCREEN,
    payload: loading,
  };
};

export const removeEmptyLayerHighlight = () => {
  return {
    type: types.REMOVE_EMPTY_LAYER_HIGHLIGHT,
  };
};

export const showFilterAppliedNote = () => {
  return {
    type: types.PROPERTY_FILTER_APPLIED,
  };
};

export const showProjectPublishNote = status => {
  return {
    type: types.PROJECT_PUBLISHED,
    payload: status,
  };
};

export const showGeocodedFeaturesNotice = features => {
  return {
    type: types.GEOCODED_FEATURES_SUCCESS,
    payload: features,
  };
};

export const schemaAppliedNote = () => {
  return {
    type: types.SCHEMA_APPLIED,
  };
};

/**
 * Payload:
 * {
 *   visible: boolean,
 *   message: string,
 *   duration: number,
 *   btnLabel: string,
 *   onBtnClick: Function,
 *   type: string (success | error)
 * }
 */
export const showNotificationBar = (config = { visible: false }) => {
  let payload = { ...config };

  if (!config.visible) {
    payload = {
      visible: false,
      duration: 0,
      message: '<Please provide a message to display>',
      btnLabel: '',
      type: 'error',
      onClose: () => {},
      onBtnClick: () => {},
    };
  }

  return {
    type: types.TOGGLE_NOTIFICATION_BAR,
    payload,
  };
};
