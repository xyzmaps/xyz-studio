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

const Badge = styled.span`
  position: absolute;
  font-family: monospace;
  background-color: var(--reactour-accent);
  height: 1.875em;
  line-height: 2;
  padding-left: 0.8125em;
  padding-right: 0.8125em;
  font-size: 1em;
  border-radius: 1.625em;
  color: white;
  text-align: center;
  box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.3);
  top: -0.8125em;
  left: -0.8125em;
`;

export default Badge;
