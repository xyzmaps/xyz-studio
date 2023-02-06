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
import _ from 'lodash';
import userAgent from 'express-useragent';

import { connect } from 'react-redux';
import { links, mapConfig } from '../../constants';
import TopBar from '../../components/TopBar/TopBar';
import Layout from '../../components/Dashboard/Widget/Layout';
import Sort from '../../components/Dashboard/Widget/Sort';
import Create from '../../components/Dashboard/Create/Create';
import Item from '../../components/Dashboard/Item/Item';
import Search from '../../components/Common/Search';
import AccountDashboard from '../AccountDashboard/AccountDashboard';
import AccountList from '../AccountList/AccountList';
import Footer from '../../components/Footer/Footer';
import { Starred, Close } from '../../icons';

import style from './dashboard.scss';
import { hideAlert, showAlert } from '../../actions/mapActions';
import AddDataLayerVSContainer from '../../components/AddDataLayer/AddDataLayerVSContainer';
import AddOnBanner from '../../components/AddOnTrigger/AddOnBanner';
import { isMobile } from '../../helpers';
import logEvent from '../../utils/amplitudeLogger';

const WELCOME_MESSAGE = 'WELCOME_MSG_XYZ';
let app_URL = '';

const MobileWelcomeMessage = ({ onClose }) => {
  return (
    <div className={style.mobileWelcome}>
      <h3 className={style.welcomeTitle}>Welcome to HERE Studio!</h3>

      <div role="presentation" className={style.close} onClick={onClose}>
        <Close />
      </div>

      <p className={style.welcomeMessage}>
        While we do not offer project editing on mobile devices, you can view
        your existing projects and published maps.
      </p>

      <p>
        To learn more, please visit <br />
        <a
          href="https://www.here.xyz/studio"
          rel="noopener noreferrer"
          target="_blank"
          className={style.welcomeLink}
        >
          https://www.here.xyz/studio
        </a>
      </p>
    </div>
  );
};

class Dashboard extends Component {
  state = {
    loaded: this.props.itemsLoaded,
    layout: this.props.layout || 'card',
    sort: {
      label: 'Date',
      key: 'last_update',
    },
    search: '',
    starred: false,
    isWelcomeRead: !!localStorage.getItem(WELCOME_MESSAGE),
  };

  componentDidUpdate(prevProps) {
    const { itemsLoaded } = this.props;

    this.setLoaded(prevProps, itemsLoaded);
  }

  componentWillUnmount() {
    this.setState({ loaded: false });
  }

  authoringAppId = this.props.defaultAppId;

  authoringAppIdName = this.props.apps[this.authoringAppId].dsAppName;

  authoringAppColor = this.props.apps[this.authoringAppId].color;

  isSinglePlan = false;

  isPro = this.props.urm['xyz-hub'].accessConnectors
    ? this.props.urm['xyz-hub'].accessConnectors.some(
        o => o.id === 'schema-validator'
      )
    : false;

  setLoaded = (prevProps, itemsLoaded) => {
    if (itemsLoaded !== prevProps.itemsLoaded) {
      this.setState({ loaded: !prevProps.itemsLoaded });
    }
  };

  getAccountURL = () => {
    const firstKey = Object.keys(this.props.apps)[0];

    if (Object.keys(this.props.apps).length > 1) {
      app_URL = '/account-dashboard';
    } else {
      this.isSinglePlan = true;
      app_URL = `/account-dashboard/${firstKey}`;
    }

    return app_URL;
  };

  getItemURL = o => {
    return !userAgent.parse(navigator.userAgent).isMobile
      ? `/studio/${this.props.context}/${o.id}`
      : false;
  };

  renderItems = items => {
    let newItems = [...items];

    if (this.props.context === 'project') {
      if (this.state.starred) {
        newItems = _.filter(
          newItems,
          obj =>
            !_.isEmpty(obj) &&
            obj.meta &&
            obj.starred &&
            new RegExp(_.escapeRegExp(this.state.search), 'gi').test(
              obj.meta.name
            )
        );
      }

      if (this.state.search.length) {
        newItems = _.filter(
          newItems,
          obj =>
            !_.isEmpty(obj) &&
            obj.meta &&
            new RegExp(_.escapeRegExp(this.state.search), 'gi').test(
              obj.meta.name
            )
        );
      }

      if (this.state.sort.key) {
        if (this.state.sort.label === 'Date') {
          newItems = _.orderBy(
            newItems,
            [
              this.state.sort.key !== 'starred'
                ? this.state.sort.key
                : o => !o.starred,
            ],
            ['desc']
          );
        } else {
          newItems = _.orderBy(newItems, [
            this.state.sort.key !== 'starred'
              ? this.state.sort.key
              : o => !o.starred,
          ]);
        }
      }

      return newItems.map(o => {
        return (
          o &&
          o.meta && (
            <Item
              key={o.id}
              id={o.id}
              context={this.props.context}
              layout={this.state.layout}
              deleteItem={this.props.deleteItem}
              deleting={this.props.deletingItem === o.id}
              description={o.meta.description}
              lastUpdate={o.last_update}
              onThumbLoaded={this.props.onThumbLoaded}
              starItem={this.props.starItem}
              starred={o.starred}
              status={o.status}
              thumbnail={o.thumbnail}
              title={o.meta.name}
              to={(() => this.getItemURL(o))()}
              currentProject={o}
              hideAlert={this.props.hideAlert}
              items={this.props.items}
              itemsProMap={this.props.proMap}
              itemsVirtualMap={this.props.virtualMap}
              showAlert={this.props.showAlert}
              isPro={this.isPro}
            />
          )
        );
      });
    }

    if (this.props.context === 'data') {
      if (this.state.search.length) {
        newItems = _.filter(
          newItems,
          obj =>
            !_.isEmpty(obj) &&
            new RegExp(_.escapeRegExp(this.state.search), 'gi').test(obj.title)
        );
      }

      if (this.state.sort.key) {
        newItems = _.sortBy(newItems, [
          this.state.sort.key !== 'starred'
            ? this.state.sort.key
            : o => !o.starred,
        ]);
      }

      return newItems.map(o => {
        const isActivityLogSpace =
          o.title.indexOf('activity-log for space') > -1;
        return (
          o &&
          !isActivityLogSpace && (
            <Item
              key={o.id}
              context={this.props.context}
              layout={this.state.layout}
              deleteItem={this.props.deleteItem}
              deleting={this.props.deletingItem === o.id}
              description={o.description}
              id={o.id}
              onShowAddDataLayer={this.props.onShowAddDataLayer}
              starred={o.starred}
              title={o.title}
              to={`/studio/${this.props.context}/${o.id}`}
              onDownload={this.props.onDownload}
              download={this.props.download}
              hideAlert={this.props.hideAlert}
              items={this.props.items}
              itemsProMap={this.props.proMap}
              itemsVirtualMap={this.props.virtualMap}
              showAlert={this.props.showAlert}
              loader={this.props.loader}
              virtualizeSpace={this.props.virtualizeSpace}
              updateVirtualSpaces={this.props.updateVirtualSpaces}
              isPro={this.isPro}
            />
          )
        );
      });
    }

    return null;
  };

  virtualSpaceSetting = () => {
    const { items } = this.props;
    const selectedItems = [];
    logEvent('_i_createVirtualSpace_');
    // triggered from create new VS button
    return (
      <AddDataLayerVSContainer
        items={items}
        itemsVirtualMap={this.props.virtualMap}
        selectedItems={selectedItems}
        loader={this.props.loader}
        showAlert={this.props.showAlert}
        hideAlert={this.props.hideAlert}
        virtualizeSpace={this.props.virtualizeSpace}
        updateVirtualSpaces={this.props.updateVirtualSpaces}
        dataContext
      />
    );
  };

  showVirtualSpaceAlert = () => {
    this.props.showAlert({
      customAlert: this.virtualSpaceSetting(),
    });
  };

  switchLayout = () => {
    this.setState(prevState => ({
      layout: prevState.layout === 'card' ? 'list' : 'card',
    }));
  };

  filterStarred = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }));
  };

  sortItems = obj => {
    this.setState({ sort: obj });
  };

  searchItem = (query = '') => {
    this.setState({ search: query });
  };

  onMobileMessageClose = () => {
    localStorage.setItem(WELCOME_MESSAGE, 'shown');

    this.setState({
      isWelcomeRead: true,
    });
  };

  render() {
    const {
      accType,
      accLayout,
      createItem,
      onShowAddDataLayer,
      items,
      context,
      switchLayout,
      starItem,
      sortItems,
      labels,
    } = this.props;

    const { loaded, layout, starred, sort, isWelcomeRead } = this.state;
    const isProjectPage =
      window.location.pathname === '/' ||
      window.location.pathname === '/studio/';

    const accountComp = () => {
      if (!!accType && accType === 'single') {
        return <AccountDashboard isSinglePlan={this.isSinglePlan} />;
      }

      return <AccountList />;
    };

    const createComp = () => {
      if (context === 'project') {
        return (
          <div>
            <Create
              title="Looks like you don’t have any of your own maps created yet."
              text="Create a new project to get started with HERE Studio."
              create={createItem}
            />
            <div className={style.mobileEmptyMessage}>
              <strong>
                Looks like you don’t have any of your own maps created yet.
              </strong>
              <p>Visit HERE Studio on your computer to create a new project.</p>
            </div>
          </div>
        );
      }

      return (
        <Create
          title="Looks like you haven't added any data yet."
          text="Upload data to create your first Space and get started with HERE Studio."
          create={onShowAddDataLayer}
        />
      );
    };

    return (
      loaded && (
        <div className={style.wrapper}>
          <div className={`${style.container} ${style[layout]}`}>
            <TopBar
              authoringAppIdName={this.authoringAppIdName}
              authoringAppId={this.authoringAppId}
              accountURL={this.getAccountURL()}
            />
            {accLayout ? (
              accountComp()
            ) : (
              <div>
                <div className={style.header}>
                  {!this.isPro && !isMobile() && (
                    <AddOnBanner
                      showAlert={this.props.showAlert}
                      hideAlert={this.props.hideAlert}
                    />
                  )}

                  <div className={`${isProjectPage ? style.cardHeader : ''}`}>
                    <div className={style.headerCreate}>
                      {createItem && (
                        <Create
                          layout="-small"
                          text="Create new project"
                          create={createItem}
                        />
                      )}

                      {onShowAddDataLayer && (
                        <Create
                          layout="-small"
                          text="Create new Space"
                          create={() => onShowAddDataLayer()}
                        />
                      )}

                      {this.isPro && onShowAddDataLayer && (
                        <Create
                          layout="-small"
                          text="Create new Virtual Space"
                          create={this.showVirtualSpaceAlert}
                        />
                      )}
                    </div>

                    {items.length > 1 && (
                      <div
                        className={`${style.tools} ${
                          !isProjectPage ? style.dataHubTools : ''
                        }`}
                      >
                        {switchLayout && (
                          <div className={style.tool}>
                            {' '}
                            <Layout
                              layout={layout}
                              switchLayout={this.switchLayout}
                            />{' '}
                          </div>
                        )}

                        {starItem && (
                          <div className={style.tool}>
                            <button
                              type="button"
                              data-testid="star-button"
                              className={`${style.star} ${
                                style[starred && 'starred']
                              }`}
                              onClick={this.filterStarred}
                            >
                              <Starred />
                            </button>
                          </div>
                        )}

                        {sortItems && (
                          <div className={style.tool}>
                            <Sort sort={sort} onSort={this.sortItems} />
                          </div>
                        )}

                        <div className={style.tool}>
                          {!isProjectPage && (
                            <p className={style.toolNote}>
                              Explore and edit data in your Spaces. The option
                              to download your Space data is available for
                              Spaces with {mapConfig.maxDownloadableFeatures}{' '}
                              features or less. To download larger Spaces,
                              please use the&nbsp;
                              <a
                                href={links.cli}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                Data Hub CLI
                              </a>
                              .
                            </p>
                          )}

                          <Search
                            items={items}
                            onSearch={this.searchItem}
                            placeholder={`Search your ${
                              context === 'project' ? 'projects' : 'Spaces'
                            }`}
                            searchWrapperStyle={style.searchWrap}
                            searchInputStyle={style.searchInput}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* header */}

                {/* content */}
                <div className={style.content}>
                  {!isWelcomeRead &&
                    userAgent.parse(navigator.userAgent).isMobile && (
                      <MobileWelcomeMessage
                        onClose={this.onMobileMessageClose}
                      />
                    )}

                  {items.length ? (
                    <div className={`${style.items} ${style[layout]}`}>
                      {layout === 'list' && (
                        <div className={style.row}>
                          {_.map(labels, (label, i) => (
                            <div key={i} className={style.col}>
                              <span>{label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {this.renderItems(items)}
                    </div>
                  ) : (
                    createComp()
                  )}
                </div>
              </div>
            )}

            {/* content */}
          </div>

          {/* footer */}
          <Footer />
          {/* footer */}
        </div>
      )
    );
  }
}

const s2p = state => ({
  defaultAppId: state.user.defaultAppId,
  apps: state.user.apps,
  proMap: state.space.itemsProMap,
  virtualMap: state.space.itemsVirtualMap,
  urm: state.user.urm,
});

export default connect(s2p, { hideAlert, showAlert })(Dashboard);
