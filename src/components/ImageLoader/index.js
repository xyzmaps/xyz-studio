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
import styles from './style.scss';

class ImageLoader extends React.Component {
  // define our loading and loaded image classes
  static defaultProps = {
    onClick: () => {},
    onLoad: () => {},
    onError: () => {},
    alt: 'Unnamed Image',
    className: '',
    loadingClassName: `${styles.imgLoading}`,
    loadedClassName: `${styles.imgLoaded}`,
  };

  // initial state: image loaded stage
  state = {
    imgSrc: this.props.src,
    loaded: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.src !== prevState.imgSrc) {
      return {
        imgSrc: nextProps.src,
        loaded: false,
      };
    }

    return null;
  }

  // image onLoad handler to update state to loaded
  onLoad = () => {
    this.setState(() => ({ loaded: true }));
    this.props.onLoad();
  };

  onError = () => {
    this.props.onError();
  };

  render() {
    const {
      className,
      loadedClassName,
      loadingClassName,
      alt,
      onClick,
    } = this.props;
    const { loaded, imgSrc } = this.state;

    const classNames = `${className} ${
      loaded ? loadedClassName : loadingClassName
    }
      `;

    return (
      <img
        role="presentation"
        src={imgSrc}
        onClick={onClick}
        className={classNames}
        onLoad={this.onLoad}
        onError={this.onError}
        alt={alt}
      />
    );
  }
}

export default ImageLoader;
