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
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import { connect } from 'react-redux';
import store from '../../store';
import {
  addFeatures,
  emptySpace,
  deleteSpace,
  uploadProgressSpace,
} from '../../actions/spaceActions';
import { showAlert, hideAlert } from '../../actions/mapActions';

import { msbfptOpenSpaceId } from '../../constants';
// import { spacesAPI, apiErrorHandler } from '../../api';
import AddDataLayerHeader from './AddDataLayerHeader';
import AddDataLayerFooter from './AddDataLayerFooter';
import AddDataLayerList from './AddDataLayerList';
import AddDataLayerDropzone from './AddDataLayerDropzone';
import AddDataLayerDataset from './AddDataLayerDataset';
import { csvToJson, transform } from '../../utils/transformUtils';
import { getObjectSize } from '../../helpers';
import style from './AddDataLayer.scss';
import ScrollbarStyle from '../../config/ScrollbarStyle';
import AddDataLayerGeocoding from './AddDataLayerGeocoding';
import logEvent from '../../utils/amplitudeLogger';

// import Alert from '../Alert/Alert';
import AddDataLayerProFeature from './AddDataLayerProFeature';
import AddDataLayerProSetting from './AddDataLayerProSetting';
import AddDataLayerVSContainer from './AddDataLayerVSContainer';

class AddDataLayer extends Component {
  state = {
    toggleDropzone: !this.props.selectable,
    toggleDatasetScreen: this.props.showOpenDataset,
    dropzoneActive: false,
    disableAdd: true,
    items: this.props.items,
    itemsProMap: this.props.itemsProMap,
    selectedItems: [],
    overflowFlag: false,
    isFilesDropped: this.props.isFilesDropped,
    files: this.props.files,
    selectedTags: [],
    openspaceLayerId: '',
    fullWidth: this.props.fullWidth,
    toggleProFeatures: false,
    toggleProSettings: false,
    schemaResponse: '',
    fileDetails: [],
    toggleGeocoding: false,
  };

  componentDidMount() {
    const { currentProject } = this.props;

    if (currentProject) {
      currentProject.layers.map(l => {
        if (l.meta && l.meta.tags) {
          this.setState({
            openspaceLayerId: l.id,
            selectedTags: l.meta.tags,
          });
        }
        return l;
      });
    }
  }

  shouldComponentUpdate = newProps => {
    const { showOpenDataset } = this.props;
    if (showOpenDataset !== newProps.showOpenDataset) {
      this.setState({
        toggleDropzone: false,
        toggleDatasetScreen: newProps.showOpenDataset,
      });
    }

    if (
      newProps.items.length !== this.props.items.length ||
      newProps.hasError !== this.props.hasError
    ) {
      this.setState({
        dropzoneActive: false,
        items: [...newProps.items],
      });
    }
    if (this.state.isFilesDropped && newProps.files) {
      this.setState({
        isFilesDropped: false,
      });
      this.onDrop(newProps.files);
    }
    return newProps;
  };

  onToggleProfromGeo = (filename, geocodedData) => {
    this.setState({
      toggleProSettings: true,
      toggleGeocoding: false,
      fileDetails: {
        name: filename,
        data: geocodedData,
      },
    });
  };

  onDrop = files => {
    let loadedFiles = 0;
    let totalFiles = files.length;
    this.setState({ files });
    let isPro = false;

    if (
      this.props.urm['xyz-hub'].accessConnectors &&
      this.props.urm['xyz-hub'].accessConnectors.some(
        o => o.id === 'schema-validator'
      )
    )
      isPro = true;

    this.props.cleanUpSpaces();

    files.forEach(file => {
      const fr = new FileReader();
      fr.readAsText(file);
      fr.onload = async () => {
        let data;
        const dataSize = getObjectSize(fr.result);
        if (!this.props.fileSizeLimit(fr.result.length, dataSize.mb, 50)) {
          try {
            if (file.name.indexOf('.csv') !== -1) {
              if (totalFiles > 1) {
                // if multiple files then proceed with normal upload with giving geocoding option
                data = {
                  features: transform(csvToJson(fr.result)),
                  type: 'FeatureCollection',
                };
              } else {
                // else provide geocoding option
                const csvToJsonData = csvToJson(fr.result);
                const featureData = transform(csvToJsonData);

                if (featureData.length !== 0) {
                  data = {
                    features: featureData,
                    type: 'FeatureCollection',
                  };
                } else {
                  this.confirmAutomaticGeocoding(file.name, csvToJsonData);
                  return;
                }
              }
            } else {
              data = JSON.parse(fr.result);
            }
          } catch (e) {
            this.setState({ dropzoneActive: false });
            this.props.onError({
              title: 'Error',
              text: `Unsupported file type (${file.name})`,
            });
          }
          if (data) {
            if (totalFiles === 1 && !this.state.schemaResponse && isPro) {
              this.setState({
                toggleProFeatures: true,
                fileDetails: {
                  name: file.name,
                  data,
                },
              });

              return;
            }

            if (this.state.schemaResponse) {
              // upload features to existing features
              addFeatures(
                this.state.schemaResponse.id,
                this.state.schemaResponse.title,
                data.features,
                store.dispatch
              );
            } else if (
              !this.props.spacesLimit(
                this.state.items.length + totalFiles,
                this.props.spaceLimitValue
              )
            ) {
              this.props.onSpaceAdd(
                file,
                data,
                () => {
                  // success
                  loadedFiles += 1;
                },
                () => {
                  // error
                  totalFiles -= 1;
                },
                id => {
                  // both
                  if (loadedFiles === totalFiles) {
                    this.props.loader(false);

                    if (this.props.filesUploadFinished) {
                      this.props.filesUploadFinished();
                    }
                  } else {
                    this.props.loader(true);
                  }
                  if (
                    typeof this.props.uploadProgress[id][file.name] !== 'string'
                  ) {
                    this.onItemSelect(id);
                  }
                }
              );
            } else if (this.props.filesUploadFinished) {
              // After limit cross
              this.props.filesUploadFinished();
            }
          } else {
            totalFiles -= 1;
          }
        }
      };
    });

    this.setState({
      toggleDropzone: false,
      dropzoneActive: false,
    });
  };

  addSpacesSchema = () => {
    this.setState(
      {
        toggleProFeatures: false,
      },
      () => {
        const { files, fileDetails } = this.state;
        let loadedFiles = 0;
        let totalFiles = files.length;

        files.forEach(file => {
          if (fileDetails) {
            if (this.state.schemaResponse) {
              // upload features to existing features
              addFeatures(
                this.state.schemaResponse.id,
                this.state.schemaResponse.title,
                fileDetails.data.features,
                store.dispatch
              );
            } else if (
              !this.props.spacesLimit(
                this.state.items.length + totalFiles,
                this.props.spaceLimitValue
              )
            ) {
              this.props.onSpaceAdd(
                file,
                fileDetails.data,
                () => {
                  // success
                  loadedFiles += 1;
                },
                () => {
                  // error
                  totalFiles -= 1;
                },
                id => {
                  // both
                  if (loadedFiles === totalFiles) {
                    this.props.loader(false);

                    if (this.props.filesUploadFinished) {
                      this.props.filesUploadFinished();
                    }
                  } else {
                    this.props.loader(true);
                  }
                  if (
                    typeof this.props.uploadProgress[id][file.name] !== 'string'
                  ) {
                    this.onItemSelect(id);
                  }
                }
              );
            } else if (this.props.filesUploadFinished) {
              // After limit cross
              this.props.filesUploadFinished();
            }
          } else {
            totalFiles -= 1;
          }
          // }
        });
      }
    );
  };

  applyPro = () => {
    this.setState({
      toggleProFeatures: false,
      toggleProSettings: true,
    });
  };

  applySchema = schema => {
    emptySpace(
      this.state.fileDetails.name,
      schema,
      spaceid => {
        this.setState(
          prevState => ({
            schemaResponse: spaceid,
            itemsProMap: [...prevState.itemsProMap, spaceid],
          })
          // () => {
          //   // console.log('applied');
          //   if (this.state.schemaAppliedStatus === 'schemaApplied') {
          //     this.props.showAlert({
          //       theme: 'default',
          //       title: 'Schema Applied',
          //       text: `New Space (${this.state.schemaResponse}) is created with schema. Click on Upload to add features from ${this.state.fileDetails.name} to this space`,
          //       confirmLabel: 'Upload',
          //       confirm: this.addFeatureOnSchema,
          //     });
          //   }
          // }
        );
      },
      store.dispatch
    );
  };

  addFeatureOnSchema = () => {
    this.setState({ toggleProSettings: false }, async () => {
      await addFeatures(
        this.state.schemaResponse,
        this.state.fileDetails.name,
        this.state.fileDetails.data.features
          ? this.state.fileDetails.data.features
          : this.state.fileDetails.data,
        store.dispatch
      );
      this.props.loader(false);
      this.onItemSelect(this.state.schemaResponse);
    });
  };

  onDragEnter = () => {
    this.setState({
      dropzoneActive: true,
    });
  };

  onDragLeave = () => {
    this.setState({
      dropzoneActive: false,
    });
  };

  confirmAutomaticGeocoding = (filename, features) => {
    this.props.showAlert({
      theme: 'positive',
      title: 'Perform Geocoding?',
      text:
        'Looks like your dataset does not contain location co-ordinates\n' +
        'Do you want to automatically perform geocoding for these features?',
      cancelLabel: 'No',
      confirmLabel: 'Yes',
      cancel: this.props.hideAlert,
      confirm: () => this.setGeocodingScreen(filename, features),
    });
  };

  setGeocodingScreen = (filename, features) => {
    this.setState({
      toggleDropzone: false,
      toggleGeocoding: true,
      fileDetails: {
        name: filename,
        features,
        largeData: features.length > 300,
      },
    });
  };

  cancelGeocoding = () => {
    this.setState({
      toggleGeocoding: false,
    });
  };

  addSpaces = geocodedFileDetails => {
    this.setState(
      {
        fileDetails: geocodedFileDetails,
        toggleDropzone: false,
        toggleGeocoding: false,
      },
      () => {
        this.props.showGeocodedFeaturesNotice(
          this.state.fileDetails.features.length
        );

        const { files, fileDetails } = this.state;

        let loadedFiles = 0;
        let totalFiles = files.length;

        files.forEach(file => {
          const dataSize = getObjectSize(fileDetails);
          if (!this.props.fileSizeLimit(dataSize.mb, 50)) {
            if (fileDetails) {
              if (this.state.schemaResponse) {
                // upload features to existing features
                addFeatures(
                  this.state.schemaResponse.id,
                  this.state.schemaResponse.title,
                  fileDetails.features,
                  store.dispatch
                );
              } else if (
                !this.props.spacesLimit(
                  this.state.items.length + totalFiles,
                  this.props.spaceLimitValue
                )
              ) {
                this.props.onSpaceAdd(
                  file,
                  fileDetails,
                  () => {
                    // success
                    loadedFiles += 1;
                  },
                  () => {
                    // error
                    totalFiles -= 1;
                  },
                  id => {
                    // both
                    if (loadedFiles === totalFiles) {
                      this.props.loader(false);

                      if (this.props.filesUploadFinished) {
                        this.props.filesUploadFinished();
                      }
                    } else {
                      this.props.loader(true);
                    }
                    if (
                      typeof this.props.uploadProgress[id][file.name] !==
                      'string'
                    ) {
                      this.onItemSelect(id);
                    }
                  }
                );
              } else if (this.props.filesUploadFinished) {
                // After limit cross
                this.props.filesUploadFinished();
              }
            } else {
              totalFiles -= 1;
            }
          }
        });
      }
    );
  };

  virtualSpaceSetting = () => {
    const { items, selectedItems } = this.state;
    logEvent('_i_createVirtualSpace_');
    // triggered from create new VS button
    return (
      <AddDataLayerVSContainer
        items={items}
        itemsVirtualMap={this.props.itemsVirtualMap}
        selectedItems={selectedItems}
        onAddedVirtualSpace={this.onAddedVirtualSpace}
        loader={this.props.loader}
        showAlert={this.props.showAlert}
        hideAlert={this.props.hideAlert}
        virtualizeSpace={this.props.virtualizeSpace}
        updateVirtualSpaces={this.props.updateVirtualSpaces}
      />
    );
  };

  showVirtualSpaceAlert = () => {
    this.props.showAlert({
      customAlert: this.virtualSpaceSetting(),
    });
  };

  onAddedVirtualSpace = (spaceId, vsInput) => {
    if (typeof this.props.uploadProgress[spaceId][vsInput.title] !== 'string') {
      this.onItemSelect(spaceId);
    }
  };

  onItemSelect = itemId => {
    let selectedItems = [];
    if (this.state.selectedItems.indexOf(itemId) === -1) {
      selectedItems = [...this.state.selectedItems, itemId];
    } else {
      selectedItems = _.without(this.state.selectedItems, itemId);
    }
    this.setState({
      selectedItems,
      disableAdd: selectedItems.length === 0,
    });
  };

  onToggleDropzone = () => {
    if (this.props.selectable) {
      this.setState(prevState => ({
        toggleDropzone: !prevState.toggleDropzone,
      }));
    } else {
      this.props.onHideAddDataLayer();
    }
  };

  onShowDropzone = item => {
    this.setState({ toggleDropzone: true, schemaResponse: item });
  };

  onAddEmptyLayerIntent = () => {
    if (this.state.disableAdd) {
      this.props.onAddEmptyLayerIntent();
    }
  };

  onAddDatasetToggle = () => {
    this.setState({ toggleDatasetScreen: true });
  };

  onAddDataset = selectedTags => {
    this.setState({
      selectedTags,
      toggleDatasetScreen: false,
    });
    if (selectedTags.length === 0) {
      this.props.onDeleteLayer(this.state.openspaceLayerId);
    } else {
      this.props.updateOpenSourceDateSet(msbfptOpenSpaceId, selectedTags);
    }
  };

  onOverFlow = val => {
    if (this.state.overflowFlag !== val) {
      this.setState({ overflowFlag: val });
    }
  };

  onHideAddDataset = () => {
    this.props.onHideAddDataLayer();
  };

  onRomveItem = key => {
    this.state.selectedTags.splice(key, 1);

    if (this.state.selectedTags.length === 0) {
      this.props.onDeleteLayer(this.state.openspaceLayerId);
      this.setState({
        openspaceLayerId: '',
        selectedTags: [],
      });
    } else {
      this.setState(prevState => ({
        selectedTags: prevState.selectedTags,
      }));
    }
  };

  render() {
    const {
      toggleDatasetScreen,
      items,
      itemsProMap,
      toggleDropzone,
      selectedTags,
      disableAdd,
      dropzoneActive,
      selectedItems,
      overflowFlag,
      fullWidth,
      toggleProFeatures,
      toggleProSettings,
      fileDetails,
      schemaResponse,
      toggleGeocoding,
    } = this.state;
    const {
      selectable,
      loading,
      appendItem,
      currentProject,
      uploadProgress,
      cancelText,
      onAddLayer,
      onHideAddDataLayer,
      loader,
      onAddLayerBack,
      urm,
      itemsVirtualMap,
    } = this.props;

    let title = 'My Spaces';

    if (toggleDatasetScreen) {
      title = 'Public Data in the Space';
    }

    if (toggleGeocoding) {
      title = 'Upload Files';
    }

    let isPro = false;

    if (
      urm['xyz-hub'].accessConnectors &&
      urm['xyz-hub'].accessConnectors.some(o => o.id === 'schema-validator')
    )
      isPro = true;

    let info =
      'Upload new files (GeoJSON, JSON, CSV, or Shapefile), or add an empty layer.';
    let dropzoneRef;

    if (toggleDatasetScreen) {
      info =
        'Visualize public data on your map, made available through a public Space.';
    } else if (toggleGeocoding) {
      info =
        "Find existing content or upload new files (GeoJSON, JSON, or CSV). Your current plan allows for 1000 <a href='https://www.here.xyz/api/' target='_blank' rel='noopener noreferrer'><span>Spaces</span></a> with up to 1M features each.<br><br>To upload larger files, or <a href='https://www.here.xyz/cli/shapefiles' target='_blank' rel='noopener noreferrer'><span>Shapefiles</span></a>, please use the <a href='https://www.here.xyz/cli/' target='_blank' rel='noopener noreferrer'><span>Data Hub CLI</span></a>";
    } else if (items.length || !selectable) {
      info =
        "Find existing content or upload new files (GeoJSON, JSON, or CSV). Your current plan allows for 1000 <a href='https://www.here.xyz/api/' target='_blank' rel='noopener noreferrer'><span>Spaces</span></a> with up to 1M features each.<br><br>To upload larger files, or <a href='https://www.here.xyz/cli/shapefiles' target='_blank' rel='noopener noreferrer'><span>Shapefiles</span></a>, please use the <a href='https://www.here.xyz/cli/' target='_blank' rel='noopener noreferrer'><span>Data Hub CLI</span></a>";
    }

    const renderDataLayer = () => {
      if (
        (!items.length || toggleDropzone) &&
        !toggleDatasetScreen &&
        !toggleGeocoding &&
        !toggleProSettings &&
        !toggleProFeatures
      ) {
        return (
          <Dropzone
            className={`${style.dropzone} ${dropzoneActive && style.active}`}
            ref={node => {
              dropzoneRef = node;
            }}
            disableClick
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
          >
            <AddDataLayerDropzone onBrowser={() => dropzoneRef.open()} />
          </Dropzone>
        );
      }

      if (!toggleDropzone && toggleDatasetScreen) {
        return (
          <AddDataLayerDataset
            onBrowser={() => {
              logEvent('click_browse');
              dropzoneRef.open();
            }}
            onHideAddDataset={this.onHideAddDataset}
            onAddDataset={this.onAddDataset}
            selectedTags={selectedTags}
          />
        );
      }

      if (!toggleDropzone && toggleProSettings) {
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <AddDataLayerProSetting
              loading={loading}
              loader={loader}
              fileDetails={fileDetails}
              cancelPro={this.cancelPro}
              onApplyClick={this.applySchema}
              confirmAlert={this.addFeatureOnSchema}
              schemaResponse={schemaResponse}
              onCancel={() => this.setState({ toggleProSettings: false })}
              isPro={isPro}
            />
          </div>
        );
      }

      if (!toggleDropzone && toggleGeocoding) {
        return (
          <AddDataLayerGeocoding
            loading={loading}
            loader={loader}
            fileDetails={fileDetails}
            cancelGeocoding={this.cancelGeocoding}
            addSpaces={this.addSpaces}
            togglePro={this.onToggleProfromGeo}
            showAlert={this.props.showAlert}
            hideAlert={this.props.hideAlert}
            schemaResponse={this.state.schemaResponse}
            isPro={isPro}
          />
        );
      }

      return (
        <AddDataLayerList
          loading={loading}
          items={items}
          deleteSpace={this.props.deleteSpace}
          itemsProMap={itemsProMap}
          itemsVirtualMap={itemsVirtualMap}
          onItemSelect={this.onItemSelect}
          selectable={selectable}
          selectedItems={selectedItems}
          uploadProgress={uploadProgress}
          onOverFlow={this.onOverFlow}
          updateSchemaState={this.updateSchemaState}
          updateSchema={this.updateSchema}
          loader={this.props.loader}
          onAddedVirtualSpace={this.onAddedVirtualSpace}
          virtualizeSpace={this.props.virtualizeSpace}
          updateVirtualSpaces={this.props.updateVirtualSpaces}
          currentProject={currentProject}
          onUploadClick={this.onShowDropzone}
          onVirtualSpaceClick={this.showVirtualSpaceAlert}
          showAlert={this.props.showAlert}
          hideAlert={this.props.hideAlert}
          uploadProgressSpace={this.props.uploadProgressSpace}
          isPro={isPro}
          dataContext={this.props.dataContext}
        />
      );
    };

    return (
      <div className={`${style.wrapper} ${fullWidth && style.fullWidth}`}>
        <div className={`${style.container}`}>
          <AddDataLayerHeader
            loading={loading}
            file={appendItem && appendItem.title}
            title={title}
            text={info}
          />
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
            <div className={style.content}>{renderDataLayer()}</div>
          </Scrollbars>

          {!toggleDatasetScreen && !toggleGeocoding && (
            <AddDataLayerFooter
              loading={loading}
              items={items}
              cancelText={cancelText}
              disableAdd={disableAdd}
              onAddLayer={onAddLayer}
              onCancel={() => this.setState({ toggleProSettings: false })}
              onApplyClick={this.applySchema}
              onHideAddDataLayer={onHideAddDataLayer}
              toggleDropzone={toggleDropzone}
              toggleProSettings={toggleProSettings}
              onToggleDropzone={this.onToggleDropzone}
              selectable={selectable}
              selectedItems={selectedItems}
              overflowFlag={overflowFlag}
              onAddLayerBack={onAddLayerBack}
              toggleGeocoding={toggleGeocoding}
            />
          )}

          {!toggleDropzone && toggleProFeatures && (
            <AddDataLayerProFeature
              loading={loading}
              loader={loader}
              fileDetails={fileDetails}
              cancelPro={this.cancelPro}
              addSpaces={this.addSpacesSchema}
              onApplyPro={this.applyPro}
              isPro={isPro}
            />
          )}
        </div>
      </div>
    );
  }
}

const stateToProps = state => ({
  urm: state.user.urm,
});

export default connect(stateToProps, {
  showAlert,
  hideAlert,
  deleteSpace,
  uploadProgressSpace,
})(AddDataLayer);
