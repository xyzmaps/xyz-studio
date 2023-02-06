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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import { getStyleValue } from '../../../../helpers';
import Accordion from '../Accordion';
import AddNewBtn from '../../../Common/AddNewBtn';
import Toggle from '../../../Common/Toggle';
import Color from '../FeatureStyleProps/Color';
import NumberInput from '../FeatureStyleProps/NumberInput';
import TextFeatureStyle from '../FeatureStyleProps/TextFeatureStyle';
import CircleShape from '../FeatureStyleProps/CircleShape';
import IconFeatureStyle from '../FeatureStyleProps/IconFeatureStyle';
import config from '../../../../constants/styleGroupsConfig';
import style from './Layout.scss';

const geometryType = 'Point';

class Circle extends Component {
  state = {
    rules: this.props.styleRules,
    msg: false,
    noShape: false,
  };

  componentDidMount = () => {
    this.setState({
      msg: false,
    });
  };

  componentDidUpdate(prevProps) {
    this.setRulesState(prevProps);
  }

  setRulesState = prevProps => {
    if (this.props.styleRules !== prevProps.styleRules) {
      this.setState({
        rules: this.props.styleRules,
      });
    }
  };

  onToggle = (featureType, active) => {
    this.setState(
      {
        msg: active,
      },
      () => this.props.onToggleColor(featureType)
    );
  };

  getPointStyleValue = (styleProp, ruleId) => {
    const id = ruleId ? `_${ruleId}` : '';

    const pointStyle = this.props.styleGroups[
      `${config.geometryToLayerStyle('Point')}${id}`
    ];

    const styled = pointStyle.slice(0, 2);
    let currentValue;

    switch (styleProp) {
      case 'size':
        currentValue = styled[0] && styled[0].height;
        break;
      case 'stroke':
        currentValue = styled[1] && styled[1].fill;
        break;
      case 'strokeWidth':
        currentValue =
          styled[0] && Math.round((styled[1].height - styled[0].height) / 2);
        break;
      default:
        currentValue = styled[0] && styled[0][styleProp];
    }
    return currentValue;
  };

  setPointStyleGeometies = () => {
    const pointStyleGeometries = {};
    const sr = this.props.styleRules && this.props.styleRules.Point;
    if (sr) {
      sr.forEach(rule => {
        const currentStyleGroup = this.props.styleGroups[
          `${config.geometryToLayerStyle('Point')}_${rule.id}`
        ];
        const styleGroup = _.find(
          currentStyleGroup,
          sg => ['Rect', 'Circle'].indexOf(sg.type) !== -1
        );
        pointStyleGeometries[rule.id] = styleGroup ? styleGroup.type : 'none';
      });
    }
    const currentStyleGroup = this.props.styleGroups[
      config.geometryToLayerStyle('Point')
    ];
    const defaultStyleGroup = _.find(
      currentStyleGroup,
      sg => ['Rect', 'Circle'].indexOf(sg.type) !== -1
    );
    pointStyleGeometries.default = defaultStyleGroup
      ? defaultStyleGroup.type
      : 'none';

    return pointStyleGeometries;
  };

  update = (data, ruleId) => {
    this.props.update(data, ruleId);
  };

  updatePointShape = (data, ruleId) => {
    this.props.update(data, ruleId);
  };

  updatePointIcon = (data, ruleId) => {
    this.props.update(data, ruleId);
  };

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging && '#0F1621',
    ...draggableStyle,
  });

  reorderRules = (source, destination) => {
    const result = this.state.rules[geometryType];
    const [removed] = result.splice(source, 1);
    result.splice(destination, 0, removed);
    return result;
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const newRules = this.reorderRules(
      result.source.index,
      result.destination.index
    );
    this.setState(prevState => ({
      rules: { ...prevState.rules, [geometryType]: newRules },
    }));
    this.props.onStyleRulesSort(newRules, geometryType);
  };

  onDragStart = () => {};

  getDraggableAccordion = (ruleId, k, name) => {
    const legend = this.props.styleGroups[`pointStyle_${ruleId}`];
    const { type } = legend[0];
    const { opacity } = legend[2];
    const shapeWidth = legend[0].width;
    const shapeOutline = legend[0].width !== legend[1].width ? 1 : 0;
    const iconWidth = legend[2].width;
    const noShape = !(
      (type === 'none' && opacity === 0) ||
      (shapeWidth === 0 && shapeOutline === 0 && iconWidth === 0)
    );
    return (
      <Draggable key={ruleId} draggableId={ruleId} index={k - 1}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={this.getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {this.getAccordion(ruleId, k, name, provided, 'popup', noShape)}
          </div>
        )}
      </Draggable>
    );
  };

  toggleShape = () => {
    this.setState(
      prevState => ({
        noShape: !prevState.noShape,
      }),
      () => {
        this.props.update({
          geometry: geometryType,
          styleProp: 'shape',
          styleType: this.props.styleType,
          value: this.state.value,
        });
      }
    );
  };

  getAccordion = (ruleId, k, name, provided, action, noShape) => {
    const { isHexbinEnabled } = this.props;
    const id = ruleId ? `_${ruleId}` : '';
    const markerType = this.props.styleGroups[`pointStyle${id}`][0].type;
    let active = false;
    let toolTipText = '';

    if (this.props.largeData) {
      toolTipText =
        'Due to the size of this dataset, automatic color styling with a property value is not available.';
    } else if (isHexbinEnabled) {
      toolTipText = 'Color property is not available when Hexbin is enabled';
    } else if (!this.props.colorLoader) {
      toolTipText =
        'Automatically style with color property included in your data';
    } else {
      toolTipText = undefined;
    }

    if (
      this.props.currentLayer.geometryStyle &&
      this.props.currentLayer.geometryStyle.includes('Point')
    ) {
      active = true;
    }

    return (
      <Accordion
        key={k}
        type="nested"
        draggable={!!ruleId}
        draggableProps={provided ? provided.dragHandleProps : ''}
        actions={action}
        onActionClick={() =>
          this.props.onStyleRuleEditClick(geometryType, ruleId)
        }
        title={name}
        isOpen={this.props.currentStyleRulePanel === ruleId}
        onToggle={() => this.props.ruleAccordionClick(ruleId)}
        updateDefaultStyleLabel={this.props.updateDefaultStyleLabel}
        currentLayer={this.props.currentLayer}
        featureType="Point"
        ruleId={ruleId}
        noShape={noShape}
      >
        <div className={style.wrapper}>
          {!ruleId &&
            this.props.currentLayer.meta.title !== 'Building Footprints' &&
            !this.props.currentLayer.virtualSpace && (
              <div
                className={`${style.colorProp} ${
                  !this.props.largeData && !active ? style.disabled : ''
                }`}
              >
                COLOR PROPERTY{' '}
                <Toggle
                  featureType="Point"
                  onToggle={this.onToggle}
                  active={active}
                  disabled={
                    !active
                      ? isHexbinEnabled || this.props.largeData
                      : isHexbinEnabled
                  }
                  toolTipText={toolTipText}
                  small
                />
                {this.state.msg && !this.props.colorLoader && (
                  <div className={style.colorAdd}>On to view on the map</div>
                )}
              </div>
            )}
          <div className={style.sectionTitle}>MARKER</div>
          <div className={`${style.row} ${style.shaperow}`}>
            <CircleShape
              markerType={markerType}
              update={data => this.updatePointShape(data, ruleId)}
            />
          </div>
          {markerType !== 'none' && (
            <div>
              <div className={style.row}>
                <div className={style.col}>
                  <Color
                    currentValue={this.getPointStyleValue('fill', ruleId)}
                    label="Fill"
                    hue
                    styleProp="fill"
                    styleType={markerType}
                    geometryType={geometryType}
                    update={data => this.update(data, ruleId)}
                  />
                </div>
                <div className={style.col}>
                  <NumberInput
                    min={0}
                    currentValue={this.getPointStyleValue('size', ruleId)}
                    label="Size"
                    styleProp="size"
                    styleType={markerType}
                    geometryType={geometryType}
                    update={data => this.update(data, ruleId)}
                    right
                  />
                </div>
              </div>
              <div className={style.row}>
                <div className={style.col}>
                  <Color
                    currentValue={this.getPointStyleValue('stroke', ruleId)}
                    label="Stroke"
                    hue
                    styleProp="stroke"
                    styleType={markerType}
                    geometryType={geometryType}
                    update={data => this.update(data, ruleId)}
                  />
                </div>
                <div className={style.col}>
                  <NumberInput
                    min={0}
                    currentValue={this.getPointStyleValue(
                      'strokeWidth',
                      ruleId
                    )}
                    label="Width"
                    styleProp="strokeWidth"
                    styleType={markerType}
                    geometryType={geometryType}
                    update={data => this.update(data, ruleId)}
                    right
                  />
                </div>
              </div>
            </div>
          )}

          <IconFeatureStyle
            currentValue={getStyleValue(
              this.props.styleGroups,
              geometryType,
              null,
              'Image',
              ruleId
            )}
            ruleId={ruleId}
            update={data => this.updatePointIcon(data, ruleId)}
            onIconStyleToggle={this.props.onIconStyleToggle}
            geometryType={geometryType}
          />
          {!!this.props.featureProps.length && (
            <TextFeatureStyle
              currentValue={getStyleValue(
                this.props.styleGroups,
                geometryType,
                null,
                'Text',
                ruleId
              )}
              ruleId={ruleId}
              update={data => this.update(data, ruleId)}
              onTextStyleToggle={this.props.onTextStyleToggle}
              geometryType={geometryType}
              featureProps={this.props.featureProps}
              fontSize
              offset
            />
          )}
        </div>
      </Accordion>
    );
  };

  getDefaultStyleRulesAccordion = () => {
    const defaultStyleLabel =
      (this.props.currentLayer.geometriesLabels &&
        this.props.currentLayer.geometriesLabels.Point &&
        this.props.currentLayer.geometriesLabels.Point.defaultStyleLabel) ||
      'Default point style';

    const legend = this.props.styleGroups.pointStyle;
    const { type } = legend[0];
    const { opacity } = legend[2];
    const shapeWidth = legend[0].width;
    const shapeOutline = legend[0].width !== legend[1].width ? 1 : 0;
    const iconWidth = legend[2].width;
    const noShape = !(
      (type === 'none' && opacity === 0) ||
      (shapeWidth === 0 && shapeOutline === 0 && iconWidth === 0)
    );

    return this.getAccordion(null, 0, defaultStyleLabel, null, 'edit', noShape);
  };

  getStyleRulesAccordions = () => {
    const styleRules = this.state.rules
      ? this.state.rules[geometryType] || []
      : [];
    return styleRules.map(({ id, name }, k) =>
      this.getDraggableAccordion(id, k + 1, name)
    );
  };

  render() {
    const { onAddNewRuleClick } = this.props;

    return (
      <div>
        <div className={style.addNewStyleCta}>
          <AddNewBtn
            text="Add new point style"
            onBtnClick={() => onAddNewRuleClick(geometryType)}
          />
        </div>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onBeforeDragStart={this.onDragStart}
        >
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef}>
                {this.getStyleRulesAccordions()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {this.getDefaultStyleRulesAccordion()}
      </div>
    );
  }
}

export default Circle;
