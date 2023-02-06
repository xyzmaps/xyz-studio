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

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as mapActions from '../../actions/mapActions';

import DataTable from '../DataTable/DataTable';
import SpaceSidebar from '../SpaceSidebar/SpaceSidebar';

import style from './Space.scss';

class Space extends React.PureComponent {
  state = {
    totalFeatureCount: -1,
  };

  setTotalFeatureCount = totalFeatureCount => {
    this.setState({ totalFeatureCount });
  };

  render() {
    const { match } = this.props;
    const { totalFeatureCount } = this.state;

    return (
      <div className={style.container}>
        <div className={style.sidebarWrapper}>
          <SpaceSidebar
            spaceId={match.params.space_id}
            totalFeatureCount={totalFeatureCount}
          />
        </div>

        <div className={style.wrapper}>
          <DataTable
            spaceId={match.params.space_id}
            setTotalFeatureCount={this.setTotalFeatureCount}
            onCardToggle={this.props.toggleCardVisibility}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(null, {
    toggleCardVisibility: mapActions.toggleCardVisibility,
  })(Space)
);
