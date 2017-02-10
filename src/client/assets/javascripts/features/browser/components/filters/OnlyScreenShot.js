import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';

export default class FilterOnlyScreenShot extends Component {

  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (this.props.isOn !== nextProps.isOn);
  }

  render() {
    console.warn('#dfkfj render FilterOnlyScreenShot');

    return (
      <Switch
        label={'Only with screen shot'}
        checked={this.props.isOn}
        onChange={this.props.handleChange}
      />
    );
  }
}
