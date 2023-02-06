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
import Description from '../../components/Sidebar/Description/Description';

import style from './Desc.scss';

class Desc extends Component {
  state = {
    showDescription:
      (this.props.currentProject.publish_settings.display &&
        this.props.currentProject.publish_settings.display.description) ||
      false,
    description: this.props.currentProject.meta.description,
  };

  toggleSelection = () => {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription,
    }));
    if (this.props.dashboard) {
      this.props.onDescriptionToggle(
        this.props.currentProject.id,
        'name',
        !this.state.showDescription
      );
    } else {
      this.props.onDescriptionToggle(!this.state.showDescription);
    }
  };

  onKeyPress = () => {
    this.props.edit(this.state.description);
  };

  onEditChange = e => {
    e.preventDefault();

    this.setState({ description: e.target.value });
  };

  render() {
    const { showDescription, description } = this.state;
    const { edit } = this.props;

    return (
      <div
        className={
          showDescription ? `${style.wrapper} ${style.selected}` : style.wrapper
        }
      >
        <strong className={style.title}>Description:</strong>
        {/* <span className={style.field}>
          <textarea
            type="text"
            className={style.textarea}
            value={description}
            onBlur={this.onKeyPress}
            onChange={this.onEditChange}
          />
      </span> */}
        <span className={style.field}>
          <Description
            placeholder="Please add description here"
            description={description}
            edit={edit}
            removeHeader
          />
        </span>

        <div
          role="presentation"
          className={style.checkbox}
          onClick={this.toggleSelection}
        />
      </div>
    );
  }
}

export default Desc;
