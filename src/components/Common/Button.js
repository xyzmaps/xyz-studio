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
import style from './Button.scss';

const Button = ({ text, onClick, className, type, disabled, title }) => {
  const classNames = [style.button];
  if (type) {
    classNames.push(style[type]);
  }
  if (className) {
    classNames.push(...className);
  }
  if (disabled) {
    classNames.push(style.disabled);
  }
  return (
    <span
      role="presentation"
      className={classNames.join(' ')}
      title={title}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default Button;
