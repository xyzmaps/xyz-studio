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

import ProjectLayersTitle from './ProjectLayersTitle';
import ProjectLayerButton from './ProjectLayerButton';
import BaseLayerButton from './BaseLayerButton';
import FeedbackLinks from '../../Feedback/Links';
import Description from '../Description/Description';
import { msbfptOpenSpaceId } from '../../../constants';

import style from './ProjectLayerButtons.scss';
import logEvent from '../../../utils/amplitudeLogger';

class ProjectLayerButtons extends Component {
  state = {
    layers: this.props.layers,
    baseLayerOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.layers) {
      // eslint-disable-next-line react/destructuring-assignment
      if (nextProps.layers.length !== this.state.length) {
        this.setState({ layers: nextProps.layers });
      }
    }
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? '#0F1621' : '#272D37',
    ...draggableStyle,
  });

  reorderLayer = (source, destination) => {
    const result = this.state.layers;
    const [removed] = result.splice(source, 1);
    result.splice(destination, 0, removed);
    return result;
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const newLayers = this.reorderLayer(
      result.source.index,
      result.destination.index
    );
    this.setState({ layers: newLayers });
    this.props.onLayerSort(newLayers);
  };

  geospaceNotAvailable = layerSpaceId =>
    !_.find(this.props.spaces, ({ id }) => id === layerSpaceId) &&
    layerSpaceId !== msbfptOpenSpaceId;

  render() {
    const { layers: layer, baseLayerOpen } = this.state;
    const layers = layer || [];
    const {
      currentProject,
      onLayerSelectClick,
      onLayerVisibilityClick,
      onLayerDeleteClick,
      onLayerRename,
      onDisabledLayerClick,
      currentLayer,
      upadteProjectDescription,
      lastSave,
      onAdd,
      onNew,
      onTileLayerChange,
      onThemeChange,
      onShowLabels,
      onBaseViewChange,
    } = this.props;
    const projectLayersButtons = layers.map((l, k) => {
      return (
        <Draggable key={l.id} draggableId={l.id} index={k}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={this.getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <ProjectLayerButton
                onLayerSelectClick={onLayerSelectClick}
                onLayerVisibilityClick={onLayerVisibilityClick}
                onLayerDeleteClick={onLayerDeleteClick}
                onLayerRename={onLayerRename}
                onDisabledLayerClick={onDisabledLayerClick}
                layerId={l.id}
                geospaceId={l.geospace.id}
                visible={l.visible}
                disabled={this.geospaceNotAvailable(l.geospace.id)}
                currentLayer={currentLayer}
                name={l.meta.title}
                key={l.id}
                virtualSpace={l.virtualSpace}
              />
            </div>
          )}
        </Draggable>
      );
    });

    return (
      <div className={style.wrapper}>
        <Description
          label="Project Description"
          placeholder="Please add description here"
          description={currentProject.meta.description}
          edit={upadteProjectDescription}
        />
        <ProjectLayersTitle lastSave={lastSave} onAdd={onAdd} onNew={onNew} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef}>
                {projectLayersButtons}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <BaseLayerButton
          onBaseLayerToggle={() => {
            this.setState({ baseLayerOpen: !baseLayerOpen });
            logEvent('basemap_toggle');
          }}
          baseLayerOpen={baseLayerOpen}
          base={currentProject.base}
          onTileLayerChange={onTileLayerChange}
          onThemeChange={onThemeChange}
          onShowLabels={onShowLabels}
          onBaseViewChange={onBaseViewChange}
        />

        <FeedbackLinks margin />
      </div>
    );
  }
}

export default ProjectLayerButtons;
