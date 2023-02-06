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

import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import style from './Searchbar.scss';
import { Search as IcoSearch } from '../../icons';
import { credentials, apiConfig } from '../../constants';

class Searchbar extends Component {
  state = {
    places: [],
    isFocus: false,
  };

  empty = () => {
    this.setState({
      places: [],
    });
  };

  toggle = () => {
    this.empty();
    this.refs.input.value = null;
  };

  onItemClick = (center, zoom, bbox) => {
    this.props.onItemClick(center, zoom, bbox);
    this.empty();
    this.refs.input.value = null;
  };

  onSearch = e => {
    e.persist();

    _.throttle(() => {
      const query = encodeURIComponent(e.target.value);

      if (query.length > 1) {
        axios({
          method: 'get',
          url: `${apiConfig.places}/?q=${query}&app_id=${credentials.APP_ID}&app_code=${credentials.APP_CODE}&at=43.942855,12.46105`,
        }).then(({ data }) => {
          const filteredPlaces = data.results.filter(
            p => typeof p.position !== 'undefined'
          );
          const places = filteredPlaces.map((p, k) => {
            return {
              id: k,
              label: p.title,
              zoom: 18,
              center: p.position,
              bbox: p.bbox,
            };
          });
          this.setState({
            places,
          });
        });
      } else {
        this.empty();
      }
    }, 250)();
  };

  render() {
    const { isFocus, places } = this.state;
    return (
      <div
        className={`${style.searchBox} ${isFocus ? style.active : ''}`}
        data-tut="search-box"
      >
        <div className={style.searchBoxInput}>
          <div>
            <IcoSearch />
            <input
              type="text"
              size="35"
              placeholder="Search for places"
              onChange={this.onSearch}
              ref="input"
            />
          </div>
        </div>
        {places.length > 0 && (
          <div className={style.searchResults}>
            <span
              role="presentation"
              onClick={this.toggle}
              className={style.searchResultsBackdrop}
            />

            {places.map(item => {
              // console.log(places)
              return (
                <div
                  role="presentation"
                  key={item.id}
                  className={style.searchResultItem}
                  onClick={() =>
                    this.onItemClick(item.center, item.zoom, item.bbox)
                  }
                >
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default Searchbar;
