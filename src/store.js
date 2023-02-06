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

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { throttle } from 'lodash';

import { projectsAPI } from './api';
import { getMapSettingsFromURL } from './helpers';
import { updateLastSaved } from './actions/mapActions';
import rootReducer from './reducers';
import Account from './user';

const save = throttle((store, action) => {
  const { currentProject } = store.getState().map;
  if (
    currentProject &&
    currentProject.id &&
    action.type &&
    action.type !== 'UPDATE_LAST_SAVED_TIME' &&
    action.type !== 'SET_CURRENT_FEATURE' &&
    action.type !== 'UPLOAD_PROGRESS_SPACE' &&
    action.type !== 'EDIT_LAYER' &&
    action.type !== 'OPEN_STYLE_GEOMETRY_PANEL' &&
    action.type !== 'OPEN_STYLE_RULE_PANEL'
  ) {
    const newProject = {
      ...currentProject,
      thumbnail: null,
      map_settings: getMapSettingsFromURL() || {
        ...currentProject.map_settings,
      },
    };

    projectsAPI
      .put(`/${currentProject.id}`, JSON.stringify(newProject), {
        withCredentials: true,
      })
      .then(p => {
        // console.log(`Saved at: ${p.data.last_update}`)
        store.dispatch(updateLastSaved(p.data.last_update));
      })
      .catch(e => {
        localStorage.removeItem('at2');
        if (e.response && e.response.status === 401) {
          Account.passiveAuth();
        }
      });
  }
}, 3000);

const autoSave = store => next => action => {
  const result = next(action);
  save(store, action);
  return result;
};

const initialState = {};

const middleware = [autoSave, thunk];

const composeEnhancers =
  typeof window === 'object' &&
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
