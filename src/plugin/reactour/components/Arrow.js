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
import styled from 'styled-components';
import SvgButton from './SvgButton';

const Label = styled.span`
  font-size: 12px;
  line-height: 1;
`;

function Arrow({ className, onClick, inverted, label, disabled }) {
  return (
    <SvgButton
      className={className}
      onClick={onClick}
      data-tour-elem={`${inverted ? 'right' : 'left'}-arrow`}
      disabled={disabled}
    >
      {label ? (
        <Label>{label}</Label>
      ) : (
        <svg viewBox="0 0 18.4 14.4">
          <path
            d={
              inverted
                ? 'M17 7.2H1M10.8 1L17 7.2l-6.2 6.2'
                : 'M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2'
            }
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
          />
        </svg>
      )}
    </SvgButton>
  );
}

export default styled(Arrow)`
  color: ${props => (props.disabled ? '#caccce' : '#646464')};

  ${props => (props.inverted ? 'margin-left: 24px;' : 'margin-right: 24px;')};
  ${props =>
    !props.label &&
    `
    width: 16px;
    height: 12px;
    flex: 0 0 16px;
  `};

  &:hover {
    color: ${props => (props.disabled ? '#caccce' : '#000')};
  }
`;
