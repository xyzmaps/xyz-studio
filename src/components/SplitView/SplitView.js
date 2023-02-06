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

import { CloseRect, CollapseRect, ExpandRect, Table } from '../../icons';

import style from './SplitView.scss';

let HEIGHT = 0;
let DRAGGABLE_TABLE = null;
let START_RESIZE = false;

class DataTable extends React.PureComponent {
  state = {
    height: this.props.height,
  };

  componentDidMount() {
    this.updateHeight(this.props.height);
    DRAGGABLE_TABLE = document.getElementById('draggable-splitview');

    window.addEventListener('mousemove', this.onResize, false);
    window.addEventListener('mouseup', this.onResizeStop);
    window.addEventListener('mouseleave', this.onResizeStop);
  }

  componentDidUpdate(prevProps) {
    const { height } = this.props;

    if (height !== prevProps.height) {
      this.updateHeight(height);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onResize, false);
    window.removeEventListener('mouseup', this.onResizeStop);
    window.removeEventListener('mouseleave', this.onResizeStop);
  }

  updateHeight = height => {
    if (height !== 'auto') {
      this.setState({
        height,
      });
    }
  };

  onResizeStart = () => {
    START_RESIZE = true;
  };

  onResize = e => {
    if (
      START_RESIZE &&
      this.containerRef &&
      e.clientY > 10 &&
      window.innerHeight - e.clientY > this.props.minResizeHeight
    ) {
      HEIGHT = window.innerHeight - e.clientY;
      DRAGGABLE_TABLE.style.height = `${HEIGHT}px`;
      this.props.resizeMap(null, e.clientY - 10);
    }
  };

  onResizeStop = () => {
    if (START_RESIZE) {
      START_RESIZE = false;
      this.updateHeight(HEIGHT || this.state.height);
    }
  };

  render() {
    const { height } = this.state;

    const { config, toggleTable, action, width, children } = this.props;

    return (
      <div
        className={style.container}
        ref={elem => {
          this.containerRef = elem;
        }}
        style={{
          width,
          height,
          transition: 'all 0.2s',
          bottom: action === config.HIDE ? 0 : '12px',
        }}
        id="draggable-splitview"
      >
        <div
          role="presentation"
          onMouseDown={this.onResizeStart}
          className={style.actionBar}
        >
          <div className={style.barTitle}>
            <Table className={style.dataIcon} />

            <span>Data</span>
          </div>

          <span className={style.dragHandle} />

          <ul className={style.actionBtns}>
            <li
              onClick={() =>
                toggleTable(
                  action === config.MAXIMIZE ? config.MID : config.MAXIMIZE
                )
              }
              role="presentation"
            >
              {action === config.MAXIMIZE ? (
                <CollapseRect className={style.icon} />
              ) : (
                <ExpandRect className={style.icon} />
              )}
            </li>

            <li onClick={() => toggleTable(config.HIDE)} role="presentation">
              <CloseRect className={style.icon} />
            </li>
          </ul>
        </div>

        {children}
      </div>
    );
  }
}

export default DataTable;
