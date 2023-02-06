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
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

import style from './Notice.scss';

class Notice extends Component {
  state = {
    active: false,
  };

  componentDidUpdate(prevProps) {
    const { notice } = this.props;

    if (prevProps.notice.time !== notice.time) {
      this.updateActive();

      window.setTimeout(
        () => {
          this.setState({
            active: false,
          });
        },
        notice.duration ? notice.duration : 3000
      );
    }
  }

  updateActive = () => {
    this.setState({
      active: true,
    });
  };

  render() {
    const { notice } = this.props;
    const { active } = this.state;

    const defaultStyle = {
      transition: 'all .4s ease-in-out',
      opacity: 0,
      transform: 'translateX(120%)',
    };

    const transitionStyles = {
      entering: { opacity: 0, transform: 'translateX(120%)' },
      entered: { opacity: 1, transform: 'translateX(0)' },
    };

    return (
      <Transition
        in={active}
        timeout={{
          enter: 0,
          exit: 400,
        }}
      >
        {state => (
          <div
            className={`${style.notice}`}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div>{notice && notice.text}</div>
          </div>
        )}
      </Transition>
    );
  }
}

const s2p = state => ({
  notice: state.common.notice,
});

export default connect(s2p, null)(Notice);
