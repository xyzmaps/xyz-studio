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
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import LazyLoad from 'react-lazy-load';
import userAgent from 'express-useragent';
import { setTokenLink, getToken } from '../../../helpers';
import { headers, spacesAPI, apiErrorHandler } from '../../../api';
import { apiConfig } from '../../../constants';
import { ExternalLink, Starred, Map } from '../../../icons';
import ImageLoader from '../../ImageLoader';
import Edit from '../Widget/Edit';
import AddDataAddOn from '../../AddDataLayer/AddDataAddOn';
import style from './Item.scss';

export default class Item extends Component {
  state = {
    starred: this.props.starred,
    thumbnail: this.props.thumbnail,
    thumbnailStatus: 'loaded',
    statistics: false,
  };

  componentDidMount() {
    const { id } = this.props;
    const isProjectPage =
      window.location.pathname === '/' ||
      window.location.pathname === '/studio/';

    this.updateThumbnail();
    this.mounted = true;
    if (!isProjectPage) {
      this.getStatistics(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { thumbnail } = this.props;

    if (prevProps.thumbnail !== thumbnail) {
      this.updateThumbnail();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getStatistics = spaceId => {
    if (spaceId) {
      spacesAPI
        .get(`/${spaceId}/statistics`, headers())
        .then(response => {
          this.setState({ statistics: response.data.count.value });
        })
        .catch(e => apiErrorHandler(e));
    }
  };

  updateThumbnail = () => {
    if (!this.props.thumbnail && this.props.onThumbLoaded) {
      this.setState({ thumbnailStatus: 'loading' });

      axios
        .post(
          `${apiConfig.screenshot}?url=${encodeURIComponent(
            `${apiConfig.viewer}?project_id=${
              this.props.id
            }&controls=false&width=356&height=201&scale=1&local=true&access_token=${getToken()}`
          )}`,
          '',
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        )
        .then(response => {
          if (this.mounted) {
            this.props.onThumbLoaded(this.props.id, response.data.s3url);
            this.setState({
              thumbnail: response.data.s3url,
              thumbnailStatus: 'loaded',
            });
          }
        });
    }
  };

  toggleStarred = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }));

    this.props.starItem(this.props.id, !this.state.starred);
  };

  showProAlert = id => {
    const item = {
      id,
      title: this.props.title,
      description: this.props.description,
    };
    this.props.showAlert({
      customAlert: (
        <AddDataAddOn
          item={item}
          items={this.props.items}
          itemsProMap={this.props.itemsProMap}
          itemsVirtualMap={this.props.itemsVirtualMap}
          showAlert={this.props.showAlert}
          hideAlert={this.props.hideAlert}
          loader={this.props.loader}
          virtualizeSpace={this.props.virtualizeSpace}
          updateVirtualSpaces={this.props.updateVirtualSpaces}
          dataContext
        />
      ),
    });
  };

  renderItem = () => {
    const { statistics } = this.state;
    let thumbnailStatus = '';

    if (this.state.thumbnailStatus === 'loading') {
      thumbnailStatus = 'Generating thumbnail';
    } else if (this.state.thumbnailStatus === 'unavailable') {
      thumbnailStatus = `Map preview ${this.state.thumbnailStatus}`;
    }

    return (
      <div className={style.content}>
        <div className={style.desc}>
          <h2 className={style.title}>
            <span>{this.props.title}</span>
            {(statistics || statistics === 0) && (
              <small>{this.state.statistics} features</small>
            )}
          </h2>
          {this.props.layout === 'list' ? (
            <h3 className={style.text}>
              <span>{this.props.description}</span>
            </h3>
          ) : (
            <h3 className={style.text}>
              <span>{/* {this.props.description} */}</span>
            </h3>
          )}
        </div>

        <div className={style.photo}>
          {this.state.thumbnail &&
            this.state.thumbnailStatus !== 'unavailable' && (
              <ImageLoader
                src={this.state.thumbnail}
                alt={this.props.title}
                onLoad={() => this.setState({ thumbnailStatus: 'loaded' })}
                onError={() =>
                  this.setState({ thumbnailStatus: 'unavailable' })
                }
              />
            )}

          {!!thumbnailStatus && (
            <div className={style.placeholder}>
              <Map />
              <span>{thumbnailStatus}</span>
            </div>
          )}
        </div>

        {(this.props.lastUpdate || this.props.status) && (
          <div className={style.footnote}>
            {this.props.lastUpdate && (
              <time dateTime={this.props.lastUpdate}>
                {/* this.props.layout === "card" && <strong>UPDATED: </strong> */}
                <span>
                  {moment(this.props.lastUpdate).format('DD MMM YY - HH:mm')}
                </span>
              </time>
            )}

            {this.props.status && (
              <p className={style.status}>
                {this.props.status === 'PUBLISHED' && (
                  <strong>
                    {this.props.status}
                    <span
                      role="presentation"
                      onClick={e => {
                        e.stopPropagation();
                        window.open(
                          `${apiConfig.viewer}?project_id=${this.props.id}`
                        );
                      }}
                    >
                      <ExternalLink />
                    </span>
                  </strong>
                )}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const {
      deleting,
      to,
      layout,
      className,
      context,
      title,
      starItem,
      currentProject,
      id,
      deleteItem,
      onDownload,
      download,
      onShowAddDataLayer,
      isPro,
    } = this.props;
    const { starred, statistics } = this.state;
    const deleted = deleting ? style.disabled : '';

    const routeLink = () => {
      if (userAgent.parse(navigator.userAgent).isMobile) {
        return (
          <div className={`${style.link} ${!to ? style.linkDisabled : ''}`}>
            {this.renderItem()}
          </div>
        );
      }

      return (
        <Link
          className={`${style.link} ${!to ? style.linkDisabled : ''}`}
          to={setTokenLink(to)}
        >
          {this.renderItem()}
        </Link>
      );
    };

    return (
      <div
        className={`${style.container} ${style[className] || ''} ${style[
          layout
        ] || ''} ${style[context] || ''} ${deleted}`}
      >
        <LazyLoad debounce={false} throttle={350}>
          <div>
            {starItem && (
              <button
                type="button"
                data-testid={`proj-star-button-${id}`}
                className={`${style.star} ${style[starred && 'starred']}`}
                onClick={this.toggleStarred}
              >
                <Starred />
              </button>
            )}
            {context === 'data' && isPro && (
              <div
                role="presentation"
                className={style.pro}
                onClick={e => {
                  e.stopPropagation();
                  this.showProAlert(id);
                }}
                data-tip="Click to Enable Add On Optional Features"
              >
                Add On
              </div>
            )}

            <Edit
              context={context}
              layout={layout}
              id={id}
              rot={currentProject ? currentProject.rot : undefined}
              title={title}
              to={to}
              currentProject={currentProject}
              onDelete={deleteItem}
              onShowAddDataLayer={onShowAddDataLayer}
              onDownload={onDownload}
              download={download}
              statistics={statistics}
            />

            {routeLink()}
          </div>
        </LazyLoad>
      </div>
    );
  }
}
