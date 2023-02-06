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
import * as hx from '../../../helpers/index';

const Guide = styled.div`
  --reactour-accent: ${props => props.accentColor};
  position: fixed;
  background-color: #fff;
  transition: transform 0.3s;
  padding: 24px 30px;
  box-shadow: 0 0.5em 3em rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  color: inherit;
  z-index: 1000000;
  max-width: 331px;
  min-width: 150px;
  outline: 0;
  padding-right: 40px;
  border-radius: ${props => props.rounded}px;

  transform: ${props => {
    const {
      targetTop,
      targetRight,
      targetBottom,
      targetLeft,
      windowWidth,
      windowHeight,
      helperWidth,
      helperHeight,
      helperPosition,
      padding,
    } = props;

    const available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    };

    const couldPositionAt = position => {
      return (
        available[position] >
        (hx.isHoriz(position)
          ? helperWidth + padding * 2
          : helperHeight + padding * 2)
      );
    };

    const autoPosition = coords => {
      const positionsOrder = hx.bestPositionOf(available);
      for (let j = 0; j < positionsOrder.length; j += 1) {
        if (couldPositionAt(positionsOrder[j])) {
          return coords[positionsOrder[j]];
        }
      }
      return coords.center;
    };

    const pos = helperPos => {
      let hX = targetLeft - padding;

      if (hx.isOutsideX(targetLeft + helperWidth, windowWidth)) {
        if (hx.isOutsideX(targetRight + padding, windowWidth)) {
          hX = targetRight - helperWidth;
        } else {
          hX = targetRight - helperWidth + padding;
        }
      }

      const x = hX > padding ? hX : padding;

      let hY = targetTop - padding;

      if (hx.isOutsideY(targetTop + helperHeight, windowHeight)) {
        if (hx.isOutsideY(targetBottom + padding, windowHeight)) {
          hY = targetBottom - helperHeight;
        } else {
          hY = targetBottom - helperHeight + padding;
        }
      }

      const y = hY > padding ? hY : padding;
      const coords = {
        top: [x, targetTop - helperHeight - padding * 2],
        right: [targetRight + padding * 2, y],
        bottom: [x, targetBottom + padding * 2],
        left: [targetLeft - helperWidth - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      };

      if (helperPos === 'center' || couldPositionAt(helperPos)) {
        return coords[helperPos];
      }

      return autoPosition(coords);
    };

    const p = pos(helperPosition);

    return `translate(${p[0]}px, ${p[1]}px)`;
  }};
`;

export default Guide;
