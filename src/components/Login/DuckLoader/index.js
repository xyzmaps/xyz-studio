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
import staticBg from './images/static_bg.svg';
import balloonString from './images/balloon_string.svg';
import cloud from './images/cloud.svg';
import style from './style.scss';

const DuckLoader = ({ title, message }) => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.staticBg}>
        {/* Balloon string is nested inside static bg for responsiveness */}
        <div className={style.balloonString}>
          <div className={style.balloonStringWrap}>
            {/* Balloon is nested inside balloon string for responsiveness */}
            <div className={style.balloon}>
              <div className={style.balloonContent}>
                <h4 className={style.balloonTitle}>{title}</h4>

                <p>{message}</p>

                <div className={style.cloud}>
                  <img src={cloud} alt="Cloud" />
                </div>
              </div>
            </div>

            <img src={balloonString} alt="Balloon string" />
          </div>
        </div>

        {/* Static water and bird bg */}
        <img src={staticBg} alt="Login form loading background" />
      </div>
    </div>
  );
};

export default DuckLoader;
