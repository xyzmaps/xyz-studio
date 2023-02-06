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

// import {getToken} from '../helpers';
const apiEnviroment = process.env.REACT_APP_ENVIRONMENT;
const apiHostnamePlacesEnviroment = process.env.REACT_APP_API_HOSTNAME_PLACES;
export const apiHostnameXyzEnviroment = process.env.REACT_APP_API_HOSTNAME_XYZ;
const apiXYZHealth = process.env.REACT_APP_API_HEALTH;

// const apiURLEnviroment = process.env.REACT_APP_ENVIRONMENT ? `${process.env.REACT_APP_ENVIRONMENT}.` : '';

export const mapConfig = {
  tileUrl: {
    here: {
      url: `${apiHostnameXyzEnviroment}/tiles/herebase.02/{z}/{x}/{y}/omv`,
      label: 'HERE',
    },
    osm: {
      url: `${apiHostnameXyzEnviroment}/tiles/osmbase/512/all/{Z}/{X}/{Y}.mvt`,
      label: 'Tilezen',
    },
  },
  template: {
    satellite: {
      url: `https://{SUBDOMAIN_INT_1_4}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{Z}/{X}/{Y}/256/png8?app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}`,
      label: 'Satellite',
    },
  },
  defaultCenter: [42.34238568708261, 9.222408935546923],
  defaultZoomlevel: 5,
  defaultLimit: 100000,
  maxTableFeaturesFromMap: 1000,
  maxTableFeaturesPerRequest: 1000,
  maxDownloadableFeatures: 100000, // change the number to test download limit
};

export const apiConfig = {
  enviroment: apiEnviroment,
  spaces: `${apiHostnameXyzEnviroment}/hub/spaces`,
  projects: `${apiHostnameXyzEnviroment}/project-api/projects`,
  places: `${apiHostnamePlacesEnviroment}/places/v1/autosuggest`,
  screenshot: `${apiHostnameXyzEnviroment}/screenshot-api/screenshots`,
  token: `${apiHostnameXyzEnviroment}/token-api/tokens`,
  viewer: process.env.REACT_APP_APP_VIEWER,
  gatekeeper: `${apiHostnameXyzEnviroment}/account-api/accounts`,
  hub: `${apiHostnameXyzEnviroment}/hub/`,
  apiHealthUrl: `${apiXYZHealth}`,
  tileUrl: {
    osm: `${apiHostnameXyzEnviroment}/tiles/osmbase/512/all/{Z}/{X}/{Y}.mvt?access_token=`,
    here: `${apiHostnameXyzEnviroment}/tiles/herebase.02/{z}/{x}/{y}/omv?access_token=`,
  },
  template: {
    satellite: {
      url: `https://{SUBDOMAIN_INT_1_4}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{Z}/{X}/{Y}/256/png8?app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}`,
      label: 'Satellite',
    },
  },
};

export const credentials = {
  APP_ID: process.env.REACT_APP_APP_ID,
  APP_CODE: process.env.REACT_APP_APP_CODE,
  // access_token : process.env.REACT_APP_ACCESS_TOKEN
};

export const tokenApiUrl = `${apiHostnameXyzEnviroment}/token-api`;
export const msbfptOpenSpaceId = process.env.REACT_APP_MSBFPT_SPACE_ID;

export const geoCoderAPI = {
  suggestion: `${process.env.REACT_APP_API_GEOCODER_SUGGESTION}/suggest.json`,
  autocomplete: `${process.env.REACT_APP_API_GEOCODER_CORE}/geocode.json`,
  reverse: `${process.env.REACT_APP_API_REVERSE_GEOCODER_CORE}/reversegeocode.json`,
};

export const links = {
  cli: 'https://www.here.xyz/cli/',
};

export const gisPropertyTexts = {
  length_m: 'Line Length (Meters)',
  length_km: 'Line Length (Kilometers)',
  length_miles: 'Line Length (Miles)',
  area_sqm: 'Polygon Area (Square Meters)',
  area_sqkm: 'Polygon Area (Square Kilometers)',
  area_sqmiles: 'Polygon Area (Square Miles)',
};
