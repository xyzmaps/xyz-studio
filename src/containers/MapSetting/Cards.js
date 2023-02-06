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
import style from './Cards.scss';

class Cards extends Component {
  state = {
    cards: this.props.active,
  };

  toggleSelection = () => {
    this.setState(prevState => ({ cards: !prevState.cards }));
    this.props.onCardToggle(!this.state.cards);
  };

  render() {
    const { cards } = this.state;
    const { label } = this.props;

    return (
      <div
        className={cards ? `${style.wrapper} ${style.selected}` : style.wrapper}
      >
        <strong className={style.title}>{`${label}:`}</strong>
        <div className={style.show}>{`Show ${label}`}</div>
        <div
          role="presentation"
          className={style.checkbox}
          onClick={this.toggleSelection}
        />
      </div>
    );
  }
}

export default Cards;
