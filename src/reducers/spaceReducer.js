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

import _ from 'lodash';
import update from 'immutability-helper';
import * as types from '../actions/types';

const initialState = {
  items: [],
  itemsProMap: [],
  itemsVirtualMap: [],
  itemsVirtualMapSource: [],
  itemsLoaded: false,
  deletingItem: null,
  uploadProgress: {},
  isFilesDropped: false,
  files: null,
  dataAdded: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.DATA_ADDED_ON_SPACE:
      return {
        ...state,
        dataAdded: action.payload,
      };

    case types.PRO_FEATURE_MAP:
      return {
        ...state,
        itemsProMap: action.payload,
      };

    case types.FETCH_SPACES:
      return {
        ...state,
        itemsLoaded: true,
        items: action.payload,
      };

    case types.UPDATE_SPACES:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, copyright: action.payload.copyright }
            : item
        ),
      };

    case types.NEW_SPACE:
      return {
        ...state,
        items: [action.payload, ...state.items],
        uploadProgress: {
          [action.payload.id]: {
            [action.payload.title]: 1,
          },
        },
      };

    case types.ADD_LAYERS: {
      const newItems = [];
      action.payload.spaces.forEach(item => {
        if (!_.find(state.items, i => i.id === item.id)) {
          newItems.push(item);
        }
      });
      return {
        ...state,
        items: [...newItems, ...state.items],
      };
    }

    case types.DELETING_SPACE:
      return {
        ...state,
        deletingItem: action.payload,
      };

    case types.DELETE_SPACE:
      return {
        ...state,
        items: _.filter(state.items, item => {
          return item.id !== action.payload;
        }),
        deletingItem: null,
      };

    case types.UPLOAD_PROGRESS_SPACE: {
      let uploadProgress = {};

      if (action.payload.id) {
        if (state.uploadProgress[action.payload.id]) {
          uploadProgress = update(state.uploadProgress, {
            [action.payload.id]: {
              [action.payload.file]: { $set: action.payload.progress || 0.1 },
            },
          });
        } else {
          uploadProgress = {
            ...state.uploadProgress,
            [action.payload.id]: {
              [action.payload.file]: action.payload.progress || 0.1,
            },
          };
        }
      }

      return {
        ...state,
        uploadProgress,
      };
    }

    case types.FILES_DROP_START:
      return {
        ...state,
        isFilesDropped: true,
        files: action.payload,
      };

    case types.CLEAN_UP_SPACES:
      return {
        ...state,
        items: _.filter(state.items, item => {
          if (
            !state.uploadProgress[item.id] ||
            typeof state.uploadProgress[item.id][item.title] !== 'string'
          ) {
            return true;
          }
          return false;
        }),
      };

    case types.FILES_DROP_FINISH:
      return {
        ...state,
        isFilesDropped: false,
        files: null,
      };

    case types.VIRTUAL_SPACE:
      return {
        ...state,
        itemsVirtualMap: action.payload.virtualSpaces,
        itemsVirtualMapSource: action.payload.virtualSourceSpaces,
      };

    case types.UPDATE_VIRTUAL_SPACE:
      return {
        ...state,
        itemsVirtualMap: [action.payload.spaceId, ...state.itemsVirtualMap],
        itemsVirtualMapSource: [
          action.payload.temp,
          ...state.itemsVirtualMapSource,
        ],
      };
    default:
      return state;
  }
};
