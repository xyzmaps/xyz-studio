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

import amp from 'amplitude-js';

const amplitude = amp.getInstance();
amplitude.init(process.env.REACT_APP_AMPLITUDE_API_KEY);
// const user = window.here.user || {};
// const buildNumber = window.here.buildNumber || {};
// const config = window.here.config || {};
// let amplitudeInitialized = false;

// const Init = (callback) => {
//   Object.assign(amplitude.options, {
//     forceHttps: true,
//     includeUtm: true,
//     cookieName: 'amplitude_wego_trjs',
//     domain: config.amplitude.domain // TODO: domain not working
//   });

//   if (!amplitudeInitialized) {
//     if (buildNumber) {
//       amplitude.init(config.amplitude.appCode);
//       amplitude.setVersionName(buildNumber);
//       amplitudeInitialized = true;
//       callback();
//     } else {
//       amplitude.init(config.amplitude.appCode);
//       amplitudeInitialized = true;
//       callback();
//     }
//   } else {
//     callback();
//   }
// };

// // If User is logged in and allowed improvement user_id will be set to HERE account ID
// // A device_id was user otherwise, but please notice that Amplitude will parse user_id to null in it that case
// // From Amplitude docs:
// //   Anonymous users should not be assigned a User ID. These anonymous users will still have Amplitude IDs
// //   and Device IDs. Users will later be merged when we identify they are the same user.
// // You can read more about it here:
// //   https://help.amplitude.com/hc/en-us/articles/115003135607-Tracking-Unique-Users
// const setUser = () => {
//   Init(() => {
//     if (user.track === 'true' && user.auth.loggedIn) {
//       amplitude.setUserId(user.auth.userId);
//     }
//   });
// };

const logEvent = (event, payload) => {
  //   Init(() => {
  //     setUser();
  if (payload) {
    amplitude.logEvent(event, payload);
  } else {
    amplitude.logEvent(event);
  }
  //   });
  // console.log(amplitude);
};

export default logEvent;
