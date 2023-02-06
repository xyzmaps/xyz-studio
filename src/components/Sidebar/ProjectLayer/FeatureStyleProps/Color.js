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
import { SketchPicker, GithubPicker } from 'react-color';
import StyleLabel from './StyleLabel';
// import StyleValue from './StyleValue';
import config from '../../../../constants/styleGroupsConfig';

import style from './Color.scss';

class Color extends Component {
  state = {
    displayColorPicker: false,
    color: this.props.currentValue,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentDidUpdate(prevProps) {
    this.setColorState(prevProps);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  setColorState = prevProps => {
    if (this.props.currentValue !== prevProps.currentValue) {
      this.setState({
        color: this.props.currentValue,
      });
    }
  };

  update() {
    const { update: _update, geometryType, styleProp, styleType } = this.props;
    const { color } = this.state;
    // console.log(color);

    _update({
      geometry: geometryType,
      styleProp,
      styleType,
      value: color,
    });
  }

  handleChangeComplete = color => {
    // console.log(color);
    // let updatedColor;
    // if(typeof(color) !== Object)
    //   updatedColor = color;
    // else

    const updatedColor =
      color.rgb.a < 1
        ? `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
        : color.hex;

    this.setState(
      {
        color: updatedColor,
      },
      this.update
    );
  };

  handleClick = () => {
    this.setState(prevState => ({
      displayColorPicker: !prevState.displayColorPicker,
    }));
  };

  handleClickOutside = () => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.displayColorPicker &&
      !this.selectedColorRef.contains(event.target)
    ) {
      this.setState({ displayColorPicker: false });
    }
  };

  /**
   * Set the wrapper ref
   */
  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  RGBAToHexA = rgb => {
    // console.log(rgb);
    const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    const rgba = rgb
      .substr(5)
      .split(')')[0]
      .split(sep);

    let r = (+rgba[0]).toString(16);
    let g = (+rgba[1]).toString(16);
    let b = (+rgba[2]).toString(16);

    if (r.length === 1) r = `0${r}`;
    if (g.length === 1) g = `0${g}`;
    if (b.length === 1) b = `0${b}`;

    return `#${r}${g}${b}`;
  };

  render() {
    const { label, type, styleType } = this.props;
    const { color, displayColorPicker } = this.state;
    let renderPicker = () => (
      <div className={style.popover} ref={this.setWrapperRef}>
        <SketchPicker
          color={color}
          onChangeComplete={this.handleChangeComplete}
          presetColors={config.colors}
          width={250}
          disableAlpha={type === 'hex'}
        />
      </div>
    );

    if (styleType && styleType === 'Image') {
      renderPicker = () => (
        <div ref={this.setWrapperRef}>
          <GithubPicker
            color={color}
            onChangeComplete={this.handleChangeComplete}
            width={140}
            colors={config.colors.slice(0, 10)}
          />
        </div>
      );
    }
    return (
      <div className={style.container}>
        <StyleLabel text={label} />
        <div className={style.content}>
          <div
            role="presentation"
            className={style.swatch}
            onClick={this.handleClick}
            style={{ backgroundColor: color }}
            ref={node => {
              this.selectedColorRef = node;
            }}
          />
          <div className={style.hexInput}>
            {color && color.charAt(0) === '#'
              ? color.toUpperCase()
              : this.RGBAToHexA(color).toUpperCase()}
          </div>
          {/* <StyleValue
              input
              onInput={this.handleChangeComplete}
              value={color && color.charAt(0) === '#'
              ? color.toUpperCase()
              : this.RGBAToHexA(color).toUpperCase()}
              style={{ width: '70px',
               minWidth: 0,
               padding: '5px',
               display: 'inline-block',
               verticalAlign: 'top',
              marginLeft: '10px', }}
            /> */}
        </div>

        {displayColorPicker && renderPicker()}
      </div>
    );
  }
}

export default Color;
