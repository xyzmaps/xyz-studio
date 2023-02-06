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
import Dropzone from 'react-dropzone';
import FileSaver from 'file-saver';
import Button from '../Common/Button';
import AddDataLayerDropzone from './AddDataLayerDropzone';
import logEvent from '../../utils/amplitudeLogger';

import style from './AddDataLayerSchema.scss';

export default class AddDataLayerSchema extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schema: '',
      inputType: 'text',
      error: false,
      fileSelected: '',
    };
  }

  onConfirm = () => {
    let parsedSchema;
    logEvent('apply_schema');

    this.setState({ error: false });

    if (this.state.inputType !== 'url') {
      try {
        parsedSchema = JSON.parse(this.state.schema);
      } catch (e) {
        this.setState({ error: true }, () => {
          setTimeout(() => {
            this.setState({ error: false });
          }, 4000);
        });
      }
    }

    if (parsedSchema || this.state.inputType === 'url') {
      if (this.props.existing)
        this.props.onApplyClick(this.state.schema, this.props.item);
      else this.props.onApplyClick(this.state.schema);
    }
  };

  onSchemaInput = e => {
    this.setState({
      schema: e.target.value,
    });
  };

  onDrop = file => {
    const fr = new FileReader();
    fr.readAsText(file[0]);

    fr.onload = async () => {
      const data = fr.result;

      this.setState({
        schema: data,
        fileSelected: file[0].name,
      });
    };
  };

  downloadSchema = () => {
    const file = new File(
      [
        JSON.stringify(
          {
            type: 'object',
            title: 'The root schema',
            description: 'The root schema comprises the entire JSON document.',
            default: {},
            examples: [{}],
            required: [],
            additionalProperties: true,
            properties: {},
          },
          null,
          2
        ),
      ],
      'schema.json',
      { type: 'text/json' }
    );
    FileSaver.saveAs(file);
  };

  render() {
    let dropzoneRef;

    return (
      <div className={style.schemaWrapper}>
        <div className={style.header}>
          Apply Schema{' '}
          <div className={style.subInfo}>
            <p>
              Allows you to validate the JSON data ingested into your space.
            </p>
            <p>
              The documentation{' '}
              <a
                href="https://www.here.xyz/api/concepts/jsonschema/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              provides a reference for JSON Schema and its examples.
            </p>
          </div>
        </div>
        <div className={style.tabWrapper}>
          <div
            role="presentation"
            className={`${style.tabInput} ${
              this.state.inputType === 'text' ? style.selected : ''
            }`}
            onClick={() => {
              logEvent('schema_by_text');
              this.setState({ inputType: 'text' });
            }}
          >
            Text Schema File
          </div>
          <div
            role="presentation"
            className={`${style.tabInput} ${
              this.state.inputType === 'file' ? style.selected : ''
            }`}
            onClick={() => {
              logEvent('schema_by_file');
              this.setState({ inputType: 'file' });
            }}
          >
            Add Schema
          </div>
          {/* <div
            role="presentation"
            className={`${style.tabInput} ${
              this.state.inputType === 'url' ? style.selected : ''
            }`}
            onClick={() => this.setState({ inputType: 'url' })}
          >
            Enter URL
          </div> */}
        </div>
        <div className={style.inputSchema}>
          {this.state.inputType === 'text' && (
            <div>
              <textarea
                placeholder="Copy and paste Schema here. You can download the sample schema file below."
                onChange={this.onSchemaInput}
                resize="none"
              />
              <div
                role="presentation"
                className={style.download}
                onClick={this.downloadSchema}
              >
                Download sample schema
              </div>
            </div>
          )}
          {this.state.inputType === 'file' && (
            <div>
              {!this.state.fileSelected ? (
                <Dropzone
                  className={style.dropzone}
                  ref={node => {
                    dropzoneRef = node;
                  }}
                  disableClick
                  multiple={false}
                  onDrop={this.onDrop}
                >
                  <AddDataLayerDropzone onBrowser={() => dropzoneRef.open()} />
                </Dropzone>
              ) : (
                <div className={style.schemaFile}>
                  File Selected for schema: {this.state.fileSelected}
                  <Button
                    type="primary"
                    text="Cancel"
                    onClick={() => this.setState({ fileSelected: '' })}
                  />
                </div>
              )}
            </div>
          )}
          {this.state.inputType === 'url' && (
            <input
              placeholder="Enter public URL for schema"
              onChange={this.onSchemaInput}
            />
          )}
        </div>
        <div className={!this.props.existing ? style.button : style.apply}>
          {!this.props.existing && (
            <Button
              text="Cancel"
              type="primary"
              onClick={this.props.onCancel}
            />
          )}
          <Button text="Apply" onClick={this.onConfirm} />
        </div>
        {this.state.error && (
          <div
            className={`${style.error} ${
              !this.props.existing ? style.existing : ''
            }`}
          >
            Invalid schema format. Please upload in JSON format!!
          </div>
        )}
      </div>
    );
  }
}
