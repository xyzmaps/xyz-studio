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

import darkScene from '../../../../../config/tangram/dark.yaml';
import lightScene from '../../../../../config/tangram/light.yaml';
import linesDarkScene from '../../../../../config/tangram/lines_dark.yaml';
import linesWhiteScene from '../../../../../config/tangram/lines_white.yaml';
import miamiDayScene from '../../../../../config/tangram/miamiDay.yaml';
import springBrightScene from '../../../../../config/tangram/springBright.yaml';
import springSoftScene from '../../../../../config/tangram/spring-soft.yaml';
import satelliteScene from '../../../../../config/tangram/satellite.yaml';

// Basemap options
export const defaultBasemap = 'refill';

// this gets merged into basemaps to change 'mapzen' vector tile source definitions to their XYZ HERE equivalent
// TODO: this does not yet override terrain/normal tiles for hillshading
const xyzTilezenSourceOverride = {
  sources: {
    mapzen: {
      url: `${process.env.REACT_APP_API_HOSTNAME_XYZ}/tiles/osmbase/512/all/{z}/{x}/{y}.mvt`,
      url_params: {
        access_token: 'global.xyz_access_token',
      },
    },
  },
};

// basemap scene definitions
// each is a function that takes an options object, and returns a Tangram scene object
export const basemaps = {
  // No basemap
  none: () => {
    return {};
  },

  // XYZ basemaps
  dots: () => {
    return {
      import: 'https://sensescape.github.io/xyz-dots/scene.yaml',
      ...xyzTilezenSourceOverride,
    };
  },
  pixel: () => {
    return {
      import: 'https://sensescape.github.io/xyz-pixel/scene.yaml',
      ...xyzTilezenSourceOverride,
    };
  },

  // XYZ basemap themes
  dark: () => {
    return {
      import: darkScene,
      ...xyzTilezenSourceOverride,
    };
  },
  light: () => {
    return {
      import: lightScene,
      ...xyzTilezenSourceOverride,
    };
  },
  LineDark: () => {
    return {
      import: linesDarkScene,
      ...xyzTilezenSourceOverride,
    };
  },
  LineWhite: () => {
    return {
      import: linesWhiteScene,
      ...xyzTilezenSourceOverride,
    };
  },
  miamiDay: () => {
    return {
      import: miamiDayScene,
      ...xyzTilezenSourceOverride,
    };
  },
  springBright: () => {
    return {
      import: springBrightScene,
      ...xyzTilezenSourceOverride,
    };
  },
  springSoft: () => {
    return {
      import: springSoftScene,
      ...xyzTilezenSourceOverride,
    };
  },

  // Mapzen basemaps
  refill: ({ labelsOnTop }) => {
    const basemap = {
      import: [
        'https://www.nextzen.org/carto/refill-style/refill-style.zip',
        'https://www.nextzen.org/carto/refill-style/themes/label-4.zip',
        'https://www.nextzen.org/carto/refill-style/themes/terrain-shading-dark.zip',
        'https://www.nextzen.org/carto/refill-style/themes/no-texture.zip',
      ],
      ...xyzTilezenSourceOverride,
    };
    if (labelsOnTop) {
      basemap.styles = {
        // temp override to put basemap labels on top
        'text-blend-order': {
          blend_order: 100,
        },
        mapzen_icon_library: {
          blend_order: 100,
        },
      };
    }
    return basemap;
  },
  'refill-dark': ({ labelsOnTop }) => {
    const basemap = {
      import: [
        'https://www.nextzen.org/carto/refill-style/refill-style.zip',
        'https://www.nextzen.org/carto/refill-style/themes/color-gray-gold.zip',
        'https://www.nextzen.org/carto/refill-style/themes/label-4.zip',
        // 'https://www.nextzen.org/carto/refill-style/themes/terrain-shading-dark.zip',
      ],
      ...xyzTilezenSourceOverride,
    };
    if (labelsOnTop) {
      basemap.styles = {
        // temp override to put basemap labels on top
        'text-blend-order': {
          blend_order: 100,
        },
        mapzen_icon_library: {
          blend_order: 100,
        },
      };
    }
    return basemap;
  },
  walkabout: ({ labelsOnTop }) => {
    const basemap = {
      import: [
        'https://www.nextzen.org/carto/walkabout-style/walkabout-style.zip',
        'https://www.nextzen.org/carto/walkabout-style/themes/walkabout-road-shields-usa.zip',
        'https://www.nextzen.org/carto/walkabout-style/themes/walkabout-road-shields-international.zip',
      ],
      ...xyzTilezenSourceOverride,
    };
    if (labelsOnTop) {
      basemap.styles = {
        // temp override to put basemap labels on top
        'text-blend-order': {
          blend_order: 100,
        },
        mapzen_icon_library: {
          blend_order: 100,
        },
      };
    }
    return basemap;
  },
  satellite: ({ labelsOnTop }) => {
    const basemap = {
      import: satelliteScene,
    };
    if (labelsOnTop) {
      basemap.styles = {
        // temp override to put basemap labels on top
        'text-blend-order': {
          blend_order: 100,
        },
        mapzen_icon_library: {
          blend_order: 100,
        },
      };
    }
    return basemap;
  },
};
