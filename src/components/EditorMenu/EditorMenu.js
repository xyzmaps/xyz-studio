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
  Add,
  Edit,
  Reset,
  Undo,
  Redo,
  Save,
  Close,
  Polygon,
  Line,
  Pin,
  Trash,
  Transform,
  Reshape,
} from '../../icons';
import IconButton from '../IconButton/IconButton';
import PropertyFilterInfo from './PropertyFilterInfo';

import style from './EditorMenu.scss';

export default class EditorMenu extends Component {
  state = {
    addMenuToggle: false,
  };

  toggleAddMenu = toggle => {
    this.setState({
      addMenuToggle: toggle,
    });
  };

  onAddClick = () => {
    this.toggleAddMenu(!this.state.addMenuToggle);
    this.props.onAddClick();
  };

  onPolygonClick = () => {
    this.toggleAddMenu(false);
    this.props.onPolygonClick();
  };

  onLineClick = () => {
    this.toggleAddMenu(false);
    this.props.onLineClick();
  };

  onPointClick = () => {
    this.toggleAddMenu(false);
    this.props.onPointClick();
  };

  onLayerChange = e => {
    this.props.onLayerChange(e.target.value);
  };

  transformActive = () => this.props.action === 'transform';

  reshapeActive = () => this.props.action === 'reshape';

  disableUndo = () =>
    this.props.history.total_steps === 0 ||
    this.props.history.current_step === 0;

  disableRedo = () =>
    this.props.history.total_steps === this.props.history.current_step;

  disableSave = () =>
    this.props.history.total_steps === 0 ||
    this.props.history.current_step === 0;

  disableRevert = () => this.props.history.current_step === 0;

  disableTransform = () =>
    !this.props.currentFeature ||
    this.props.currentFeature.geometry.type === 'Point' ||
    !!this.props.drawing;

  disableReshape = () => !this.props.currentFeature || !!this.props.drawing;

  disableDelete = () => !this.props.currentFeature || !!this.props.drawing;

  render() {
    const {
      onToggleTooltip,
      saving,
      active,
      onToggle,
      onUndoClick,
      onRedoClick,
      onSaveClick,
      onResetClick,
      onTransformClick,
      onReshapeClick,
      onDeleteClick,
      drawing,
      currentLayer,
      projectLayers,
      filterRules,
      filteredFeatures,
      hexbin,
    } = this.props;
    const { addMenuToggle } = this.state;

    return (
      <div
        className={`${style.wrapper}`}
        onMouseOver={() => onToggleTooltip(false)}
        onFocus={() => onToggleTooltip(false)}
      >
        <IconButton
          disabled={saving || hexbin}
          active={active}
          onButtonClick={onToggle}
          tip={
            hexbin
              ? 'Edit Mode is not available when Hexbin is enabled'
              : 'Toggle Edit Mode'
          }
          tipx="left"
        >
          {active ? <Close /> : <Edit />}
        </IconButton>

        {active && (
          <div className={`${style.menu}`}>
            <span className={style.separator} />

            <IconButton
              disabled={this.disableUndo() || saving}
              onButtonClick={onUndoClick}
              tip="Undo action"
            >
              <Undo />
            </IconButton>
            <IconButton
              disabled={this.disableRedo() || saving}
              onButtonClick={onRedoClick}
              tip="Redo action"
            >
              <Redo />
            </IconButton>
            <IconButton
              disabled={this.disableSave()}
              active={saving}
              onButtonClick={onSaveClick}
              tip="Save"
            >
              {saving ? <span className={style.spinner} /> : <Save />}
            </IconButton>
            <IconButton
              disabled={this.disableRevert() || saving}
              onButtonClick={onResetClick}
              tip="Reset"
            >
              <Reset />
            </IconButton>

            <span className={style.separator} />

            <IconButton
              active={this.transformActive()}
              disabled={this.disableTransform() || saving}
              onButtonClick={onTransformClick}
              tip="Transform"
            >
              <Transform />
            </IconButton>
            <IconButton
              active={this.reshapeActive()}
              disabled={this.disableReshape() || saving}
              onButtonClick={onReshapeClick}
              tip="Reshape"
            >
              <Reshape />
            </IconButton>
            <IconButton
              disabled={this.disableDelete() || saving}
              onButtonClick={onDeleteClick}
              tip="Delete"
            >
              <Trash />
            </IconButton>

            <span className={style.separator} />

            <div>
              <IconButton
                disabled={saving || filteredFeatures}
                active={addMenuToggle || drawing}
                onButtonClick={this.onAddClick}
                tip="Add new feature"
              >
                {
                  <div>
                    {(() => {
                      switch (drawing) {
                        case 'Polygon':
                          return <Polygon />;
                        case 'Line':
                          return <Line />;
                        case 'Point':
                          return <Pin />;
                        default:
                          return <Add />;
                      }
                    })()}
                  </div>
                }
              </IconButton>
              {addMenuToggle && (
                <div className={style.addFeatureMenu}>
                  <IconButton onButtonClick={this.onPolygonClick}>
                    <Polygon />
                  </IconButton>
                  <IconButton onButtonClick={this.onLineClick}>
                    <Line />
                  </IconButton>
                  <IconButton onButtonClick={this.onPointClick}>
                    <Pin />
                  </IconButton>
                </div>
              )}
            </div>

            <div
              className={`${style.currentLayer} ${
                saving || filteredFeatures ? style.disabled : ''
              }`}
            >
              <select value={currentLayer.id} onChange={this.onLayerChange}>
                {projectLayers.map(l =>
                  !l.meta.tags ? (
                    <option key={l.id} value={l.id}>
                      {l.meta.title}
                    </option>
                  ) : (
                    ''
                  )
                )}
              </select>
              <span
                className={`${style.currentLayerValue} ${
                  saving ? style.disabled : ''
                }`}
              >
                {currentLayer.meta.title}
              </span>
            </div>
            {filteredFeatures && filteredFeatures.length ? (
              <PropertyFilterInfo
                filteredFeatures={filteredFeatures}
                filterRules={filterRules}
              />
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    );
  }
}
