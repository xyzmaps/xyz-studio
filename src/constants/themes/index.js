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

import commonWithLabelDark from './WithLabel/common/dark';
import commonWithLabelLight from './WithLabel/common/light';
import commonWithLabelMiamiDay from './WithLabel/common/miamiDay';
import commonWithLabelSpringSoft from './WithLabel/common/spring-soft';
import commonWithLabelCountries from './WithLabel/common/countries';
import commonWithLabelCountriesBright from './WithLabel/common/countriesBright';
import commonWithLabelSpringBright from './WithLabel/common/springBright';
import commonWithLabelLineDark from './WithLabel/common/lines_dark';
import commonWithLabelLineWhite from './WithLabel/common/lines_white';

import hereWithLabelDark from './WithLabel/here/dark';
import hereWithLabelLight from './WithLabel/here/light';
import hereWithLabelMiamiDay from './WithLabel/here/miamiDay';
import hereWithLabelSpringSoft from './WithLabel/here/spring-soft';
import hereWithLabelCountries from './WithLabel/here/countries';
import hereWithLabelCountriesBright from './WithLabel/here/countriesBright';
import hereWithLabelSpringBright from './WithLabel/here/springBright';
import hereWithLabelLineDark from './WithLabel/here/lines_dark';
import hereWithLabelLineWhite from './WithLabel/here/lines_white';

import commonDark from './WithoutLabel/common/dark';
import commonLight from './WithoutLabel/common/light';
import commonMiamiDay from './WithoutLabel/common/miamiDay';
import commonSpringSoft from './WithoutLabel/common/spring-soft';
import commonCountries from './WithoutLabel/common/countries';
import commonCountriesBright from './WithoutLabel/common/countriesBright';
import commonSpringBright from './WithoutLabel/common/springBright';
import commonLineDark from './WithoutLabel/common/lines_dark';
import commonLineWhite from './WithoutLabel/common/lines_white';

import hereDark from './WithoutLabel/here/dark';
import hereLight from './WithoutLabel/here/light';
import hereMiamiDay from './WithoutLabel/here/miamiDay';
import hereSpringSoft from './WithoutLabel/here/spring-soft';
import hereCountries from './WithoutLabel/here/countries';
import hereCountriesBright from './WithoutLabel/here/countriesBright';
import hereSpringBright from './WithoutLabel/here/springBright';
import hereLineDark from './WithoutLabel/here/lines_dark';
import hereLineWhite from './WithoutLabel/here/lines_white';

import darkThumbnail from './images/dark.png';
import lightThumbnail from './images/light.png';
import miamiDayThumbnail from './images/miamiDay.png';
import springSoftThumbnail from './images/springSoft.png';
import countriesThumbnail from './images/countries.png';
import countriesBrightThumbnail from './images/countriesBright.png';
import springBrightThumbnail from './images/springBright.png';
import lineDarkThumbnail from './images/lineDark.png';
import lineWhiteThumbnail from './images/lineWhite.png';
import satelliteThumbnail from './images/satellite.png';

export const themes = {
  withLabel: {
    osm: {
      dark: commonWithLabelDark,
      light: commonWithLabelLight,
      miamiDay: commonWithLabelMiamiDay,
      springSoft: commonWithLabelSpringSoft,
      countries: commonWithLabelCountries,
      countriesBright: commonWithLabelCountriesBright,
      springBright: commonWithLabelSpringBright,
      LineDark: commonWithLabelLineDark,
      LineWhite: commonWithLabelLineWhite,
    },
    here: {
      dark: hereWithLabelDark,
      light: hereWithLabelLight,
      miamiDay: hereWithLabelMiamiDay,
      springSoft: hereWithLabelSpringSoft,
      countries: hereWithLabelCountries,
      countriesBright: hereWithLabelCountriesBright,
      springBright: hereWithLabelSpringBright,
      LineDark: hereWithLabelLineDark,
      LineWhite: hereWithLabelLineWhite,
    },
  },
  withoutlabel: {
    osm: {
      dark: commonDark,
      light: commonLight,
      miamiDay: commonMiamiDay,
      springSoft: commonSpringSoft,
      countries: commonCountries,
      countriesBright: commonCountriesBright,
      springBright: commonSpringBright,
      LineDark: commonLineDark,
      LineWhite: commonLineWhite,
    },
    here: {
      dark: hereDark,
      light: hereLight,
      miamiDay: hereMiamiDay,
      springSoft: hereSpringSoft,
      countries: hereCountries,
      countriesBright: hereCountriesBright,
      springBright: hereSpringBright,
      LineDark: hereLineDark,
      LineWhite: hereLineWhite,
    },
  },
};

export const basemaps = {
  dark: darkThumbnail,
  light: lightThumbnail,
  miamiDay: miamiDayThumbnail,
  springSoft: springSoftThumbnail,
  countries: countriesThumbnail,
  countriesBright: countriesBrightThumbnail,
  springBright: springBrightThumbnail,
  LineDark: lineDarkThumbnail,
  LineWhite: lineWhiteThumbnail,
  satellite: satelliteThumbnail,
};
