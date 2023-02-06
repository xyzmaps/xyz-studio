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

import { open } from 'shapefile';
import { toObject } from 'csvjson';

const latArray = [
  'y',
  'ycoord',
  'ycoordinate',
  'coordy',
  'coordinatey',
  'latitude',
  'lat',
];

const lonArray = [
  'x',
  'xcoord',
  'xcoordinate',
  'coordx',
  'coordinatex',
  'longitude',
  'lon',
  'lng',
  'long',
  'longitud',
];

const altArray = [
  'z',
  'zcoord',
  'zcoordinate',
  'coordz',
  'coordinatez',
  'altitude',
  'alt',
];

function isLat(k) {
  return latArray.find(element => element === k.toLowerCase());
}

function isAlt(k) {
  return altArray.find(element => element === k.toLowerCase());
}

function isLon(k) {
  return lonArray.find(element => element === k.toLowerCase());
}

function toPoint(latitude, longitude, altitude) {
  const coordinates = altitude
    ? [longitude, latitude, altitude]
    : [longitude, latitude];
  return {
    type: 'Point',
    coordinates,
  };
}

function toGeometry(lat, lon, alt) {
  try {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const altitude = alt ? parseFloat(alt) : null;
    return toPoint(latitude, longitude, altitude);
  } catch (e) {
    return e;
  }
}

function toGeoJsonFeature(object, latField, lonField, altField) {
  const props = {};
  let lat = null;
  let lon = null;
  let alt = null;
  for (const k in object) {
    if (lonField === k.toLowerCase()) {
      lon = object[lonField];
    } else if (latField === k.toLowerCase()) {
      lat = object[latField];
    } else if (altField === k.toLowerCase()) {
      alt = object[altField];
    } else if (!latField && isLat(k)) {
      lat = object[k];
    } else if (!lonField && isLon(k)) {
      lon = object[k];
    } else if (!altField && isAlt(k)) {
      alt = object[k];
    } else {
      props[k] = object[k];
    }
  }
  if (!lat) {
    console.info('Could not identify latitude');
    return null;
  }
  if (!lon) {
    console.info('Could not identify longitude');
    return null;
  }
  return {
    type: 'Feature',
    geometry: toGeometry(lat, lon, alt),
    properties: props,
  };
}

export function readShapeFile(path, callBack) {
  // var shapefile = require("shapefile");
  const fc = { type: 'FeatureCollection', features: [] };
  return open(path, undefined, { encoding: 'UTF-8' })
    .then(source =>
      source.read().then(function log(result) {
        if (result.done) {
          callBack(fc);
          Promise.resolve(fc);
          return false;
        }
        fc.features.push(result.value);
        return source.read().then(log);
      })
    )
    .catch(error => {
      console.info(error.stack);
      console.info(`error occured - ${error}`);
    });
}

export function csvToJson(file_data) {
  // var csvjson = require('csvjson');
  const options = {
    delimiter: ',', // optional
    quote: '"', // optional
  };
  const result = toObject(file_data, options);
  return result;
}

export function transform(result, latField, lonField, altField) {
  const objects = [];
  result.forEach(value => {
    const ggson = toGeoJsonFeature(value, latField, lonField, altField);
    if (ggson) objects.push(ggson);
  });
  return objects;
}
