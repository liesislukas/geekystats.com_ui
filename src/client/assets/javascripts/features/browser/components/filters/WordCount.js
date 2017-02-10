import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';
const numeral = require('numeral');
const Immutable = require('immutable');

export default class FilterWordCount extends Component {

  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    isOnUnknown: PropTypes.bool.isRequired,
    wordCountFrom: PropTypes.number.isRequired,
    wordCountTo: PropTypes.number.isRequired,
    handleToggleOn: PropTypes.func.isRequired,
    handleToggleUnknown: PropTypes.func.isRequired,
    handleWordCountFromChange: PropTypes.func.isRequired,
    handleWordCountToChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.props.isOn !== nextProps.isOn ||
      this.props.isOnUnknown !== nextProps.isOnUnknown ||
      this.props.wordCountFrom !== nextProps.wordCountFrom ||
      this.props.wordCountTo !== nextProps.wordCountTo
    );
  }

  render() {

    console.warn('#dfkfj render FilterWordCount');

    const {
      isOn,
      isOnUnknown,
      wordCountFrom,
      wordCountTo,
      handleToggleOn,
      handleToggleUnknown,
      handleWordCountFromChange,
      handleWordCountToChange,
    } = this.props;

    return (
      <div className="pt-label" style={{width: 450}}>
        <div
          style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <Switch
              label={'Word Count'}
              checked={isOn}
              onChange={() => handleToggleOn(!isOn)}
            />
          </div>
          <div className="spacer-h-12"></div>
          <Switch
            label={'Include with unknown word count'}
            checked={isOnUnknown}
            onChange={() => handleToggleUnknown(!isOnUnknown)}
          />
        </div>
        <RangeSlider
          min={0}
          max={2600}
          stepSize={5}
          labelStepSize={200}
          onChange={(range) => {
            if(range[0] !== wordCountFrom){
              handleWordCountFromChange(range[0]);
            }
            if(range[1] !== wordCountTo){
              handleWordCountToChange(range[1]);
            }
          }}
          value={[wordCountFrom, wordCountTo]}
          renderLabel={value => {
            if(value === 2600){
              return '∞';
            } else if(value < 1000){
              return value;
            } else if(value > 1000 && value % 1000 != 0){
              return numeral(value).format('0.0a')
            } else {
              return numeral(value).format('0a')
            }
          }}
        />
      </div>
    );
  }

}
