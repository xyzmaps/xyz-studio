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
import { Arrow } from '../../icons';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import LegendList from './LegendList';

// styles
import style from './ProjectDetailsPanel.scss';

export default class ProjectDetailsPanel extends Component {
  state = {
    toggleAccordion: this.accordionPanel,
    toggleButton: false,
  };

  componentDidMount = () => {
    this.onTruncate();
  };

  componentDidUpdate = prevProps => {
    /* eslint-disable react/no-did-update-set-state */
    this.onTruncate();
    if (this.props.layers !== prevProps.layers) {
      this.accordionPanel =
        this.props.projectTitleDisplay ||
        this.props.projectDescriptionDisplay ||
        this.props.projectLegendDisplay ||
        (this.props.toggleCardHoverDisplay && this.toggleCardHoverDisplay());
      this.setState({
        toggleAccordion: this.accordionPanel,
      });
    }
    /* eslint-disable react/no-did-update-set-state */
  };

  hoverCardLength = 0;

  toggleCardHoverDisplay = () => {
    this.props.layers.forEach(layer => {
      this.hoverCardLength += layer.cards[0].length;
    });

    if (
      this.props.layers.length === 1 &&
      this.props.clustering &&
      this.props.clustering.hexbin
    ) {
      return false;
    }

    return this.hoverCardLength > 0;
  };

  accordionPanel =
    this.props.projectTitleDisplay ||
    this.props.projectDescriptionDisplay ||
    this.props.projectLegendDisplay ||
    (this.props.toggleCardHoverDisplay && this.toggleCardHoverDisplay());

  onTruncate = () => {
    shave(this.$title, 38);
    // shave(this.$description, 60);
  };

  onToggleAccordion = () => {
    this.setState(
      prevState => ({
        toggleAccordion: !prevState.toggleAccordion,
      }),
      param => param
    );
  };

  onToggle = () => {
    this.setState(
      prevState => ({
        toggleButton: !prevState.toggleButton,
      }),
      () => setTimeout(this.props.onHoverCardsToggle, 600)
    );
  };

  renderProjectDescription = () => {
    const descriptionText = this.props.projectDescription;
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

  render() {
    return (
      <div
        className={`${style.wrapper} ${
          !this.accordionPanel ? style.minimal : ''
        }`}
      >
        <div className={style.header}>
          {this.accordionPanel && (
            <button
              type="button"
              className={`${style.button} ${
                this.state.toggleAccordion ? style.active : ''
              }`}
              onClick={this.onToggleAccordion}
            >
              <Arrow className={style.arrow} />
            </button>
          )}

          <div className={style.link}>
            Created using{' '}
            <a
              href="https://xyz.here.com/studio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HERE Studio
            </a>
          </div>
        </div>

        {this.state.toggleAccordion && (
          <div className={style.container}>
            {this.props.projectTitleDisplay && (
              <div className={style.section}>
                <h1
                  className={style.title}
                  // eslint-disable-next-line
                  ref={ele => (this.$title = ele)}
                  title={this.props.projectTitle}
                >
                  {this.props.projectTitle}
                </h1>
              </div>
            )}

            {this.props.projectDescriptionDisplay && (
              <div className={style.section}>
                <p
                  className={style.description}
                  // eslint-disable-next-line
                  ref={ele => (this.$description = ele)}
                  title={this.props.projectDescription}
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
                    {this.props.projectDescription}
                  </Linkify>
                </p>
              </div>
            )}

            {this.props.projectLegendDisplay && (
              <div className={style.section}>
                <LegendList
                  label="Legend"
                  layers={this.props.layers}
                  onHoverCardsToggle={this.props.onHoverCardsToggle}
                />
              </div>
            )}

            {this.props.projectLegendDisplay &&
              this.props.clustering &&
              this.props.clustering.hexbin &&
              this.props.clustering.shape === 'hexagon' && (
                <div className={`${style.scaleWrapper} ${style.section}`}>
                  <span>Hexbin</span>
                  <div className={style.opacityImg} />
                  <div
                    className={style.opacityScale}
                    style={{
                      backgroundImage: `linear-gradient(to right, ${this.props.clustering.theme.replace(
                        '1)',
                        '0)'
                      )}, ${this.props.clustering.theme})`,
                    }}
                    role="presentation"
                  />
                  <div className={style.scaleValue}>
                    <span>Min.</span>
                    <span>Max.</span>
                  </div>
                </div>
              )}

            {this.props.projectLegendDisplay &&
              this.props.clustering &&
              this.props.clustering.hexbin &&
              this.props.clustering.shape === 'centroid' && (
                <div className={`${style.scaleWrapper} ${style.section}`}>
                  <span>Radius</span>
                  <div className={style.radiusScale} role="presentation">
                    <div
                      style={{ background: `${this.props.clustering.theme}` }}
                    />
                    <div
                      style={{ background: `${this.props.clustering.theme}` }}
                    />
                    <div
                      style={{ background: `${this.props.clustering.theme}` }}
                    />
                    <div
                      style={{ background: `${this.props.clustering.theme}` }}
                    />
                    <div
                      style={{ background: `${this.props.clustering.theme}` }}
                    />
                    <div
                      style={{ background: `${this.props.clustering.theme}` }}
                    />
                    <div
                      style={{ background: `${this.props.clustering.theme}` }}
                    />
                  </div>
                  <div
                    className={`${style.scaleValue} ${style.radiusScaleValue}`}
                  >
                    <span>Min.</span>
                    <span>Max.</span>
                  </div>
                </div>
              )}

            {this.props.toggleCardHoverDisplay &&
              this.toggleCardHoverDisplay() && (
                <div className={`desktop ${style.section}`}>
                  <ToggleSwitch
                    label="SHOW INFORMATION ON HOVER"
                    onToggle={this.onToggle}
                    active={this.state.toggleButton}
                  />
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}
