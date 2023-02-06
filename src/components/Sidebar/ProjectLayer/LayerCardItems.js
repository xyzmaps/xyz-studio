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

import Accordion from './Accordion';
import { EyeOn, EyeOff } from '../../../icons';
import style from './LayerCardItems.scss';

class LayerCardItems extends Component {
  state = {
    items: this.props.items,
    cardsOpen: false,
  };

  // componentDidMount() {
  //   const { items, properties, onUpdateLayerCard } = this.props;
  //   const allProps = items;
  //   let hideCards = [];

  //   if (_.flatten(items).length !== properties.length) {
  //     hideCards = _.difference(properties, _.flatten(items));
  //     allProps[1] = _.concat(
  //       items[1],
  //       _.difference(properties, _.flatten(items))
  //     );

  //     this.setState(
  //       {
  //         items: allProps,
  //       },
  //       () => {
  //         onUpdateLayerCard(allProps, hideCards);
  //       }
  //     );
  //   }
  // }

  // can be removed
  componentWillReceiveProps(nextProps) {
    const { items } = this.props;

    if (nextProps.items && nextProps.items.length !== items.length) {
      this.setState({ items: nextProps.items });
    }
  }

  componentDidUpdate(prevProps) {
    this.setItemsState(prevProps);
  }

  setItemsState = prevProps => {
    if (
      _.flatten(this.props.items).length !== _.flatten(prevProps.items).length
    ) {
      this.setState({
        items: [...this.props.items],
      });
    }
  };

  // till here

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? '#0F1621' : '#272D37',
    ...draggableStyle,
  });

  onDragEnd = result => {
    const { items } = this.state;
    const { source, destination } = result;
    if (!destination) return;
    /* eslint-disable */
    const droppableIndex = (destination.droppableId === 'full') | 0;
    /* eslint-enable */
    if (source.droppableId === destination.droppableId) {
      const newItemsSubset = this.reorderItems(
        droppableIndex,
        result.source.index,
        result.destination.index
      );

      const newStateItems = [...items];

      newStateItems[droppableIndex] = newItemsSubset;

      this.setState({ items: newStateItems });

      this.props.onCardItemsSort(newStateItems);
    } else {
      const newItems = this.moveItem(source, destination, droppableIndex);
      this.setState({ items: newItems });
      this.props.onCardItemsSort(newItems);
    }
  };

  moveItem = (source, destination, droppableIndex) => {
    const result = [];
    const newSource = _.without(
      this.state.items[1 - droppableIndex],
      this.state.items[1 - droppableIndex][source.index]
    );
    const newDestination = [...this.state.items[droppableIndex]];
    newDestination.splice(
      destination.index,
      0,
      this.state.items[1 - droppableIndex][source.index]
    );

    result[1 - droppableIndex] = newSource;
    result[droppableIndex] = newDestination;
    return result;
  };

  reorderItems = (droppableIndex, source, destination) => {
    const result = this.state.items[droppableIndex];
    const [removed] = result.splice(source, 1);
    result.splice(destination, 0, removed);
    return result;
  };

  onToggleHideCard = (e, item) => {
    e.stopPropagation();
    // this.setState(prevState => ({
    //   hiddenCards: [...prevState.hiddenCards, item],
    // }));
    this.props.onToggleHideCard(item);
  };

  render() {
    const { items, cardsOpen } = this.state;
    const { hiddenCards } = this.props;

    const cardItems = items.map(set => {
      return set.map((item, j) => {
        return (
          <Draggable key={item} draggableId={item} index={j}>
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
                <div className={style.layerCardItem} key={item}>
                  <span className={style.cardText}>
                    {item === '__id' ? 'id' : item}
                  </span>
                  <div className={style.cardVisibility}>
                    <span
                      role="presentation"
                      onClick={e => {
                        this.onToggleHideCard(e, item);
                      }}
                    >
                      {!hiddenCards.includes(item) ? (
                        <EyeOn className={style.iconHide} />
                      ) : (
                        <EyeOff
                          className={`${style.iconHide} ${style.eyeOff}`}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        );
      });
    });

    return (
      <div className={style.layerCardAccordion}>
        <Accordion
          title="Cards"
          isOpen={cardsOpen}
          noShape
          onToggle={() => this.setState({ cardsOpen: !cardsOpen })}
        >
          <p className={style.layerCardTip}>
            Drag items to set the card structure. Items above the line will be
            displayed in both the preview and full cards. Items below the line
            will only be displayed in the full cards.
          </p>
          <div className={style.wrapper}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="summary">
                {provided => (
                  <div ref={provided.innerRef} className={style.layerCardDrop}>
                    {cardItems[0]}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <span className={style.layerCardDropSepearator} />
              <Droppable droppableId="full">
                {provided => (
                  <div ref={provided.innerRef} className={style.layerCardDrop}>
                    {provided.placeholder}
                    {cardItems[1]}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Accordion>
      </div>
    );
  }
}

export default LayerCardItems;
