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
import style from './CardPanel.scss';

export default class CardPanel extends Component {
  renderCards = () => {
    const items = [];

    _.flatten(this.props.cards).forEach((key, i) => {
      if (
        !_.isObject(this.props.properties[key]) &&
        !this.props.hiddenCards.includes(key)
      ) {
        items.push(
          i !== 0 && (
            <div key={key} className={style.item}>
              <p className={style.label}>{key}</p>
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
                  {this.props.properties[key]}
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
    const { onButtonClick, properties, cards } = this.props;
    return (
      <div className={style.wrapper}>
        <button
          className={style.button}
          type="button"
          onClick={() => onButtonClick(false)}
        >
          <Close />
        </button>

        <div className={style.container}>
          {/* what if fst card is hidden? */}
          <Linkify
            options={{
              attributes: {
                class: 'embedly-card',
                'data-card-key': 'dd82b6d5bba243b5bccaccf993dae3e0',
                'data-card-controls': 0,
              },
            }}
          >
            <h1 className={style.title}>{properties[cards[0][0]]}</h1>
          </Linkify>

          <div className={style.content}>{this.renderCards()}</div>
        </div>
      </div>
    );
  }
}
