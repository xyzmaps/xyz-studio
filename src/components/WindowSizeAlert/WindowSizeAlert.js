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
import style from './WindowSizeAlert.scss';

export default function WindowSizeAlert() {
  return (
    <div className={style.screenAlert}>
      <p>
        HERE Studio is supported on desktops with a minimum of 1024px
        resolution, and on mobile devices.
        <br />
        <br />
        To learn more about HERE Studio, please visit 
        <a href="https://www.here.xyz/studio">here.xyz/studio</a>.
      </p>
    </div>
  );
}
