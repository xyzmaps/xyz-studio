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
import * as types from './types';
import { formatFileName } from '../helpers';
import { spacesAPI, apiErrorHandler } from '../api';

export const fetchSpaces = () => dispatch => {
  const schemaMap = [];
  const virtualSpaces = [];
  const virtualSourceSpaces = [];
  spacesAPI
    .get('', { withCredentials: true })
    .then(spaces => {
      dispatch({
        type: types.FETCH_SPACES,
        payload: spaces.data,
      });

      spaces.data.forEach(space => {
        spacesAPI
          .get(`/${space.id}`, {
            headers: {
              'Content-Type': 'application/geo+json',
            },
            withCredentials: true,
          })
          .then(response => {
            if (
              response.data.processors &&
              response.data.processors['schema-validator']
            ) {
              schemaMap.push(response.data.id);
            }
            if (
              response.data.storage &&
              response.data.storage.id === 'virtualspace'
            ) {
              const temp = {};
              temp.vSpace = response.data.id;
              temp.sourceSpaces = response.data.storage.params.virtualspace
                .group
                ? response.data.storage.params.virtualspace.group
                : response.data.storage.params.virtualspace.merge;
              virtualSpaces.push(response.data.id);
              virtualSourceSpaces.push(temp);
            }
            dispatch({
              type: types.PRO_FEATURE_MAP,
              payload: schemaMap,
            });

            dispatch({
              type: types.VIRTUAL_SPACE,
              payload: {
                virtualSpaces,
                virtualSourceSpaces,
              },
            });
          });
      });
    })
    .catch(e => apiErrorHandler(e, dispatch));
};

export const updateSpaces = (id, newLabel, otherCopyright) => dispatch => {
  const payload = otherCopyright
    ? JSON.stringify({ copyright: [...otherCopyright, { label: newLabel }] })
    : JSON.stringify({ copyright: [{ label: newLabel }] });
  spacesAPI
    .patch(`/${id}`, payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(space =>
      dispatch({
        type: types.UPDATE_SPACES,
        payload: space.data,
      })
    )
    .catch(e => apiErrorHandler(e, dispatch));
};

export const deleteSpace = spaceId => dispatch => {
  dispatch({
    type: types.DELETING_SPACE,
    payload: spaceId,
  });
  spacesAPI
    .delete(`/${spaceId}`, { withCredentials: true })
    .then(() =>
      dispatch({
        type: types.DELETE_SPACE,
        payload: spaceId,
      })
    )
    .catch(e => apiErrorHandler(e, dispatch));
};

export const cleanUpSpaces = () => {
  return {
    type: types.CLEAN_UP_SPACES,
  };
};

export const deleteCreatedSpace = (id, dispatch) => {
  spacesAPI.delete(`/${id}`, { withCredentials: true }).then(() => {
    dispatch({ type: types.DELETING_SPACE, payload: id });
  });
};

export const uploadProgressSpace = (id = '', file = '', progress = 0) => {
  return {
    type: types.UPLOAD_PROGRESS_SPACE,
    payload: { id, file, progress },
  };
};

export const dataAddedonSpace = () => {
  return {
    type: types.DATA_ADDED_ON_SPACE,
    payload: Date.now(),
  };
};

export const emptySpace = (name, schema, callback, dispatch) => {
  dispatch({ type: types.LOADING, payload: true });
  dispatch(uploadProgressSpace());

  spacesAPI
    .post(
      '/',
      JSON.stringify({
        title: name,
        description: '-',
        enableUUID: true,
        processors: [
          {
            id: 'schema-validator',
            params: {
              schema,
            },
          },
        ],
      }),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      callback(response.data.id);
      dispatch({
        type: types.NEW_SPACE,
        payload: {
          owner: response.data.owner,
          id: response.data.id,
          title: name,
          description: '-',
        },
      });
    })
    .catch(e => apiErrorHandler(e, dispatch));
};

export const addFeatures = (id, fileName, json, dispatch) => {
  dispatch(uploadProgressSpace());

  return new Promise((resolve, reject) => {
    let index = 0;
    const chunk = _.chunk(json, Math.max(Math.ceil(json.length / 33), 10));
    const total = chunk.length;

    function request() {
      spacesAPI
        .post(
          `/${id}/features?addTags=${formatFileName(fileName)}`,
          { type: 'FeatureCollection', features: chunk[index] },
          {
            headers: {
              'Content-Type': 'application/geo+json',
            },
            withCredentials: true,
          }
        )
        .then(response => {
          if (index < total) {
            index += 1;

            dispatch(
              uploadProgressSpace(
                id,
                fileName,
                parseInt((index / total) * 100, 10)
              )
            );
            return request();
          }
          dispatch(uploadProgressSpace(id, fileName, 100));
          dispatch(dataAddedonSpace());
          resolve(response);

          return () => {};
        })
        .catch(e => {
          if (e.response.status === 400) {
            let errorLog = 'Invalid File.';
            if (e.response.data.errorMessage.indexOf('Feature:') > 0)
              errorLog = e.response.data.errorMessage.split('Feature:')[0];

            if (
              e.response.data.errorMessage.indexOf('schema validations') !== -1
            ) {
              apiErrorHandler(e, dispatch);
              errorLog = `${fileName} was not uploaded due to Schema applied on space`;
            }

            dispatch(
              uploadProgressSpace(id, fileName, `Upload failed: ${errorLog}`)
            );
          }

          reject(e.response);
        });
    }

    if (!json || !json.length) {
      dispatch(
        uploadProgressSpace(
          id,
          fileName,
          'File format is not valid (eg: latitude or longitude is missing)'
        )
      );
      reject();
    } else {
      dispatch(uploadProgressSpace(id, fileName, 0));

      return request();
    }

    return () => {};
  });
};

export const virtualizeSpace = (
  title,
  desc,
  type,
  spaceIds,
  callback
) => dispatch => {
  dispatch({ type: types.LOADING, payload: true });
  dispatch(uploadProgressSpace());

  // create new space
  spacesAPI
    .post(
      '/',
      JSON.stringify({
        title,
        description: desc || '-',
        storage: {
          id: 'virtualspace',
          params: {
            virtualspace: {
              [type]: spaceIds,
            },
          },
        },
      }),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      dispatch({
        type: types.NEW_SPACE,
        payload: {
          owner: response.data.owner,
          id: response.data.id,
          title,
          description: desc || '-',
        },
      });

      dispatch(uploadProgressSpace(response.data.id, title, 100));

      callback(response.data.id);
    })
    .catch(e => {
      apiErrorHandler(e, dispatch);
      callback();
    });
};

export const createNewSpace = (
  file,
  data,
  success,
  error,
  callback
) => dispatch => {
  dispatch({ type: types.LOADING, payload: true });
  dispatch(uploadProgressSpace());

  // create new space
  spacesAPI
    .post(
      '/',
      JSON.stringify({ title: file.name, description: '-', enableUUID: true }),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      dispatch({
        type: types.NEW_SPACE,
        payload: {
          owner: response.data.owner,
          id: response.data.id,
          title: file.name,
          description: '-',
        },
      });

      // create new features
      return addFeatures(response.data.id, file.name, data.features, dispatch)
        .then(resp => success && success(resp))
        .catch(e => {
          deleteCreatedSpace(response.data.id, dispatch);

          if (error) {
            error(e);
          }
        })
        .then(() => callback && callback(response.data.id));
    })
    .catch(e => apiErrorHandler(e, dispatch));
};

export const updateVirtualSpaces = spaceId => dispatch => {
  const temp = {};

  spacesAPI
    .get(`/${spaceId}`, {
      headers: {
        'Content-Type': 'application/geo+json',
      },
      withCredentials: true,
    })
    .then(response => {
      if (
        response.data.storage &&
        response.data.storage.id === 'virtualspace'
      ) {
        temp.vSpace = response.data.id;
        temp.sourceSpaces = response.data.storage.params.virtualspace.group
          ? response.data.storage.params.virtualspace.group
          : response.data.storage.params.virtualspace.merge;
      }

      dispatch({
        type: types.UPDATE_VIRTUAL_SPACE,
        payload: {
          spaceId,
          temp,
        },
      });
    });
};

export const filesDropped = (files = {}) => {
  return {
    type: types.FILES_DROP_START,
    payload: files,
  };
};

export const filesUploadFinished = () => {
  return {
    type: types.FILES_DROP_FINISH,
    payload: null,
  };
};
