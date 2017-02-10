import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';

export default class FilterOnlyEmail extends Component {
  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (this.props.isOn !== nextProps.isOn);
  }

  render() {
    console.warn('#dfkfj render FilterOnlyEmail');

    return (
      <Switch
        label={'Only with email'}
        checked={this.props.isOn}
        onChange={this.props.handleChange}
      />
    );
  }
}
