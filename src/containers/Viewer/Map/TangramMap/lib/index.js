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

/* eslint-disable */
import btoaNode from 'btoa'; // provides a `btoa()` implementation for node, for encoding strings as base64 (used for creating SVGs)
import _ from 'lodash'; // for recursively merging Tangram scene components together
import parseCSSFont from 'css-font-parser'; // for getting font details from XYZ Studio text styles
import { basemaps, defaultBasemap } from './basemaps'; // Tangram basemap definitions

// choose browser or node implementation of btoa
const btoa = (typeof window !== 'undefined' && window.btoa) || btoaNode;

export default function xyzToTangram(
  xyzStyle,
  geoMap,
  {
    basemap = defaultBasemap, // basemap name
    setStartPosition = true, // create a Tangram camera to set the scene position on load
    collide = true, // enable Tangram label collision
    labelsOnTop = true, // put basemap labels on top of other overlays
    env = 'https://xyz.api.here.com', // XYZ space env url
  } = {}
) {
  let scene = {}; // Tangram scene object to return
  const legends = []; // data needed to render XYZ Studio-style legends
  const options = {
    // options for the scene and basemap
    collide: Boolean(collide),
    labelsOnTop: Boolean(labelsOnTop),
  };

  // Add Tangram scene elements so that insertion order matches Tangram idioms
  // (camera first, then sources, styles before layers, etc.)
  if (setStartPosition) {
    scene.cameras = makeCamera(xyzStyle);
  }
  scene.sources = makeSources(xyzStyle, env);
  scene.styles = makeStyles();
  scene.layers = makeLayers(xyzStyle, geoMap, legends, options);
  scene.meta = makeMeta(xyzStyle);
  scene.global = makeGlobals(xyzStyle);

  let basemapGenerator;

  // Add basemap
  if (xyzStyle.base.template) {
    basemapGenerator = basemaps[xyzStyle.base.template] || basemaps[basemap];
  } else {
    basemapGenerator = basemaps[xyzStyle.base.theme] || basemaps[basemap];
  }
  const basemapScene = (basemapGenerator && basemapGenerator(options)) || {};

  // Create Tangram as a Leaflet layer
  scene = _.merge({}, basemapScene, scene);

  return { scene, legends };
}

// add subset of XYZ Studio JSON as scene metadata
// not used by Tangram directly, but useful for cards functionality, and general reference/debugging
function makeMeta(xyz) {
  const meta = {};
  meta.xyz = {
    // put under XYZ-specific namespace
    id: xyz.id,
    meta: xyz.meta,
    bookmarks: xyz.bookmarks,
    publish_settings: xyz.publish_settings,
    layers: xyz.layers.map(layer => {
      return {
        id: layer.id,
        meta: layer.meta,
        geospace: layer.geospace,
        cards: layer.cards.filter(c => c.length > 0),
      };
    }),
  };
  return meta;
}

// create a Tangram camera, which will set the map position when the scene is loaded
function makeCamera(xyz) {
  const pos = xyz.map_settings;
  if (pos && pos.center && pos.center.length === 2 && pos.zoom) {
    return {
      xyz: {
        position: [pos.center[1], pos.center[0], pos.zoom].map(Number),
        active: true,
      },
    };
  }
}

// helper function to construct a Tangram layer name for an XYZ layer
function getXYZLayerName(xyzLayer, index) {
  return (xyzLayer.meta && xyzLayer.meta.title) || `layer-${index}`;
}

// create data Tangram sources
function makeSources(xyz, env) {
  // https://xyz.api.here.com/hub/spaces/{space}/tile/web/{z}_{x}_{y}
  return xyz.layers.reduce((tgSources, xyzLayer, index) => {
    const spaceId = xyzLayer.geospace.id;
    const name = getXYZLayerName(xyzLayer, index);
    const access_token = xyz.rot;

    tgSources[name] = {
      type: 'GeoJSON',
      // url: `${env}/tiles/osmbase/512/all/{Z}/{X}/{Y}.mvt`,
      url: `${env}/hub/spaces/${spaceId}/tile/web/{z}_{x}_{y}`,
      // url: `${env}/hub/spaces/${spaceId}/tile/quadkey/{q}`,
      url_params: {
        access_token,
        clip: true,
        clientId: 'viewer',
      },
      // max_zoom: 16, // using explicit zoom list below for now instead
      zooms: [0, 2, 4, 6, 8, 10, 12, 14, 16], // load every other zoom
    };

    // add comma-delimited list of tags if available
    if (xyzLayer.meta && Array.isArray(xyzLayer.meta.spaceTags)) {
      tgSources[name].url_params.tags = xyzLayer.meta.spaceTags.join(',');
    }

    // add layer bounding box if available (sometimes `bbox` property is an empty array)
    // TODO: ignoring bounds for now, because bbox reported by Studio is sometimes incorrect
    // if (Array.isArray(xyzLayer.bbox) && xyzLayer.bbox.length === 4) {
    //     tgSources[name].bounds = xyzLayer.bbox;
    // }

    return tgSources;
  }, {});
}

// create Tangram rendering styles
function makeStyles() {
  // One style per geometry type, with overlay blending
  return ['polygons', 'lines', 'points', 'text'].reduce(
    (tgStyles, geomType) => {
      tgStyles[`XYZ_${geomType}`] = {
        base: geomType,
        blend: 'overlay',
      };
      return tgStyles;
    },
    {}
  );
}

// create Tangram layers
function makeLayers(xyz, geoMap, legends, tgOptions) {
  // TODO: more general handling of visible flag
  return xyz.layers
    .filter(x => {
      return x.visible && x.clustering && !x.clustering.hexbin;
    })
    .reduce((tgLayers, xyzLayer, xyzLayerIndex) => {
      // Make one enclosing Tangram layer for the entire XYZ layer,
      // and then one sub-layer for each geometry type present in the XYZ layer
      const xyzLayerName = getXYZLayerName(xyzLayer, xyzLayerIndex);
      tgLayers[xyzLayerName] = {
        data: {
          source: xyzLayerName,
        },
      };

      console.log(xyzLayer);

      // The geometry types in this XYZ layer (Point, Line, Polygon)
      const geomTypes = []; // `geometries` field is unreliable, doesn't always match features present in layer
      const geomCounts = geoMap[xyzLayer.geospace.id]; // use `geometriesCount` instead
      if (geomCounts) {
        if (geomCounts.Point || geomCounts.MultiPoint) geomTypes.push('Point');
        if (geomCounts.LineString || geomCounts.MultiLineString)
          geomTypes.push('Line');
        if (geomCounts.Polygon || geomCounts.MultiPolygon)
          geomTypes.push('Polygon');
      } else {
        // sometimes `geometriesCount` is also missing, check for all geometry types in this case
        geomTypes.push('Point', 'Line', 'Polygon');
      }

      console.log(geomTypes);

      // For each geometry type in this XYZ layer, create Tangram sub-layers
      geomTypes.forEach(geomType => {
        makeGeometryTypeLayer({
          xyz,
          xyzLayer,
          xyzLayerIndex,
          geomType,
          tgLayers,
          tgOptions,
          legends,
        });
      });

      return tgLayers;
    }, {});
}

// create Tangram sub-layers for all style groups of a given geometry type
function makeGeometryTypeLayer({
  xyz,
  xyzLayer,
  xyzLayerIndex,
  geomType,
  tgLayers,
  tgOptions,
  legends,
}) {
  // Tangram sub-layer for all features with this geometry type
  const xyzLayerName = getXYZLayerName(xyzLayer, xyzLayerIndex);
  const tgGeomLayer = (tgLayers[xyzLayerName][geomType] = {
    filter: {
      $geometry: geomType.toLowerCase(),
    },
  });

  // Make further Tangram sub-layers, one per XYZ layer style group
  const styleGroupPrefix = `${geomType.toLowerCase()}Style`;
  const styleGroups = Object.entries(xyzLayer.styleGroups).filter(([k]) =>
    k.startsWith(styleGroupPrefix)
  );
  const styleRules =
    (xyzLayer.styleRules && xyzLayer.styleRules[geomType]) || [];

  // Process XYZ style groups
  styleGroups.forEach(([styleGroupName, styleGroup]) => {
    // Create a Tangram sub-layer for this style group
    const { legendName } = makeStyleGroupLayer({
      xyz,
      xyzLayerName,
      xyzLayerIndex,
      styleRules,
      styleGroupName,
      styleGroup,
      styleGroupPrefix,
      tgGeomLayer,
      tgOptions,
    });

    // Add legend entry
    const legendStyle = styleGroup
      .filter(s => s.opacity > 0) // exclude invisible groups
      .filter(s => !s.skip) // exclude groups that were replaced by postprocessing
      .filter(s => s.type !== 'Line' || s.strokeWidth > 0) // zero-width lines are sometimes used for "hidden" groups
      .filter(s => s.type !== 'Text')[0]; // exclude text styles from legends

    if (legendStyle) {
      legends.push({
        geomType,
        name: legendName || `Default ${geomType.toLowerCase()} style`, // use default name if necessary
        style: legendStyle,
      });
    }
  });
}

// create Tangram sub-layer for an XYZ layer style group
function makeStyleGroupLayer({
  styleRules,
  styleGroupName,
  styleGroupPrefix,
  styleGroup,
  tgGeomLayer,
  tgOptions,
  xyzLayerName,
  xyz,
  xyzLayerIndex,
}) {
  // Match XYZ style rules for this style group, and create Tangram filter
  const { tgFilter, priority, name } = matchStyleRules({
    styleRules,
    styleGroupName,
    styleGroupPrefix,
  });

  // Create Tangram sub-layer for this XYZ style group
  // These layers are mutually exclusive, and matching priority is determined by the order of styleRules
  // Style groups that don't match a rule (e.g. default / not-conditional style groups) are matched last
  const tgStyleLayer = (tgGeomLayer[styleGroupName] = {
    priority,
    exclusive: true,
  });
  if (tgFilter != null) {
    tgStyleLayer.filter = tgFilter;
  }

  // Combine XYZ icon and circle/rect shapes into a single SVG
  // This is done because XYZ treats these as independent render entities, which prevents them from
  // properly overlapping and colliding between each other. By combining them into a single SVG image,
  // we can render each group as a single Tangram point feature, with proper visual ordering and collision.
  compositeIcons(styleGroup, xyz.layers[xyzLayerIndex]);

  // Create Tangram draw groups, one for each XYZ style in this style group
  tgStyleLayer.draw = styleGroup
    .filter(s => s.opacity > 0) // this seems to be used as a general filter to disable symbolizers?
    .filter(s => !s.skip) // skip pre-processed styles (they've been composited into others)
    .reduce((draw, style, styleIndex) => {
      if (
        xyz.layers[xyzLayerIndex].geometryStyle &&
        xyz.layers[xyzLayerIndex].geometryStyle.indexOf('Point') !== -1 &&
        style.type === 'Rect'
      ) {
        style.type = 'Circle';
      }

      // Add Tangram draw groups for each XYZ style object
      if (style.type === 'Polygon') {
        // Polygon fill
        makePolygonStyleLayer({
          style,
          styleIndex,
          draw,
          xyzLayerName,
          xyz,
          xyzLayerIndex,
          tgOptions,
          styleRules,
        });
      } else if (style.type === 'Line') {
        // Line stroke
        makeLineStyleLayer({
          style,
          styleIndex,
          draw,
          xyzLayerName,
          xyz,
          xyzLayerIndex,
          tgOptions,
          styleRules,
        });
      } else if (style.type === 'Circle') {
        // Circle point
        makeCircleStyleLayer({
          style,
          styleIndex,
          draw,
          xyzLayerName,
          xyz,
          xyzLayerIndex,
          tgOptions,
          styleRules,
        });
      } else if (style.type === 'Image') {
        // Circle point
        makeImageStyleLayer({
          style,
          styleIndex,
          draw,
          xyzLayerName,
          xyz,
          xyzLayerIndex,
          tgOptions,
        });
      } else if (style.type === 'Text') {
        // Text label
        makeTextStyleLayer({
          style,
          styleIndex,
          draw,
          xyzLayerName,
          xyz,
          xyzLayerIndex,
          tgOptions,
        });
      }
      return draw;
    }, {});

  return { legendName: name };
}

// XYZ style groups and style rules are linked through a naming scheme, e.g.:
// a style group name `lineStyle_79l75_ceg3xiefz` should be filtered by the corresponding style rule
// with id `79l75_rgj1c8o30`
// This function finds the appropriate style rule (if there is one) for a given style group
function matchStyleRules({ styleRules, styleGroupName, styleGroupPrefix }) {
  const rule = styleRules.find(
    rule => styleGroupName === `${styleGroupPrefix}_${rule.id}`
  );
  let name;
  let priority = styleRules.length;
  let tgFilter;
  if (rule) {
    name = rule.name;
    priority = styleRules.findIndex(
      rule => styleGroupName === `${styleGroupPrefix}_${rule.id}`
    );
    tgFilter = makeFilter(rule); // create the Tangram filter for this style rule
  }
  return { name, tgFilter, priority };
}

// Build a Tangram layer filter for an XYZ style rule
function makeFilter(styleRule) {
  if (styleRule == null) {
    return;
  }

  const rules = styleRule.r[0]; // TODO: handle multi-element OR properties (Studio doesn't currently support)
  const conditions = [];
  rules.forEach(rule => {
    // Tangram property look-up
    let prop = rule.property;
    const ruleValue = rule.value.toString().replace(/\n/g, '\\n'); // handle any new line breaks in value (eg: if property value is a paragraph)

    // special handling for `id` and `__id` property handling between XYZ and Tangram
    if (prop === 'id') {
      // XYZ property `id`' is for `feature.id` (NOT `feature.properties.id`)
      prop = '$id'; // in Tangram, this is accessed through a special `$id` property
    } else if (prop === '__id') {
      // XYZ property `__id` is for `feature.properties.id` (NOT `feature.id`)
      prop = 'id'; // in Tangram, this is accessed as a normal feature property
    }

    let value;
    if (prop[0] === '$') {
      // special Tangram accessor prefixed with `$`, use property name directly
      value = prop; // e.g. `$id`, `$geometry`, `$layer`, etc.
    } else {
      // regular feature property
      value = `feature['${prop}']`; // Tangram exposes feature properties in the `feature` object
    }

    // apply the logic for this operator
    switch (rule.operator) {
      case 'eq': // equals
        conditions.push(`${value} == ${quoteValue(ruleValue)}`);
        break;
      case 'neq': // not equals
        conditions.push(`${value} != ${quoteValue(ruleValue)}`);
        break;
      case 'lt': // less than
        conditions.push(`${value} < ${quoteValue(ruleValue)}`);
        break;
      case 'gt': // greater than
        conditions.push(`${value} > ${quoteValue(ruleValue)}`);
        break;
      case 'em': // is empty
        conditions.push(`${value} == null`);
        break;
      case 'nem': // is not empty
        conditions.push(`${value} != null`);
        break;
      default:
        return false;
    }
  });

  if (conditions.length === 0) {
    return;
  }

  const filter = `function() { return ${conditions.join(' && ')}; }`;
  return filter;
}

function colorFunction(styleRules, styleType) {
  return `function() {
        let ruleApplied = null;
        const cssColors = [
            'red',
            'yellow',
            'black',
            'orange',
            'blue',
            'white',
            'gray',
            'green',
            'pink',
            'navy',
            'maroon',
            'brown',
            'aqua',
          ];
        if(${JSON.stringify(styleRules)}) {
            // loop through all point stylegroups and find the last rule that applies
            ruleApplied = ${JSON.stringify(styleRules)}.find(
              stylerule => stylerule.r.some( // loop through all point rule groups (in OR)
                stylegroup => stylegroup.every( // loop through all rule groups rules (in AND)
                  ({property,operator,value}) => {
                    let p = null;
                    if(property === 'id') {
                      p = $id;
                    } else if(property === '__id') {
                      p = feature['id'];
                    } else {
                      p = feature[property];
                    }
                    const stz = v => v && v.toString().toLowerCase().trim();
                    switch(operator) {
                        case 'eq':
                            return stz(p) === stz(value);
                        case 'neq':
                            return stz(p) !== stz(value);
                        case 'gt':
                            return parseFloat(stz(p)) > parseFloat(stz(value));
                        case 'gte':
                            return parseFloat(stz(p)) >= parseFloat(stz(value));
                        case 'lt':
                            return parseFloat(stz(p)) < parseFloat(stz(value));
                        case 'lte':
                            return parseFloat(stz(p)) <= parseFloat(stz(value));
                        case 'em':
                            return !!!stz(p);
                        case 'nem':
                            return !!stz(p);
                        default:
                            return stz(p) === stz(v);
                    }
                  }
                )
              )
            )
        }

        if(!!!ruleApplied && feature.color &&
        (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(feature.color) ||
        /([0-9A-F]{6}$)|([0-9A-F]{3}$)/i.test(feature.color) ||
        cssColors.includes(feature.color.toLowerCase()))) {
            if(feature.color.toString().indexOf('#') !== 0 && !cssColors.includes(feature.color.toString().toLowerCase()))
                 return '#'+feature.color;
            return feature.color;
        }
        else
            return '${styleType}';
        }`;
}

// Create a Tangram draw group for a polygon
function makePolygonStyleLayer({
  style,
  styleIndex,
  draw,
  xyz,
  xyzLayerIndex,
  styleRules,
}) {
  let color;

  if (
    xyz.layers[xyzLayerIndex].geometryStyle &&
    xyz.layers[xyzLayerIndex].geometryStyle.indexOf('Polygon') !== -1
  ) {
    color = colorFunction(styleRules, style.fill);
  } else {
    color = style.fill;
  }
  // Polygon fill
  const tgFillDrawGroupName = `${style.type}_${styleIndex}_fill`;
  draw[tgFillDrawGroupName] = {
    interactive: true,
    style: 'XYZ_polygons',
    color,
    blend_order: getBlendOrder(style, xyz.layers, xyzLayerIndex),
  };

  // Polygon stroke
  const tgStrokeDrawGroupName = `${style.type}_${styleIndex}_stroke`;
  draw[tgStrokeDrawGroupName] = {
    interactive: true,
    style: 'XYZ_lines',
    color: style.stroke,
    width: `${style.strokeWidth}px`,
    cap: style.strokeLinecap,
    join: style.strokeLinejoin,
    blend_order: getBlendOrder(style, xyz.layers, xyzLayerIndex),
  };

  if (hasDash(style.strokeDasharray)) {
    draw[tgStrokeDrawGroupName].dash = style.strokeDasharray;
  }
}

// Create a Tangram draw group for a line
function makeLineStyleLayer({
  style,
  styleIndex,
  draw,
  xyz,
  xyzLayerIndex,
  styleRules,
}) {
  let color;
  if (
    xyz.layers[xyzLayerIndex].geometryStyle &&
    xyz.layers[xyzLayerIndex].geometryStyle.indexOf('Line') !== -1
  ) {
    color = colorFunction(styleRules, style.stroke);
  } else {
    color = style.stroke;
  }

  if (style.strokeWidth === 0) {
    return; // zero-width lines are sometimes used for "hidden" groups
  }

  const tgStrokeDrawGroupName = `${style.type}_${styleIndex}_stroke`;
  draw[tgStrokeDrawGroupName] = {
    interactive: true,
    style: 'XYZ_lines',
    color,
    width: `${style.strokeWidth}px`,
    cap: style.strokeLinecap,
    join: style.strokeLinejoin,
    blend_order: getBlendOrder(style, xyz.layers, xyzLayerIndex),
  };

  if (hasDash(style.strokeDasharray)) {
    draw[tgStrokeDrawGroupName].dash = style.strokeDasharray;
  }
}

// Create a Tangram draw group for a circle point
function makeCircleStyleLayer({
  style,
  styleIndex,
  draw,
  xyz,
  xyzLayerIndex,
  tgOptions,
  styleRules,
}) {
  const tgPointDrawGroupName = `${style.type}_${styleIndex}_point`;
  let color;
  if (
    xyz.layers[xyzLayerIndex].geometryStyle &&
    xyz.layers[xyzLayerIndex].geometryStyle.indexOf('Point') !== -1 &&
    styleIndex === 0
  ) {
    color = colorFunction(styleRules, style.fill);
  } else {
    color = style.fill;
  }
  draw[tgPointDrawGroupName] = {
    interactive: true,
    collide: tgOptions.collide,
    priority: getLabelPriority(xyz.layers, xyzLayerIndex, tgOptions),
    style: 'XYZ_points',
    color,
    size: `${style.radius * 2}px`,
    // size: [`${style.width}px`, `${style.height}px`],
    offset: getOffset(style),
    blend_order: getBlendOrder(style, xyz.layers, xyzLayerIndex),
  };
  if (style.outline) {
    draw[tgPointDrawGroupName].outline = {
      color: style.outline.fill,
      width: `${style.outline.radius - style.radius}px`,
    };
  }
}

// Create a Tangram draw group for an image point, with optional text label
function makeImageStyleLayer({
  style,
  styleIndex,
  draw,
  xyz,
  xyzLayerIndex,
  tgOptions,
}) {
  const tgPointDrawGroupName = `${style.type}_${styleIndex}_point`;
  draw[tgPointDrawGroupName] = {
    interactive: true,
    collide: tgOptions.collide,
    priority: getLabelPriority(xyz.layers, xyzLayerIndex, tgOptions),
    style: 'XYZ_points',
    size: [`${style.width}px`, `${style.height}px`],
    texture: style.src,
    offset: getOffset(style),
    blend_order: getBlendOrder(style, xyz.layers, xyzLayerIndex),
  };

  // optionally attached text label
  if (style.text) {
    const textDraws = {};
    makeTextStyleLayer({
      style: style.text,
      styleIndex: 0,
      draw: textDraws,
      xyz,
      xyzLayerIndex,
      tgOptions: { ...tgOptions, priority: 2 }, // default attached text labels to lower priority than parent
    });
    const text = Object.values(textDraws)[0];
    if (text) {
      draw[tgPointDrawGroupName].text = text;
      text.optional = true; // attached text labels are preferred but optional
    }
  }
}

// Create a Tangram draw group for a text label
function makeTextStyleLayer({
  style,
  styleIndex,
  draw,
  xyz,
  xyzLayerIndex,
  tgOptions,
}) {
  const tgTextDrawGroupName = `${style.type}_${styleIndex}_text`;
  let collide;

  collide = !_.forEach(draw, (d, k) => k.indexOf('Circle') !== -1);

  draw[tgTextDrawGroupName] = {
    interactive: true,
    collide, // always collide text labels (no real downside)
    priority: getLabelPriority(xyz.layers, xyzLayerIndex, tgOptions),
    style: 'XYZ_text',
    text_source: `function() { var properties = feature; return ${style.textRef}; }`,
    font: {
      fill: style.fill,
      stroke: {
        color: style.stroke,
        width: `${style.strokeWidth}px`,
      },
    },
    offset: getOffset(style),
    anchor: 'center',
    // repeat_distance: '1000px',
    blend_order: getBlendOrder(style, xyz.layers, xyzLayerIndex),
  };

  // parse XYZ font field
  const font = parseCSSFont(style.font);
  if (font['font-family'].length > 0) {
    draw[tgTextDrawGroupName].font.family = font['font-family'][0]; // use first family in list
  }

  draw[tgTextDrawGroupName].font.size = font['font-size'] || '12px';

  if (font['font-style']) {
    draw[tgTextDrawGroupName].font.style = font['font-style'];
  }

  if (font['font-weight']) {
    draw[tgTextDrawGroupName].font.weight = font['font-weight'];
  }
}

// add Tangram global utility functions
function makeGlobals(xyz) {
  return {
    xyz_access_token: xyz.rot, // access token from XYZ style
  };
}

// Calculate Tangram blend order based on XYZ layer position and style zIndex
function getBlendOrder(style, xyzLayers, xyzLayerIndex) {
  const tgBlendOrderBase = 1;
  const tgBlendOrderMultiplier = 0.001;
  const blendOrder =
    style.zIndex * tgBlendOrderMultiplier +
    (xyzLayers.length - xyzLayerIndex) +
    tgBlendOrderBase;
  return Number(blendOrder.toFixed(3)); // cap digit precision
}

// Calculate Tangram label priority based on XYZ layer position
function getLabelPriority(xyzLayers, xyzLayerIndex, tgOptions) {
  const tgPriorityBase = 0;
  const tgPriorityMultiplier = 0.1;
  return (
    xyzLayerIndex * tgPriorityMultiplier +
    tgPriorityBase +
    (tgOptions.priority == null ? 1 : tgOptions.priority) *
      tgPriorityMultiplier *
      0.5
  );
}

// Filters out XYZ style placeholder dasharray values that actually indicate solid line
function hasDash(strokeDasharray) {
  if (strokeDasharray && strokeDasharray[0] === 0 && strokeDasharray[1] === 0) {
    return false;
  }
  return true;
}

// Get the offset value from an XYZ style as an array
function getOffset(style) {
  return [style.offsetX || 0, style.offsetY || 0];
}

// Combine icon and circle/rect shapes into a single SVG
// This allows markers to properly overlap and collide
function compositeIcons(styleGroup, layer) {
  const array = ['Image'];
  if (layer.geometryStyle && layer.geometryStyle.indexOf('Point') === -1) {
    array.push('Circle');
    array.push('Rect');
  }
  const shapes = styleGroup
    .filter(s => s.opacity > 0)
    .filter(s => array.indexOf(s.type) > -1)
    .sort((a, b) => a.zIndex - b.zIndex);

  if (shapes.length === 0) {
    return;
  }

  // find width/height incorporating offsets
  const maxOffsetWidth = Math.max(
    ...shapes.map(s => Math.abs(s.offsetX || 0)).filter(x => x != null)
  );
  const maxOffsetHeight = Math.max(
    ...shapes.map(s => Math.abs(s.offsetY || 0)).filter(x => x != null)
  );
  const width =
    Math.max(...shapes.map(s => s.width).filter(x => x != null)) +
    maxOffsetWidth;
  const height =
    Math.max(...shapes.map(s => s.height).filter(x => x != null)) +
    maxOffsetHeight;

  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">\n`;

  shapes.forEach(s => {
    // SVG examples as reference
    // <circle cx="25" cy="25" r="20" style="fill: red; stroke: black; stroke-width: 3px;" />
    // <rect x="5" y="5" width="30" height="30" style="fill: red; stroke: black; stroke-width: 3px;" />
    // <image x="0" y="0" width="50" height="50" xlink:href="${url}" />

    const offsetX = (s.offsetX || 0) + width / 2;
    const offsetY = (s.offsetY || 0) + height / 2;

    if (s.type === 'Circle') {
      let style = `fill: ${s.fill}; `;
      if (s.stroke && s.strokeWidth) {
        style += `stroke: ${s.stroke}; stroke-width: ${s.strokeWidth}px;`;
      }
      svg += `<circle cx="${offsetX}" cy="${offsetY}" r="${s.radius}" style="${style}" />\n`;
    } else if (s.type === 'Rect') {
      let style = `fill: ${s.fill}; `;
      if (s.stroke && s.strokeWidth) {
        style += `stroke: ${s.stroke}; stroke-width: ${s.strokeWidth}px;`;
      }
      svg += `<rect x="${offsetX - s.width / 2}" y="${offsetY -
        s.height / 2}" width="${s.width}" height="${
        s.height
      }" style="${style}" />\n`;
    } else if (s.type === 'Image') {
      svg += `<image x="${offsetX - s.width / 2}" y="${offsetY -
        s.height / 2}" width="${s.width}" height="${s.height}" xlink:href="${
        s.src
      }"/>\n`;
    }

    s.skip = true; // mark the group as one we want to skip (replaced by new combined image)
  });

  svg += '</svg>';
  const url = `data:image/svg+xml;base64,${btoa(svg)}`; // encode SVG as data URL

  // Create a new Image style for the composited SVG
  const image = {
    type: 'Image',
    width,
    height,
    zIndex: shapes[shapes.length - 1].zIndex, // max zIndex is last
    src: url,
    opacity: 1,
  };

  // Optionally attach a text label, if exactly one is found
  const texts = styleGroup.filter(s => s.type === 'Text' && s.opacity > 0);
  if (texts.length === 1) {
    const text = texts[0];
    image.text = text;
    text.skip = true; // mark the group as one we want to skip (now attached to new combined image)
  }

  styleGroup.push(image); // add new composited SVG
}

// Utility functions

function quoteValue(value) {
  // quote non-numeric values
  return isNaN(Number(value)) ? `'${value}'` : Number(value);
}
