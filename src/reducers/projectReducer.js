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

import update from 'immutability-helper';
import * as types from '../actions/types';

const initialState = {
  items: [],
  itemsLoaded: false,
  deletingItem: null,
};

const updateThumb = (state, id, thumb) => {
  return state.items.map(p => {
    const newObj = { ...p };

    if (p.id === id) {
      newObj.thumbnail = thumb;
    }

    return newObj;
  });
};

const setPublishId = (state, id, cid) => {
  return {
    ...state,
    items: state.items.map(item =>
      item.id === id
        ? {
            ...item,
            publish_settings: {
              ...item.publish_settings,
              publish_id: cid,
            },
          }
        : item
    ),
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_PROJECT:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case types.FETCH_PROJECTS:
      return {
        ...state,
        itemsLoaded: true,
        items: action.payload,
      };
    case types.STAR_PROJECT:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? update(item, { starred: { $set: !item.starred } })
            : item
        ),
      };
    case types.UPDATE_PROJECT_NAME:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, meta: { name: action.payload.newName } }
            : item
        ),
      };

    case types.PUBLISH_PROJECT_DASHBOARD:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                status: action.payload.newStatus,
                rot: action.payload.readOnlyToken,
              }
            : item
        ),
      };

    case types.SELECT_DEFAULT_BOOKMARK_DASHBOARD:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                publish_settings: {
                  ...item.publish_settings,
                  bookmark: action.payload.bookmark,
                },
              }
            : item
        ),
      };

    case types.SELECT_VIEWER_DASHBOARD:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                publish_settings: {
                  ...item.publish_settings,
                  viewer: action.payload.viewer,
                },
              }
            : item
        ),
      };

    case types.DELETING_PROJECT:
      return {
        ...state,
        deletingItem: action.payload,
      };
    case types.DELETE_PROJECT:
      return {
        ...state,
        deletingItem: null,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case types.SET_PROJECT_THUMBNAIL:
      return {
        ...state,
        items: updateThumb(state, action.payload.id, action.payload.thumbUrl),
      };

    case types.UPDATE_PROJECT_DISPLAY_SETTINGS:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              publish_settings: {
                ...item.publish_settings,
                display: {
                  ...item.publish_settings.display,
                  [action.payload.key]: action.payload.value,
                },
              },
            };
          }
          return { ...item };
        }),
      };
    case types.SELECT_PUBLISH_ID:
      return setPublishId(state, action.payload.id, action.payload.cid);

    case types.SELECT_PUBLISH_ID_FROM_DASHBOARD:
      return setPublishId(state, action.payload.id, action.payload.cid);

    default:
      return state;
  }
};
