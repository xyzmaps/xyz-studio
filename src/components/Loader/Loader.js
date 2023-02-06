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
import { connect } from 'react-redux';

import style from './Loader.scss';

const LoaderScreen = ({ showLoadingScreen, directShow }) => {
  return (
    <div
      className={`${style.spinner} ${showLoadingScreen ||
        directShow ||
        style.hide} ${directShow && style.darkMode}`}
    />
  );
};

const s2p = state => ({
  showLoadingScreen: state.common.showLoadingScreen,
});

export default connect(s2p, null)(LoaderScreen);
