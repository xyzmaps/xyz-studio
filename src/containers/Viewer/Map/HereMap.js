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

import React, { Component } from 'react';
import _ from 'lodash';
import HERE from '../../HereMap/Here';

// constants
import { apiConfig } from '../../../constants';
import { statisticsApi } from '../../../api';

import { themes } from '../../../constants/themes';

// services
// import featureApi from '../../services/feature';

// component
import Card from '../../../components/Card/Card';
import CardPanel from '../../../components/Card/CardPanel';
import Zoom from '../../../components/Zoom/Zoom';
import ProjectDetailsPanel from '../../../components/ProjectDetailsPanel/ProjectDetailsPanel';
import Searchbar from '../../../components/SearchBar/Searchbar';
// helper
import { isTouch, isMobile } from '../../../helpers';

// styles
import style from './Map.scss';

export default class HereMap extends Component {
  state = {
    card: null,
    cardPanel: null,
    projectTitle: null,
    projectDescription: null,
    projectTitleDisplay: false,
    projectDescriptionDisplay: false,
    projectLegendDisplay: false,
    cardHoverDisplay: false,
    toggleCardHoverDisplay: false,
    zoomValue: null,
    geoMap: null,
    cardMap: null,
  };

  componentDidMount() {
    const { publish_settings, layers, meta } = this.props.data;
    const { access_token } = this.props;
    this.layers = layers;

    const geoHashMap = {};
    const cardHashMap = {};

    this.layers.forEach(layer => {
      statisticsApi.fetch(layer.geospace.id, access_token, (status, stat) => {
        geoHashMap[layer.geospace.id] = stat.geometryTypes.value;

        if (
          !!layer.cards[0] &&
          !!layer.cards[1] &&
          stat.properties.value.length > 0
        ) {
          let i = 0;
          const cards = [];
          cards[0] = [];
          cards[1] = [];
          stat.properties.value.forEach(prop => {
            if (i <= 1) {
              cards[0].push(prop.key);
              i += 1;
            } else {
              cards[1].push(prop.key);
            }
          });

          cardHashMap[layer.geospace.id] = cards;
        }

        this.setState({
          geoMap: geoHashMap,
          cardMap: cardHashMap,
        });
      });
    });

    this.setState(
      {
        projectTitle:
          publish_settings.display &&
          publish_settings.display.name &&
          meta.name,
        projectDescription:
          publish_settings.display &&
          publish_settings.display.description &&
          meta.description,
        projectLegendDisplay:
          publish_settings.display && publish_settings.display.legend,
        projectTitleDisplay:
          publish_settings.display && publish_settings.display.name,
        projectDescriptionDisplay:
          publish_settings.display && publish_settings.display.description,
        cardHoverDisplay: false,
        toggleCardHoverDisplay:
          publish_settings.display && !isMobile()
            ? !!publish_settings.display.cards ||
              typeof publish_settings.display.cards === 'undefined'
            : false,
        // toggleCardHoverActive: data.publish_settings.display && data.publish_settings.display.cards
      },
      () => {
        this.createMap(this.props.data);
        this.createLayers(this.props.data);
        const hexbinEnabledLayer = layers.find(o => {
          if (o.clustering && o.clustering.hexbin) return o.clustering.hexbin;
          return undefined;
        });
        if (hexbinEnabledLayer && hexbinEnabledLayer.visible) {
          this.setState({ clustering: hexbinEnabledLayer.clustering });
          this.createHexbinLayer(hexbinEnabledLayer, this.props.data);
        }

        // add document title
        this.addDocumentTitle(meta.name);
        // add feedback link
        this.addFeedbackLink();
      }
    );

    this.registerBackLink();
  }

  mapCanvas = false;

  layers = [];

  features = [];

  bookmark = false;

  cssColors = [
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

  featureStyleGroups = stylegroups => {
    return {
      lineFeature: [
        {
          type: 'Line',
          stroke: f => {
            if (
              f.properties.color.toString().indexOf('#') !== 0 &&
              !this.cssColors.includes(
                f.properties.color.toString().toLowerCase()
              )
            )
              return `#${f.properties.color}`;
            return f.properties.color;
          },
          zIndex: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].zIndex
            : 10,
          opacity: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].opacity
            : 1,
          strokeWidth: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].strokeWidth
            : 6,
          strokeLinecap: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].strokeLinecap
            : '',
          strokeLinejoin: stylegroups.lineStyle[0]
            ? stylegroups.lineStyle[0].strokeLinejoin
            : '',
          strokeDasharray: stylegroups.lineStyle[0]
            ? [...stylegroups.lineStyle[0].strokeDasharray]
            : [],
        },
        {
          fill: stylegroups.lineStyle[1] ? stylegroups.lineStyle[1].fill : '',
          font: stylegroups.lineStyle[1] ? stylegroups.lineStyle[1].font : '',
          type: 'Text',
          stroke: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].stroke
            : 0,
          zIndex: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].zIndex
            : 10,
          offsetX: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].offsetX
            : 0,
          offsetY: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].offsetY
            : 0,
          opacity: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].opacity
            : 0,
          textRef: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].textRef
            : '',
          strokeWidth: stylegroups.lineStyle[1]
            ? stylegroups.lineStyle[1].strokeWidth
            : 0,
        },
      ],
      pointFeature: [
        {
          fill: f => {
            if (
              f.properties.color.toString().indexOf('#') !== 0 &&
              !this.cssColors.includes(
                f.properties.color.toString().toLowerCase()
              )
            )
              return `#${f.properties.color}`;
            return f.properties.color;
          },
          type: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].type
            : 'Circle',
          width: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].width
            : 16,
          height: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].height
            : 16,
          radius: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].radius
            : 8,
          zIndex: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].zIndex
            : 10,
          opacity: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].opacity
            : 1,
        },
        {
          fill: stylegroups.pointStyle[1] ? stylegroups.pointStyle[1].fill : '',
          type: stylegroups.pointStyle[0]
            ? stylegroups.pointStyle[0].type
            : 'Circle',
          width: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].width
            : 0,
          height: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].height
            : 0,
          radius: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].radius
            : 0,
          zIndex: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].zIndex
            : 10,
          opacity: stylegroups.pointStyle[1]
            ? stylegroups.pointStyle[1].opacity
            : 0,
        },
        {
          src: stylegroups.pointStyle[2] ? stylegroups.pointStyle[2].src : '',
          type: 'Image',
          width: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].width
            : 0,
          height: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].height
            : 0,
          zIndex: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].zIndex
            : 1,
          baseSrc: '/icons/lui-icon-destinationpin',
          offsetX: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].offsetX
            : 0,
          offsetY: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].offsetY
            : 0,
          opacity: stylegroups.pointStyle[2].opacity,
          iconColor: stylegroups.pointStyle[2]
            ? stylegroups.pointStyle[2].iconColor
            : '',
        },
        {
          fill: stylegroups.pointStyle[3] ? stylegroups.pointStyle[3].fill : '',
          font: 'normal 12px Arial',
          type: 'Text',
          stroke: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].stroke
            : 0,
          zIndex: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].zIndex
            : 1,
          offsetX: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].offsetX
            : 0,
          offsetY: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].offsetY
            : 0,
          opacity: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].opacity
            : 0,
          textRef: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].textRef
            : '',
          strokeWidth: stylegroups.pointStyle[3]
            ? stylegroups.pointStyle[3].strokeWidth
            : 0,
        },
      ],
      polygonFeature: [
        {
          fill: f => {
            if (
              f.properties.color.toString().indexOf('#') !== 0 &&
              !this.cssColors.includes(
                f.properties.color.toString().toLowerCase()
              )
            )
              return `#${f.properties.color}`;
            return f.properties.color;
          },
          type: 'Polygon',
          stroke: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].stroke
            : '',
          zIndex: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].zIndex
            : 10,
          opacity: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].opacity
            : 0.8,
          strokeWidth: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].strokeWidth
            : 1,
          strokeLinecap: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].strokeLinecap
            : '',
          strokeLinejoin: stylegroups.polygonStyle[0]
            ? stylegroups.polygonStyle[0].strokeLinejoin
            : '',
          strokeDasharray: stylegroups.polygonStyle[0]
            ? [...stylegroups.polygonStyle[0].strokeDasharray]
            : [],
        },
        {
          fill: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].fill
            : '',
          font: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].font
            : '',
          type: 'Text',
          stroke: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].stroke
            : 0,
          zIndex: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].zIndex
            : 1,
          offsetX: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].offsetX
            : 0,
          offsetY: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].offsetY
            : 0,
          opacity: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].opacity
            : 0,
          textRef: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].textRef
            : '',
          strokeWidth: stylegroups.polygonStyle[1]
            ? stylegroups.polygonStyle[1].strokeWidth
            : 0,
        },
      ],
    };
  };

  hexbinStyleGroups = (min, max, color, property) => {
    return {
      label: [
        {
          zIndex: 0,
          type: 'Polygon',
          fill: feature => {
            let hexbinParameter;
            const value = property
              ? feature.properties.aggregation[property].sum
              : feature.properties.aggregation.qty;

            if (value && value >= 1) {
              hexbinParameter = Math.round(value * 10) / 10;
            } else {
              hexbinParameter = 0;
            }

            return color.replace(
              ',1)',
              `,${Math.round((hexbinParameter / (max === 0 ? 1 : max)) * 10) /
                10})`
            );
          },
          stroke: 'black',
          strokeWidth: 1,
        },
        {
          zIndex: 1,
          type: 'Text',
          text: feature =>
            property
              ? feature.properties.aggregation[property].sum || '0'
              : feature.properties.aggregation.qty,
          fill: 'black',
          font: '11px "FiraGO", sans-serif',
          stroke: 'white',
          strokeWidth: 3,
        },
      ],
      noLabel: [
        {
          zIndex: 0,
          type: 'Polygon',
          fill: feature => {
            let hexbinParameter;
            const value = property
              ? feature.properties.aggregation[property].sum
              : feature.properties.aggregation.qty;

            if (value && value >= 1) {
              hexbinParameter = Math.round(value * 10) / 10;
            } else {
              hexbinParameter = 0;
            }

            return color.replace(
              ',1)',
              `,${Math.round((hexbinParameter / (max === 0 ? 1 : max)) * 10) /
                10})`
            );
          },
          stroke: 'black',
          strokeWidth: 1,
        },
      ],
      centroid: [
        {
          zIndex: 0,
          type: 'Circle',
          fill: color,
          opacity: 0.7,
          stroke: 'black',
          strokeWidth: 1,
          radius: feature => {
            const hexbinParameter = property
              ? feature.properties.aggregation[property].sum
              : feature.properties.aggregation.qty;
            if (hexbinParameter > 1) {
              return Math.round(
                ((hexbinParameter || 0) / (max === 0 ? 1 : max)) * 25
              );
            }

            return 3;
          },
        },
      ],
      centroid_label: [
        {
          zIndex: 0,
          type: 'Circle',
          fill: color,
          opacity: 0.7,
          stroke: 'black',
          strokeWidth: 1,
          radius: feature => {
            const hexbinParameter = property
              ? feature.properties.aggregation[property].sum
              : feature.properties.aggregation.qty;
            if (hexbinParameter > 1) {
              return Math.round(
                ((hexbinParameter || 0) / (max === 0 ? 1 : max)) * 25
              );
            }

            return 3;
          },
        },
        {
          zIndex: 1,
          type: 'Text',
          text: feature =>
            property
              ? feature.properties.aggregation[property].sum || '0'
              : feature.properties.aggregation.qty,
          fill: 'black',
          font: '11px "FiraGO", sans-serif',
          stroke: 'white',
          strokeWidth: 3,
        },
      ],
    };
  };

  strokeWidthZoomScale = zoomlevel => {
    if (zoomlevel >= 18) {
      return 1;
    }
    if (zoomlevel >= 15) {
      return 0.8;
    }
    if (zoomlevel >= 10) {
      return 0.7;
    }
    if (zoomlevel >= 8) {
      return 0.6;
    }
    if (zoomlevel >= 5) {
      return 0.5;
    }
    if (zoomlevel >= 2) {
      return 0.3;
    }

    return 0;
  };

  hexbinAssignFunction = (feature, label) => {
    if (feature.geometry.type === 'Point') {
      if (label) {
        return 'centroid_label';
      }
      return 'centroid';
    }
    if (label) {
      return 'label';
    }
    return 'noLabel';
  };

  addDocumentTitle = title => {
    document.title = `HERE Studio | ${
      !title || title === 'Untitled Project' ? 'HERE Maps Viewer' : title
    }`;
  };

  addFeedbackLink = () => {
    const prefix = this.mapCanvas.getContainer().lastChild.className;
    const cpSelector = `.${prefix}-ui-copyright`;

    const $copyright = document.querySelector(cpSelector);
    const $feedback = document.createElement('a');
    $feedback.appendChild(document.createTextNode('Feedback'));
    $feedback.className = 'feedback';
    $feedback.setAttribute(
      'href',
      'https://survey.research-feedback.com/jfe/form/SV_9t8edvRPmNReeUZ'
    );
    $feedback.setAttribute('target', '_blank');

    if ($copyright) {
      $copyright.insertBefore($feedback, $copyright.firstChild);
    }
  };

  findLayerBySpaceId = spaceId => {
    return _.find(this.layers, ({ geospace }) => geospace.id === spaceId);
  };

  checkRules = (
    styleKey,
    featureStyleKey,
    geometry,
    styleRules,
    feature,
    geometryStyle
  ) => {
    let ruleApplied = null;
    if (styleRules) {
      if (styleRules[geometry]) {
        // loop through all point stylegroups and find the last rule that applies
        ruleApplied = _.find(styleRules[geometry], stylerule =>
          stylerule.r.some(
            // loop through all point rule groups (in OR)
            stylegroup =>
              stylegroup.every(
                // loop through all rule groups rules (in AND)
                ({ property, operator, value }) => {
                  let p = null;
                  if (property === 'id') {
                    p = feature.id;
                  } else if (property === '__id') {
                    p = feature.properties.id;
                  } else {
                    p = feature.properties[property];
                  }
                  return this.parseStyleRule(p, operator, value); // parse rule operator
                }
              )
          )
        );
      }
    }

    if (ruleApplied) {
      return `${styleKey}_${ruleApplied.id}`;
    }

    if (
      geometryStyle &&
      geometryStyle.includes(geometry) &&
      feature.properties.color &&
      (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(feature.properties.color) ||
        /([0-9A-F]{6}$)|([0-9A-F]{3}$)/i.test(feature.properties.color) ||
        this.cssColors.includes(feature.properties.color.toLowerCase()))
    ) {
      return featureStyleKey;
    }

    return styleKey;
  };

  parseStyleRule = (prop, op, v) => {
    const stz = v1 =>
      v1 &&
      v1
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

  styleAssignFunction = (feature, styleRules, geometryStyle) => {
    switch (feature.geometry.type) {
      case 'LineString':
      case 'MultiLineString':
        return this.checkRules(
          'lineStyle',
          'lineFeature',
          'Line',
          styleRules,
          feature,
          geometryStyle
        );
      case 'Polygon':
      case 'MultiPolygon':
        return this.checkRules(
          'polygonStyle',
          'polygonFeature',
          'Polygon',
          styleRules,
          feature,
          geometryStyle
        );
      case 'Point':
      case 'MultiPoint':
        return this.checkRules(
          'pointStyle',
          'pointFeature',
          'Point',
          styleRules,
          feature,
          geometryStyle
        );
      default:
        return 'pointStyle';
    }
  };

  getSpaceBoundingBox = features => {
    let { length } = features;

    if (length) {
      let minLon = Infinity;
      let minLat = Infinity;
      let maxLon = -Infinity;
      let maxLat = -Infinity;
      // eslint-disable-next-line no-cond-assign
      while ((length -= 1)) {
        const f = features[length];

        if (f) {
          const { bbox } = f;

          if (bbox[0] < minLon) minLon = bbox[0];
          if (bbox[1] < minLat) minLat = bbox[1];
          if (bbox[2] > maxLon) maxLon = bbox[2];
          if (bbox[3] > maxLat) maxLat = bbox[3];
        }
      }

      return [minLon, minLat, maxLon, maxLat];
    }
    return false;
  };

  onItemClick = (center, zoom, bbox) => {
    if (bbox) {
      this.mapCanvas.setViewBounds(bbox);
    } else {
      this.mapCanvas.setCenter(center[1], center[0]);
      this.mapCanvas.setZoomlevel(zoom);
    }
  };

  createMap = project => {
    const { access_token } = this.props;
    this.bookmark =
      !_.isEmpty(project.publish_settings) &&
      !_.isEmpty(project.publish_settings.bookmark)
        ? project.publish_settings.bookmark
        : false;
    const zoom = project.map_settings.center
      ? parseInt(
          this.bookmark ? this.bookmark.zoom : project.map_settings.zoom,
          10
        )
      : 3;

    const lng = parseFloat(
      /* eslint-disable no-nested-ternary */
      this.bookmark
        ? this.bookmark.center[1]
        : project.map_settings.center
        ? project.map_settings.center[1]
        : 25.91699
      /* eslint-enable no-nested-ternary */
    );
    const lat = parseFloat(
      /* eslint-disable no-nested-ternary */
      this.bookmark
        ? this.bookmark.center[0]
        : project.map_settings.center
        ? project.map_settings.center[0]
        : 11.38269
      /* eslint-enable no-nested-ternary */
    );

    this.mapCanvas = new HERE.xyz.maps.Map(this.$map, {
      zoomLevel: zoom,
      center: {
        longitude: lng,
        latitude: lat,
      },
      credentials: {
        access_token,
      },
      ui: {
        ZoomControl: false,
        Logo: {
          // url: hereMapLogo,
          url: '//',
        },
      },
      layers: [this.createBaseLayer(project)],
    });
    window.mapCanvas = this.mapCanvas;

    if (project.base.template) {
      const templateLayer = new HERE.xyz.maps.layers.TileLayer({
        name: apiConfig.template[project.base.template].label,
        min: 1,
        max: 20,
        provider: new HERE.xyz.maps.providers.ImageProvider({
          name: 'templateImageProvider',
          url: apiConfig.template[project.base.template].url,
        }),
      });

      this.mapCanvas.addLayer(templateLayer, 1);
      this.mapCanvas.refresh(templateLayer);
    }

    // disable scroll zoom when app is embedded
    if (window.top !== window.self) {
      this.mapCanvas.setBehavior('zoom', false);
    }
    // to change zoomlevel on map scroll zoom
    this.mapCanvas.addEventListener('mapviewchangeend', this.onZoomScroll);

    this.mapCanvas.addEventListener('pointerup', this.onShowCard); // click
    this.mapCanvas.addEventListener('pointerenter', this.onShowCard); // mouse in
    this.mapCanvas.addEventListener('pointerleave', this.onHideCard); // mouse out
    this.mapCanvas.addEventListener('dbltap', this.onMapDoubleClick);
    // this.mapCanvas.addEventListener('click', this.onMapDoubleClick);

    window.addEventListener('resize', this.onWindowResize);
  };

  createBaseLayer = project => {
    const { access_token } = this.props;
    const labels = project.base.showLabels ? 'withLabel' : 'withoutlabel';

    const baseLayer = new HERE.xyz.maps.layers.MVTLayer({
      name: 'mvt-world-layer',
      remote: {
        url: apiConfig.tileUrl[project.base.tileLayer] + access_token,
      },
      min: 1,
      max: 20,
      style: !_.isEmpty(project.base)
        ? themes[labels][project.base.tileLayer || 'osm'][
            project.base.theme || 'dark'
          ]
        : themes[labels].osm.dark,
    });

    baseLayer.pointerEvents(false);

    return baseLayer;
  };

  getHexbinLayer = () => {
    let hexbinLayer;
    this.mapCanvas.getLayers().forEach(l => {
      if (l.name.indexOf('Hexbin') !== -1) hexbinLayer = l;
    });
    return hexbinLayer;
  };

  H3SpaceProvider = (ilevel, h3resolution, layer) => {
    const { access_token } = this.props;
    const { geospace, clustering } = layer;

    let params;
    if (clustering.property) {
      params = {
        clustering: 'hexbin',
        'clustering.resolution': h3resolution,
        'clustering.property': clustering.property,
        'clustering.pointmode': clustering.shape === 'centroid',
        clientId: 'viewer',
      };
    } else {
      params = {
        clustering: 'hexbin',
        'clustering.resolution': h3resolution,
        'clustering.pointmode': clustering.shape === 'centroid',
        clientId: 'viewer',
      };
    }

    return new HERE.xyz.maps.providers.SpaceProvider({
      name: 'Hexbin SpaceProvider',
      level: ilevel,
      clip: false,
      margin: 0,
      space: geospace.id,
      url: apiConfig.spaces,
      credentials: {
        access_token,
        limit: 100000,
      },
      params,
    });
  };

  createHexbinLayer = layer => {
    const { meta } = layer;
    const mLayer = new HERE.xyz.maps.layers.TileLayer({
      name: `Hexbin Layer ${meta.title}`,
      min: 2,
      max: 20,
      margin: 0,
      providers: [
        {
          min: 2,
          max: 3,
          provider: this.H3SpaceProvider(2, 2, layer),
        },
        {
          min: 4,
          max: 4,
          provider: this.H3SpaceProvider(4, 3, layer),
        },
        {
          min: 5,
          max: 6,
          provider: this.H3SpaceProvider(5, 4, layer),
        },
        {
          min: 7,
          max: 8,
          provider: this.H3SpaceProvider(7, 5, layer),
        },
        {
          min: 9,
          max: 10,
          provider: this.H3SpaceProvider(9, 6, layer),
        },
        {
          min: 11,
          max: 11,
          provider: this.H3SpaceProvider(11, 7, layer),
        },
        {
          min: 12,
          max: 12,
          provider: this.H3SpaceProvider(12, 8, layer),
        },
        {
          min: 13,
          max: 14,
          provider: this.H3SpaceProvider(13, 9, layer),
        },
        {
          min: 15,
          max: 20,
          provider: this.H3SpaceProvider(15, 11, layer),
        },
      ],

      style: {
        styleGroups: {
          hexbin: [
            {
              zIndex: 0,
              type: 'Polygon',
              fill: 'rgba(227,74,51,0)',
              opacity: 0,
              stroke: 'black',
              strokeWidth: 1,
            },
          ],
        },
        assign: () => 'hexbin',
      },
    });

    this.mapCanvas.addLayer(mLayer);
    _.debounce(() => {
      this.setStyleGroupForHexbin(layer);
    }, 1000)();
    this.mapCanvas.addEventListener('mapviewchangestart', () => {
      this.setStyleGroupForHexbin(layer);
    });
  };

  setStyleGroupForHexbin = layer => {
    const { label, theme, property, shape } = layer.clustering;
    const numberValues = [];

    if (this.getHexbinLayer()) {
      const hexbinFeatures = this.getHexbinLayer()
        .getProvider(this.mapCanvas.getZoomlevel())
        .search({ rect: this.mapCanvas.getViewBounds() });
      // console.log('hexbinFeatures.length', hexbinFeatures.length);
      hexbinFeatures.forEach(hexbin => {
        if (property) {
          numberValues.push(hexbin.properties.aggregation[property].sum || 0);
        } else {
          numberValues.push(hexbin.properties.aggregation.qty);
        }
      });

      let min = 0;
      let max = 0;

      if (numberValues.length > 0) {
        min = Math.min(...numberValues);
        max = Math.max(...numberValues);

        this.getHexbinLayer().setStyle({
          styleGroups: this.hexbinStyleGroups(min, max, theme, property, shape),
          strokeWidthZoomScale: this.strokeWidthZoomScale,
          assign: feature => this.hexbinAssignFunction(feature, label),
        });

        this.mapCanvas.refresh(this.getHexbinLayer());
      }
    }
  };

  createLayers = () => {
    const { access_token } = this.props;
    [...this.layers].reverse().forEach((layer, i) => {
      if (layer.visible && !(layer.clustering && layer.clustering.hexbin)) {
        const layerProviders = [];
        const howManyZoom = 3;
        for (let j = 0; j < 20; j += 1) {
          if (j % howManyZoom === 0) {
            const spaceProvider = new HERE.xyz.maps.providers.SpaceProvider({
              name: `GeoSpaceProvider ${i}`,
              space: layer.geospace.id,
              level: layer.meta.spaceTags ? 15 : Math.max(j, 1),
              url: apiConfig.spaces,
              credentials: {
                access_token,
                limit: 100000,
              },
              params: {
                clientId: 'viewer',
              },
              tags: !!layer.meta.spaceTags,
            });
            layer.meta.spaceTags && spaceProvider.setTags(layer.meta.spaceTags); // eslint-disable-line
            layerProviders.push({
              min: Math.max(j, 1),
              max: j + howManyZoom,
              provider: spaceProvider,
            });
          }
        }

        const tileLayer = new HERE.xyz.maps.layers.TileLayer({
          name: `GeoSpaceProvider ${i}`,
          min: layer.meta.spaceTags ? 14 : 1,
          max: 20,
          provider: layerProviders,
          style: {
            styleGroups: {
              ...this.featureStyleGroups(layer.styleGroups),
              ...layer.styleGroups,
            },
            strokeWidthZoomScale: zoomlevel => {
              if (zoomlevel >= 18) {
                return 0.1;
              }
              if (zoomlevel >= 15) {
                return 0.8;
              }
              if (zoomlevel >= 10) {
                return 0.7;
              }
              if (zoomlevel >= 8) {
                return 0.6;
              }
              if (zoomlevel >= 5) {
                return 0.5;
              }
              if (zoomlevel >= 2) {
                return 0.3;
              }

              return 0;
            },
            assign: feature =>
              this.styleAssignFunction(
                feature,
                layer.styleRules,
                layer.geometryStyle
              ),
          },
        });

        this.mapCanvas.addLayer(tileLayer);
      }
    });
  };

  onWindowResize = () => {
    this.mapCanvas.resize(window.clientWidth, window.clientHeight);
    // console.log(this.mapCanvas.getZoomlevel());
  };

  onZoomScroll = () => {
    const newZoomValue = Math.round(this.mapCanvas.getZoomlevel() * 100) / 100;
    this.setState(() => {
      return { zoomValue: newZoomValue };
    });
  };

  onShowCard = e => {
    const hexbinFeature =
      e.target &&
      e.target.properties &&
      'resolution' in e.target.properties &&
      'kind' in e.target.properties;

    if (
      !e ||
      !e.target ||
      hexbinFeature ||
      (e.type === 'pointerup' && this.state.cardHoverDisplay) ||
      (e.type === 'pointerenter' && !this.state.cardHoverDisplay)
    )
      return;

    const spaceDetails = e.target.properties['@ns:com:here:xyz'];
    const spaceID = spaceDetails.virtualspace
      ? spaceDetails.virtualspace
      : spaceDetails.space;
    let cards = spaceDetails ? this.findLayerBySpaceId(spaceID).cards : [];
    const hiddenCards = spaceDetails
      ? this.findLayerBySpaceId(spaceID).hiddenCards
      : [];
    let containsProps = false;

    if (
      cards[0].length === 0 &&
      cards[1].length === 0 &&
      _.size(e.target.properties) > 1
    ) {
      cards = this.state.cardMap[spaceID];
    }

    if (cards[0].length && _.size(e.target.properties) > 1) {
      const updatedProperties = e.target.properties;

      for (const key in updatedProperties) {
        if (
          _.isObject(updatedProperties[key]) &&
          key !== '@ns:com:here:xyz' &&
          key !== '@ns:com:here:editor'
        ) {
          for (const propertyKey in updatedProperties[key]) {
            updatedProperties[`${key}:${propertyKey}`] =
              updatedProperties[key][propertyKey];
          }
          delete updatedProperties[key];
        }
      }
      cards[0].forEach(key => {
        if (updatedProperties[key]) {
          containsProps = true;
        }
      });

      if (containsProps) {
        const card = {
          properties: updatedProperties,
          cards,
          hiddenCards,
          position: {
            x: e.mapX,
            y: e.mapY,
          },
          visible: true,
        };

        this.setState({
          card: !isTouch || !isMobile() ? card : false,
          cardPanel: isTouch || isMobile() ? card : false,
        });
      }
    } else {
      this.setState({
        card: false,
        cardPanel: false,
      });
    }
  };

  onHideCard = () => {
    this.setState({
      card: false,
    });
  };

  onZoomIn = () => {
    this.mapCanvas.setZoomlevel(this.mapCanvas.getZoomlevel() + 1);
    this.setState(prevState => {
      return { zoomValue: prevState.zoomValue + 1 };
    });
  };

  onZoomOut = () => {
    if (this.mapCanvas.getZoomlevel() > 2) {
      this.mapCanvas.setZoomlevel(this.mapCanvas.getZoomlevel() - 1);

      this.setState(prevState => {
        return { zoomValue: prevState.zoomValue - 1 };
      });
    }
  };

  onCardButtonClick = toggle => {
    if (toggle) {
      this.setState(prevState => {
        return { cardPanel: prevState.card };
      });
    } else {
      this.setState({
        cardPanel: false,
      });
    }
  };

  onCardClose = () => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        visible: false,
      },
    }));
  };

  registerBackLink = () => {
    const logo = document.querySelector('.here-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        window.open(
          `${window.location.href.split('/viewer/')[0]}/studio`,
          '_self'
        );
      });
    }
  };

  onMapDoubleClick = e => {
    this.mapCanvas.setZoomlevel(
      this.mapCanvas.getZoomlevel() + 1,
      e.mapX,
      e.mapY
    );
    this.setState(prevState => {
      return { zoomValue: prevState.zoomValue + 1 };
    });
  };

  onHoverCardsToggle = () => {
    this.setState(prevState => {
      return { cardHoverDisplay: !prevState.cardHoverDisplay };
    });
  };

  render() {
    const { controls } = this.props;
    return (
      <div
        className={`${style.wrapper} ${
          this.state.cardPanel ? style.cardPanel : ''
        } ${controls ? 'controls' : ''}`}
      >
        {
          // eslint-disable-next-line
          <div className={style.map} ref={ele => (this.$map = ele)}>
            <div className={style.sidePanel}>
              {controls && (
                <ProjectDetailsPanel
                  projectTitle={this.state.projectTitle}
                  projectDescription={this.state.projectDescription}
                  projectTitleDisplay={this.state.projectTitleDisplay}
                  projectDescriptionDisplay={
                    this.state.projectDescriptionDisplay &&
                    !!this.state.projectDescription
                  }
                  projectLegendDisplay={this.state.projectLegendDisplay}
                  cardHoverDisplay={this.state.cardHoverDisplay}
                  toggleCardHoverDisplay={this.state.toggleCardHoverDisplay}
                  toggleCardHoverActive={this.state.toggleCardHoverActive}
                  onHoverCardsToggle={this.onHoverCardsToggle}
                  clustering={this.state.clustering}
                  layers={this.layers}
                  geoMap={this.state.geoMap}
                />
              )}
              {this.state.cardPanel && (
                <CardPanel
                  properties={this.state.cardPanel.properties}
                  cards={this.state.cardPanel.cards}
                  hiddenCards={this.state.cardPanel.hiddenCards}
                  onButtonClick={this.onCardButtonClick}
                  prjtHeight={this.method ? this.method.getHeight() : 0}
                />
              )}
            </div>

            {controls && (
              <Zoom
                onZoomIn={this.onZoomIn}
                onZoomOut={this.onZoomOut}
                zoomValue={this.state.zoomValue}
              />
            )}

            {!isMobile() && controls && (
              <Searchbar onItemClick={this.onItemClick} />
            )}

            {this.state.card && this.state.card.visible && (
              <Card
                properties={this.state.card.properties}
                cards={this.state.card.cards}
                hiddenCards={this.state.card.hiddenCards}
                position={this.state.card.position}
                buttonText="View more"
                onClose={this.onCardClose}
                onButtonClick={this.onCardButtonClick}
                parent={this.$map}
              />
            )}
          </div>
        }
      </div>
    );
  }
}
