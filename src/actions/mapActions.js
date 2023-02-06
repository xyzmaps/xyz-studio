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

import axios from 'axios';
import _ from 'lodash';

import * as types from './types';
import {
  getSpaceProperties,
  getLayerTitle,
  generateSpaceTags,
  populateLength,
  populateArea,
} from '../helpers';
import {
  spacesAPI,
  apiErrorHandler,
  getReadOnlyToken,
  deleteReadOnlyToken,
} from '../api';

export const addFeatureProp = (label, value, featureId) => {
  return {
    type: types.ADD_FEATURE_PROP,
    payload: {
      label,
      value,
      featureId,
    },
  };
};

export const deleteFeatureProp = label => {
  return {
    type: types.DELETE_FEATURE_PROP,
    payload: label,
  };
};

export const setCurrentFeature = (feature, layer) => dispatch => {
  dispatch({
    type: types.SET_CURRENT_FEATURE,
    payload: {
      feature,
      layer,
    },
  });
};

export const setCurrentFeatures = features => {
  return {
    type: types.SET_CURRENT_FEATURES,
    payload: {
      features,
    },
  };
};

export const updateCurrentFeatureProp = (
  spaceId,
  featureId,
  key,
  value,
  newProperty
) => dispatch => {
  let updatedNewProperty = {};

  if (!newProperty) {
    updatedNewProperty = { [key]: value };
  } else {
    updatedNewProperty = { ...newProperty };
  }

  dispatch({
    type: types.UPDATING_FEATURE,
    payload: featureId,
  });
  spacesAPI
    .patch(
      `/${spaceId}/features/${featureId}`,
      JSON.stringify({ type: 'Feature', properties: updatedNewProperty }),
      {
        headers: {
          'Content-Type': 'application/geo+json',
        },
        withCredentials: true,
      }
    )
    .then(() => {
      return dispatch({
        type: types.UPDATE_CURRENT_FEATURE,
        payload: { featureId, key, value },
      });
    })
    .catch(e => apiErrorHandler(e, dispatch));
};

export const addBookmark = label => {
  return {
    type: types.ADD_BOOKMARK,
    payload: label,
  };
};

export const deleteBookmark = id => {
  return {
    type: types.DELETE_BOOKMARK,
    payload: id,
  };
};

export const clickBookmark = () => {
  return {
    type: types.CLICK_BOOKMARK,
  };
};

export const changeBaseView = template => {
  return {
    type: types.CHANGE_BASE_VIEW,
    payload: template,
  };
};

export const changeBaseTileLayer = tileLayer => {
  return {
    type: types.CHANGE_BASE_TILELAYER,
    payload: tileLayer,
  };
};

export const changeBaseTheme = theme => {
  return {
    type: types.CHANGE_BASE_THEME,
    payload: theme,
  };
};

export const changeShowLabels = show => {
  return {
    type: types.CHANGE_SHOW_LABELS,
    payload: show,
  };
};

export const onFilteringWithEditMode = (rules, filteredFeatures) => {
  return {
    type: types.FILTER_WITH_EDIT_MODE,
    payload: { rules, filteredFeatures },
  };
};

export const resetCurrentProject = () => {
  return {
    type: types.RESET_CURRENT_PROJECT,
  };
};

export const renameLayer = (name, id) => {
  return {
    type: types.RENAME_LAYER,
    payload: {
      id,
      name,
    },
  };
};

export const updateHexbin = clustering => {
  return {
    type: types.UPDATE_HEXBIN,
    payload: clustering,
  };
};

export const removeHexbin = (clustering, layerId) => {
  return {
    type: types.REMOVE_HEXBIN,
    payload: {
      clustering,
      layerId,
    },
  };
};

export const deleteLayer = id => {
  return {
    type: types.DELETE_LAYER,
    payload: id,
  };
};

export const hideLayer = id => {
  return {
    type: types.HIDE_LAYER,
    payload: id,
  };
};

export const editLayer = id => {
  return {
    type: types.EDIT_LAYER,
    payload: id,
  };
};

export const updateLayer = data => {
  return {
    type: types.UPDATE_LAYER,
    payload: data,
  };
};

export const updateLastSaved = (time, updatedCurrentProject = {}) => {
  return {
    type: types.UPDATE_LAST_SAVED_TIME,
    payload: {
      time,
      updatedCurrentProject,
    },
  };
};

export const updateMapSettings = settings => {
  return {
    type: types.UPDATE_MAP_SETTINGS,
    payload: settings,
  };
};

export const upadteProjectLayers = layers => {
  return {
    type: types.UPDATE_PROJECT_LAYERS,
    payload: layers,
  };
};

export const upadteLayerBbox = bbox => {
  return {
    type: types.UPDATE_LAYER_BBOX,
    payload: bbox,
  };
};

export const upadteProjectDescription = description => {
  return {
    type: types.UPDATE_PROJECT_DESCRIPTION,
    payload: description,
  };
};

export const sortLayerCardItems = cardItems => {
  return {
    type: types.SORT_LAYER_CARD_ITEMS,
    payload: cardItems,
  };
};

export const renameProject = name => {
  return {
    type: types.RENAME_PROJECT,
    payload: name,
  };
};

export const showAlert = (payload = null) => (dispatch, getState) => {
  const { alert } = getState().map;

  // Check if any alerts are already open
  if (alert && typeof alert === 'object' && Object.keys(alert).length) {
    return false;
  }

  dispatch({
    type: types.SHOW_ALERT,
    payload: {
      ...payload,
      toggle: true,
    },
  });

  return false;
};

export const hideAlert = () => {
  return {
    type: types.HIDE_ALERT,
    payload: null,
  };
};

export const toggleCardVisibility = label => {
  return {
    type: types.TOGGLE_CARD_VISIBILITY,
    payload: label,
  };
};

export const textStyleToggle = (type, ruleId) => {
  return {
    type: types.TOGGLE_TEXT_STYLE,
    payload: {
      type,
      ruleId,
    },
  };
};

export const iconStyleToggle = (type, ruleId) => {
  return {
    type: types.TOGGLE_ICON_STYLE,
    payload: {
      type,
      ruleId,
    },
  };
};

export const updateMapBbox = bbox => {
  return {
    type: types.UPDATE_MAP_BBOX,
    payload: bbox,
  };
};

export const updateGeometriesCount = (type, action = 'add') => {
  return {
    type: types.UPDATE_GEOMETRIES_COUNT,
    payload: {
      type,
      action,
    },
  };
};

export const updateGeometries = (type, action) => {
  return {
    type: types.UPDATE_GEOMETRIES,
    payload: {
      type,
      action,
    },
  };
};

export const updateGeometryVisibility = featureType => {
  return {
    type: types.UPDATE_GEOMETRY_VISIBILITY,
    payload: featureType,
  };
};

export const updateGeometryStyleProp = featureType => {
  return {
    type: types.UPDATE_GEOMETRY_STYLEPROP,
    payload: featureType,
  };
};

export const addColorLoader = (loader, mapSetting) => {
  return {
    type: types.ADD_COLOR_LOADER,
    payload: { loader, mapSetting },
  };
};

export const setMapMode = mode => {
  return {
    type: types.SET_MAP_MODE,
    payload: mode,
  };
};

export const addLayerErrorHandler = (dispatch, getState) => {
  dispatch({
    type: types.LOADING_SCREEN,
    payload: false,
  });

  showAlert({
    title: 'Network Error',
    text: 'There is problem with API. Please try again.',
    theme: 'negative',
    cancelLabel: 'Got it',
  })(dispatch, getState);
};

export const addLayer = (spaces, cb) => (dispatch, getState) => {
  const calls = [];
  const state = getState();
  const { currentProject } = state.map;

  spaces.forEach(spaceId => {
    const featureApiCall = spacesAPI.get(`/${spaceId}/iterate?limit=1000`, {
      withCredentials: true,
    }); // temporary solution need to remove once geometry count added to statistics api
    const statsApiCall = spacesAPI.get(`/${spaceId}/statistics`, {
      withCredentials: true,
    });
    calls.push(featureApiCall, statsApiCall);
  });

  const addingLayer = (token = null) => {
    axios
      .all(calls)
      .then(results => {
        dispatch({
          type: types.ADD_LAYERS,
          payload: {
            spaces: spaces.map((sid, j) => {
              const featureDataIndex = j * 2;
              const statsDataIndex = featureDataIndex + 1;
              const spaceProps = getSpaceProperties(
                results[featureDataIndex],
                results[statsDataIndex]
              );
              return {
                id: sid,
                title: getLayerTitle(
                  _.find(getState().space.items, ({ id }) => id === sid).title
                ),
                virtualSpace:
                  getState().space.itemsVirtualMap.indexOf(
                    _.find(getState().space.items, ({ id }) => id === sid).id
                  ) !== -1,
                ...spaceProps,
              };
            }),
            readOnlyToken: token,
          },
        });
        if (cb) cb();
      })
      .catch(() => {
        addLayerErrorHandler(dispatch, getState);
      });
  };

  if (currentProject.status === 'PUBLISHED') {
    if (currentProject.rot) deleteReadOnlyToken(currentProject.rot);
    getReadOnlyToken(
      state.user.user.userId,
      currentProject.layers.map(l => l.geospace.id).concat(spaces),
      currentProject.publish_settings.publish_id || state.user.defaultAppId,
      currentProject.meta.name,
      currentProject.id,
      state.user.urm
    )
      .then(tokenResponse => {
        addingLayer(tokenResponse.data.tid);
      })
      .catch(() => {
        addLayerErrorHandler(dispatch, getState);
      });
  } else {
    addingLayer();
  }
};

export const addEmptyLayer = (spaceName, counter) => (dispatch, getState) => {
  const state = getState();
  const { currentProject } = state.map;

  const newCounter = counter || 0;

  const addingLayer = (id, token = null) => {
    dispatch({
      type: types.ADD_EMPTY_LAYER_HIGHLIGHT,
      payload: {
        id,
      },
    });

    dispatch({
      type: types.LOADING_SCREEN,
      payload: false,
    });

    return dispatch({
      type: types.ADD_LAYERS,
      payload: {
        readOnlyToken: token,
        newEmptyLayerCounter: newCounter + 1,
        spaces: [
          {
            id,
            title: `${spaceName} ${newCounter}`,
            cards: [],
            hiddenCards: [],
            geometries: [],
            geometriesCount: {
              Polygon: 0,
              MultiPolygon: 0,
              LineString: 0,
              MultiLineString: 0,
              Point: 0,
              MultiPoint: 0,
            },
            bbox: [],
          },
        ],
      },
    });
  };

  return spacesAPI
    .post(
      '/',
      JSON.stringify({ title: spaceName, description: '-', enableUUID: true }),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      if (currentProject.status === 'PUBLISHED') {
        if (currentProject.rot) deleteReadOnlyToken(currentProject.rot);
        getReadOnlyToken(
          state.user.user.userId,
          currentProject.layers
            .map(l => l.geospace.id)
            .concat(response.data.id),
          currentProject.publish_settings.publish_id || state.user.defaultAppId,
          currentProject.meta.name,
          currentProject.id,
          state.user.urm
        ).then(r => {
          addingLayer(response.data.id, r.data.tid);
        });
      } else {
        addingLayer(response.data.id);
      }
    })
    .catch(() => addLayerErrorHandler(dispatch, getState));
};

export const spacesLimit = (spaces, limit) => (dispatch, getState) => {
  if (spaces > limit) {
    showAlert({
      title: 'Storage limit reached',
      text: `Maximum number of spaces permitted for your account: ${limit}`,
      theme: 'negative',
      cancelLabel: 'Got it',
    })(dispatch, getState);

    return true;
  }

  return false;
};

export const fileSizeLimit = (filedatalength, mb, limit = 50) => (
  dispatch,
  getState
) => {
  if (mb > limit) {
    showAlert({
      title: 'File exceeds size limit',
      text: `Maximum upload file size: ${limit}MB<br>To upload larger files, please use the <a href="https://www.here.xyz/cli/" target="_blank" rel="noopener noreferrer"><span>Data Hub CLI</span></a>`,
      theme: 'negative',
      cancelLabel: 'Got it',
    })(dispatch, getState);

    return true;
  }

  if (filedatalength === 0) {
    showAlert({
      title: 'File Empty',
      text: 'Kindly upload valid file (GeoJSON, JSON, CSV)',
      theme: 'negative',
      cancelLabel: 'Got it',
    })(dispatch, getState);

    return true;
  }
  return false;
};

export const addStyleRule = (newRule, name, geometryType) => {
  return {
    type: types.ADD_STYLE_RULE,
    payload: {
      geometry: geometryType,
      name,
      rule: newRule,
    },
  };
};

export const deleteStyleRule = (geometryType, ruleId) => {
  return {
    type: types.DELETE_STYLE_RULE,
    payload: {
      geometry: geometryType,
      ruleId,
    },
  };
};

export const editStyleRule = (geometryType, ruleId, newRule, name) => {
  return {
    type: types.EDIT_STYLE_RULE,
    payload: {
      geometry: geometryType,
      ruleId,
      name,
      rule: newRule,
    },
  };
};

export const sortStyleRules = (newRules, geometry) => {
  return {
    type: types.SORT_STYLE_RULES,
    payload: {
      newRules,
      geometry,
    },
  };
};

export const sortGeometry = newGeometrylist => {
  return {
    type: types.SORT_GEOMETRY,
    payload: {
      newGeometrylist,
    },
  };
};

export const openStyleGeoPanel = geometry => {
  return {
    type: types.OPEN_STYLE_GEOMETRY_PANEL,
    payload: {
      geometry,
    },
  };
};

export const openStyleRulePanel = ruleId => {
  return {
    type: types.OPEN_STYLE_RULE_PANEL,
    payload: {
      ruleId,
    },
  };
};

export const updateDefaultStyleLabel = (label, type) => {
  return {
    type: types.UPDATE_DEFAULT_STYLE_LABEL,
    payload: {
      label,
      type,
    },
  };
};

export const updateOpenSourceDateSet = (spaceId, tags) => (
  dispatch,
  getState
) => {
  const calls = [];
  const state = getState();
  const { currentProject } = state.map;
  const featureApiCall = spacesAPI.get(
    `/${spaceId}/iterate?limit=1000&tag=${generateSpaceTags(tags)}`,
    {
      withCredentials: true,
    }
  ); // temporary solution need to remove once geometry count added to statistics api
  const statsApiCall = spacesAPI.get(`/${spaceId}/statistics`, {
    withCredentials: true,
  });
  calls.push(featureApiCall, statsApiCall);

  const listOfLayers = _.uniq(
    currentProject.layers.map(l => l.geospace.id).concat(spaceId)
  );
  const addingLayer = token => {
    axios.all(calls).then(result => {
      // results[0] = feature data;
      // results[1] = statistics data;
      const spaceProps = getSpaceProperties(result[0], result[1]);
      return dispatch({
        type: types.UPDATE_OPEN_SPACE,
        payload: {
          space: {
            id: spaceId,
            title: 'Building Footprints',
            ...spaceProps,
          },
          tags,
          readOnlyToken: token,
        },
      });
    });
  };
  if (currentProject.status === 'PUBLISHED') {
    if (currentProject.rot) deleteReadOnlyToken(currentProject.rot);
    getReadOnlyToken(
      state.user.user.userId,
      listOfLayers,
      currentProject.publish_settings.publish_id || state.user.defaultAppId,
      currentProject.meta.name,
      currentProject.id,
      state.user.urm
    )
      .then(tokenResponse => {
        addingLayer(tokenResponse.data.tid);
      })
      .catch(() => {
        addLayerErrorHandler(dispatch, getState);
      });
  } else {
    addingLayer();
  }
};

export const deleteTag = (layerId, tagIndex) => {
  return {
    type: types.DELETE_TAG,
    payload: {
      layerId,
      tagIndex,
    },
  };
};

export const updateGisFeatures = payload => dispatch => {
  dispatch({
    type: types.UPDATE_GIS_FEATURE,
    payload,
  });
};

export const toggleGisPersist = payload => (dispatch, getState) => {
  dispatch({
    type: types.LOADING_SCREEN,
    payload: true,
  });
  const state = getState();
  const spaceId = state.map.currentLayer.geospace.id;
  const doneUpdating = success => {
    if (success) {
      const currentLayer = window.mapObject.layers.find(
        l => l.name.indexOf(spaceId) > -1
      );
      currentLayer.getProvider().clear();
    }
    setTimeout(() => {
      dispatch({
        type: types.UPDATE_GIS_FEATURE,
        payload: {
          ...payload,
          persistent: success ? payload.persistent : !payload.persistent,
        },
      });
      dispatch({
        type: types.LOADING_SCREEN,
        payload: false,
      });
    }, 300);
  };

  const updateFeatures = handle => {
    spacesAPI
      .get(
        `/${spaceId}/iterate?limit=10000${handle ? `handle=${handle}` : ''}`,
        {
          withCredentials: true,
        }
      )
      .then(resp => {
        if (
          !resp.data ||
          !resp.data.features ||
          resp.data.features.length === 0
        ) {
          doneUpdating(true);
          return;
        }

        const updatedFeatures = resp.data.features.map(feature => {
          const updatedFeature = { ...feature };
          let type = '';
          if (feature.geometry) {
            type =
              ['LineString', 'MultiLineString'].indexOf(feature.geometry.type) >
              -1
                ? 'lineLength'
                : type;
            type =
              ['Polygon', 'MultiPolygon'].indexOf(feature.geometry.type) > -1
                ? 'polygonArea'
                : type;
          }

          if (type === 'lineLength' && type === payload.type) {
            if (payload.persistent) {
              updatedFeature.properties = {
                ...updatedFeature.properties,
                ...populateLength(feature, payload).properties,
              };
            } else {
              updatedFeature.properties.length_m = null;
              updatedFeature.properties.length_km = null;
              updatedFeature.properties.length_miles = null;
            }
          } else if (type === 'polygonArea' && type === payload.type) {
            if (payload.persistent) {
              updatedFeature.properties = {
                ...updatedFeature.properties,
                ...populateArea(feature, payload).properties,
              };
            } else {
              updatedFeature.properties.area_sqm = null;
              updatedFeature.properties.area_sqkm = null;
              updatedFeature.properties.area_sqmiles = null;
            }
          }
          return updatedFeature;
        });

        spacesAPI
          .post(
            `/${spaceId}/features`,
            { type: 'FeatureCollection', features: updatedFeatures },
            {
              headers: {
                'Content-Type': 'application/geo+json',
              },
              withCredentials: true,
            }
          )
          .then(() => {
            if (resp.data.handle) {
              updateFeatures(handle);
            } else {
              doneUpdating(true);
            }
          })
          .catch(e => {
            apiErrorHandler(e, dispatch);
            doneUpdating(false);
          });
      })
      .catch(e => {
        apiErrorHandler(e, dispatch);
        doneUpdating(false);
      });
  };
  updateFeatures(false);
};
