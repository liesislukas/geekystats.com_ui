import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';

export default class FilterKeyword extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (this.state.value !== nextState.value);
  }

  handleSubmit() {
    const trimmed_value = this.state.value.trim();
    if (trimmed_value !== '') {
      this.props.handleSubmit(trimmed_value);
      this.setState({value: ''});
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    console.warn('#dfkfj render FilterKeyword');

    return (
      <label className="pt-label" style={{width: 217}}>
        <div className="pt-input-group ">
          <input
            className="pt-input"
            type="text"
            style={{width: 217}}
            placeholder="Enter keyword"
            value={this.state.value}
            onChange={e => this.setState({value:e.target.value})}
            onKeyPress={this.handleKeyPress}
          />
          <button
            className="pt-button pt-minimal pt-intent-primary pt-icon-arrow-right"
            onClick={this.handleSubmit}
          ></button>
        </div>
      </label>
    );
  }
}
