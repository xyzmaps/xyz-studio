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
import _ from 'lodash';
import update from 'immutability-helper';

import ReactTable from 'react-table';
import ReactPaginate from 'react-paginate';
import {
  addFeatureProp,
  deleteFeatureProp,
  setCurrentFeature,
  hideAlert,
  showAlert,
} from '../../actions/mapActions';
import { spacesAPI, apiErrorHandler } from '../../api';
import { sortAlphaNum } from '../../helpers';

// react-paginate
import { mapConfig } from '../../constants';

import Search from '../../components/Common/Search';
import Edit from '../../components/DataTable/Widget/Edit';

// svg
import { Trash } from '../../icons';

import style from './DataTable.scss';
import store from '../../store';

const TABLE_UPDATE_THROTTLE_TIME = 1000;
let TABLE_UPDATE_THROTTLE_TIMER = null;

class DataTable extends Component {
  static defaultProps = {
    setTotalFeatureCount: () => {},
    onDeleteRow: () => {},
    isUpdateRealTime: false,
    features: null,
    deletedFeatureIds: [],
  };

  constructor(props) {
    super(props);

    const { features, deletedFeatureIds } = props;

    this.state = {
      search: '',
      loading: true,
      labels: [],
      columns: [],
      features: features ? [...features] : features, // features show on the table, different structure than prop features
      deletedFeatureIds: [...deletedFeatureIds],
      currentPage: 0,
      currentFeatureId:
        this.props.currentFeature && this.props.currentFeature.id
          ? this.props.currentFeature.id
          : '',
      currentRowIndex:
        this.props.currentFeature && this.props.currentFeature.id
          ? this.props.currentFeature.id
          : '',
    };
  }

  componentDidMount() {
    // get totale features
    this.makeApiCalls(true);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentLayer !== this.props.currentLayer) {
      return true;
    }

    if (nextProps.spaceId !== this.props.spaceId) {
      return true;
    }

    if (
      nextProps.features &&
      nextProps.features.length !== this.props.features.length
    ) {
      return true;
    }

    if (nextProps.updatedTime !== this.props.updatedTime) {
      return true;
    }

    if (!Object.is(nextState, this.state)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps) {
    const { currentFeature, currentLayer, features, updatedTime } = this.props;

    if (currentFeature) {
      if (!prevProps.currentFeature) {
        this.updateFeature(
          currentFeature.id,
          currentFeature.geometry,
          currentFeature.properties
        );
      } else if (currentFeature.id !== prevProps.currentFeature.id)
        this.updateFeature(
          currentFeature.id,
          currentFeature.geometry,
          currentFeature.properties
        );
    }

    if (prevProps.currentLayer !== currentLayer && !prevProps.currentLayer) {
      this.makeApiCalls(true);
    } else if (
      features &&
      (features.length !== prevProps.features.length ||
        updatedTime !== prevProps.updatedTime)
    ) {
      this.throttleInitTable(this.props.features);
    }
  }

  // service header
  headers = {
    headers: {
      'Content-Type': 'application/geo+json',
    },
    withCredentials: true,
  };

  features = []; // all features

  // pagination
  featuresPerPage = 100;

  featureHandle = '';

  featuresLoaded = this.props.features ? this.props.features.length : 0;

  featureEstimated = 0;

  handlePagination = [''];

  handleIndex = 0;

  totalPage = 0;

  objectProperties = [];

  richUI = false;

  popAlert = (config = {}) => {
    if (!this.state.loading) {
      this.props.showAlert(config);
    }
  };

  // flatten objects in properties as "objectName:propertyKey": propertyValue
  flattenProperties = feature => {
    const properties = { ...feature.properties };

    for (const key in properties) {
      if (
        key !== '@ns:com:here:xyz' &&
        key !== '@ns:com:here:editor' &&
        _.isObject(properties[key])
      ) {
        this.objectProperties = [...this.objectProperties, key];

        for (const innerPropKey in properties[key]) {
          properties[`${key}:${innerPropKey}`] = properties[key][innerPropKey];
        }

        delete properties[key];
      }
    }

    this.objectProperties = _.uniq(this.objectProperties);

    return { ...feature, properties };
  };

  // unflatten single property
  unflattenProperty = (key, value) => {
    const keys = key.indexOf(':') !== -1 ? key.split(':') : [];
    const prop =
      keys.length && _.includes(this.objectProperties, keys[0])
        ? { [keys[0]]: { [keys[1]]: value } }
        : { [key]: value };

    return prop;
  };

  // remove all properties
  // returns both flatten and un flatten property
  removeProperties = name => {
    const unFlattenFeatures = []; // for api
    const flattenFeatures = []; // for data table

    if (name) {
      _.each([...this.features], feature => {
        let unflattenProperties = [];
        let flattenProperties = [];

        _.each(feature.featureObject.properties, (value, key) => {
          if (
            key !== name &&
            key !== '@ns:com:here:editor' &&
            key !== '_provider'
          ) {
            const keys = key.indexOf(':') !== -1 ? key.split(':') : [];
            const props =
              key !== '@ns:com:here:xyz' && keys.length
                ? {
                    [keys[0]]: {
                      ...unflattenProperties[keys[0]],
                      [keys[1]]: value,
                    },
                  }
                : { [key]: value };

            unflattenProperties = { ...unflattenProperties, ...props };
            flattenProperties = { ...flattenProperties, [key]: value };
          }
        });

        unFlattenFeatures.push({
          ...feature.featureObject,
          properties: { ...unflattenProperties },
        });

        flattenFeatures.push({
          ...feature,
          featureObject: {
            ...feature.featureObject,
            properties: { ...flattenProperties },
          },
        });
      });
    }

    return {
      unflatten: unFlattenFeatures,
      flatten: flattenFeatures,
    };
  };

  setCurrentFeature = (row, column) => {
    if (column.className.indexOf('delete') !== -1 && this.richUI) {
      this.popAlert({
        theme: 'negative',
        title: 'Delete Row',
        text: "You can't undo this action! Are you sure?",
        cancelLabel: 'Cancel',
        confirm: this.deleteRow,
      });

      this.setState({
        currentFeatureId: row.original.featureId,
        currentRowIndex: row.index,
      });
    } else if (row && row.original && row.original.featureId) {
      this.setState(
        {
          currentFeatureId: row.original.featureId,
        },
        () => this.syncFeature(row.original.featureId)
      );
    }
  };

  // sync feature to sidebar
  syncFeature = (id = '') => {
    if (id) {
      const feature = this.getFeature(id);

      if (feature) {
        this.props.setCurrentFeature({
          id: feature.id,
          geometry: feature.geometry,
          properties: feature.properties,
        });
      }
    }
  };

  // update feature from sidebar
  updateFeature = (id, geometry, properties) => {
    this.features = _.map([...this.features], feature => {
      if (feature.featureId === id) {
        return update(feature, {
          featureObject: {
            geometry: {
              $set: geometry,
            },
            properties: {
              $set: properties,
            },
          },
        });
      }
      return feature;
    });

    this.setState(prevState => ({
      features: this.filterFeatures(this.features, prevState.search),
    }));
  };

  getFeature = id => {
    if (id) {
      const filteredFeature = _.filter([...this.features], feature =>
        _.find(feature, { id })
      )[0];

      if (!_.isEmpty(filteredFeature.featureObject)) {
        return filteredFeature.featureObject;
      }
    }

    return null;
  };

  addFeature = col => {
    return this.filterFeatures(
      _.map([...this.features], o => _.extend({ [col]: '' }, o)),
      this.state.search
    );
  };

  // table
  initTable = features => {
    // const { cards } = this.props;
    const { deletedFeatureIds } = this.state;
    this.features = [];
    this.objectProperties = [];
    this.richUI =
      this.featureEstimated &&
      this.featureEstimated < mapConfig.maxTableFeaturesPerRequest;

    let labels = [];
    const updatedFeatures = features.filter(
      feature => deletedFeatureIds.indexOf(feature.id) === -1
    );

    _.each(updatedFeatures, feature => {
      const flattenFeatures =
        typeof feature.toJSON === 'function'
          ? this.flattenProperties(feature.toJSON())
          : feature;

      labels = [
        ...labels,
        ..._.keys(_.omitBy(flattenFeatures.properties, _.isObject)),
      ]; // create labels

      // get current index on selected feature
      if (this.state.currentFeatureId !== feature.id) {
        this.features.push({
          featureId: feature.id,
          featureObject: flattenFeatures,
        });
      } else {
        this.features.unshift({
          featureId: feature.id,
          featureObject: flattenFeatures,
        });
      }
    });

    // unify array
    labels = _.uniq(labels);
    // case insensitive sort labels
    labels = labels.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    // set total pages
    this.setTotalPages(this.features);

    this.setState(prevState => ({
      loading: false,
      labels,
      columns: this.createCols(labels),
      features: this.filterFeatures(this.features, prevState.search),
      richUI: this.richUI,
    }));
  };

  throttleInitTable = features => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }

    clearTimeout(TABLE_UPDATE_THROTTLE_TIMER);

    TABLE_UPDATE_THROTTLE_TIMER = setTimeout(
      () => this.initTable(features),
      TABLE_UPDATE_THROTTLE_TIME
    );
  };

  searchTable = (query = '') => {
    const features = this.filterFeatures(this.features, query);

    this.setTotalPages(features);

    this.setState({
      search: query,
      currentPage: 0,
      features,
    });
  };

  // column & row
  createCols = labels => {
    let columns = [];

    _.each(labels, val => {
      columns = [
        ...columns,
        {
          width: 200,
          Header: () => this.renderTh(val),
          accessor: val,
          Cell: this.renderEditCell,
          sortMethod: (a, b) => sortAlphaNum(a, b),
          sortable: true,
        },
      ];
    });
    if (!this.props.isOpenDataSet) {
      columns = [
        {
          width: 30,
          headerClassName: 'delete',
          className: `${style.delete} delete`,
          accessor: 'delete',
          Cell: () => (
            <button type="button">
              <Trash />
            </button>
          ),
        },
        ...columns,
      ];
    }

    return columns;
  };

  addCol = colName => {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      if (!colName.length || !isNaN(colName.charAt(0))) {
        reject({
          error: '* Please provide a valid column name',
          valid: false,
        });
      } else if (
        _.some(
          this.state.labels,
          val => val.toLowerCase() === colName.toLowerCase()
        )
      ) {
        reject({
          error: `* A "${colName}" column already exists. Please use another column name.`,
          valid: false,
        });
        /* eslint-enable */
      } else {
        this.props.hideAlert();

        this.setState(
          prevState => ({
            features: this.addFeature(colName),
            columns: [
              prevState.columns[0],
              {
                width: 200,
                Header: () => this.renderTh(colName),
                accessor: colName,
                Cell: this.renderEditCell,
              },
              ...prevState.columns.slice(1, prevState.columns.length),
            ],
          }),
          () => resolve({ valid: true })
        );
      }
    });
  };

  onAddCol = () => {
    this.popAlert({
      theme: 'positive',
      title: 'Column Name',
      text: 'Please insert a column name.',
      placeholder: 'Column name',
      cancelLabel: 'Cancel',
      confirm: this.addCol,
    });
  };

  onEditCol = () => {
    this.popAlert({
      theme: 'default',
      title: 'Edit dataset',
      text:
        'Any change to a dataset will also appear in all projects that use the same dataset. Changes cannot be undone.',
      placeholder: 'Column name',
      checkboxLabel: 'Do not show this message again',
      onCheck: this.onAlertEditChecked,
      cancelLabel: 'Close',
    });
  };

  deleteCol = colName => {
    if (!JSON.parse(localStorage.getItem('alertEditCol'))) {
      this.onEditCol();
    }

    const { onCardToggle, isUpdateRealTime } = this.props;
    const features = this.removeProperties(colName); // remove properties
    this.features = features.flatten;

    this.setState(
      prevState => ({
        columns: _.reject([...prevState.columns], { accessor: colName }),
        labels: _.pull([...prevState.labels], colName),
        features: this.filterFeatures(this.features, prevState.search), // returns features with search results
      }),
      () => {
        // sync feature with feature panel
        this.syncFeature(this.state.currentFeatureId);
        this.props.deleteFeatureProp(colName === 'id' ? '__id' : colName);
        if (isUpdateRealTime) {
          onCardToggle(colName === 'id' ? '__id' : colName);
        }

        // remove from database
        this.apiRemoveProperties(features.unflatten);
      }
    );
  };

  addRow = () => {
    // copy properties structure
    const row = {};
    _.each(this.state.features[0], (v, k) => {
      row[k] = '';
    });

    this.setState(prevState => ({
      features: _.concat(row, [...prevState.features]),
    }));
  };

  deleteRow = () => {
    if (this.richUI) {
      this.apiDeleteFeature(
        this.state.currentFeatureId,
        this.state.currentRowIndex
      );
    }
  };

  // notification
  onAlertEditChecked = checked => {
    localStorage.setItem('alertEditCol', checked);
  };

  onCellToggleFocus = (e, className = '') => {
    e.target.className = className;

    if (!JSON.parse(localStorage.getItem('alertEditCol'))) {
      this.onEditCol();
    }
  };

  getCellValue = (e, cell) => {
    const editedValue = e.target.textContent || e.target.innerText || '';

    return {
      id: cell.original.featureId,
      key: cell.column.id,
      index: cell.index,
      value: cell.value,
      editedValue:
        editedValue === '' || isNaN(Number(editedValue))
          ? editedValue
          : Number(editedValue),
    };
  };

  setCellValue = (e, cell) => {
    let done = false;
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
      done = true;
    }

    if (done) return;

    if (e.type === 'blur' || e.key === 'Enter') {
      this.onCellToggleFocus(e);

      const { id, key, index, value, editedValue } = this.getCellValue(e, cell);
      const { onCardToggle, isUpdateRealTime } = this.props;

      // if change on cell value
      if (value !== editedValue) {
        if (id) {
          this.apiUpdateProperty(id, key, editedValue, index);
        } else {
          this.apiAddProperty(key, editedValue, index);
        }

        // add label
        if (!_.includes(this.state.labels, cell.column.id)) {
          this.setState(
            prevState => ({
              labels: [...prevState.labels, cell.column.id],
            }),
            () => {
              if (isUpdateRealTime) {
                onCardToggle(cell.column.id);
              }
            }
          );
        }
      }
    }
  };

  // pagination
  setTotalPages = features => {
    this.totalPage = Math.ceil(features.length / this.featuresPerPage) || 0;
  };

  PrevPage = disabled => {
    if (!disabled) {
      this.setState(prevState => {
        if (prevState.currentPage <= 0) {
          this.handleIndex =
            this.handleIndex - 1 <= 0 ? 0 : this.handleIndex - 1;
          this.makeApiCalls();

          return {
            currentPage: this.totalPage - 1,
          };
        }

        return {
          currentPage: prevState.currentPage - 1,
        };
      });
    }
  };

  NextPage = disabled => {
    if (!disabled) {
      this.setState(prevState => {
        if (prevState.currentPage >= this.totalPage - 1) {
          this.handleIndex += 1;
          this.makeApiCalls();

          return {
            currentPage: 0,
          };
        }

        return {
          currentPage: prevState.currentPage + 1,
        };
      });
    }
  };

  // returns [{featureId, featureGeometry, featureProperties}]
  listFeature = features => {
    const featuresList = [];
    features.forEach(o => {
      if (o.featureObject.geometry)
        featuresList.push({
          featureId: o.featureId,
          featureGeometry: o.featureObject.geometry,
          ...o.featureObject.properties,
        });
    });
    return featuresList;
  };

  // returns filtered feature array [{featureId, featureGeometry, featureProperties}]
  filterFeatures = (features, query = '') => {
    let filteredFeatures = [];
    let selectedId = '';

    if (query.length) {
      filteredFeatures = this.listFeature(
        _.filter([...features], feature => {
          return _.find(feature.featureObject.properties, (value, key) => {
            // is not an object && includes in the columns && match with closest query
            if (
              value &&
              !_.isObject(value) &&
              this.state.labels.includes(key) &&
              value
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) !== -1
            ) {
              if (
                !selectedId &&
                this.state.currentFeatureId === feature.featureId
              ) {
                selectedId = feature.featureId;
              }

              return true;
            }

            return false;
          });
        })
      );

      if (!selectedId && filteredFeatures.length) {
        this.setState(
          {
            currentFeatureId: filteredFeatures[0].featureId,
          },
          () => this.syncFeature(filteredFeatures[0].featureId)
        );
      } else if (!filteredFeatures.length) {
        this.setState(
          {
            currentFeatureId: '',
          },
          () => this.props.setCurrentFeature(null)
        );
      }
    } else {
      filteredFeatures = this.listFeature([...features]);
    }

    return filteredFeatures;
  };

  patchFeature = (id, key, value) => {
    this.features = _.map([...this.features], feature => {
      if (feature.featureId === id) {
        return update(feature, {
          featureObject: {
            properties: {
              [key]: { $set: value },
            },
          },
        });
      }
      return feature;
    });

    this.syncFeature(id);

    // force refresh table
    this.setState(prevState => ({
      features: this.filterFeatures(this.features, prevState.search),
    }));
  };

  // api
  fetchFeatures = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }

    if (this.props.features) {
      this.throttleInitTable(this.props.features);
    } else {
      spacesAPI
        .get(
          `/${this.props.spaceId}/iterate?limit=${
            mapConfig.maxTableFeaturesPerRequest
          }&handle=${
            this.handlePagination.length
              ? this.handlePagination[this.handleIndex]
              : ''
          }`,
          this.headers
        )
        .then(response => {
          this.featureHandle = !!response.data.handle;

          if (this.featureHandle) {
            this.handlePagination = _.uniq([
              ...this.handlePagination,
              response.data.handle,
            ]);
          } else if (this.handlePagination.length > 1) {
            this.handlePagination = [...this.handlePagination, ''];
          } else {
            this.handlePagination = [...this.handlePagination];
          }

          this.initTable(response.data.features);
        })
        .catch(e => apiErrorHandler(e));
    }
  };

  makeApiCalls = (getStatistics = false) => {
    this.setState(prevState => {
      if (!prevState.loading) {
        return { loading: true };
      }

      return prevState;
    });

    if (getStatistics) {
      spacesAPI
        .get(`/${this.props.spaceId}/statistics`, this.headers)
        .then(response => {
          this.featureEstimated = response.data.count.value;
          this.props.setTotalFeatureCount(this.featureEstimated);
          this.fetchFeatures();
        })
        .catch(e => apiErrorHandler(e));

      return true;
    }

    this.fetchFeatures();
    return false;
  };

  apiUpdateProperty = (featureId, key, value) => {
    spacesAPI
      .patch(
        `/${this.props.spaceId}/features/${featureId}`,
        JSON.stringify({
          type: 'Feature',
          properties: this.unflattenProperty(key, value),
        }),
        this.headers
      )
      .then(() => {
        this.patchFeature(featureId, key, value);
        this.props.addFeatureProp(
          key === 'id' ? '__id' : key,
          value,
          featureId
        );
      })
      .catch(e => apiErrorHandler(e, store.dispatch));
  };

  apiAddProperty = (key, value) => {
    spacesAPI
      .put(
        `/${this.props.spaceId}/features`,
        JSON.stringify({
          features: [{ properties: { [key]: value }, type: 'Feature' }],
          type: 'FeatureCollection',
        }),
        this.headers
      )
      .then(response => {
        this.patchFeature(response.data.features[0].id, key, value);
      })
      .catch(e => apiErrorHandler(e));
  };

  apiRemoveProperties = properties => {
    spacesAPI
      .put(
        `/${this.props.spaceId}/features`,
        JSON.stringify({ features: properties, type: 'FeatureCollection' }),
        this.headers
      )
      .catch(e => apiErrorHandler(e));
  };

  apiDeleteFeature = (featureId, rowId) => {
    // delete feature if feature id is presented
    if (featureId) {
      this.features = _.reject([...this.features], { featureId });
      this.setState(
        prevState => ({
          features: this.filterFeatures(this.features, prevState.search),
          deletedFeatureIds: [...prevState.deletedFeatureIds, featureId], // deleted feature ids
        }),
        () => {
          this.props.setCurrentFeature(null);

          spacesAPI
            .delete(
              `/${this.props.spaceId}/features/${featureId}`,
              this.headers
            )
            .then(() => {
              if (this.props.isUpdateRealTime) {
                this.props.onDelete(featureId);
              }
            })
            .catch(e => apiErrorHandler(e));
        }
      );
    } else {
      this.setState(prevState => ({
        features: this.filterFeatures(
          [...this.features].splice(rowId, 1),
          prevState.search
        ),
      }));
    }
  };

  // render
  renderTh = colName => {
    const { currentLayer, onCardToggle, isUpdateRealTime } = this.props;

    return (
      <div className="-label">
        <strong>{colName}</strong>
        {(isUpdateRealTime || this.deleteCol) && (
          <Edit
            onCardToggle={onCardToggle}
            cardLabel={colName}
            deleteCol={
              this.featureEstimated &&
              this.featureEstimated < mapConfig.maxTableFeaturesPerRequest &&
              this.deleteCol
            }
            currentLayer={currentLayer}
          />
        )}
      </div>
    );
  };

  renderEditCell = cell => {
    return this.props.isOpenDataSet ? (
      <div className={style.edit}>
        {' '}
        {this.state.features[cell.index][cell.column.id]}{' '}
      </div>
    ) : (
      <div
        role="presentation"
        className={style.edit}
        contentEditable
        suppressContentEditableWarning
        onClick={e => this.onCellToggleFocus(e, 'selected')}
        onKeyPress={e => this.setCellValue(e, cell)}
        onBlur={e => this.setCellValue(e, cell)}
      >
        {this.state.features[cell.index][cell.column.id]}
      </div>
    );
  };

  renderPrevButton = () => {
    const className =
      !this.state.currentPage && !this.handleIndex ? style.disabled : '';

    return (
      this.totalPage > 1 && (
        <li className={[style.previous, className].join(' ')}>
          <span
            role="presentation"
            aria-disabled="false"
            onClick={() => this.PrevPage(className)}
          >
            PREV
          </span>
        </li>
      )
    );
  };

  renderNextButton = () => {
    const className =
      this.state.currentPage >= this.totalPage - 1 &&
      !this.handlePagination[this.handlePagination.length - 1]
        ? style.disabled
        : '';

    return (
      this.totalPage > 1 && (
        <li className={[style.next, className].join(' ')}>
          <span
            role="presentation"
            aria-disabled="false"
            onClick={() => this.NextPage(className)}
          >
            NEXT
          </span>
        </li>
      )
    );
  };

  renderHeader = (propFeatures, stateFeatures, isRichUi, isOpenDataSet) => {
    const isSearchable =
      stateFeatures.length < mapConfig.maxTableFeaturesPerRequest;

    return (
      <div className={style.header}>
        <div className={style.title}>
          {propFeatures ? (
            <h3 className={style.info}>
              <strong>{stateFeatures.length}&nbsp;</strong>
              <span>
                of {this.featureEstimated} features currently visible on map
              </span>
            </h3>
          ) : (
            <h3 className={style.info}>
              <strong>{this.featureEstimated}</strong>{' '}
              <span>feature{stateFeatures.length > 1 && 's'}</span>
            </h3>
          )}

          {!isRichUi && this.featureEstimated > 0 && (
            <p className={style.sub}>
              Some functionalities are disabled when viewing XYZ Spaces that
              contain more than {mapConfig.maxTableFeaturesPerRequest} features
            </p>
          )}
        </div>

        <div className={style.headerAction}>
          <div
            className={`${style.search} ${!isSearchable &&
              style.disableSearch}`}
          >
            <Search
              searchInputStyle={style.searchInput}
              iconClassName={style.searchIcon}
              iconColor={style.searchIconColor}
              placeholder="Search data"
              onSearch={isSearchable && this.searchTable}
            />
          </div>

          {!isOpenDataSet && (
            <div className={style.add}>
              <button
                type="button"
                onClick={() => isRichUi && this.onAddCol()}
                className={style.addBtn}
              >
                + Add Column
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  renderDataTable = () => {
    const {
      richUI,
      columns,
      currentPage,
      labels,
      currentFeatureId,
      features: _features,
    } = this.state;

    return (
      <>
        <ReactTable
          className={style.table}
          columns={columns}
          data={_features}
          defaultPageSize={this.featuresPerPage}
          page={currentPage}
          showPagination={false}
          defaultSortMethod={(a, b) => sortAlphaNum(a, b)}
          getTheadThProps={(state, rowInfo, column) => {
            return {
              className: _.includes(labels, column.id) ? '' : 'disabled-edit',
            };
          }}
          getTrProps={(state, rowInfo) => {
            return {
              className:
                rowInfo && rowInfo.original.featureId === currentFeatureId
                  ? 'selected'
                  : '',
            };
          }}
          getTdProps={(state, rowInfo, column) => {
            return {
              onClick: (e, handleOriginal) => {
                this.setCurrentFeature(rowInfo, column);

                if (handleOriginal) {
                  handleOriginal();
                }
              },
            };
          }}
        />

        {richUI && this.features.length > this.featuresPerPage ? (
          <ReactPaginate
            containerClassName={style.pagination}
            activeClassName={style.selected}
            disabledClassName={style.disabled}
            previousClassName={style.previous}
            nextClassName={style.next}
            pageCount={this.totalPage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            previousLabel="PREV"
            nextLabel="NEXT"
            onPageChange={pagination =>
              this.setState({ currentPage: pagination.selected })
            }
          />
        ) : (
          <ul className={style.pagination}>
            {this.renderPrevButton()}
            {this.renderNextButton()}
          </ul>
        )}
      </>
    );
  };

  render() {
    const {
      loading,
      richUI,
      features: _features,
      // alertDeleteRow,
      // alertAddCol,
      // alertEditCol,
      search,
    } = this.state;

    const {
      features,
      isOpenDataSet,
      currentLayer,
      isUpdateRealTime,
    } = this.props;
    const richUIStyle = richUI ? style.richUI : '';
    let message = null;

    // If features are updating in realtime, we identify with this props
    if (isUpdateRealTime) {
      if (features && !features.length) {
        message = () => (
          <p className={style.exceptionMsg}>
            There aren&apos;t any features to display for this space. Make sure
            the features are visible on the map.
          </p>
        );
      }

      if (_features.length > mapConfig.maxTableFeaturesPerRequest) {
        message = () => (
          <p className={style.exceptionMsg}>
            Currently, we show {mapConfig.maxTableFeaturesPerRequest} features
            for a XYZ space.
          </p>
        );
      }

      if (!currentLayer) {
        message = () => (
          <p className={style.exceptionMsg}>Please select a layer.</p>
        );
      }
    }

    // If the table data is being filtered or updated, we show loading
    if (loading) {
      message = () => <div className={style.exceptionMsg}>Loading...</div>;
    }

    // If we have an exception, we'll show through this `message` component
    if (message) {
      return (
        <div className={`${style.content} ${richUIStyle}`}>{message()} </div>
      );
    }

    return (
      <div className={`${style.content} ${richUIStyle}`}>
        {this.renderHeader(features, _features, richUI, isOpenDataSet)}

        {!_features.length && !!features && !!features.length && !!search ? (
          <p className={style.exceptionMsg}>
            There aren&apos;t any features that matches the search criteria.
          </p>
        ) : (
          this.renderDataTable()
        )}
      </div>
    );
  }
}

const s2p = state => ({
  currentFeature: state.map.currentFeature,
  updatedTime: state.map.updatedTime,
  virtualMap: state.space.itemsVirtualMap,
});

export default connect(s2p, {
  addFeatureProp,
  deleteFeatureProp,
  setCurrentFeature,
  showAlert,
  hideAlert,
})(DataTable);
