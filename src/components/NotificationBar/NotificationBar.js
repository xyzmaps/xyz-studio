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

import React, { useState, useEffect } from 'react';
import Button from '../Common/Button';
import style from './NotificationBar.scss';

/**
 * Usage:
 *
 * <Notification message="Your message" visible />
 *
 * // Autoclose after showing the message
 * <Notification message="Your message" visible duration={5000} />
 *
 * // Notification bar with message and button
 * <Notification message="Your message" visible btnLabel="View Detail" onBtnClick={() => {})} />
 *
 * // Type = success | error
 */
const Notification = ({
  message,
  visible,
  duration,
  btnLabel,
  onBtnClick,
  type,
  onClose,
  className,
}) => {
  const [isVisible, toggleVisible] = useState(visible);

  useEffect(() => {
    toggleVisible(visible);

    // If dev wants to autoclose, start the timer to close the notification after a set duration
    if (duration && visible) {
      setTimeout(() => toggleVisible(false), duration);
    }
  }, [visible, isVisible, duration]);

  const onHide = () => {
    if (isVisible) {
      toggleVisible(false);

      onClose();
    }
  };

  return (
    <div
      className={`${style.container} ${isVisible && style.expand} ${
        style[type]
      } ${className}`}
    >
      <div className={style.msgBtn}>
        <p>{message}</p>

        {btnLabel && (
          <Button
            type="secondary"
            data-testid="notification-btn"
            className={[style.btn]}
            text={btnLabel}
            onClick={onBtnClick}
          />
        )}
      </div>

      <button className={style.closeBtn} onClick={onHide} type="button">
        X
      </button>
    </div>
  );
};

Notification.defaultProps = {
  visible: false,
  duration: 0,
  message: '<Please provide a message to display>',
  btnLabel: '',
  type: 'error',
  onClose: () => {},
  onBtnClick: () => {},
  className: '',
};

export default Notification;
