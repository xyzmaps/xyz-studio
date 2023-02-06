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
import ReactDOM from 'react-dom';
import TourPortal from './TourPortal';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

function getParentElement(parentSelector) {
  return parentSelector();
}

class Tour extends Component {
  static defaultProps = {
    isOpen: false,
    portalClassName: 'reactour-portal',
    closeWithMask: true,
    parentSelector() {
      return document.body;
    },
  };

  componentDidMount() {
    const { portalClassName, parentSelector } = this.props;
    this.node = document.createElement('div');
    this.node.className = portalClassName;
    const parent = getParentElement(parentSelector);
    parent.appendChild(this.node);
    this.renderPortal(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { parentSelector } = this.props;
    const currentParent = getParentElement(parentSelector);
    const newParent = getParentElement(nextProps.parentSelector);

    if (newParent !== currentParent) {
      currentParent.removeChild(this.node);
      newParent.appendChild(this.node);
    }

    this.renderPortal(nextProps);
  }

  componentWillUnmount() {
    this.removePortal();
  }

  renderPortal(props) {
    if (props.isOpen) {
      document.body.classList.add('reactour__body');
    } else {
      document.body.classList.remove('reactour__body');
    }

    this.portal = renderSubtreeIntoContainer(
      this,
      <TourPortal {...props} />,
      this.node
    );
  }

  removePortal() {
    const { parentSelector } = this.props;
    ReactDOM.unmountComponentAtNode(this.node);
    const parent = getParentElement(parentSelector);
    parent.removeChild(this.node);
    document.body.classList.remove('reactour__body');
  }

  render() {
    return null;
  }
}

export default Tour;
