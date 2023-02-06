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
import { withRouter } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import _ from 'lodash';
import axios from 'axios';

import { apiErrorHandler } from '../../api';
import { credentials, apiConfig } from '../../constants';
import { getMapSettingsFromURL } from '../../helpers';
import { Search as IcoSearch, Trash, BookmarkOn } from '../../icons/index';
import ScrollbarStyle from '../../config/ScrollbarStyle';

import style from './Bookmarks.scss';

class SearchBookmarks extends Component {
  state = {
    items: [],
    places: [],
    isFocus: false,
  };

  onItemClick = (center, zoom, bbox) => {
    this.props.history.replace({
      search: `?c=${center[0]};${center[1]}&z=${zoom}`,
    });
    if (bbox) this.props.onUpdateMapBbox(bbox);
    this.props.onBookmarkSelect();
    this.empty();
    this.refs.input.value = null;
  };

  empty = () => {
    this.setState({
      items: [],
      places: [],
    });
  };

  onSearch = e => {
    e.persist();

    _.throttle(() => {
      const query = encodeURIComponent(e.target.value);

      if (query.length > 1) {
        // SEARCH PLACES
        axios({
          method: 'get',
          url: `${apiConfig.places}/?q=${query}&app_id=${
            credentials.APP_ID
          }&app_code=${
            credentials.APP_CODE
          }&at=${getMapSettingsFromURL().center.join(',')}`,
        })
          .then(({ data }) => {
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
          })
          .catch(() => apiErrorHandler(e));

        if (this.props.items && this.props.items.length) {
          // SEARCH BOOKMARKS
          const reg = new RegExp(_.escapeRegExp(query), 'gi');
          const filteredItems = this.props.items.filter(item =>
            item.label.match(reg)
          );
          this.setState({
            items: filteredItems,
          });
        }
      } else {
        this.empty();
      }
    }, 250)();
  };

  onBookmarkDelete = (e, id) => {
    e.stopPropagation();
    this.props.onBookmarkDelete(id);
    this.empty();
    this.refs.input.value = null;
  };

  toggle = () => {
    this.empty();
    this.refs.input.value = null;
  };

  showList = () => {
    this.setState({
      items: this.props.items,
      isFocus: true,
    });
  };

  onBlur = () => {
    this.setState({
      isFocus: false,
    });
  };

  render() {
    const { isFocus, items, places } = this.state;

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
              onChange={this.onSearch}
              onFocus={this.showList}
              onBlur={this.onBlur}
              placeholder="Search for places/bookmarks"
              ref="input"
            />
          </div>
        </div>

        {((items && items.length > 0) || places.length > 0) && (
          <div className={style.searchResults}>
            <span
              role="presentation"
              onClick={this.toggle}
              className={style.searchResultsBackdrop}
            />

            <Scrollbars
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
              }}
              renderTrackVertical={props => (
                <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
              )}
              renderThumbVertical={props => (
                <div {...props} style={ScrollbarStyle.thumbStyle} />
              )}
            >
              {items &&
                items.map(item => {
                  return (
                    <div
                      role="presentation"
                      key={item.id}
                      className={style.searchResultItem}
                      onClick={() => this.onItemClick(item.center, item.zoom)}
                    >
                      <span>
                        <BookmarkOn />
                        {item.label}
                      </span>
                      <i
                        role="presentation"
                        className={style.searchResultsDelete}
                        onClick={e => this.onBookmarkDelete(e, item.id)}
                      >
                        <Trash />
                      </i>
                    </div>
                  );
                })}
              {places.map(item => {
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
            </Scrollbars>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SearchBookmarks);
