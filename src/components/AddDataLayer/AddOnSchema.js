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

/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import AddDataLayerSchema from './AddDataLayerSchema';
import Button from '../Common/Button';
import { spacesAPI } from '../../api';
import style from './AddOnSchema.scss';

export default class AddOnSchema extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.schemaResponse,
      itemsProMap: this.props.itemsProMap,
      error: false,
      success: false,
      spaceId: this.props.schemaResponse,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schemaResponse !== this.props.schemaResponse) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: false, spaceId: this.props.schemaResponse });
    }
  }

  onApplyNew = schema => {
    this.setState({ loading: true });
    this.props.onApplyClick(schema, this.state.loading);
  };

  updateSchema = (schema, item) => {
    this.setState(
      {
        loading: true,
      },
      () => {
        spacesAPI
          .patch(
            `/${item.id}`,
            JSON.stringify({
              title: item.title,
              description: item.description,
              processors: [
                {
                  id: 'schema-validator',
                  params: {
                    schema,
                  },
                },
              ],
            }),
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(() => {
            const temp = this.props.itemsProMap;
            temp.push(item.id);
            this.setState(
              { itemsProMap: temp, loading: false, success: true },
              () => {
                setTimeout(() => {
                  this.setState({ success: false });
                }, 4000);
              }
            );
          })
          .catch(() => {
            this.setState({ error: true, loading: false }, () => {
              setTimeout(() => {
                this.setState({ error: false });
              }, 4000);
            });
          });
      }
    );
  };

  onRemoveSchema = () => {
    const id = !this.props.existing
      ? this.props.schemaResponse
      : this.props.item.id;
    const title = !this.props.existing
      ? this.props.title
      : this.props.item.title;
    const desc = !this.props.existing ? '-' : this.props.item.description;

    this.setState(
      {
        loading: true,
      },
      () => {
        spacesAPI
          .patch(
            `/${id}`,
            {
              title,
              description: desc,
              processors: [],
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          )
          .then(() => {
            const temp = this.props.itemsProMap;
            temp.splice(temp.indexOf(this.props.item.id), 1);
            this.setState(
              { itemsProMap: temp, loading: false, success: true },
              () => {
                setTimeout(() => {
                  this.setState({ success: false });
                }, 4000);
              }
            );
          })
          .catch(() => {
            this.setState({ error: true }, () => {
              setTimeout(() => {
                this.setState({ error: false });
              }, 4000);
            });
          });
      }
    );
  };

  render() {
    let schemaAdded;
    if (
      (this.state.itemsProMap &&
        this.state.itemsProMap.indexOf(this.props.item.id) !== -1) ||
      this.state.spaceId
    )
      schemaAdded = true;
    else schemaAdded = false;

    return (
      <div className={style.schema}>
        {this.state.loading ? (
          <div className={style.loading}>
            <div className={style.spinner} />
          </div>
        ) : schemaAdded ? (
          <div className={style.schemaDelete}>
            <div className={style.header}>
              Schema is Applied{' '}
              <div className={style.subInfo}>
                {this.props.existing
                  ? 'Would you like to remove the schema applied?'
                  : `New Space (${this.state.spaceId}) is created with schema. Click on Upload to add features from ${this.props.title} to this space`}
              </div>
            </div>
            <div className={style.removeButton}>
              {this.props.existing ? (
                <Button text="Remove" onClick={this.onRemoveSchema} />
              ) : (
                <Button text="Upload" onClick={this.props.onUpload} />
              )}
            </div>
          </div>
        ) : (
          <AddDataLayerSchema
            existing={this.props.existing}
            item={this.props.item}
            title={this.props.item && this.props.item.title}
            onCancel={this.props.onCancel}
            onApplyClick={
              this.props.existing ? this.updateSchema : this.onApplyNew
            }
          />
        )}
        {this.state.success && (
          <div className={style.success}>
            Changes were applied Successfully!!
          </div>
        )}
        {this.state.error && (
          <div className={style.error}>
            Invalid schema format. Please upload in JSON format or try again!!
          </div>
        )}
      </div>
    );
  }
}
