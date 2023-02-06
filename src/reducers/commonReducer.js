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

import * as types from '../actions/types';

const initialState = {
  notice: {
    text: '',
    time: 0,
  },
  loading: false,
  showLoadingScreen: true,
  newlyAddedLayer: null,
  notificationBarConfig: {
    visible: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case types.TOGGLE_NOTIFICATION_BAR:
      return {
        ...state,
        notificationBarConfig: action.payload,
      };

    case types.LOADING_SCREEN:
      return {
        ...state,
        showLoadingScreen: action.payload,
      };

    case types.ADD_BOOKMARK:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: `Added bookmark: ${action.payload}`,
        },
      };

    case types.DELETE_SPACE:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: 'Space deleted',
        },
      };

    case types.DELETE_PROJECT:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: 'Project deleted',
        },
      };

    case types.DELETE_LAYER:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: 'Layer deleted',
        },
      };

    case types.ADD_STYLE_RULE:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: 'Style Rule Added',
        },
      };

    case types.ADD_LAYERS: {
      let failedFeaturesCount = 0;
      action.payload.spaces.forEach(s => {
        if (s.failedFeatures > 0) failedFeaturesCount += s.failedFeatures;
      });
      const feature = failedFeaturesCount === 1 ? 'feature' : 'features';
      const text =
        failedFeaturesCount > 0
          ? `Layer added but ${failedFeaturesCount} ${feature} failed to load because of missing geometry.`
          : 'Layer added';
      return {
        ...state,
        notice: {
          time: Date.now(),
          text,
          duration: failedFeaturesCount > 0 ? 5000 : 3000,
        },
      };
    }

    case types.ADD_EMPTY_LAYER_HIGHLIGHT: {
      return {
        ...state,
        newlyAddedLayer: action.payload.id,
      };
    }

    case types.REMOVE_EMPTY_LAYER_HIGHLIGHT: {
      return {
        ...state,
        newlyAddedLayer: null,
      };
    }

    case types.UPDATE_CURRENT_FEATURE:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: 'Feature updated',
        },
      };

    case types.NEW_DATA_ADDED:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: 'New data added',
        },
      };

    case types.PROPERTY_FILTER_APPLIED:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: 'Filter Applied',
        },
      };

    case types.PROJECT_PUBLISHED:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: `Project ${action.payload}`,
        },
      };

    case types.GEOCODED_FEATURES_SUCCESS:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: `${action.payload} Features Matched`,
        },
      };

    case types.SCHEMA_APPLIED:
      return {
        ...state,
        notice: {
          time: Date.now(),
          text: 'Schema Applied',
        },
      };
    default:
      return state;
  }
};
