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

import { urlToProperty } from 'query-string-params';
import _ from 'lodash';
import userAgent from 'express-useragent';

import turfLength from '@turf/length';
import turfArea from '@turf/area';
import styleGroupsConfig from '../constants/styleGroupsConfig';

export const isTouch = (() =>
  'ontouchstart' in window ||
  navigator.MaxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0)();

export const isMobile = () =>
  userAgent.parse(navigator.userAgent).isMobile && window.innerWidth < 1024;

export const isViewer = () => window.location.pathname.includes('viewer');

export const isLargeDesktop = () =>
  !userAgent.parse(navigator.userAgent).isMobile && window.innerWidth > 1280;

export const calculateTotalDataTransfer = total => {
  const t = total.split(' ');
  return Number(t[0]) * 1024;
};

export const calculateTotalStorage = total => {
  const t = total.split(' ');
  return Number(t[0]) * 30 * 24 * 1024;
};

export const getMapSettingsFromURL = location => {
  const { c, z } = urlToProperty(location || window.location.search);

  if (c) {
    return {
      center: c[0].split(';'),
      zoom: z[0],
    };
  }

  return false;
};

export const getTokenFromURL = location => {
  const { token } = urlToProperty(location || window.location.search);

  if (token) {
    return token[0];
  }
  return false;
};

export const getToken = () => {
  return localStorage.getItem('at2') || localStorage.getItem('at');
};

export const setToken = token => localStorage.setItem('at', token);

export const clearToken = () => {
  localStorage.removeItem('at');
  localStorage.removeItem('at2');
};

export const setTokenLink = pathname => {
  const token = getTokenFromURL();

  if (token) {
    return { pathname, search: `?token=${token}` };
  }
  return { pathname };
};

export const getSpaceProperties = (featureResult, statsResults) => {
  const stats = statsResults.data;
  const cards = _.map(stats.properties.value, 'key');
  let failedFeatures = 0;
  const geometries = _.uniq(stats.geometryTypes.value);
  const bbox = stats.bbox.value;
  const geometriesCount = {
    Polygon: 0,
    MultiPolygon: 0,
    LineString: 0,
    MultiLineString: 0,
    Point: 0,
    MultiPoint: 0,
  };
  const { features } = featureResult.data;
  const geo = [];
  features.forEach(f => {
    if (f.geometry) {
      geo.push(f.geometry.type);
    } else {
      failedFeatures += 1;
      console.info('Failed feature:', f);
    }
  });
  geo.forEach(type => {
    geometriesCount[type] = (geometriesCount[type] || 0) + 1;
  });

  return {
    cards,
    geometriesCount,
    geometries,
    bbox,
    failedFeatures,
  };
};

export const getLayerTitle = title => {
  const t = title.replace(/\.[^/.]+$/, '');
  return t.charAt(0).toUpperCase() + t.slice(1);
};

export const filterStringProps = props => {
  return _.filter(props, p => typeof p !== 'object');
};

export const getStyleValue = (
  styleGroups,
  geometry,
  styleProp,
  styleType,
  ruleId
) => {
  const ending = ruleId ? `_${ruleId}` : '';
  const style = _.find(
    styleGroups[`${styleGroupsConfig.geometryToLayerStyle(geometry)}${ending}`],
    ({ type }) => {
      if (styleType) return type === styleType;
      return type === geometry;
    }
  );

  if (style) {
    return styleProp ? style[styleProp] : style;
  }

  return false;
};

export const getAlphaFromRgba = rgba =>
  rgba ? rgba.replace(/^.*,(.+)\)/, '$1') : 1;

export const getObjectSize = obj => {
  const j = JSON.stringify(obj);
  const m = encodeURIComponent(j).match(/%[89ABab]/g);

  return {
    kb: Math.round((j.length + (m ? m.length : 0)) / 1024),
    mb: ((j.length + (m ? m.length : 0)) / (1024 * 1024)).toFixed(1),
  };
};

export const sortAlphaNum = (a = '', b = '') => {
  return a.toString().localeCompare(b.toString(), undefined, { numeric: true });
};

export const getFileName = fileName => {
  return fileName.substr(0, fileName.lastIndexOf('.')) || fileName;
};

export const formatFileName = fileName => {
  return getFileName(fileName)
    .toLowerCase()
    .replace(/\s+/g, '_');
};

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export const parseStyleRule = (prop, op, v) => {
  const stz = vt =>
    vt &&
    vt
      .toString()
      .toLowerCase()
      .trim();
  if (prop === undefined) return false;
  switch (op) {
    case 'eq':
      return stz(prop) === stz(v);
    case 'neq':
      return stz(prop) !== stz(v);
    case 'gt':
      return parseFloat(stz(prop)) > parseFloat(stz(v));
    case 'gte':
      return parseFloat(stz(prop)) >= parseFloat(stz(v));
    case 'lt':
      return parseFloat(stz(prop)) < parseFloat(stz(v));
    case 'lte':
      return parseFloat(stz(prop)) <= parseFloat(stz(v));
    case 'em':
      return !stz(prop);
    case 'nem':
      return !!stz(prop);
    default:
      return stz(prop) === stz(v);
  }
};

export const getNodeRect = node => {
  return _.pick(node.getBoundingClientRect(), [
    'top',
    'right',
    'bottom',
    'left',
    'width',
    'height',
  ]);
};

export const inView = ({ top, right, bottom, left, w, h, threshold = 0 }) => {
  return (
    top >= 0 + threshold &&
    left >= 0 + threshold &&
    bottom <= h - threshold &&
    right <= w - threshold
  );
};

export const isBody = node =>
  node === document.querySelector('body') ||
  node === document.querySelector('html');
export const isHoriz = pos => /(left|right)/.test(pos);
export const isOutsideX = (val, windowWidth) => val > windowWidth;
export const isOutsideY = (val, windowHeight) => val > windowHeight;
export const safe = sum => (sum < 0 ? 0 : sum);

export const bestPositionOf = positions => {
  return Object.keys(positions)
    .map(p => ({
      position: p,
      value: positions[p],
    }))
    .sort((a, b) => b.value - a.value)
    .map(p => p.position);
};

/* eslint-disable */
export const getFormatedMSLabel = tag => {
  let str = '';

  switch (tag.matchLevel) {
    case 'postalCode':
      str += '';

      if (tag.address.PostalCode) {
        str += tag.address.PostalCode;
      } else if (tag.address.postalCode) {
        str += tag.address.postalCode;
      }

    case 'district':
      str +=
        str !== '' && (tag.address.PostalCode || tag.address.postalCode)
          ? ', '
          : '';

      str += '';

      if (tag.address.District) {
        str += tag.address.District;
      } else if (tag.address.district) {
        str += tag.address.district;
      }

    case 'city':
      str +=
        str !== '' && (tag.address.District || tag.address.district)
          ? ', '
          : '';

      str += '';

      if (tag.address.City) {
        str += tag.address.City;
      } else if (tag.address.city) {
        str += tag.address.city;
      }

    case 'county':
      str += str !== '' && (tag.address.City || tag.address.city) ? ', ' : '';

      str += '';

      if (tag.address.County) {
        str += tag.address.County;
      } else if (tag.address.county) {
        str += tag.address.county;
      }

    case 'state':
      str +=
        str !== '' && (tag.address.County || tag.address.county) ? ', ' : '';

      str += '';

      if (tag.address.State) {
        str += tag.address.State;
      } else if (tag.address.state) {
        str += tag.address.state;
      }

    case 'country':
      str += str !== '' && (tag.address.State || tag.address.state) ? ', ' : '';

      str += '';

      if (tag.address.Country) {
        str += tag.address.Country;
      } else if (tag.address.country) {
        str += tag.address.country;
      }

      break;

    default:
      str = tag.label;
  }

  return str;
};
/* eslint-enable */

/* eslint-disable */
export const generateSpaceTags = tagArr => {
  const spaceTags = [];
  tagArr.map(tag => {
    let str = '';

    switch (tag.matchLevel) {
      case 'postalCode':
        str += tag.address.PostalCode
          ? `postalcode@${tag.address.PostalCode.replace(
              / /g,
              '_'
            ).toLowerCase()}`
          : '';

      case 'district':
        str += str !== '' && tag.address.PostalCode ? '+' : '';
        str += tag.address.District
          ? `district@${tag.address.District.replace(/ /g, '_').toLowerCase()}`
          : '';

      case 'city':
        str += str !== '' && tag.address.District ? '+' : '';
        str += tag.address.City
          ? `city@${tag.address.City.replace(/ /g, '_').toLowerCase()}`
          : '';

      case 'county':
        str += str !== '' && tag.address.City ? '+' : '';
        str += tag.address.County
          ? `county@${tag.address.County.replace(/ /g, '_').toLowerCase()}`
          : '';

      case 'state':
        str += str !== '' && tag.address.County ? '+' : '';
        str += tag.address.State
          ? `state@${tag.address.State.replace(/ /g, '_').toLowerCase()}`
          : '';

      case 'country':
        str += str !== '' && tag.address.State ? '+' : '';
        str += tag.address.Country
          ? `country@${tag.address.Country.replace(/ /g, '_').toLowerCase()}`
          : '';

        break;

      default:
        str += '';
    }

    spaceTags.push(str);

    return true;
  });

  return spaceTags;
};
/* eslint-enable */

export const generateBBox = tag => {
  return [
    tag.mapView.TopLeft.Longitude,
    tag.mapView.TopLeft.Latitude,
    tag.mapView.BottomRight.Longitude,
    tag.mapView.BottomRight.Latitude,
  ];
};

export const getCentroid = tag => {
  return [
    (tag.mapView.TopLeft.Longitude + tag.mapView.BottomRight.Longitude) / 2,
    (tag.mapView.TopLeft.Latitude + tag.mapView.BottomRight.Latitude) / 2,
  ];
};

export const trunc = str => {
  const n = 18;
  return str.length > n ? `${str.substr(0, n - 1)}...` : str;
};

export const populateLength = (f, opts, useMetrics) => {
  const feature = {
    geometry: { ...f.geometry },
    type: f.type,
    properties: {},
  };
  const length = turfLength(feature, { units: 'meters' });
  if (useMetrics) {
    switch (opts.metrics) {
      case 'Km.':
        feature.properties.length_km = parseFloat((length / 1000).toFixed(2));
        break;
      case 'M.':
        feature.properties.length_m = length;
        break;
      case 'Mi.':
        feature.properties.length_miles = parseFloat(
          (length * 0.000621371).toFixed(2)
        );
        break;
      default:
        break;
    }
  } else {
    feature.properties.length_m = length;
    feature.properties.length_km = parseFloat((length / 1000).toFixed(2));
    feature.properties.length_miles = parseFloat(
      (length * 0.000621371).toFixed(2)
    );
  }
  return feature;
};

export const populateArea = (f, opts, useMetrics) => {
  const feature = {
    geometry: { ...f.geometry },
    type: f.type,
    properties: {},
  };
  const area = turfArea(feature);
  if (useMetrics) {
    switch (opts.metrics) {
      case 'Sq.Km.':
        feature.properties.area_sqkm = parseFloat((area / 1000000).toFixed(2));
        break;
      case 'Sq.M.':
        feature.properties.area_sqm = area;
        break;
      case 'Sq.Mi.':
        feature.properties.area_sqmiles = parseFloat(
          (area * 0.00000038610215855).toFixed(2)
        );
        break;
      default:
        break;
    }
  } else {
    feature.properties.area_sqm = area;
    feature.properties.area_sqkm = parseFloat((area / 1000000).toFixed(2));
    feature.properties.area_sqmiles = parseFloat(
      (area * 0.00000038610215855).toFixed(2)
    );
  }
  return feature;
};
