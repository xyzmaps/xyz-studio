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
import basicLayerStyle from './basicLayerStyle';

export default {
  newProject: {
    layers: [],
    bookmarks: [],
    status: 'UNPUBLISHED',
    base: {
      tileLayer: 'here',
      theme: 'dark',
      showLabels: true,
    },
    meta: {
      name: '',
      description: '',
    },
    map_settings: {
      zoom: null,
      center: null,
    },
    publish_settings: {
      bookmark: null,
      license: null,
      viewer: 'here',
      display: {
        name: true,
        description: false,
        // cards : false,
        legend: true,
      },
    },
  },
  newLayer: (projectId, space) => {
    const id = `${projectId.substr(-5)}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    return {
      id,
      meta: {
        title: space ? space.title : 'New empty layer',
      },
      visible: true,
      geospace: space ? { id: space.id, properties: space.cards } : null,
      virtualSpace: space ? space.virtualSpace : false,
      cards: space ? [_.take(space.cards, 2), _.drop(space.cards, 2)] : [],
      hiddenCards: [],
      bbox: space ? space.bbox : [],
      geometries: space ? space.geometries : [],
      geometriesFromStats: false,
      geometriesCount: space ? space.geometriesCount : {},
      styleGroups: basicLayerStyle(),
      clustering: {
        hexbin: false,
        theme: 'rgba(227,74,51,1)',
        label: false,
        featureCount: true,
        property: '',
        shape: 'hexagon',
      },
    };
  },
};
