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
import { connect } from 'react-redux';

import { EyeOn, EyeOff, Trash, Edit, ExclamationPoint } from '../../../icons';
import style from './ProjectLayerButton.scss';
import logEvent from '../../../utils/amplitudeLogger';

const DisabledInfo = ({ onClick }) => {
  return (
    <i role="presentation" onClick={onClick} className={style.disabledInfo}>
      <ExclamationPoint />
    </i>
  );
};

class ProjectLayerButton extends Component {
  state = {
    editMode: false,
    currentValue: this.props.name,
    untitledLayer: 'Untitled Layer',
  };

  shouldComponentUpdate(newProps) {
    const { name } = this.props;
    if (newProps.name !== name) {
      this.setState({
        currentValue: newProps.name,
      });
    }
    return true;
  }

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.sendNameToParent(e.target.value);
    }
    return true;
  };

  onNameChange = e => {
    e.preventDefault();
    const newName = e.target.value;
    this.setState({
      currentValue: newName,
    });
  };

  onFocusOut = e => {
    this.sendNameToParent(e.target.value);
  };

  onEditClick = e => {
    logEvent('edit_layer_name');
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      editMode: true,
    });
  };

  onBackdropClick = e => {
    e.stopPropagation();
    this.sendNameToParent();
  };

  onButtonClick = e => {
    if (!this.state.editMode && !this.props.disabled) {
      if (!this.props.currentLayer) {
        this.props.onLayerSelectClick(e, this.props.layerId);
      } else if (this.props.currentLayer.id !== this.props.layerId) {
        this.props.onLayerSelectClick(e, this.props.layerId);
      }
    }
  };

  sendNameToParent(name) {
    const { onLayerRename, layerId } = this.props;
    const { currentValue, untitledLayer } = this.state;
    const newName = name || currentValue || untitledLayer;
    this.setState({ editMode: false, currentValue: newName });
    onLayerRename(newName, layerId);
  }

  render() {
    const {
      layerId,
      currentLayer,
      geospaceId,
      disabled,
      onDisabledLayerClick,
      visible,
      onLayerVisibilityClick,
      onLayerDeleteClick,
      newlyAddedLayer,
      virtualSpace,
    } = this.props;
    const { editMode, currentValue } = this.state;
    const layerButtonClassNames = [style.layerButton];

    if (currentLayer && currentLayer.id === layerId) {
      layerButtonClassNames.push(style.active);
    }

    if (disabled) {
      layerButtonClassNames.push(style.disabled);
    }

    return (
      <div
        role="presentation"
        className={layerButtonClassNames.join(' ')}
        onClick={this.onButtonClick}
      >
        {!editMode ? (
          <>
            <span
              className={`${style.layerLabel} ${
                !visible ? style.layerLabelDisabled : ''
              }`}
            >
              {disabled && (
                <DisabledInfo
                  onClick={() => onDisabledLayerClick(geospaceId)}
                />
              )}
              <span
                className={
                  currentValue === 'Building Footprints' ||
                  geospaceId === newlyAddedLayer
                    ? style.greenTitle
                    : ''
                }
              >
                {currentValue}
              </span>
            </span>
          </>
        ) : (
          <div className={style.layerButtonNameEdit}>
            <span className={style.layerLabel}>&nbsp;</span>
            <span
              role="presentation"
              className={style.layerButtonNameEditBackdrop}
              onClick={this.onBackdropClick}
            />
            <input
              type="text"
              onChange={this.onNameChange}
              value={currentValue}
              autoFocus={editMode}
              onKeyPress={this.onKeyPress}
              onBlur={this.onFocusOut}
            />
          </div>
        )}
        {virtualSpace ? <span className={style.vsInfo}>Virtual</span> : null}
        <ul className={style.layerControls}>
          {!disabled && currentValue !== 'Building Footprints' && (
            <li role="presentation" onClick={this.onEditClick}>
              <Edit />
            </li>
          )}
          <li
            role="presentation"
            onClick={e => {
              logEvent('delete_layer');
              onLayerDeleteClick(e, layerId);
            }}
          >
            <Trash />
          </li>
          {!disabled && (
            <li
              role="presentation"
              className={!visible ? style.iconSelected : ''}
              onClick={e => {
                logEvent('hide_layer', { hide: !visible });
                onLayerVisibilityClick(e, layerId);
              }}
            >
              {visible ? <EyeOn /> : <EyeOff />}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const s2p = state => ({
  newlyAddedLayer: state.common.newlyAddedLayer,
});

export default connect(s2p, null)(ProjectLayerButton);
