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
import moment from 'moment';
import _ from 'lodash';

import config from '../../../constants/styleGroupsConfig';
import StyleLabel from './FeatureStyleProps/StyleLabel';

import style from './ProjectLayerDetails.scss';
import TextAreaInput from './FeatureStyleProps/TextAreaInput';
import { gisPropertyTexts } from '../../../constants';

class ProjectLayerFeature extends Component {
  featureProp = (
    text,
    value,
    editable = true,
    canStyle = true,
    propvalue = null
  ) => {
    return (
      <div className={style.featureProp} key={text.replace(' ', '_')}>
        <StyleLabel text={text} />
        <TextAreaInput
          save={e => this.onEdit(e, text)}
          placeholder="Enter a value"
          updating={this.props.updatingFeature === this.props.id}
          name="value"
          currentValue={value && value.toString()}
          onRuleCreate={() => this.onRuleCreate(text, value, propvalue)}
          editable={editable}
          canStyle={canStyle}
          checkOpenLayer={this.checkOpenLayer()}
          alertEditCol={false}
          onAlertEditChecked={this.onAlertEditChecked}
          toggleAlertEditCol={this.toggleAlertEditCol}
        />
      </div>
    );
  };

  onRuleCreate = (text, value, propvalue) => {
    this.props.onAddRuleClick(
      config.geometryToFeatureStyleType(this.props.geometry.type),
      null,
      {
        property: propvalue || (text === 'id' ? '__id' : text),
        value,
        operator: 'eq',
      },
      `${text} = ${value}`
    );
  };

  onEdit = (e, text) => {
    const textareaInput = e.target ? e.target.value : e;
    const spaceId = _.has(
      this.props.properties['@ns:com:here:xyz'],
      'upstreamSpaces'
    )
      ? this.props.properties['@ns:com:here:xyz'].upstreamSpaces[0]
      : this.props.properties['@ns:com:here:xyz'].space;

    const featureId = this.props.id;
    let newProperty = '';
    let keys = [];

    if (text.indexOf(':') !== -1) {
      keys = text.split(':');
      newProperty = { [keys[0]]: { [keys[1]]: textareaInput } };
    }
    this.props.onFeaturePropEdit(
      spaceId,
      featureId,
      text,
      textareaInput,
      newProperty
    );
  };

  checkOpenLayer() {
    const { currentLayer } = this.props;

    return currentLayer.meta.tags;
  }

  getFeatureProps = () => {
    const props = [];
    // const isVSSpace = !this.props.currentLayer.virtualSpace; // temporary disabling data table editing for Virtual space
    const isVSSpace = true;
    const gisPropertyKeys = Object.keys(gisPropertyTexts);
    _.forOwn(this.props.properties, (p, k) => {
      if (
        ['@ns:com:here:xyz', '@ns:com:here:editor', ...gisPropertyKeys].indexOf(
          k
        ) === -1
      ) {
        if (typeof p === 'object') {
          for (const propertyKey in p) {
            const np = `${k}:${propertyKey}`;
            props.push(this.featureProp(np, p[propertyKey], isVSSpace));
          }
        } else {
          props.push(this.featureProp(k, p, isVSSpace));
        }
      }
    });
    return props.length ? (
      props
    ) : (
      <p className={style.noprops}>This feature has no properties yet.</p>
    );
  };

  getSpatialProps = () => {
    const props = [];
    _.forOwn(this.props.properties, (p, k) => {
      if (Object.keys(gisPropertyTexts).indexOf(k) > -1) {
        props.push(this.featureProp(gisPropertyTexts[k], p, false, false));
      }
    });
    if (props.length > 0) {
      props.push(<span className={style.separator} />);
    }
    return props;
  };

  render() {
    const { lastSave, id, geometry, properties, currentLayer } = this.props;

    const spaceId = _.has(properties['@ns:com:here:xyz'], 'upstreamSpaces')
      ? properties['@ns:com:here:xyz'].upstreamSpaces[0]
      : properties['@ns:com:here:xyz'].space;

    return (
      <div className={style.wrapper}>
        <div className={style.lastSaveWrapper}>
          {lastSave && (
            <span className={style.lastSave}>
              {`Saved at ${moment(lastSave).format('HH:mm')}`}
            </span>
          )}
        </div>
        <div className={style.featureProps}>
          {this.getSpatialProps()}
          {this.getFeatureProps()}
          <span className={style.separator} />
          {this.featureProp('Feature ID', id, false, true, 'id')}
          {this.featureProp('Geometry', geometry.type, false, false)}
          {currentLayer.virtualSpace &&
            this.featureProp('Source Space ID', spaceId, false, false)}
        </div>
      </div>
    );
  }
}

export default ProjectLayerFeature;
