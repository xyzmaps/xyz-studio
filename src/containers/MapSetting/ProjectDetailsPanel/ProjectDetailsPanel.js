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
import shave from 'shave';

import Linkify from 'linkifyjs/react';
import { Arrow } from '../../../icons';
// import Toggle from '../../../components/Common/Toggle';
import LegendList from './LegendList';

// styles
import style from './ProjectDetailsPanel.scss';

export default class ProjectDetailsPanel extends Component {
  state = {
    toggleButton: false,
  };

  componentDidMount = () => {
    this.onTruncate();
  };

  componentDidUpdate = prevProps => {
    this.onTruncate();
    if (this.props.currentProject.layers !== prevProps.currentProject.layers) {
      this.accordionPanel =
        this.props.currentProject.publish_settings.display.name ||
        this.props.currentProject.publish_settings.display.description ||
        this.props.currentProject.publish_settings.display.legend ||
        (this.props.currentProject.publish_settings.display.cards &&
          this.toggleCardHoverDisplay());
      // this.setState({
      //   toggleAccordion: this.accordionPanel,
      // });
    }
  };

  hoverCardLength = 0;

  toggleCardHoverDisplay = () => {
    this.props.currentProject.layers.forEach(layer => {
      this.hoverCardLength += layer.cards[0].length;
    });
    return this.hoverCardLength > 0;
  };

  accordionPanel =
    this.props.currentProject.publish_settings.display.name ||
    this.props.currentProject.publish_settings.display.description ||
    this.props.currentProject.publish_settings.display.legend ||
    (this.props.currentProject.publish_settings.display.cards &&
      this.toggleCardHoverDisplay());

  onTruncate = () => {
    shave(this.$title, 38);
    shave(this.$description, 60);
  };

  onToggle = () => {
    this.setState(
      prevState => ({ toggleButton: !prevState.toggleButton }),
      () => setTimeout(this.props.onHoverCardsToggle, 600)
    );
  };

  renderProjectDescription = () => {
    const descriptionText = this.props.currentProject.meta.description;
    const regexExp1 = /(\b(https?|ftp|file):\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

    const descriptionText1 = descriptionText.replace(
      regexExp1,
      (text, link) => {
        return `<a target='_blank' href='${link}'>${link}</a>`;
      }
    );
    if (!descriptionText1.includes('href')) {
      const regexExp2 = /(^|[^/])([\w.]+\.(?:com|cc|net|ru)[^,\s]*)/gim;

      return descriptionText1.replace(
        regexExp2,
        '<a target="_blank" href="http://$2">$2</a>'
      );
    }
    return descriptionText1;
  };

  hexbinEnabledLayer = () => {
    const { layers } = this.props.currentProject;
    const hexbinEnabledLayer = layers.find(
      l => l.clustering && l.clustering.hexbin
    );
    return hexbinEnabledLayer;
  };

  render() {
    const { currentProject } = this.props;
    const clustering = this.hexbinEnabledLayer()
      ? this.hexbinEnabledLayer().clustering
      : undefined;
    const accordionPanel =
      currentProject.publish_settings.display.name ||
      currentProject.publish_settings.display.description ||
      currentProject.publish_settings.display.legend;

    return (
      <div
        className={`${style.wrapper} ${!accordionPanel ? style.minimal : ''}`}
      >
        <div className={style.header}>
          {accordionPanel && (
            <button type="button" className={`${style.button} ${style.active}`}>
              <Arrow className={style.arrow} />
            </button>
          )}

          <div className={style.link}>Created using HERE Studio</div>
        </div>

        <div className={style.container}>
          {currentProject.publish_settings.display.name && (
            <div className={style.section}>
              <h1
                className={style.title}
                ref={ele => {
                  this.$title = ele;
                }}
                title={currentProject.meta.name}
              >
                {currentProject.meta.name}
              </h1>
            </div>
          )}

          {currentProject.publish_settings.display.description && (
            <div className={style.section}>
              <p
                className={style.description}
                ref={ele => {
                  this.$description = ele;
                }}
                title={currentProject.meta.description}
              >
                <Linkify
                  options={{
                    attributes: {
                      class: 'embedly-card',
                      'data-card-key': 'dd82b6d5bba243b5bccaccf993dae3e0',
                      'data-card-controls': 0,
                    },
                  }}
                >
                  {currentProject.meta.description}
                </Linkify>
              </p>
            </div>
          )}

          {currentProject.publish_settings.display.legend && (
            <div className={style.section}>
              <LegendList label="Legend" layers={currentProject.layers} />
            </div>
          )}

          {currentProject.publish_settings.display.legend &&
            clustering &&
            clustering.hexbin &&
            clustering.shape === 'hexagon' && (
              <div className={`${style.scaleWrapper} ${style.section}`}>
                <span>Hexbin</span>
                <div className={style.opacityImg} />
                <div
                  className={style.opacityScale}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${clustering.theme.replace(
                      '1)',
                      '0)'
                    )}, ${clustering.theme})`,
                  }}
                  role="presentation"
                />
                <div className={style.scaleValue}>
                  <span>Min.</span>
                  <span>Max.</span>
                </div>
              </div>
            )}

          {currentProject.publish_settings.display.legend &&
            clustering &&
            clustering.hexbin &&
            clustering.shape === 'centroid' && (
              <div className={`${style.scaleWrapper} ${style.section}`}>
                <span>Radius</span>
                <div className={style.radiusScale} role="presentation">
                  <div style={{ background: `${clustering.theme}` }} />
                  <div style={{ background: `${clustering.theme}` }} />
                  <div style={{ background: `${clustering.theme}` }} />
                  <div style={{ background: `${clustering.theme}` }} />
                  <div style={{ background: `${clustering.theme}` }} />
                  <div style={{ background: `${clustering.theme}` }} />
                  <div style={{ background: `${clustering.theme}` }} />
                </div>
                <div
                  className={`${style.scaleValue} ${style.radiusScaleValue}`}
                >
                  <span>Min.</span>
                  <span>Max.</span>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}
