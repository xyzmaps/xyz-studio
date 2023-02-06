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

import * as types from '../actions/types';
import tpl from '../constants/templates';
import {
  getMapSettingsFromURL,
  generateSpaceTags,
  generateBBox,
  getCentroid,
} from '../helpers';
import styleGroupsConfig from '../constants/styleGroupsConfig';
import basicLayerStyle from '../constants/basicLayerStyle';
import base64Svg from '../icons/svgBase64Obj.json';

const initialState = {
  clickBookmark: false,
  currentProject: undefined,
  currentViewMode: 'map',
  previousViewMode: 'map',
  currentLayer: undefined,
  currentFeature: undefined,
  currentFeatures: [],
  updatingFeature: undefined,
  colorLoader: false,
  alert: null,
  mode: 'view',
  mapBbox: [],
  currentStyleGeoPanel: undefined,
  currentStyleRulePanel: undefined,
  filterRules: undefined,
  filteredFeatures: undefined,
  updatedTime: Date.now(),
};

const updateLayerVisibility = (state, layerId) => {
  const { layers } = state.currentProject;
  const newLayers = layers.map(l => {
    const newObj = { ...l };

    if (l.id === layerId) {
      newObj.visible = !l.visible;
    }

    return newObj;
  });
  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };
  return {
    ...state,
    currentProject: newCurrentProject,
  };
};

const updateLayerGis = (state, options) => {
  const { type, enabled, metrics, persistent } = options;
  const { layers } = state.currentProject;
  let currentGisState = {};
  const newLayers = layers.map(l => {
    const newObj = { ...l };

    if (l.id === state.currentLayer.id) {
      if (!newObj[type]) {
        newObj[type] = {
          enabled,
          metrics,
          persistent,
        };
      } else {
        newObj[type].enabled = enabled;
        newObj[type].metrics = metrics;
        newObj[type].persistent = persistent;
      }
      currentGisState = newObj[type];
    }

    return newObj;
  });
  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };
  const newCurrentLayer = {
    ...state.currentLayer,
    [type]: currentGisState,
  };
  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const updateLayerName = (state, data) => {
  const { layers } = state.currentProject;
  const newLayers = layers.map(l => {
    const newObj = { ...l };

    if (l.id === data.id) {
      newObj.meta.title = data.name;
    }

    return newObj;
  });
  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };
  return {
    ...state,
    currentProject: newCurrentProject,
  };
};

const updatePointStyle = (selectedLayerStyle, data) => {
  let newLayerStyle;
  switch (data.styleProp) {
    case 'shape':
      newLayerStyle = _.map(selectedLayerStyle, s => {
        if (['Rect', 'Circle', 'none'].indexOf(s.type) !== -1) {
          s.type = data.value; // eslint-disable-line
        }
        return s;
      });
      break;

    case 'size': {
      newLayerStyle = selectedLayerStyle;
      const strokeOffset = newLayerStyle[1].height - newLayerStyle[0].height;
      newLayerStyle[0].radius = data.value / 2;
      newLayerStyle[0].height = data.value;
      newLayerStyle[0].width = data.value;
      newLayerStyle[1].radius = data.value / 2 + strokeOffset / 2;
      newLayerStyle[1].height = data.value + strokeOffset;
      newLayerStyle[1].width = data.value + strokeOffset;
      break;
    }

    case 'strokeWidth':
      newLayerStyle = selectedLayerStyle;
      newLayerStyle[1].radius = newLayerStyle[0].radius + data.value;
      newLayerStyle[1].height = newLayerStyle[0].height + data.value * 2;
      newLayerStyle[1].width = newLayerStyle[0].height + data.value * 2;
      newLayerStyle[1].opacity = data.value === 0 ? 0 : 1;
      break;

    case 'stroke':
      newLayerStyle = selectedLayerStyle;
      newLayerStyle[1].fill = data.value;
      break;

    case 'fill':
      newLayerStyle = selectedLayerStyle;
      newLayerStyle[0].fill = data.value;
      break;

    default:
      newLayerStyle = _.map(selectedLayerStyle, sg => {
        if (sg.type === data.styleType) {
          sg[data.styleProp] = data.value; // eslint-disable-line
        }
        return sg;
      });
  }
  return newLayerStyle;
};

const updateLayerStyle = (state, data) => {
  const { layers } = state.currentProject;
  const ending = data.ruleId ? `_${data.ruleId}` : '';
  const newLayers = layers.map(l => {
    if (l.id === state.currentLayer.id) {
      let selectedLayerStyle =
        l.styleGroups[
          `${styleGroupsConfig.geometryToLayerStyle(data.geometry)}${ending}`
        ];

      if (data.styleType === 'Text' || data.styleType === 'Image') {
        let v = data.value;
        const entity = _.find(
          selectedLayerStyle,
          ({ type }) => type === data.styleType
        );
        if (data.styleProp === 'font') {
          v = `normal ${data.value}px Arial`;
        }
        if (data.styleProp === 'height') {
          entity.width = v;
        }
        if (data.styleProp === 'baseSrc') {
          const iconName = data.value.split('icons/')[1];
          entity.src =
            base64Svg[`${iconName}-${entity.iconColor.substring(1)}`];
        }
        if (data.styleProp === 'iconColor') {
          const iconName = entity.baseSrc.split('icons/')[1];
          entity.src = base64Svg[`${iconName}-${v.substring(1)}`];
        }
        entity[data.styleProp] = v;
      } else if (data.geometry === 'Point') {
        selectedLayerStyle = [...updatePointStyle(selectedLayerStyle, data)];
      } else {
        selectedLayerStyle[0][data.styleProp] = data.value;
      }
    }
    return l;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };
  return {
    ...state,
    currentProject: newCurrentProject,
  };
};

const textStyleToggle = (state, data) => {
  const { layers } = state.currentProject;
  const ending = data.ruleId ? `_${data.ruleId}` : '';
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      let newLayerStyle;
      const selectedLayerStyle =
        l.styleGroups[
          `${styleGroupsConfig.geometryToLayerStyle(data.type)}${ending}`
        ];
      const textStyleGroup = _.find(
        selectedLayerStyle,
        ({ type }) => type === 'Text'
      );
      let ruleIndex = 0;
      let zIndexOffset = 0;
      let zIndexPrefix;

      if (data.type === 'Point') {
        zIndexPrefix = l.styleGroups.pointStyle[0].zIndex.toString()[0];
      } else if (data.type === 'Line') {
        zIndexPrefix = l.styleGroups.lineStyle[0].zIndex.toString()[0];
      } else {
        zIndexPrefix = l.styleGroups.polygonStyle[0].zIndex.toString()[0];
      }

      if (
        state.currentLayer.styleRules &&
        state.currentLayer.styleRules[data.type]
      ) {
        ruleIndex = _.findIndex(
          state.currentLayer.styleRules[data.type],
          r => r.id === data.ruleId
        );
        zIndexOffset =
          (state.currentLayer.styleRules[data.type].length - ruleIndex) * 10;
      }

      if (textStyleGroup) {
        newLayerStyle = selectedLayerStyle.map(s => {
          if (s.type === 'Text') {
            s.opacity = s.opacity === 0 ? 1 : 0; // eslint-disable-line
          }
          return s;
        });
      } else {
        newLayerStyle = [
          ...selectedLayerStyle,
          {
            zIndex: Number(`${zIndexPrefix}${9 + zIndexOffset}`),
            type: 'Text',
            fill: 'rgba(255,255,255,1)',
            stroke: 'rgba(0,0,0,1)',
            offsetX: 0,
            offsetY: 0,
            strokeWidth: 1,
            opacity: 1,
            font: 'normal 12px Arial',
            textRef: `properties['${state.currentLayer.geospace.properties[0]}'] || ''`,
          },
        ];
      }
      updatedLayer.styleGroups[
        `${styleGroupsConfig.geometryToLayerStyle(data.type)}${ending}`
      ] = newLayerStyle.slice(0);
    }

    return updatedLayer;
  });
  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };
  return {
    ...state,
    currentProject: newCurrentProject,
  };
};

const iconStyleToggle = (state, data) => {
  const { layers } = state.currentProject;
  const ending = data.ruleId ? `_${data.ruleId}` : '';
  const newLayers = layers.map(l => {
    if (l.id === state.currentLayer.id) {
      let newLayerStyle;
      const selectedLayerStyle =
        l.styleGroups[
          `${styleGroupsConfig.geometryToLayerStyle(data.type)}${ending}`
        ];
      const ImageStyleGroup = _.find(
        selectedLayerStyle,
        ({ type }) => type === 'Image'
      );
      if (ImageStyleGroup) {
        newLayerStyle = selectedLayerStyle.map(s => {
          if (s.type === 'Image') {
            s.opacity = !s.opacity | 0; // eslint-disable-line
          }
          return s;
        });
      }

      /* eslint-disable */
      l.styleGroups[
        `${styleGroupsConfig.geometryToLayerStyle(data.type)}${ending}`
      ] = newLayerStyle.slice(0);
      /* eslint-enable */
    }
    return l;
  });
  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };
  return {
    ...state,
    currentProject: newCurrentProject,
  };
};

const updateLayerCards = (state, newCardItems) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      updatedLayer.cards = newCardItems;
      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const deleteLayer = (state, id) => {
  let newCurrentLayer;
  const newLayers = _.filter(state.currentProject.layers, l => l.id !== id);
  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };
  if (state.currentLayer) {
    newCurrentLayer =
      state.currentLayer.id === id ? newLayers[0] : state.currentLayer;
  }
  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const findLayerById = (state, layerId) => {
  const layer = _.find(state.currentProject.layers, ({ id }) => id === layerId);
  return layer;
};

const addFeatureProp = (state, payload) => {
  if (!state.currentProject) return state;

  const { currentProject, currentFeatures } = state;
  const { layers } = currentProject;
  const { label, value, featureId } = payload;
  let newCurrentLayer = null;

  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      updatedLayer.geospace.properties = _.union(l.geospace.properties, [
        label,
      ]);
      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });
  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  const newCurrentFeatures = currentFeatures.map(currentFeature => {
    const newCurrentFeature = { ...currentFeature };

    if (currentFeature.id === featureId) {
      newCurrentFeature.properties[label] = value;
    }

    return newCurrentFeature;
  });

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
    currentFeatures: [...newCurrentFeatures],
  };
};

const deleteFeatureProp = (state, label) => {
  if (!state.currentProject) return state;

  const { currentProject, currentFeatures } = state;
  const { layers } = currentProject;

  let newCurrentLayer = null;

  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      updatedLayer.geospace.properties = _.pull(l.geospace.properties, label);
      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  const newCurrentFeatures = currentFeatures.map(currentFeature => {
    const newCurrentFeature = { ...currentFeature };
    delete newCurrentFeature.properties[label];

    return newCurrentFeature;
  });

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
    currentFeatures: [...newCurrentFeatures],
  };
};

const toggleCardVisibility = (state, cardLabel) => {
  let newCurrentLayer = null;
  const newLayers = _.map(state.currentProject.layers, l => {
    if (state.currentLayer.id === l.id) {
      newCurrentLayer = { ...l };

      if (l.hiddenCards) {
        if (!l.hiddenCards.includes(cardLabel)) {
          newCurrentLayer.hiddenCards.push(cardLabel);
        } else {
          newCurrentLayer.hiddenCards.splice(
            newCurrentLayer.hiddenCards.indexOf(cardLabel),
            1
          );
        }
      } else {
        newCurrentLayer = { ...l, hiddenCards: [cardLabel] };
      }
      return newCurrentLayer;
    }
    return l;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const updateGeometriesCount = (state, payload) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      if (l.geometriesCount) {
        if (payload.action === 'add') {
          updatedLayer.geometriesCount[payload.type] += 1;
        } else {
          updatedLayer.geometriesCount[payload.type] -= 1;
        }
      }

      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const updateGeometries = (state, payload) => {
  const { layers } = state.currentProject;

  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      if (l.geometries) {
        if (payload.action === 'add') {
          const geometry = styleGroupsConfig.geometryToFeatureStyleType(
            payload.type
          );

          updatedLayer.geometries = _.union(updatedLayer.geometries, [
            geometry,
          ]);

          updatedLayer.geometriesFromStats = true;
        } else if (payload.action === 'update') {
          updatedLayer.geometries = payload.type;

          updatedLayer.geometriesFromStats = true;
        } else if (updatedLayer.geometriesCount[payload.type] === 0) {
          const geometry = styleGroupsConfig.geometryToFeatureStyleType(
            payload.type
          );

          const index = updatedLayer.geometries.indexOf(geometry);
          if (index !== -1) updatedLayer.geometries.splice(index, 1);
        }
      }

      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const updateGeometryVisibility = (state, data) => {
  const { layers } = state.currentProject;

  let feat = data;
  let newlayer = null;
  if (data.toLowerCase().includes('Point'.toLowerCase()) || data === 'Circle')
    feat = 'Point';

  if (data.toLowerCase().includes('Line'.toLowerCase())) feat = 'Line';

  if (data.toLowerCase().includes('Polygon'.toLowerCase())) feat = 'Polygon';
  // const geom = data === 'Circle' ? 'Point' : data; // eslint-disable-line no-console

  const newLayers = layers.map(l => {
    if (l.id === state.currentLayer.id) {
      newlayer = { ...l };
      if (l.geometryVisibility) {
        if (!l.geometryVisibility.includes(feat)) {
          newlayer.geometryVisibility.push(feat);
        } else {
          newlayer.geometryVisibility.splice(
            newlayer.geometryVisibility.indexOf(feat),
            1
          );
        }
      } else {
        newlayer = { ...l, geometryVisibility: [feat] };
      }
      return newlayer;
    }
    return l;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newlayer,
  };
};

const updateGeometryStyleProp = (state, data) => {
  const { layers } = state.currentProject;

  let newlayer = null;
  const newLayers = layers.map(l => {
    if (l.id === state.currentLayer.id) {
      newlayer = { ...l };
      if (l.geometryStyle) {
        if (!l.geometryStyle.includes(data)) {
          newlayer.geometryStyle.push(data);
        } else {
          newlayer.geometryStyle.splice(
            newlayer.geometryStyle.indexOf(data),
            1
          );
        }
      } else {
        newlayer = { ...l, geometryStyle: [data] };
      }
      return newlayer;
    }
    return l;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newlayer,
    colorLoader: false,
  };
};

const addStyleRule = (state, payload) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  let ruleId = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      if (!l.styleRules) {
        updatedLayer.styleRules = {};
      }

      const existingGeometryRuleSet = updatedLayer.styleRules[payload.geometry];

      ruleId = `${l.id.substr(-5)}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      if (existingGeometryRuleSet) {
        existingGeometryRuleSet.unshift({
          id: ruleId,
          name: payload.name,
          r: [...payload.rule],
        });
      } else {
        updatedLayer.styleRules[payload.geometry] = [
          {
            id: ruleId,
            name: payload.name,
            r: [...payload.rule],
          },
        ];
      }

      const defaultGeometryStyle =
        l.styleGroups[styleGroupsConfig.geometryToLayerStyle(payload.geometry)];

      updatedLayer.styleRules = JSON.parse(
        JSON.stringify(updatedLayer.styleRules)
      ); // Deep copy

      updatedLayer.styleGroups = {
        ...l.styleGroups,
        ...basicLayerStyle(
          ruleId,
          payload.geometry,
          updatedLayer.styleRules[payload.geometry].length,
          defaultGeometryStyle
        ),
      };

      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
    currentStyleGeoPanel: styleGroupsConfig.geometryToLabel(payload.geometry),
    currentStyleRulePanel: ruleId,
  };
};

const updateDefaultStyleLabel = (state, payload) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      if (!l.geometriesLabels) updatedLayer.geometriesLabels = {};
      updatedLayer.geometriesLabels = {
        ...updatedLayer.geometriesLabels,
        [payload.type]: {
          defaultStyleLabel: payload.label,
        },
      };

      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const deleteStyleRule = (state, payload) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      const { ruleId } = payload;
      updatedLayer.styleRules[payload.geometry] = _.filter(
        l.styleRules[payload.geometry],
        r => r.id !== ruleId
      );

      updatedLayer.styleGroups = _.omitBy(
        l.styleGroups,
        (value, key) => key.indexOf(ruleId) !== -1
      );

      newCurrentLayer = { ...updatedLayer };
    }
    // l.styleRules = JSON.parse(JSON.stringify(l.styleRules)); //Deep copy
    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const editStyleRule = (state, payload) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      if (!l.styleRules) updatedLayer.styleRules = {};

      const existingGeometryRuleSet = _.find(
        l.styleRules[payload.geometry],
        r => r.id === payload.ruleId
      );

      if (existingGeometryRuleSet) {
        existingGeometryRuleSet.r = [...payload.rule];
        existingGeometryRuleSet.name = payload.name;
      }

      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const sortStyleRules = (state, payload) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      updatedLayer.styleRules = {
        ...l.styleRules,
        [payload.geometry]: payload.newRules,
      };

      newCurrentLayer = { ...updatedLayer };
      let zIndexPrefix;

      if (payload.geometry === 'Point') {
        zIndexPrefix = `${l.styleGroups.pointStyle[0].zIndex.toString()[0]}`;
      } else if (payload.geometry === 'Line') {
        zIndexPrefix = `${l.styleGroups.lineStyle[0].zIndex.toString()[0]}`;
      } else {
        zIndexPrefix = `${l.styleGroups.polygonStyle[0].zIndex.toString()[0]}`;
      }
      payload.newRules.forEach((r, index) => {
        l.styleGroups[
          `${styleGroupsConfig.geometryToLayerStyle(payload.geometry)}_${r.id}`
        ].forEach(s => {
          const newZindex =
            (s.zIndex % 10) + (payload.newRules.length - index) * 10;

          s.zIndex = Number(zIndexPrefix + newZindex); // eslint-disable-line
        });
      });
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const sortGeometry = (state, payload) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    if (l.id === state.currentLayer.id) {
      newCurrentLayer = { ...l };

      for (const styleGroup in l.styleGroups) {
        l.styleGroups[styleGroup].forEach(s => {
          const geometryIndex = payload.newGeometrylist.indexOf(
            styleGroupsConfig.layerStyleToGeometry(styleGroup.split('_')[0])
          );

          const zIndex = `${s.zIndex}`;

          /* eslint-disable */
          if (geometryIndex === 0) {
            s.zIndex = Number(`9${zIndex.slice(1, zIndex.length)}`);
          } else if (geometryIndex === 1) {
            s.zIndex = Number(`8${zIndex.slice(1, zIndex.length)}`);
          } else {
            s.zIndex = Number(`7${zIndex.slice(1, zIndex.length)}`);
          }
          /* eslint-enable */
        });
      }
    }

    return l;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const updateOpenSpace = (state, payload) => {
  let flag = false;
  const { layers } = state.currentProject;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.meta.title === payload.space.title) {
      const tagArr = payload.tags;
      updatedLayer.meta.tags = tagArr;
      updatedLayer.meta.spaceTags = generateSpaceTags(tagArr);
      updatedLayer.bbox = payload.space.bbox;
      flag = true;
    }

    return updatedLayer;
  });

  if (flag) {
    const newCurrentProject = {
      ...state.currentProject,
      layers: newLayers,
      rot: payload.readOnlyToken,
    };
    return {
      ...state,
      currentProject: newCurrentProject,
    };
  }

  const newLayer = tpl.newLayer(state.currentProject.id, payload.space);

  newLayer.meta = {
    ...newLayer.meta,
    tags: payload.tags,
    spaceTags: generateSpaceTags(payload.tags),
  };
  state.currentProject.layers.push(newLayer);
  return {
    ...state,
    alert: false,
    centroid: getCentroid(payload.tags[0]),
    currentProject: {
      ...state.currentProject,
      layers: [...state.currentProject.layers],
      rot: payload.readOnlyToken,
    },
  };
};

const updateTagList = (state, payload) => {
  const { layers } = state.currentProject;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === payload.layerId) {
      const tagArr = l.meta.tags;
      updatedLayer.meta.tags = tagArr;
      updatedLayer.meta.spaceTags = generateSpaceTags(tagArr);
      updatedLayer.bbox = generateBBox(tagArr[0]);
    }

    return updatedLayer;
  });
  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };
  return {
    ...state,
    currentProject: newCurrentProject,
  };
};

const updateHexbin = (state, clustering) => {
  const { layers } = state.currentProject;
  let newCurrentLayer = null;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === state.currentLayer.id) {
      updatedLayer.clustering = clustering;
      newCurrentLayer = { ...updatedLayer };
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
    currentLayer: newCurrentLayer,
  };
};

const removeHexbin = (state, payload) => {
  const { layers } = state.currentProject;
  const newLayers = layers.map(l => {
    const updatedLayer = { ...l };

    if (l.id === payload.layerId) {
      updatedLayer.clustering = payload.clustering;
    }

    return updatedLayer;
  });

  const newCurrentProject = {
    ...state.currentProject,
    layers: newLayers,
  };

  return {
    ...state,
    currentProject: newCurrentProject,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROJECT:
    case types.NEW_PROJECT: {
      // Id update routine to be rmoved see CMEKB-1216 - to be removed
      const p = action.payload;
      const sanitizedLayers = p.layers.map(layer => {
        const updatedLayer = { ...layer };

        if (layer.cards[0].indexOf('id') !== -1) {
          updatedLayer.cards[0][layer.cards[0].indexOf('id')] = '__id';
        }

        if (layer.cards[1].indexOf('id') !== -1) {
          updatedLayer.cards[1][layer.cards[1].indexOf('id')] = '__id';
        }

        if (
          layer.geospace.properties &&
          layer.geospace.properties.indexOf('id') !== -1
        ) {
          updatedLayer.geospace.properties[
            layer.geospace.properties.indexOf('id')
          ] = '__id';
        }

        return updatedLayer;
      });
      p.layers = sanitizedLayers;
      // End Id update routine to be rmoved see CMEKB-1216

      return {
        ...state,
        currentProject: {
          ...p,
        },
      };
    }

    case types.RESET_CURRENT_PROJECT:
      return {
        ...initialState,
      };

    // case types.UPDATE_OLD_PROJECT:
    //   return updateOldProject(state, action.payload);

    case types.HIDE_LAYER:
      return updateLayerVisibility(state, action.payload);

    case types.EDIT_LAYER:
      return {
        ...state,
        currentViewMode:
          action.payload === null ? 'map' : state.currentViewMode,
        currentLayer: findLayerById(state, action.payload),
      };

    case types.RENAME_LAYER:
      return updateLayerName(state, action.payload);

    case types.UPDATE_HEXBIN:
      return updateHexbin(state, action.payload);

    case types.REMOVE_HEXBIN:
      return removeHexbin(state, action.payload);

    case types.ADD_LAYERS: {
      const { spaces } = action.payload;
      const newLayers = spaces.map(space =>
        tpl.newLayer(state.currentProject.id, space)
      );

      return {
        ...state,
        alert: false,
        mapBbox: action.payload.spaces.length && action.payload.spaces[0].bbox,
        currentProject: {
          ...state.currentProject,
          meta: {
            ...state.currentProject.meta,
            newEmptyLayerCounter:
              action.payload.newEmptyLayerCounter ||
              (state.currentProject.meta &&
                state.currentProject.meta.newEmptyLayerCounter),
          },
          layers: [...newLayers, ...state.currentProject.layers],
          rot:
            state.currentProject.status === 'PUBLISHED'
              ? action.payload.readOnlyToken
              : null,
        },
      };
    }

    case types.UPDATE_MAP_BBOX:
      return {
        ...state,
        mapBbox: [...action.payload],
      };

    case types.UPDATE_GEOMETRIES_COUNT:
      return updateGeometriesCount(state, action.payload);

    case types.UPDATE_GEOMETRIES:
      return updateGeometries(state, action.payload);

    case types.UPDATE_GEOMETRY_VISIBILITY:
      return updateGeometryVisibility(state, action.payload);

    case types.UPDATE_GEOMETRY_STYLEPROP:
      return updateGeometryStyleProp(state, action.payload);

    case types.ADD_COLOR_LOADER:
      return {
        ...state,
        colorLoader: action.payload.loader,
        currentProject: {
          ...state.currentProject,
          map_settings: { ...action.payload.mapSetting },
        },
      };

    case types.DELETE_LAYER:
      return deleteLayer(state, action.payload);

    case types.UPDATE_LAYER:
      return updateLayerStyle(state, action.payload);

    case types.UPDATE_PROJECT_LAYERS:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          layers: action.payload,
        },
      };

    case types.UPDATE_PROJECT_DESCRIPTION:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          meta: {
            ...state.currentProject.meta,
            description: action.payload,
          },
        },
      };

    case types.UPDATE_LAYER_BBOX: {
      const { layers } = state.currentProject;
      let newCurrentLayer = null;
      const newLayers = layers.map(l => {
        const updatedLayer = { ...l };

        if (l.id === state.currentLayer.id) {
          updatedLayer.bbox = action.payload;
          newCurrentLayer = { ...updatedLayer };
        }

        return updatedLayer;
      });

      const newCurrentProject = {
        ...state.currentProject,
        layers: newLayers,
      };

      return {
        ...state,
        currentProject: newCurrentProject,
        currentLayer: newCurrentLayer,
      };
    }

    case types.UPDATE_LAST_SAVED_TIME:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          ...action.payload.updatedCurrentProject,
          last_update: action.payload.time,
        },
      };

    case types.RENAME_PROJECT:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          meta: {
            ...state.currentProject.meta,
            name: action.payload,
          },
        },
      };

    case types.SORT_LAYER_CARD_ITEMS:
      return updateLayerCards(state, action.payload);

    case types.SHOW_ALERT:
      return {
        ...state,
        alert: {
          ...action.payload,
        },
      };

    case types.HIDE_ALERT:
      return {
        ...state,
        alert: null,
      };

    case types.FILTER_WITH_EDIT_MODE:
      return {
        ...state,
        filterRules: action.payload.rules,
        filteredFeatures: action.payload.filteredFeatures,
      };

    case types.UPDATE_MAP_SETTINGS:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          map_settings: { ...action.payload },
        },
      };

    case types.PUBLISH_PROJECT:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          status: action.payload.newStatus,
          rot: action.payload.readOnlyToken,
        },
      };

    case types.SELECT_DEFAULT_BOOKMARK:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          publish_settings: {
            ...state.currentProject.publish_settings,
            bookmark: action.payload,
          },
        },
      };

    case types.SELECT_VIEWER:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          publish_settings: {
            ...state.currentProject.publish_settings,
            viewer: action.payload,
          },
        },
      };

    case types.SHOW_NAME:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          publish_settings: {
            ...state.currentProject.publish_settings,
            display: {
              ...state.currentProject.publish_settings.display,
              name: action.payload,
            },
          },
        },
      };

    case types.SHOW_DESCRIPTION:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          publish_settings: {
            ...state.currentProject.publish_settings,
            display: {
              ...state.currentProject.publish_settings.display,
              description: action.payload,
            },
          },
        },
      };

    case types.SHOW_LEGEND:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          publish_settings: {
            ...state.currentProject.publish_settings,
            display: {
              ...state.currentProject.publish_settings.display,
              legend: action.payload,
            },
          },
        },
      };

    case types.ENABLE_CARDS:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          publish_settings: {
            ...state.currentProject.publish_settings,
            display: {
              ...state.currentProject.publish_settings.display,
              cards: action.payload,
            },
          },
        },
      };

    case types.SELECT_DEFAULT_LICENSE:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          publish_settings: {
            ...state.currentProject.publish_settings,
            license: action.payload,
          },
        },
      };

    case types.CHANGE_BASE_VIEW:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          base: {
            ...state.currentProject.base,
            template: action.payload,
            theme: 'dark',
          },
        },
      };

    case types.CHANGE_BASE_TILELAYER:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          base: {
            ...state.currentProject.base,
            tileLayer: action.payload,
            // theme: 'dark',
          },
        },
      };

    case types.CHANGE_BASE_THEME:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          base: {
            ...state.currentProject.base,
            theme: action.payload,
            template: null,
          },
        },
      };

    case types.CHANGE_SHOW_LABELS:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          base: {
            ...state.currentProject.base,
            showLabels: action.payload,
          },
        },
      };

    case types.ADD_BOOKMARK: {
      const currentMapSetup = getMapSettingsFromURL();
      const currentBookmarks = state.currentProject.bookmarks || [];

      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          bookmarks: [
            ...currentBookmarks,
            {
              id: `bkmrk_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
              label: action.payload,
              center: currentMapSetup.center,
              zoom: currentMapSetup.zoom,
            },
          ],
        },
      };
    }

    case types.CLICK_BOOKMARK:
      return {
        ...state,
        clickBookmark: !state.clickBookmark,
      };

    case types.DELETE_BOOKMARK: {
      let publishSettings = { ...state.currentProject.publish_settings };

      if (
        publishSettings &&
        publishSettings.bookmark &&
        publishSettings.bookmark.id === action.payload
      ) {
        publishSettings = _.omit(publishSettings, 'bookmark');
      }

      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          bookmarks: _.filter(state.currentProject.bookmarks, b => {
            return b.id !== action.payload;
          }),
          publish_settings: _.isEmpty(publishSettings) ? null : publishSettings,
        },
      };
    }

    case types.SET_CURRENT_FEATURE:
      return {
        ...state,
        currentFeature: action.payload.feature
          ? { ...action.payload.feature }
          : null,
        currentLayer: action.payload.layer
          ? action.payload.layer
          : state.currentLayer,
      };

    case types.SET_CURRENT_FEATURES:
      return {
        ...state,
        currentFeatures: action.payload.features
          ? [...action.payload.features]
          : [],
      };

    case types.UPDATE_CURRENT_FEATURE:
      return {
        ...state,
        updatingFeature: undefined,
        currentFeature: {
          ...state.currentFeature,
          properties: {
            ...state.currentFeature.properties,
            [action.payload.key]: action.payload.value,
          },
        },
        currentFeatures: state.currentFeatures.map(f => {
          const updatedFeature = { ...f };

          if (f.id === state.currentFeature.id) {
            updatedFeature.properties[action.payload.key] =
              action.payload.value;
          }

          return updatedFeature;
        }),
        updatedTime: Date.now(),
      };

    case types.UPDATING_FEATURE:
      return {
        ...state,
        updatingFeature: action.payload,
      };

    case types.TOGGLE_CARD_VISIBILITY:
      return toggleCardVisibility(state, action.payload);

    case types.TOGGLE_TEXT_STYLE:
      return textStyleToggle(state, action.payload);

    case types.TOGGLE_ICON_STYLE:
      return iconStyleToggle(state, action.payload);

    case types.ADD_FEATURE_PROP:
      return addFeatureProp(state, action.payload);

    case types.DELETE_FEATURE_PROP:
      return deleteFeatureProp(state, action.payload);

    case types.SET_MAP_MODE:
      return {
        ...state,
        mode: action.payload,
      };

    case types.ADD_STYLE_RULE:
      return addStyleRule(state, action.payload);

    case types.DELETE_STYLE_RULE:
      return deleteStyleRule(state, action.payload);

    case types.EDIT_STYLE_RULE:
      return editStyleRule(state, action.payload);

    case types.SORT_STYLE_RULES:
      return sortStyleRules(state, action.payload);

    case types.SORT_GEOMETRY:
      return sortGeometry(state, action.payload);

    case types.OPEN_STYLE_GEOMETRY_PANEL:
      return {
        ...state,
        currentStyleGeoPanel:
          state.currentStyleGeoPanel === action.payload.geometry
            ? undefined
            : action.payload.geometry,
        currentStyleRulePanel: undefined,
      };

    case types.OPEN_STYLE_RULE_PANEL:
      return {
        ...state,
        currentStyleRulePanel:
          state.currentStyleRulePanel === action.payload.ruleId
            ? undefined
            : action.payload.ruleId,
      };

    case types.UPDATE_DEFAULT_STYLE_LABEL:
      return updateDefaultStyleLabel(state, action.payload);

    case types.UPDATE_OPEN_SPACE:
      return updateOpenSpace(state, action.payload);

    case types.DELETE_TAG:
      return updateTagList(state, action.payload);

    case types.SELECT_PUBLISH_ID:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          publish_settings: {
            ...state.currentProject.publish_settings,
            publish_id: action.payload.cid,
          },
        },
      };

    case types.UPDATE_GIS_FEATURE:
      return updateLayerGis(state, action.payload);

    default:
      return state;
  }
};
