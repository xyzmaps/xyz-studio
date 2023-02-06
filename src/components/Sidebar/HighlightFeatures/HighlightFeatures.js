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
import { flatten, concat, find, uniq, forEach, debounce } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import bbox from '@turf/bbox';

import style from './HighlightFeatures.scss';
import ScrollbarStyle from '../../../config/ScrollbarStyle';

import TypeAhead from '../ProjectLayer/FeatureStyleProps/TypeAhead';
import StyleLabel from '../ProjectLayer/FeatureStyleProps/StyleLabel';
import operators from '../../../constants/rulesCompareOperators';
import styleGroupsConfig from '../../../constants/styleGroupsConfig';
// import Alert from '../../Alert/Alert';
import Button from '../../Common/Button';
import { Trash, Plus } from '../../../icons';

import { spacesAPI, apiErrorHandler } from '../../../api';
import store from '../../../store';

export default class HighlightFeatures extends Component {
  constructor(props) {
    super(props);

    this.boxTemplateObj = {
      property: '',
      operator: '',
      value: '',
    };

    this.state = {
      rules: [[{ ...this.boxTemplateObj }]],
      errors: [],
      dirty: false,
      isFilterApplied: false,
      searchablePropertey: [],
      loading: false,
      dataTypeHashMap: {},
    };
  }

  componentDidMount() {
    const searchablePropertey = [];
    const { spaceId } = this.props;
    spacesAPI
      .get(`/${spaceId}/statistics`, {
        withCredentials: true,
      })
      .then(statistics => {
        const searchableType = statistics.data.properties.searchable;
        const dataTypeHashMap = {};
        forEach(statistics.data.properties.value, v => {
          dataTypeHashMap[v.key] = v.datatype;
          if (searchableType === 'PARTIAL') {
            if (v.searchable)
              searchablePropertey.push({ label: v.key, value: v.key });
          } else if (searchableType === 'ALL') {
            searchablePropertey.push({ label: v.key, value: v.key });
          }
        });
        searchablePropertey.unshift({ label: 'Select Property', value: '' });
        this.setState({ searchablePropertey, dataTypeHashMap });
      })
      .catch(e => apiErrorHandler(e, store.dispatch));
  }

  shouldComponentUpdate(newProps) {
    const { resetFilter } = this.props;
    if (newProps.resetFilter !== resetFilter && newProps.resetFilter === true) {
      this.clearFilter('reset');
    }
    return true;
  }

  componentDidUpdate = prevProps => {
    const { mapMode, currentViewMode } = this.props;
    const { isFilterApplied } = this.state;
    if (
      prevProps.currentViewMode === 'data' &&
      currentViewMode === 'map' &&
      isFilterApplied
    ) {
      debounce(() => {
        this.applyFilter();
      }, 1)();
    }

    if (prevProps.mapMode === 'edit' && mapMode === 'view' && isFilterApplied) {
      this.matchedLayer.addEventListener('viewportReady', this.setStyleGroup);
    }
  };

  componentWillUnmount() {
    this.clearFilter();
  }

  matchedLayer;

  uniqGeometry;

  selectedFeatures;

  appliedFilterRules;

  boxTemplateObj = {
    property: '',
    operator: '',
    value: '',
  };

  applyFilter = () => {
    const { spaceId, showFilterAppliedNote } = this.props;
    this.matchedLayer = find(
      window.mapObject.getLayers(),
      l => l.name.indexOf(spaceId) !== -1
    );

    if (this.selectedFeatures.length > 0) {
      const currentZoom = window.mapObject.getZoomlevel();
      const currentCenter = window.mapObject.getCenter();
      window.mapObject.setViewBounds(
        bbox({
          type: 'FeatureCollection',
          features: this.selectedFeatures,
        })
      );
      const boundZoom = window.mapObject.getZoomlevel();
      const boundCenter = window.mapObject.getCenter();
      window.mapObject.setZoomlevel(
        currentZoom,
        currentCenter.longitude,
        currentCenter.latitude
      );
      window.mapObject.setZoomlevel(
        boundZoom,
        boundCenter.longitude,
        boundCenter.latitude,
        1000
      );
      this.matchedLayer.addEventListener('viewportReady', this.setStyleGroup);
    }
    this.setState({ isFilterApplied: true, loading: false });
    showFilterAppliedNote();
  };

  setStyleGroup = () => {
    const geometryList = [];
    this.selectedFeatures.forEach(feature => {
      if (feature.geometry) {
        geometryList.push(
          styleGroupsConfig.geometryToFeatureStyleType(feature.geometry.type)
        );
        const mapFeature = this.matchedLayer
          .getProvider()
          .getFeature(feature.id);

        if (mapFeature) {
          this.matchedLayer.setStyleGroup(
            mapFeature,
            styleGroupsConfig.selectedFeatureStyle(mapFeature, 'filter')
          );
        }
      }
    });
    this.uniqGeometry = uniq(geometryList);
    this.matchedLayer.removeEventListener('viewportReady', this.setStyleGroup);
  };

  highlightFeature = () => {
    const { spaceId, onFilteringWithEditMode } = this.props;
    const { rules } = this.state;
    this.setState({ loading: true });
    let query = '?';
    rules[0].forEach(rule => {
      let encodeQuery = '';
      rule.value.split(',').forEach(v => {
        if (this.state.dataTypeHashMap[rule.property] === 'string') {
          encodeQuery += `"${encodeURIComponent(v.trim())}",`;
        } else {
          encodeQuery += `${encodeURIComponent(v.trim())},`;
        }
      });

      query += `p.${rule.property}${this.mapOperator(
        rule.operator,
        'query'
      )}${encodeQuery}&`;
    });

    spacesAPI
      .get(`/${spaceId}/search/${query}limit=100000&`, {
        headers: {
          'Content-Type': 'application/geo+json',
        },
        withCredentials: true,
      })
      .then(response => {
        this.clearFilter();
        this.selectedFeatures = response.data.features;
        this.appliedFilterRules = rules;
        this.applyFilter();
        onFilteringWithEditMode(this.appliedFilterRules, this.selectedFeatures);
      })
      .catch(e => {
        this.setState({ loading: false });
        apiErrorHandler(e, store.dispatch);
      });
  };

  validate = onValid => {
    const { rules } = this.state;
    this.setState({ dirty: true });
    const errors = [];
    rules.forEach(group => {
      const g = [];
      group.forEach(({ property, operator, value }, k) => {
        g.push({
          index: k,
          property: property === '',
          operator: operator === '',
          value: value.toString().trim() === '',
        });
      });
      errors.push(g);
    });

    this.setState({ errors: [...errors] }, () => {
      if (this.isValid() && onValid) {
        onValid();
      }
    });
  };

  isValid = () => {
    const { dirty, errors } = this.state;
    const error = find(flatten(errors), e => {
      return !!e.property || !!e.operator || !!e.value;
    });
    return dirty && !error;
  };

  clearFilter = reset => {
    const { onFilteringWithEditMode } = this.props;
    if (this.selectedFeatures) {
      this.selectedFeatures.forEach(feature => {
        const mapFeature = this.matchedLayer
          .getProvider()
          .getFeature(feature.id);

        if (mapFeature) {
          this.matchedLayer.setStyleGroup(mapFeature);
        }
      });
      this.setState({ isFilterApplied: false });
      onFilteringWithEditMode(null);
    }
    if (reset) {
      this.setState({
        rules: [[{ ...this.boxTemplateObj }]],
        errors: [],
        dirty: false,
      });
    }
  };

  hasError = (groupIndex, ruleIndex, key) => {
    const { errors } = this.state;
    if (errors.length > 0) {
      const ruleErrorGroupObject = errors[groupIndex];
      if (ruleErrorGroupObject) {
        return ruleErrorGroupObject[ruleIndex]
          ? ruleErrorGroupObject[ruleIndex][key]
          : false;
      }
      return false;
    }
    return false;
  };

  onRuleParamSet = (groupIndex, index, e) => {
    const { name, value } = e.nativeEvent.target;

    this.setState(prevState => {
      const newRules = [...prevState.rules];
      newRules[groupIndex][index][name] = value;

      return { rules: newRules };
    }, this.validate);
  };

  onPropertySet = (groupIndex, index, e, type) => {
    let value = e.target.innerText;
    if (type === 'operator') {
      switch (e.target.innerText) {
        case 'Equals':
          value = 'eq';
          break;
        case 'Does not equal':
          value = 'neq';
          break;
        case 'Greater than':
          value = 'gt';
          break;
        case 'Less than':
          value = 'lt';
          break;
        case 'Greater than or equal to':
          value = 'gte';
          break;
        case 'Less than or equal to':
          value = 'lte';
          break;
        default:
          value = '=';
      }
    }

    this.setState(prevState => {
      const newRules = [...prevState.rules];
      newRules[groupIndex][index][type] = value;

      return { rules: newRules };
    }, this.validate);
  };

  removeBox = (groupIndex, boxIndex) => {
    this.setState(prevState => {
      const newRules = [...prevState.rules];
      const newRuleGroup = prevState.rules[groupIndex].filter(
        (el, k) => k !== boxIndex
      );
      newRules[groupIndex] = newRuleGroup;

      return {
        rules: newRules.filter(g => g.length > 0),
      };
    });
  };

  getOprator = () => {
    return concat(
      operators
        .filter(({ code }) => code.indexOf('em') === -1)
        .map(({ label }) => {
          return { label, value: label };
        }),
      [{ label: 'Select Condition', value: '' }]
    );
  };

  mapOperator = (operator, type) => {
    switch (operator) {
      case 'eq':
        return type ? '=' : 'Equals';
      case 'neq':
        return type ? '!=' : 'Does not equal';
      case 'gt':
        return type ? '>' : 'Greater than';
      case 'lt':
        return type ? '<' : 'Less than';
      case 'gte':
        return type ? '>=' : 'Greater than or equal to';
      case 'lte':
        return type ? '<=' : 'Less than or equal to';
      default:
        return type ? '=' : '';
    }
  };

  getFilter = (rule, index) => {
    const { rules, dirty, searchablePropertey } = this.state;
    const isRulesAvailable = index > 0 || rules[0].length > 1;
    return (
      <div className={style.filter} key={index}>
        <div className={style.filterHeader}>
          <span>Filter {index + 1}</span>
          {isRulesAvailable && (
            <button
              type="button"
              onClick={this.removeBox.bind(null, 0, index)}
              data-tip="Remove "
              data-tip-x="right"
              className={style.rulesBoxTrash}
            >
              <Trash />
            </button>
          )}
        </div>
        <TypeAhead
          label="Property"
          error={this.hasError(0, index, 'property')}
          required
          name="property"
          options={searchablePropertey}
          onSelect={e => this.onPropertySet(0, index, e, 'property')}
          currentValue={rule.property}
          dirty={dirty}
        />
        <TypeAhead
          label="Condition"
          error={this.hasError(0, index, 'operator')}
          required
          name="operator"
          options={this.getOprator()}
          onSelect={e => this.onPropertySet(0, index, e, 'operator')}
          currentValue={this.mapOperator(rule.operator)}
          dirty={dirty}
        />
        <div>
          <StyleLabel text="Value" required />
          <input
            onChange={this.onRuleParamSet.bind(null, 0, index)}
            className={`${style.inputText} ${
              this.hasError(0, index, 'value') ? style.inputTextError : ''
            }`}
            name="value"
            value={rule.value}
            type="text"
            placeholder="Enter value"
            autoComplete="off"
          />
        </div>
        <span className={style.filterNote}>
          Separate multiple values by comma. <br />
          E.g.: value1, value2, value3
        </span>
      </div>
    );
  };

  getFilters = () => {
    const { rules } = this.state;
    return rules.map(rule => rule.map((r, index) => this.getFilter(r, index)));
  };

  addFilter = () => {
    this.setState(prevState => {
      const newRules = prevState.rules.map(r => [...r]);
      newRules[0].push({ ...this.boxTemplateObj });
      return { rules: newRules };
    });
  };

  openStyleRuleAlert = () => {
    if (!JSON.parse(localStorage.getItem('alertStyleRule'))) {
      this.props.showAlert({
        theme: 'default',
        title: 'Create Style Rule',
        text:
          'You have points, lines and polygons which match your filter conditions. This style group will include any map features that match all the applied filter conditions. Created style rule will be available in the the layer panel.',
        cancelLabel: 'Cancel',
        checkboxLabel: 'Do not show this message again.',
        onCheck: this.onAlertEditChecked,
        confirmLabel: 'Create Style Rule',
        confirm: this.createStyleRule,
      });
    } else {
      this.createStyleRule();
    }
  };

  createStyleRule = () => {
    const { addStyleRule } = this.props;
    const { rules } = this.state;

    const newRules = [];
    rules[0].forEach(rule => {
      const r = { ...rule };
      if (r.property === 'id') {
        r.property = '__id';
      }

      if (r.value.indexOf(',') !== -1) {
        r.value.split(',').forEach((v, i) => {
          const currentRule = { ...r };
          currentRule.value = v;
          if (newRules[i]) {
            newRules[i].push(currentRule);
          } else {
            newRules[i] = [];
            newRules[i].push(currentRule);
          }
        });
      } else if (newRules.length !== 0) {
        newRules.forEach(newRule => {
          newRule.push(r);
        });
      } else {
        newRules[0] = [r];
      }
    });

    this.uniqGeometry.forEach(geometry => {
      addStyleRule(newRules, `Filter ${geometry}`, geometry);
    });
    this.setState({ isFilterApplied: false });
    this.clearFilter();
  };

  onAlertEditChecked = checked => {
    localStorage.setItem('alertStyleRule', checked);
  };

  render() {
    const { isFilterApplied, loading, rules } = this.state;

    return (
      <div className={style.wrapper}>
        {loading && <div className={style.loading} />}
        <div className={style.containerHeader}>
          <span>Filter Property</span>
          <button type="button" onClick={() => this.clearFilter('reset')}>
            Clear all
          </button>
        </div>
        <div className={style.containerSubheader}>
          <div>
            {this.selectedFeatures && isFilterApplied && (
              <div className={style.filterResult}>
                Feature(s): {this.selectedFeatures.length.toLocaleString()}
              </div>
            )}
          </div>
          <div
            role="presentation"
            onClick={() => this.addFilter()}
            className={style.addFilter}
          >
            <Plus /> Add filter
          </div>
        </div>
        <Scrollbars
          style={{ width: '100%', height: 'calc(100% - 203px)' }}
          renderTrackVertical={props => (
            <div {...props} style={ScrollbarStyle.trackVerticalStyle} />
          )}
          renderThumbVertical={props => (
            <div {...props} style={ScrollbarStyle.thumbStyle} />
          )}
        >
          <div>{this.getFilters()}</div>
        </Scrollbars>
        <div className={style.buttonContainer}>
          <Button
            className={[style.button]}
            text={rules[0].length > 1 ? 'Apply All Filters' : 'Apply Filter'}
            onClick={() => this.validate(this.highlightFeature)}
          />
          <Button
            className={[style.button]}
            disabled={
              !isFilterApplied ||
              (this.selectedFeatures && this.selectedFeatures.length === 0)
            }
            text="Create Style Rule"
            type="secondary-positive"
            onClick={() => this.openStyleRuleAlert()}
          />
        </div>
      </div>
    );
  }
}
