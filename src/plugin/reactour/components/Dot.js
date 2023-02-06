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

import styled from 'styled-components';

const Dot = styled.button`
  counter-increment: dot;
  width: 8px;
  height: 8px;
  border: 1px solid;
  border-radius: 100%;
  padding: 0;
  display: block;
  margin: 4px;
  outline: 0;
  transition: opacity 0.3s, transform 0.3s;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transform: scale(${props => (props.current === props.index ? 1.25 : 1)});
  color: ${props =>
    props.current === props.index ? 'var(--reactour-accent)' : '#caccce'};
  background-color: ${props =>
    props.current === props.index ? 'var(--reactour-accent)' : 'transparent'};

  &:before {
    content: counter(dot);
    position: absolute;
    bottom: calc(100% + 0.25em);
    left: 50%;
    opacity: 0;
    transform: translate(-50%, 1em);
    transition: 0.3s;
    display: ${props => (props.showNumber ? 'block' : 'none')};
  }

  &:hover {
    background-color: currentColor;

    &:before {
      opacity: 0.5;
      transform: translate(-50%, -2px);
    }
  }
`;

export default Dot;
