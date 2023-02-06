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

import React from 'react';
import { Arrow } from '../../icons';
import style from './style.scss';

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false,
      selected:
        props.defaultVal && Object.keys(props.defaultVal)
          ? { ...props.defaultVal }
          : {},
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  componentDidMount() {
    const { defaultVal, onChange } = this.props;

    onChange({ ...defaultVal });
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  onChange = listItem => {
    this.setState(
      {
        selected: { ...listItem },
      },
      () => this.props.onChange(listItem)
    );
  };

  render() {
    const { placeholder, itemName, list, error } = this.props;
    const { selected, displayMenu } = this.state;

    return (
      <div className={style.wrapper}>
        <h3 className={style.title}>SELECT PLAN/APP ID</h3>

        <div>
          <button
            type="button"
            className={style.dropdown}
            onClick={this.showDropdownMenu}
          >
            <span>
              {selected[itemName] || placeholder || 'Select from the list'}
            </span>
            <Arrow />
          </button>

          {displayMenu && (
            <ul className={style.listWrapper}>
              {list.map(listItem => (
                <li key={listItem.id}>
                  <button type="button" onClick={() => this.onChange(listItem)}>
                    {listItem.dsAppName}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <span className={style.c}>{error}</span>
        </div>
      </div>
    );
  }
}

export default Dropdown;
