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
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import FileSaver from 'file-saver';
import { apiErrorHandler, spacesAPI } from '../api';
import { formatFileName, isMobile } from '../helpers';

import { loader, showGeocodedFeaturesNotice } from '../actions/commonActions';
import {
  createNewSpace,
  fetchSpaces,
  deleteSpace,
  cleanUpSpaces,
  virtualizeSpace,
  updateVirtualSpaces,
} from '../actions/spaceActions';
import {
  spacesLimit,
  fileSizeLimit,
  showAlert,
  hideAlert,
} from '../actions/mapActions';
import AddDataLayer from '../components/AddDataLayer/AddDataLayer';
// import Alert from '../components/Alert/Alert';
import Dashboard from './Dashboard/Dashboard';
import MobileScreenAlert from '../components/MobileScreenAlert/MobileScreenAlert';

class Spaces extends Component {
  state = {
    appendItem: false,
    toggleAddLayer: false,
    downloading: 'Download',
  };

  componentDidMount() {
    const { fetchSpaces: _fetchSpaces } = this.props;
    _fetchSpaces();
  }

  headers = {
    'content-type': 'application/geo+json',
  };

  onSpaceDeleteClick = id => {
    this.props.showAlert({
      title: 'Are you sure?',
      text:
        'You are deleting a space; the data associated with it will no longer be available in any project.',
      theme: 'negative',
      cancelLabel: 'Cancel',
      confirmLabel: 'Delete',
      confirm: () => {
        this.onSpaceDelete(id);
      },
      toggle: true,
    });
  };

  onSpaceDelete = id => {
    this.props.deleteSpace(id);
  };

  onSelectAppendItem = item => {
    if (item) {
      this.setState({ appendItem: item });
    }
  };

  onShowAddDataLayer = item => {
    if (item) {
      this.setState({
        appendItem: item,
        toggleAddLayer: true,
      });
    } else if (
      !this.props.spacesLimit(
        this.props.spaces.length + 1,
        this.props.spaceLimitValue
      )
    ) {
      this.setState({
        toggleAddLayer: true,
      });
    }
  };

  onHideAddDataLayer = () => {
    this.setState({
      appendItem: false,
      toggleAddLayer: false,
    });
  };

  onDownload = (spaceId, spaceName) => {
    let file;
    const sName = formatFileName(spaceName);

    this.setState({ downloading: 'Downloading...' });

    spacesAPI
      .get(`/${spaceId}/search`, {
        headers: this.headers,
        withCredentials: true,
      })
      .then(response => {
        file = new File(
          [JSON.stringify(response.data, null, 2)],
          `${sName}_${spaceId}.geojson`,
          { type: 'text/json' }
        );
        FileSaver.saveAs(file);
        this.setState({ downloading: 'Download' });
      })
      .catch(e => apiErrorHandler(e));
  };

  showDataLayerAlert = message => {
    this.props.showAlert({
      title: message.title,
      text: message.text,
      theme: 'negative',
      cancelLabel: 'Got it',
      toggle: true,
    });
  };

  render() {
    const defaultStyle = {
      transition: 'opacity 300ms ease-in-out',
      opacity: 0,
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    };

    const {
      spaces,
      proMap,
      virtualMap,
      itemsLoaded,
      deletingItem,
      alert,
      loader: _loader,
      loading,
      cleanUpSpaces: _cleanUpSpaces,
      virtualizeSpace: _virtualizeSpace,
      updateVirtualSpaces: _updateVirtualSpaces,
      spacesLimit: _spacesLimit,
      spaceLimitValue,
      fileSizeLimit: _fileSizeLimit,
      uploadProgress,
      createNewSpace: _createNewSpace,
      showAlert: _showAlert,
      hideAlert: _hideAlert,
      showGeocodedFeaturesNotice: _showGeocodedFeaturesNotice,
    } = this.props;

    const { downloading, toggleAddLayer, appendItem } = this.state;

    return (
      <div>
        {isMobile() && <MobileScreenAlert />}
        <Dashboard
          context="data"
          layout="list"
          accLayout={false}
          items={spaces}
          itemsLoaded={itemsLoaded}
          deleteItem={this.onSpaceDeleteClick}
          deletingItem={deletingItem}
          onShowAddDataLayer={this.onShowAddDataLayer}
          onDownload={this.onDownload}
          download={downloading}
          labels={['TITLE', 'DESCRIPTION']}
          loader={_loader}
          virtualizeSpace={_virtualizeSpace}
          updateVirtualSpaces={_updateVirtualSpaces}
        />

        <Transition
          in={toggleAddLayer}
          timeout={{
            enter: 0,
            exit: 400,
          }}
          unmountOnExit
        >
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <AddDataLayer
                loader={_loader}
                loading={loading}
                cleanUpSpaces={_cleanUpSpaces}
                spacesLimit={_spacesLimit}
                onError={this.showDataLayerAlert}
                spaceLimitValue={spaceLimitValue}
                fileSizeLimit={_fileSizeLimit}
                hasError={alert}
                items={spaces}
                itemsProMap={proMap}
                itemsVirtualMap={virtualMap}
                appendItem={appendItem}
                uploadProgress={uploadProgress}
                cancelText="Done"
                onHideAddDataLayer={this.onHideAddDataLayer}
                onSpaceAdd={_createNewSpace}
                fullWidth
                showAlert={_showAlert}
                hideAlert={_hideAlert}
                showGeocodedFeaturesNotice={_showGeocodedFeaturesNotice}
                dataContext
              />
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.common.loading,
  spaces: state.space.items,
  proMap: state.space.itemsProMap,
  virtualMap: state.space.itemsVirtualMap,
  uploadProgress: state.space.uploadProgress,
  itemsLoaded: state.space.itemsLoaded,
  deletingItem: state.space.deletingItem,
  alert: state.map.alert,
  spaceLimitValue: state.user.user && state.user.user.spaceLimit,
});

export default withRouter(
  connect(mapStateToProps, {
    loader,
    spacesLimit,
    fileSizeLimit,
    cleanUpSpaces,
    fetchSpaces,
    deleteSpace,
    showAlert,
    hideAlert,
    showGeocodedFeaturesNotice,
    createNewSpace,
    virtualizeSpace,
    updateVirtualSpaces,
  })(Spaces)
);
