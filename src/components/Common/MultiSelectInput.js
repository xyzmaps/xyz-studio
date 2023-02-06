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

// reusable custom component for a Multiselect Input

import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import { Arrow } from '../../icons';

import style from './MultiSelectInput.scss';

class MultiSelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const count = nextProps.list.filter(l => {
      return l.selected;
    }).length;

    if (count === 0) {
      return { headerTitle: nextProps.title };
    }
    if (count === 1) {
      return { headerTitle: `(${count}) ${nextProps.titleHelper} selected` };
    }
    if (count > 1) {
      return { headerTitle: `(${count}) ${nextProps.titleHelper}s selected` };
    }

    return null;
  }

  handleClickOutside() {
    this.setState({
      listOpen: false,
    });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  render() {
    const { listOpen, headerTitle } = this.state;
    const { list, toggleItem } = this.props;

    return (
      <div className={style.ddwrapper}>
        <div
          role="presentation"
          className={`${style.ddheader} ${listOpen ? style.show : null}`}
          onClick={() => this.toggleList()}
        >
          <div className={style.ddheadertitle}>{headerTitle}</div>
          {listOpen ? <Arrow /> : <Arrow />}
        </div>
        <div className={style.ddcontainer}>
          {listOpen && (
            <ul className={style.ddlist}>
              {list.map(item => (
                <li
                  role="presentation"
                  className={item.selected && `${style.active}`}
                  key={item.title}
                  onClick={() => toggleItem(item.id, item.key)}
                >
                  <span>
                    <div role="presentation" className={style.checkbox} />
                  </span>
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default onClickOutside(MultiSelectInput);
