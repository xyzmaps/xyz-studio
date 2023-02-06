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
import Linkify from 'linkifyjs/react';
import { Close } from '../../icons';

// styles
import style from './Card.scss';

export default class Card extends Component {
  getCardPosition = () => {
    const p = this.props.position;
    const w = this.props.parent.offsetWidth || window.innerWidth;
    const h = this.props.parent.offsetHeight || window.innerHeight;
    const threshold = 350;
    const offsetX = w - p.x;
    const offsetY = h - p.y;
    const tx = (offsetX < threshold || 0) * -100;
    const ty = (offsetY < threshold || 0) * -100;
    const cardHeight = Math.min(p.y < h - threshold ? offsetY : p.y, 450);

    return {
      left: `${p.x}px`,
      top: `${p.y}px`,
      transform: `translate(${tx}%, ${ty}%)`,
      maxHeight: `${cardHeight}px`,
    };
  };

  renderCards = firstItemKey => {
    const items = [];

    this.props.cards[0].forEach((key, i) => {
      let k = key;
      if (key === '__id') {
        k = 'id';
      }
      if (
        !_.isObject(this.props.properties[k]) &&
        !this.props.hiddenCards.includes(k) &&
        k !== firstItemKey
      ) {
        items.push(
          i !== 0 && (
            <div key={k} className={style.item}>
              <p className={style.label}>{k}</p>
              <p className={style.text}>
                <Linkify
                  options={{
                    attributes: {
                      class: 'embedly-card',
                      'data-card-key': 'dd82b6d5bba243b5bccaccf993dae3e0',
                      'data-card-controls': 0,
                    },
                  }}
                >
                  {this.props.properties[k]}
                </Linkify>
              </p>
            </div>
          )
        );
      }
    });

    return items;
  };

  render() {
    const {
      cards,
      onClose,
      properties,
      onButtonClick,
      buttonText,
      hiddenCards,
    } = this.props;
    let firstItemKey;
    for (const k of cards[0]) {
      if (!hiddenCards.includes(k)) {
        firstItemKey = k;
        break;
      }
    }

    if (cards[0][0] === '__id') {
      firstItemKey = 'id';
    }

    return (
      <div className={style.wrapper} style={this.getCardPosition()}>
        <button type="button" className={style.close} onClick={onClose}>
          <Close />
        </button>

        <div className={style.container}>
          <p className={style.label}>{firstItemKey}</p>
          <h1 className={style.title}>
            <Linkify
              options={{
                attributes: {
                  class: 'embedly-card',
                  'data-card-key': 'dd82b6d5bba243b5bccaccf993dae3e0',
                  'data-card-controls': 0,
                },
              }}
            >
              {properties[firstItemKey]}
            </Linkify>
          </h1>
          <div className={style.content}>{this.renderCards(firstItemKey)}</div>
        </div>

        {onButtonClick && (
          <button
            className={style.button}
            type="button"
            onClick={() => onButtonClick(true)}
          >
            {buttonText}
          </button>
        )}
      </div>
    );
  }
}
