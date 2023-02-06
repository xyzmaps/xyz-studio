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
import { Circle } from '../../Shapes';
// Upload
import staticBg from './images/upload/upload_static_bg.svg';
import figure from './images/upload/upload_figure.svg';
import cloud from './images/upload/upload_cloud.svg';
// Edit
import editStaticBg from './images/edit/edit_static_bg.svg';
import editFigure from './images/edit/edit_figure.svg';
import editLine from './images/edit/edit_line.svg';
// Publish
import publishStaticBg from './images/publish/publish_static_bg.svg';
import paperPlaneTrack from './images/publish/publish_trail.svg';
import shareIcon from './images/publish/publish_share.svg';
import paperPlane from './images/publish/publish_figure.svg';
import markerIcon from './images/publish/publish_big_pin.svg';
import style from './style.scss';

const SLIDES = [
  {
    title: 'Upload',
    content: (
      <span>
        Upload <span className={style.dark}>spatial data</span> or pick up from
        a variety of <span className={style.dark}>open datasets</span> in our
        portal. Turn your static datasets into a{' '}
        <span className={style.dark}>live, interactive</span> web map.
      </span>
    ),
    imagesComp: () => (
      <div className={style.images}>
        <img src={staticBg} alt="Content Background" />

        <div className={style.figure}>
          <img src={figure} alt="Woman uploading data" />
        </div>

        <div className={style.cloud}>
          <img src={cloud} alt="Data cloud" />
        </div>

        {/* Circles at the left */}
        <Circle size="1.18%" className={`${style.dot} ${style.dotLeft11}`} />

        <Circle size="2%" className={`${style.dot} ${style.dotLeft12}`} />

        <Circle size="0.8%" className={`${style.dot} ${style.dotLeft13}`} />

        <Circle size="1.25%" className={`${style.dot} ${style.dotLeft14}`} />

        <Circle size="2.25%" className={`${style.dot} ${style.dotLeft15}`} />

        <Circle size="1.25%" className={`${style.dot} ${style.dotLeft16}`} />

        {/* Circles at the right */}
        <Circle size="1%" className={`${style.dot} ${style.dotRight11}`} />

        <Circle size="1.15%" className={`${style.dot} ${style.dotRight12}`} />

        <Circle size="0.6%" className={`${style.dot} ${style.dotRight13}`} />

        <Circle size="1.5%" className={`${style.dot} ${style.dotRight14}`} />

        <Circle size="0.9%" className={`${style.dot} ${style.dotRight15}`} />

        <Circle size="1.1%" className={`${style.dot} ${style.dotRight16}`} />
      </div>
    ),
  },
  {
    title: 'Draw & Edit',
    content: (
      <span>
        <span className={style.dark}>Customize</span> the look and feel of your
        map by creating a <span className={style.dark}>visualization</span>{' '}
        based on your data. <span className={style.dark}>Edit</span> your data
        on the fly and make a map that brings your{' '}
        <span className={style.dark}>story to life!</span>
      </span>
    ),
    imagesComp: () => (
      <div className={style.images}>
        <img
          src={editStaticBg}
          className={style.editStaticBg}
          alt="Content Background"
        />

        <div className={style.editFigure}>
          <img src={editFigure} alt="Boy sitting on map marker" />
        </div>

        <div className={style.editLine}>
          <img src={editLine} alt="Range of the phone connectivity" />
        </div>

        {/* Circles at the left */}
        <Circle
          size="1.65%"
          className={`${style.dot} ${style.dotDark} ${style.dotLeft21}`}
        />
        <Circle
          size="1.05%"
          className={`${style.dot} ${style.dotDark} ${style.dotLeft22}`}
        />
        <Circle
          size="1%"
          className={`${style.dot} ${style.dotDark} ${style.dotLeft23}`}
        />

        <Circle
          size="1%"
          className={`${style.dot} ${style.dotDark} ${style.dotLeft24}`}
        />

        <Circle
          size="0.75%"
          className={`${style.dot} ${style.dotDark} ${style.dotLeft25}`}
        />

        {/* Circles at the right */}
        <Circle
          size="1.5%"
          className={`${style.dot} ${style.dotDark} ${style.dotRight21}`}
        />

        <Circle
          size="0.75%"
          className={`${style.dot} ${style.dotDark} ${style.dotRight22}`}
        />

        <Circle
          size="1%"
          className={`${style.dot} ${style.dotDark} ${style.dotRight23}`}
        />

        <Circle
          size="1%"
          className={`${style.dot} ${style.dotDark} ${style.dotRight24}`}
        />
      </div>
    ),
  },
  {
    title: 'Publish',
    content: (
      <span>
        Publish your map to be <span className={style.dark}>real time</span>,
        changing within seconds to changes you make in Studio.{' '}
        <span className={style.dark}>Share completed maps</span> with ease and
        no infrastructure requirements.
      </span>
    ),
    imagesComp: () => (
      <div className={style.images}>
        <img
          src={publishStaticBg}
          className={style.publishBg}
          alt="Content Background"
        />

        <div className={style.paperPlaneTrack}>
          <img src={paperPlaneTrack} alt="Paper plane track" />
        </div>

        <div className={style.shareIcon}>
          <img src={shareIcon} alt="Share icon" />
        </div>

        <div className={style.paperPlane}>
          <img src={paperPlane} alt="Paper plane" />
        </div>

        <div className={style.markerBigIcon}>
          <img src={markerIcon} alt="Big map marker icon" />
        </div>

        <div className={style.markerSmallIcon}>
          <img src={markerIcon} alt="Small map marker icon" />
        </div>

        {/* Circles at the left */}
        <Circle
          size="0.8%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft31}`}
        />

        <Circle
          size="0.8%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft32}`}
        />

        <Circle
          size="1.25%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft33}`}
        />

        <Circle
          size="0.7%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft34}`}
        />

        <Circle
          size="0.7%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft35}`}
        />

        <Circle
          size="0.6%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft36}`}
        />

        <Circle
          size="0.6%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft37}`}
        />

        <Circle
          size="0.9%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft38}`}
        />

        <Circle
          size="1.1%"
          className={`${style.dot} ${style.dotLight} ${style.dotLeft39}`}
        />

        {/* Circles at the right */}
        <Circle
          size="0.5%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight31}`}
        />

        <Circle
          size="0.7%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight32}`}
        />

        <Circle
          size="0.9%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight33}`}
        />

        <Circle
          size="0.9%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight34}`}
        />

        <Circle
          size="1.5%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight35}`}
        />

        <Circle
          size="0.4%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight36}`}
        />

        <Circle
          size="0.8%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight37}`}
        />

        <Circle
          size="0.5%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight38}`}
        />

        <Circle
          size="0.8%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight39}`}
        />

        <Circle
          size="0.7%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight310}`}
        />

        <Circle
          size="1%"
          className={`${style.dot} ${style.dotLight} ${style.dotRight311}`}
        />
      </div>
    ),
  },
];

const NEXT = 'next';
const PREV = 'prev';

class Slider extends React.PureComponent {
  state = {
    slider: {
      prevIndex: SLIDES.length - 1,
      index: 0,
      dir: '',
    },
  };

  componentDidMount() {
    this.animate = false;
    document.addEventListener('keydown', this.handleNavigate, false);

    // Auto scroll the slides
    this.autoSlide = setInterval(
      () => this.handleNavigate({ keyCode: 39, auto: true }),
      7000
    );
  }

  componentWillUnmount() {
    clearInterval(this.autoSlide);
    document.removeEventListener('keydown', this.handleNavigate, false);
  }

  navigate = (clickedSlideIndex, direction) => {
    this.animate = true;
    const { slider } = this.state;
    let dir = clickedSlideIndex > slider.index ? NEXT : PREV;

    if (direction) {
      dir = direction;
    }

    this.setState({
      slider: {
        prevIndex: slider.index,
        index: clickedSlideIndex,
        dir,
      },
    });
  };

  stopAutoScroll = config => {
    if (!config.auto) {
      clearInterval(this.autoSlide);
    }
  };

  handleNavigate = e => {
    const { slider } = this.state;
    const { index: currentSlideIndex } = slider;
    const lastSlideindex = SLIDES.length - 1;

    if (!this.animate) {
      this.animate = true;

      if (e.keyCode === 37) {
        // left arrow
        this.navigate(
          currentSlideIndex === 0 ? lastSlideindex : currentSlideIndex - 1,
          PREV
        );

        this.stopAutoScroll(e);
      } else if (e.keyCode === 39) {
        // right arrow
        this.navigate(
          currentSlideIndex === lastSlideindex ? 0 : currentSlideIndex + 1,
          NEXT
        );

        this.stopAutoScroll(e);
      }
    }
  };

  renderSlide = (slide, slideIndex) => {
    const { slider } = this.state;
    const { prevIndex, index, dir } = slider;
    const { title, content, imagesComp } = slide;
    const prevSlideClass = dir === NEXT ? 'navOutNext' : 'navOutPrev';
    const currSlideClass = dir === NEXT ? 'navInNext' : 'navInPrev';

    return (
      <li
        key={title}
        className={`${style.sliderListItem} ${
          slideIndex === index ? style[currSlideClass] : ''
        } ${slideIndex === prevIndex ? style[prevSlideClass] : ''}`}
        onAnimationEnd={() => {
          this.animate = false;
        }}
      >
        <div className={style.imageContainer}>{imagesComp()}</div>

        <div className={style.contentContainer}>
          <div className={style.contentContainerWrapper}>
            <h3 className={style.slideTitle}>{title}</h3>

            <p className={style.description}>{content}</p>
          </div>
        </div>
      </li>
    );
  };

  renderCircularPaginate = (slide, index) => {
    const { animate, slider } = this.state;
    const isCurrentSlide = slider.index === index;

    return (
      <li key={slide.title} className={style.circularPaginateItem}>
        <button
          type="button"
          disabled={animate}
          onClick={() => {
            clearInterval(this.autoSlide);
            this.navigate(index);
          }}
        >
          <Circle
            size={5}
            className={`
              ${style.paginateCircle}
              ${isCurrentSlide ? style.activePaginateCircle : ''}
            `}
          />
        </button>
      </li>
    );
  };

  render() {
    return (
      <div className={style.sliderContainer}>
        <ul className={style.sliderList}>{SLIDES.map(this.renderSlide)}</ul>

        <ul className={style.paginateContainer}>
          {SLIDES.map(this.renderCircularPaginate)}
        </ul>
      </div>
    );
  }
}

export default Slider;
