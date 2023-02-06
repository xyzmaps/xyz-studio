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
import { Scrollbars } from 'react-custom-scrollbars';

import _ from 'lodash';

import Button from '../Common/Button';
import Search from '../Common/Search';
import AddDataAddOn from './AddDataAddOn';
import {
  Checkmark,
  Cancel,
  UploadNew,
  Add,
  // SchemaBBG,
  Plus,
} from '../../icons';

import style from './AddDataLayerList.scss';
import ScrollbarStyle from '../../config/ScrollbarStyle';
import logEvent from '../../utils/amplitudeLogger';
import AddOnBanner from '../AddOnTrigger/AddOnBanner';

const progressClasses = progress => {
  let classes = {};

  if (typeof progress === 'string') {
    if (progress.indexOf('Schema')) classes = style.warning;
    else classes = style.error;
  } else if (progress < 100) {
    classes = style.uploading;
  } else if (progress >= 100) {
    classes = style.success;
  }

  return classes;
};

const renderLoader = progress => {
  return typeof progress !== 'string' ||
    (typeof progress === 'string' && !progress.indexOf('Schema')) ? (
    // eslint-disable-next-line react/jsx-indent
    <div className={style.loader}>
      <Checkmark className={style.checkmark} />
      <Cancel className={style.cancel} />

      {typeof progress === 'string' ? (
        <div className={style.notification}>
          <p data-type="Error">{progress}</p>
        </div>
      ) : (
        <div className={style.progress}>
          <div className={style.bar} style={{ width: `${progress}%` }}>
            <div className={style.indicator}>{progress}%</div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className={style.warningLoader}>
      <div className={style.notification}>
        <p data-type="Warning">{progress}</p>
      </div>
    </div>
  );
};

class AddDataLayerList extends Component {
  state = {
    searchQuery: '',
    itemsProMap: this.props.itemsProMap,
    itemsVirtualMap: this.props.itemsVirtualMap,
    // addOnLoading: false,
    // updateSchema: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ itemsVirtualMap: nextProps.itemsVirtualMap });
  }

  componentWillUnmount = () => {
    this.props.uploadProgressSpace();
  };

  itemClasses = (id, title, progress, isItemAdded) => {
    const { selectedItems, selectable } = this.props;

    const classes = [style.item];

    if (selectedItems.indexOf(id) !== -1) {
      classes.push(style.selected);
    }

    if (!selectable) {
      classes.push(style.readonly);
    }

    if (progress) {
      classes.push(progressClasses(progress));
    }

    if (isItemAdded) {
      classes.push(style.disabledSpace);
    }

    return classes.join(' ');
  };

  renderSubItems = item => {
    const { uploadProgress } = this.props;

    return _.map(uploadProgress[item.id], (progress, title) => {
      const progressSubItem =
        uploadProgress[item.id] &&
        uploadProgress[item.id][title] &&
        uploadProgress[item.id][title];
      const classes = progressClasses(progressSubItem);

      return (
        item.title !== title && (
          <div
            key={`${item.id}-${title}`}
            className={`${style.subitem} ${style.readonly} ${classes}`}
          >
            <div className={style.row}>
              <div className={style.data}>
                <span />
                <span />
                <span>{title}</span>
                <span />
              </div>

              {renderLoader(progressSubItem)}
            </div>
          </div>
        )
      );
    });
  };

  renderItems = items => {
    const {
      onOverFlow,
      uploadProgress,
      selectable,
      onItemSelect,
      currentProject,
      isPro,
    } = this.props;

    if (this.scrollbarElem) {
      onOverFlow(
        this.scrollbarElem.getScrollHeight() >
          this.scrollbarElem.getClientHeight()
      );
    }

    return _.map(items, (item, key) => {
      let isItemAdded;
      let schemaAdded;
      let isVsSpace;
      let isActivityLogSapce = false;

      if (this.state.itemsProMap.indexOf(item.id) !== -1) schemaAdded = true;
      else schemaAdded = false;

      if (this.state.itemsVirtualMap.indexOf(item.id) !== -1) isVsSpace = true;
      else isVsSpace = false;

      if (currentProject) {
        currentProject.layers.forEach(l => {
          if (item.id === l.geospace.id) isItemAdded = true;
        });
      }

      if (item.title.indexOf('activity-log for space') > -1) {
        isActivityLogSapce = true;
      }

      const progressItem =
        uploadProgress[item.id] &&
        uploadProgress[item.id][item.title] &&
        uploadProgress[item.id][item.title];

      const classes = this.itemClasses(
        item.id,
        item.title,
        progressItem,
        isItemAdded
      );

      return (
        (selectable || uploadProgress[item.id]) &&
        !isActivityLogSapce && (
          <div
            role="presentation"
            key={`${item.id}-${key}`}
            title={isItemAdded ? 'This space is already added.' : ''}
            className={classes}
            onClick={() => !isItemAdded && selectable && onItemSelect(item.id)}
          >
            <div className={style.row}>
              <div className={style.data}>
                {selectable && (
                  <span>
                    <div role="presentation" className={style.checkbox} />
                  </span>
                )}
                <span>{item.id}</span>
                <span>{item.owner}</span>
                <span>{item.title}</span>
                <span style={{ width: `${isPro ? '13%' : '28%'}` }}>
                  {item.description}
                </span>
                <span style={{ display: `${isPro ? 'block' : 'none'}` }}>
                  {schemaAdded && (
                    <div
                      className={style.schemaIcon}
                      data-tip="Schema Validation Applied"
                    >
                      Schema
                    </div>
                  )}{' '}
                  {isVsSpace && (
                    <div className={style.schemaIcon} data-tip="Virtual Space">
                      Virtual
                    </div>
                  )}
                </span>
                <span>
                  <div
                    role="presentation"
                    onClick={() => this.onUploadClick(item)}
                  >
                    <Add role="presentation" className={style.upload} />
                  </div>
                </span>
                <span>
                  <div
                    role="presentation"
                    className={style.pro}
                    style={{ display: `${isPro ? 'block' : 'none'}` }}
                    onClick={e => {
                      e.stopPropagation();
                      logEvent('apply_addon_post_upload');
                      this.showProAlert(item);
                    }}
                  >
                    Add On
                  </div>
                </span>
              </div>

              {renderLoader(progressItem)}
              {this.state.warning &&
                typeof progressItem === 'string' &&
                progressItem.indexOf('Schema') && (
                  <div className={style.warningWrap}>
                    <div className={style.notification}>
                      <p
                        data-type={
                          progressItem.indexOf('Schema') ? 'Warning' : 'Error'
                        }
                      >
                        {progressItem}
                      </p>
                    </div>
                  </div>
                )}
            </div>
            {!selectable &&
              uploadProgress[item.id] &&
              _.size(uploadProgress[item.id]) &&
              this.renderSubItems(item, classes)}
          </div>
        )
      );
    });
  };

  showProAlert = item => {
    this.props.showAlert({
      customAlert: (
        <AddDataAddOn
          item={item}
          items={this.props.items}
          itemsProMap={this.state.itemsProMap}
          itemsVirtualMap={this.state.itemsVirtualMap}
          hideAlert={this.props.hideAlert}
          onAddedVirtualSpace={this.props.onAddedVirtualSpace}
          loader={this.props.loader}
          virtualizeSpace={this.props.virtualizeSpace}
          updateVirtualSpaces={this.props.updateVirtualSpaces}
        />
      ),
    });
  };

  schemaAlert = item => {
    this.props.showAlert({
      theme: 'default',
      title: 'Schema is Applied on this space',
      text: 'Would you like to remove the schema validation?',
      confirmLabel: 'Remove Schema',
      confirm: () => this.onRemoveSchema(item),
      cancel: this.props.hideAlert,
      cancelLabel: 'Cancel',
    });
  };

  onUploadClick = item => {
    const { onUploadClick } = this.props;

    logEvent('add_more_data');
    onUploadClick(item);
  };

  searchItem(param) {
    this.setState({
      searchQuery: param,
    });
  }

  deleteAll = () => {
    this.props.items.forEach(item => {
      this.props.deleteSpace(item.id);
    });
  };

  render() {
    const {
      items,
      selectable,
      loading,
      isPro,
      onVirtualSpaceClick,
      dataContext,
    } = this.props;
    const { searchQuery } = this.state;

    let newItems = [...items];
    newItems = _.filter(
      newItems,
      obj =>
        !_.isEmpty(obj) &&
        (new RegExp(_.escapeRegExp(searchQuery), 'gi').test(obj.title) ||
          new RegExp(_.escapeRegExp(searchQuery), 'gi').test(obj.id) ||
          new RegExp(_.escapeRegExp(searchQuery), 'gi').test(obj.owner))
    );
    return (
      <div className={`${style.wrapper}`}>
        <div className={style.toolBar}>
          <div className={style.searchWrapper}>
            <Search
              onSearch={e => this.searchItem(e)}
              placeholder="Search space by ID or Title"
              theme="light"
              searchInputStyle={style.searchInput}
            />
          </div>
          <Button
            // eslint-disable-next-line no-use-before-define
            text={(<span className={style.uploadButton}> <UploadNew /> Upload </span>)} // prettier-ignore
            type="primary"
            onClick={() => this.onUploadClick()}
            disabled={loading}
          />
        </div>

        <AddOnBanner
          addData
          isPro={isPro}
          showAlert={this.props.showAlert}
          hideAlert={this.props.hideAlert}
        />

        {/* {// Add on feature banner
        isPro && (
          <div className={style.header1}>
            Set your <span>Add On Features</span> to spaces during file upload
            OR even after upload
            <div className={style.featureTab}>
              <div className={style.featureSelect}>
                <div className={style.featureIcon}>
                  <div className={style.pro}>Add On</div>
                  <SchemaBBG />
                </div>
                Schema Validation
              </div>
              <div className={style.featureSelect}>
                <div className={style.featureIcon}>
                  <div className={style.pro}>Add On</div>
                  <SchemaBBG />
                </div>
                Activity Log
              </div>
              <div className={style.featureSelect}>
                <div className={style.featureIcon}>
                  <div className={style.soon}>
                    More Add-On Features Coming Soon...!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {newItems.length > 0 && (
          <div className={style.virtualSpaceContainer}>
            {isPro && (
              <span
                role="presentation"
                onClick={onVirtualSpaceClick}
                className={style.createButton}
              >
                <Plus />
                Create Virtual Space
              </span>
            )}
            {!dataContext && (
              <div className={style.totalSpaces}>
                {`Total spaces: ${newItems.length}`}
              </div>
            )}
          </div>
        )}
        <div
          className={`${style.item} ${style.header} ${!selectable &&
            style.readonly}`}
        >
          <div className={style.data}>
            {selectable && <span />}
            <span>id</span>
            <span>owner</span>
            <span>title</span>
            <span style={{ width: `${isPro ? '13%' : '28%'}` }}>
              description
            </span>
            <span style={{ display: `${isPro ? 'block' : 'none'}` }} />
            <span>data</span>
            <span style={{ display: `${isPro ? 'block' : 'none'}` }}>
              Settings
            </span>
          </div>
        </div>

        <Scrollbars
          className={style.container}
          renderTrackVertical={props => (
            <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
          )}
          renderThumbVertical={props => (
            <div {...props} style={ScrollbarStyle.thumbStyle} />
          )}
          ref={scrollbarElem => {
            this.scrollbarElem = scrollbarElem;
          }}
        >
          {this.renderItems(newItems)}
          {newItems.length === 0 && (
            <div className={style.addDataListEmpty}>
              No spaces found, please add one by dropping a file.
            </div>
          )}
        </Scrollbars>
      </div>
    );
  }
}

export default AddDataLayerList;
