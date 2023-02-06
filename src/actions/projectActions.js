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
import tpl from '../constants/templates';
import {
  projectsAPI,
  apiErrorHandler,
  getReadOnlyToken,
  deleteReadOnlyToken,
} from '../api';

export const fetchProjects = () => dispatch => {
  projectsAPI
    .get('', { withCredentials: true })
    .then(projects =>
      dispatch({
        type: types.FETCH_PROJECTS,
        payload: projects.data,
      })
    )
    .catch(e => apiErrorHandler(e, dispatch));
};

export const fetchProject = id => dispatch => {
  projectsAPI
    .get(`/${id}`, { withCredentials: true })
    .then(project =>
      dispatch({
        type: types.FETCH_PROJECT,
        payload: project.data,
      })
    )
    .catch(e => apiErrorHandler(e, dispatch));
};

export const newProject = () => dispatch => {
  projectsAPI
    .post('', JSON.stringify(tpl.newProject), { withCredentials: true })
    .then(project =>
      dispatch({
        type: types.NEW_PROJECT,
        payload: project.data,
      })
    )
    .catch(e => apiErrorHandler(e, dispatch));
};

export const starProject = (id, star) => dispatch => {
  projectsAPI
    .patch(`/${id}`, JSON.stringify({ starred: star }), {
      withCredentials: true,
    })
    .then(() =>
      dispatch({
        type: types.STAR_PROJECT,
        payload: id,
      })
    )
    .catch(e => apiErrorHandler(e, dispatch));
};

export const updateProjectName = (id, newName) => dispatch => {
  projectsAPI
    .patch(`/${id}`, JSON.stringify({ name: newName }), {
      withCredentials: true,
    })
    .then(() =>
      dispatch({
        type: types.UPDATE_PROJECT_NAME,
        payload: { id, newName },
      })
    )
    .catch(e => apiErrorHandler(e, dispatch));
};

export const deleteProject = (id, rot) => dispatch => {
  dispatch({
    type: types.DELETING_PROJECT,
    payload: id,
  });
  if (rot) {
    deleteReadOnlyToken(rot)
      .then(() => {
        projectsAPI.delete(`/${id}`, { withCredentials: true }).then(() =>
          dispatch({
            type: types.DELETE_PROJECT,
            payload: id,
          })
        );
      })
      .catch(e => apiErrorHandler(e, dispatch));
  } else {
    projectsAPI.delete(`/${id}`, { withCredentials: true }).then(() =>
      dispatch({
        type: types.DELETE_PROJECT,
        payload: id,
      })
    );
  }
};

export const publishProject = (
  id,
  name,
  currentStatus,
  projectSpaces,
  rot,
  cid,
  callback
) => (dispatch, getState) => {
  const newStatus =
    currentStatus === 'UNPUBLISHED' ? 'PUBLISHED' : 'UNPUBLISHED';
  if (newStatus === 'UNPUBLISHED') {
    deleteReadOnlyToken(rot)
      .then(() => {
        dispatch({
          type: types.PUBLISH_PROJECT,
          payload: {
            id,
            newStatus,
            readOnlyToken: null,
          },
        });
        if (callback) callback();
      })
      .catch(e => apiErrorHandler(e, dispatch));
  } else {
    if (getState().map.currentProject.rot)
      deleteReadOnlyToken(getState().map.currentProject.rot);
    getReadOnlyToken(
      getState().user.user.userId,
      projectSpaces,
      cid,
      name,
      id,
      getState().user.urm
    )
      .then(response => {
        dispatch({
          type: types.PUBLISH_PROJECT,
          payload: {
            id,
            newStatus,
            readOnlyToken: response.data.tid,
          },
        });
        if (callback) callback();
      })
      .catch(e => apiErrorHandler(e, dispatch));
  }
};

export const selectDefaultBookmark = bookmark => {
  return {
    type: types.SELECT_DEFAULT_BOOKMARK,
    payload: bookmark,
  };
};

export const onViewerSelect = viewer => ({
  type: types.SELECT_VIEWER,
  payload: viewer,
});

export const showName = name => {
  return {
    type: types.SHOW_NAME,
    payload: name,
  };
};

export const showDescription = description => {
  return {
    type: types.SHOW_DESCRIPTION,
    payload: description,
  };
};

export const showLegend = legend => {
  return {
    type: types.SHOW_LEGEND,
    payload: legend,
  };
};

export const enableHoverCards = cards => {
  return {
    type: types.ENABLE_CARDS,
    payload: cards,
  };
};

export const selectDefaultLicense = license => {
  return {
    type: types.SELECT_DEFAULT_LICENSE,
    payload: license,
  };
};

export const setProjectThumbnail = (id, thumbUrl) => dispatch => {
  projectsAPI
    .patch(`/${id}`, JSON.stringify({ thumbnail: thumbUrl }), {
      withCredentials: true,
    })
    .then(() =>
      dispatch({
        type: types.SET_PROJECT_THUMBNAIL,
        payload: {
          id,
          thumbUrl,
        },
      })
    )
    .catch(e => apiErrorHandler(e));
};

export const setPublishId = (id, cid) => dispatch => {
  projectsAPI
    .patch(
      `/${id}`,
      JSON.stringify({ publish_settings: { publish_id: cid } }),
      { withCredentials: true }
    )
    .then(() =>
      dispatch({
        type: types.SELECT_PUBLISH_ID,
        payload: {
          id,
          cid,
        },
      })
    )
    .catch(e => apiErrorHandler(e, dispatch));
};
