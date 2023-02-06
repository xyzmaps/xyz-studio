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

import {
  Arrow,
  Gear,
  Edit,
  EyeOn,
  EyeOff,
  CardsIcon,
  AttributeIcon,
  BaseMapIcon,
  HexBinIcon,
  TagsIcon,
  SpatialAnalysisIcon,
} from '../../../icons';
import LegendIcon from '../../Common/LegendIcon';
import style from './Accordion.scss';

export default class Accordion extends Component {
  state = {
    editMode: false,
    label: 'Default style',
  };

  componentDidMount = () => {
    if (this.props.actions === 'edit')
      this.setState({ label: this.props.title });
  };

  getAccordionClasses = () => {
    if (this.props.isOpen) {
      return `${style.layerAccordion} ${style.active}`;
    }
    return `${style.layerAccordion}`;
  };

  getAccordionContentClasses = () => {
    if (this.props.geometry) {
      return `${style.layerAccordionContent} ${style.geometryContent}`;
    }

    return `${style.layerAccordionContent}`;
  };

  onPopupActionClick = e => {
    e.stopPropagation();
    this.props.onActionClick();
  };

  onEditActionClick = e => {
    e.stopPropagation();
    this.setState({ editMode: true });
  };

  onToggleHideClick = (e, featureType) => {
    e.stopPropagation();
    this.props.onToggleHideClick(featureType);
  };

  onLabelChange = e => {
    e.preventDefault();
    this.setState({ label: e.target.value });
  };

  onBackdropClick = e => {
    e.stopPropagation();
    this.setState({ editMode: false });

    if (this.state.label === '') {
      this.setState({ label: `Default ${this.props.featureType} style` });
    } else {
      this.setState(prevState => ({
        label: prevState.label,
      }));
    }

    this.props.updateDefaultStyleLabel(
      this.state.label,
      this.props.featureType
    );
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.setState({ editMode: false });

      if (this.state.label === '') {
        this.setState({ label: `Default ${this.props.featureType} style` });
      } else {
        this.setState(prevState => ({
          label: prevState.label,
        }));
      }

      this.props.updateDefaultStyleLabel(
        this.state.label,
        this.props.featureType
      );
    }
  };

  editableAccordionTitle = () => {
    return (
      <div className={style.defaultLable}>
        {!this.state.editMode ? (
          <span className={style.label}>{this.state.label}</span>
        ) : (
          <div className={style.edit}>
            <span
              role="presentation"
              className={style.backdrop}
              onClick={this.onBackdropClick}
            />
            <input
              type="text"
              onClick={e => e.stopPropagation()}
              onChange={this.onLabelChange}
              value={this.state.label}
              autoFocus={this.state.editMode}
              onKeyPress={this.onKeyPress}
            />
          </div>
        )}
      </div>
    );
  };

  isGeometryHiden = featureType => {
    let feat = featureType;

    if (
      featureType.toLowerCase().includes('Point'.toLowerCase()) ||
      featureType === 'Circle'
    )
      feat = 'Point';

    if (featureType.toLowerCase().includes('Line'.toLowerCase())) feat = 'Line';

    if (featureType.toLowerCase().includes('Polygon'.toLowerCase()))
      feat = 'Polygon';

    if (
      this.props.currentLayer.geometryVisibility &&
      this.props.currentLayer.geometryVisibility.includes(feat)
    ) {
      return true;
    }

    return false;
  };

  eyeIconwithAction = featureType => {
    return (
      <span
        role="presentation"
        className={this.isGeometryHiden(featureType) ? style.iconSelected : ''}
        onClick={e => {
          this.onToggleHideClick(e, featureType);
        }}
      >
        {!this.isGeometryHiden(featureType) ? (
          <EyeOn className={style.iconHide} />
        ) : (
          <EyeOff className={`${style.iconHide} ${style.eyeOff}`} />
        )}
      </span>
    );
  };

  eyeIconWithoutAction = () => {
    return (
      <span className={style.iconSelected}>
        <EyeOff className={`${style.iconHide} ${style.eyeOff}`} />
      </span>
    );
  };

  render() {
    const {
      type,
      draggable,
      onToggle,
      draggableProps,
      title,
      noShape,
      currentLayer,
      featureType,
      ruleId,
      actions,
      isOpen,
      children,
    } = this.props;

    return (
      <div
        className={` ${style.layerAccordionWrapper} ${
          type === 'nested' ? style.nested : ''
        } ${draggable ? style.draggable : ''} `}
      >
        <div
          role="presentation"
          className={this.getAccordionClasses()}
          onClick={onToggle}
          {...draggableProps}
        >
          {title !== 'Base Map' &&
            title !== 'Attribution' &&
            title !== 'Cards' &&
            title !== 'Hexbin' &&
            title !== 'Tags' &&
            title !== 'Spatial Analysis' &&
            noShape && (
              <LegendIcon
                currentLayer={currentLayer}
                featureType={featureType}
                ruleId={ruleId}
                accordionAction={actions}
              />
            )}

          {title === 'Cards' && <CardsIcon className={style.icon} />}
          {title === 'Attribution' && (
            <AttributeIcon className={style.attrIcon} />
          )}
          {title === 'Base Map' && (
            <BaseMapIcon className={style.basemapIcon} />
          )}
          {title === 'Hexbin' && <HexBinIcon className={style.icon} />}

          {title === 'Spatial Analysis' && (
            <SpatialAnalysisIcon className={style.icon} />
          )}

          {title === 'Tags' && <TagsIcon className={style.attrIcon} />}

          <span className={style.label}>
            {actions === 'edit' ? this.editableAccordionTitle() : title}
          </span>

          <div>
            {actions === 'popup' && (
              <div className={style.layerAccordionActions}>
                <span role="presentation" onClick={this.onPopupActionClick}>
                  <Gear className={style.iconGear} />
                </span>
              </div>
            )}
            {actions === 'edit' && (
              <div className={style.layerAccordionActions}>
                <span role="presentation" onClick={this.onEditActionClick}>
                  <Edit className={style.iconEdit} />
                </span>
              </div>
            )}
            {actions === 'hide' && (
              <div className={style.layerAccordionActions}>
                {this.props.hexbin
                  ? this.eyeIconWithoutAction()
                  : this.eyeIconwithAction(featureType)}
              </div>
            )}

            {title !== 'Line Length' && title !== 'Polygon Area' && (
              <Arrow className={style.iconArrow} />
            )}
          </div>
        </div>

        {isOpen && (
          <div className={this.getAccordionContentClasses()}>{children}</div>
        )}
      </div>
    );
  }
}
