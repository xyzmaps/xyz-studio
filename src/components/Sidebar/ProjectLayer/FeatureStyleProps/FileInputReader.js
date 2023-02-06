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
import 'react-input-range/lib/css/index.css';

import StyleLabel from './StyleLabel';

import style from './FileInputReader.scss';

class FileInputReader extends Component {
  state = {
    value: this.props.currentValue,
    error: false,
  };

  handleChange = e => {
    this.setState({ error: false });
    const file = e.target.files[0];
    let reader;

    if (!file) return;

    if (Math.round(file.size / 1000) <= 256) {
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState({
          value: reader.result,
        });

        this.onChangeCompleted();
      };
    } else {
      this.setState({
        error: true,
      });
    }
  };

  onChangeCompleted = () => {
    this.props.update({
      geometry: this.props.geometryType,
      style: this.props.styleType,
      value: this.state.value,
      marker: this.props.marker,
    });
  };

  render() {
    const { value, error } = this.state;
    const { label } = this.props;

    return (
      <div>
        <StyleLabel text={label} />
        <div className={style.wrapper}>
          <div className={style.inputWrapper}>
            <div className={style.previewImage}>
              {value && <img alt="marker" src={value} />}
            </div>
            <div className={style.inputFile}>
              <span className={style.inputFileBtn}>Select file</span>
              <input type="file" onChange={this.handleChange} />
            </div>
          </div>
          {error && (
            <span className={style.inputError}>Error: File to big</span>
          )}
        </div>
      </div>
    );
  }
}

export default FileInputReader;
