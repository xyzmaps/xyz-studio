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
import { Transition } from 'react-transition-group';

import Button from '../Common/Button';

import { Smiley } from '../../icons';
import style from './Alert.scss';

/** ** Examples to show how this component should be used *****
<Alert title="Confirmation"/>
<Alert title="Confirmation" text="Lorem ipsum dolor sit amet"/>
<Alert title="Confirmation" text="Lorem ipsum dolor sit amet" cancelLabel="Cancel"/> cancel no callback
<Alert title="Confirmation" text="Lorem ipsum dolor sit amet" cancelLabel="Cancel" cancel={this.cancelCallback}/> cancel with callback
<Alert title="Confirmation" text="Lorem ipsum dolor sit amet" confirmLabel="Confirm" confirm={this.confirmCallback}/> cancel no callback, confirm with callback
<Alert title="Confirmation" text="Lorem ipsum dolor sit amet" cancelLabel="Cancel" cancel={this.cancelCallback} confirmLabel="Confirm" confirm={this.confirmCallback}/> cancel and confirm with callback
*/

class Alert extends Component {
  static defaultProps = {
    componentName: '',
    hideAlert: () => {},
  };

  state = {
    input: '',
    checked: false,
    toggle: this.props.toggle,
    error: this.props.error,
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.keyPress, false);
  };

  componentDidUpdate = prevProps => {
    this.toggleAlert(prevProps);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.keyPress, false);
  };

  toggleAlert = prevProps => {
    if (prevProps.toggle !== this.props.toggle) {
      this.setState({ toggle: this.props.toggle });
    }
  };

  ontoggle = () => {
    this.setState({ toggle: false });
  };

  disabled = false;

  keyPress = e => {
    if (e.key === 'Enter' && !this.disabled && this.state.toggle) {
      this.confirm(this.state.input);
    } else if (e.key === 'Escape') {
      this.cancel(e);
    }
  };

  onCheck = () => {
    this.setState(
      prevState => ({ checked: !prevState.checked }),
      () => this.props.onCheck(this.state.checked)
    );
  };

  cancel = () => {
    this.setState(
      {
        toggle: false,
        error: '',
      },
      () => {
        if (this.props.cancel) {
          this.props.cancel();
        }

        this.props.hideAlert();
      }
    );
  };

  confirm = (input = '') => {
    const thisRef = this;
    this.disabled = true;

    if (this.props.placeholder) {
      if (input !== '') {
        this.props
          .confirm(input)
          .then(() => {
            thisRef.setState({ error: '', input: '', toggle: false }, () => {
              thisRef.disabled = false;
              this.props.hideAlert();
            });
          })
          .catch(form => {
            this.setState({ error: form.error }, () => {
              this.disabled = false;
            });
          });
      } else {
        this.setState(
          { error: `Please enter '${this.props.placeholder}'` },
          () => {
            this.disabled = false;
          }
        );
      }
    } else if (this.props.checked) {
      this.props.confirm(this.state.checkbox);
      this.setState({ toggle: false }, () => {
        this.disabled = false;
        this.props.hideAlert();
      });
    } else {
      const { confirm } = this.props;

      if (confirm) {
        this.props.confirm();
      }

      this.setState({ toggle: false }, () => {
        this.disabled = false;
        this.props.hideAlert();
      });
    }
  };

  render() {
    const { toggle, value, error, checked, input } = this.state;

    const {
      cancel,
      confirmLabel,
      renderContent,
      yesLabel,
      onYes,
      onNo,
      noLabel,
      cancelLabel,
      title,
      theme,
      componentName,
      text,
      subText,
      placeholder,
      confirm,
      checkboxLabel,
      customSave,
      emoticon,
      customAlert,
    } = this.props;

    const defaultStyle = {
      transition: 'opacity 300ms ease-in-out',
      opacity: 0,
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    };

    return (
      <Transition
        in={toggle}
        onExited={() => {
          if (cancel) {
            cancel('onExited');
          }
        }}
        timeout={{
          enter: 0,
          exit: 400,
        }}
        unmountOnExit
      >
        {state => {
          return (
            customAlert || (
              <div
                className={`${style.alert} ${style[theme]} ${style[componentName]}`}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                {emoticon && (
                  <span
                    role="presentation"
                    className={style.modalBackdrop}
                    onClick={this.ontoggle}
                  />
                )}
                <div className={style.container}>
                  <div className={style.content} style={customSave}>
                    {emoticon && <Smiley />}
                    {/* title & text */}
                    {title && <h3 className={style.title}>{title}</h3>}
                    {/* eslint-disable */}
                    {text && (
                      <p
                        dangerouslySetInnerHTML={{ __html: text }}
                        className={style.text}
                      />
                    )}
                    {subText && (
                      <p
                        dangerouslySetInnerHTML={{ __html: subText }}
                        className={style.subText}
                      />
                    )}
                    {/* eslint-enable */}

                    {/* input */}
                    {placeholder && confirm && (
                      <div className={style.label}>
                        <input
                          type="text"
                          className={style.input}
                          placeholder={placeholder}
                          value={value}
                          onChange={e =>
                            this.setState({ input: e.target.value })
                          }
                        />

                        {error && <p className={style.error}>{error}</p>}
                      </div>
                    )}
                    {/* checkbox */}
                    {checkboxLabel && (
                      <div className={style.checkboxContainer}>
                        <button
                          type="button"
                          className={`${style.checkbox} ${
                            checked ? style.active : null
                          }`}
                          onClick={this.onCheck}
                        >
                          <strong>{checkboxLabel}</strong>
                        </button>
                      </div>
                    )}

                    {/* cancel */}
                    {cancelLabel && (
                      <Button
                        className={[style.button]}
                        type="secondary"
                        text={cancelLabel || 'Cancel'}
                        onClick={this.cancel}
                      />
                    )}

                    {/* confirm */}
                    {confirm &&
                      (placeholder ? (
                        <Button
                          className={[style.button]}
                          type="secondary-reversed"
                          text={confirmLabel || 'Confirm'}
                          onClick={() => !this.disabled && this.confirm(input)}
                        />
                      ) : (
                        <Button
                          className={[style.button]}
                          type="secondary-reversed"
                          text={confirmLabel || 'Confirm'}
                          onClick={this.confirm}
                        />
                      ))}

                    {/* yes or no */}
                    {onNo && (
                      <Button
                        className={[style.button]}
                        type="secondary-negative"
                        text={noLabel || 'No'}
                        onClick={onNo}
                      />
                    )}
                    {onYes && (
                      <Button
                        className={[style.button]}
                        type="secondary-positive"
                        text={yesLabel || 'Yes'}
                        onClick={onYes}
                      />
                    )}

                    {renderContent && renderContent()}
                  </div>
                </div>
              </div>
            )
          );
        }}
      </Transition>
    );
  }
}

export default Alert;
