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

import { getStyleValue } from '../../../../helpers';
import Accordion from '../Accordion';
import AddNewBtn from '../../../Common/AddNewBtn';
import Toggle from '../../../Common/Toggle';
import Color from '../FeatureStyleProps/Color';
import NumberInput from '../FeatureStyleProps/NumberInput';
import SelectInput from '../../SelectInput/SelectInput';
import TextFeatureStyle from '../FeatureStyleProps/TextFeatureStyle';
import style from './Layout.scss';

const geometryType = 'Line';

class Line extends Component {
  state = {
    rules: this.props.styleRules,
    msg: false,
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

  update = (data, ruleId) => {
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
            {this.getAccordion(ruleId, k, name, provided, 'popup', true)}
          </div>
        )}
      </Draggable>
    );
  };

  getAccordion = (ruleId, k, name, provided, action, noShape = true) => {
    const { isHexbinEnabled } = this.props;
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
      this.props.currentLayer.geometryStyle.includes('Line')
    )
      active = true;
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
        featureType="Line"
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
                  featureType="Line"
                  onToggle={this.onToggle}
                  active={active}
                  disabled={
                    !active
                      ? isHexbinEnabled || this.props.largeData
                      : isHexbinEnabled
                  }
                  toolTipText={toolTipText}
                  loader={this.props.colorLoader}
                  showtip
                  small
                />
                {this.state.msg && !this.props.colorLoader && (
                  <div className={style.colorAdd}>On to view on the map</div>
                )}
              </div>
            )}
          <div className={style.row}>
            <div className={style.col}>
              <Color
                currentValue={getStyleValue(
                  this.props.styleGroups,
                  geometryType,
                  'stroke',
                  null,
                  ruleId
                )}
                label="Color"
                hue
                alpha
                styleProp="stroke"
                geometryType={geometryType}
                update={data => this.update(data, ruleId)}
              />
            </div>
            <div className={style.col}>
              <NumberInput
                min={0}
                currentValue={getStyleValue(
                  this.props.styleGroups,
                  geometryType,
                  'strokeWidth',
                  null,
                  ruleId
                )}
                label="Width"
                styleProp="strokeWidth"
                geometryType={geometryType}
                update={data => this.update(data, ruleId)}
                right
              />
            </div>
          </div>
          <div className={style.row}>
            <div className={style.col}>
              <SelectInput
                currentValue={getStyleValue(
                  this.props.styleGroups,
                  geometryType,
                  'strokeLinecap',
                  null,
                  ruleId
                )}
                label="Line Cap"
                styleProp="strokeLinecap"
                geometryType={geometryType}
                update={data => this.update(data, ruleId)}
              />
            </div>
            <div className={style.col}>
              <SelectInput
                currentValue={getStyleValue(
                  this.props.styleGroups,
                  geometryType,
                  'strokeLinejoin',
                  null,
                  ruleId
                )}
                label="Line Join"
                styleProp="strokeLinejoin"
                geometryType={geometryType}
                update={data => this.update(data, ruleId)}
              />
            </div>
          </div>

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
              fontSize={false}
              offset={false}
            />
          )}
        </div>
      </Accordion>
    );
  };

  getDefaultStyleRulesAccordion = () => {
    const defaultStyleLabel =
      (this.props.currentLayer.geometriesLabels &&
        this.props.currentLayer.geometriesLabels.Line &&
        this.props.currentLayer.geometriesLabels.Line.defaultStyleLabel) ||
      'Default line style';
    return this.getAccordion(null, 0, defaultStyleLabel, null, 'edit');
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
            text="Add new line style"
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

export default Line;
