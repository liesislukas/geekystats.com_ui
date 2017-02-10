import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';
const numeral = require('numeral');

export default class FilterAlexa extends Component {

  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    isOnUnknown: PropTypes.bool.isRequired,
    alexaFrom: PropTypes.number.isRequired,
    alexaTo: PropTypes.number.isRequired,
    handleToggleOn: PropTypes.func.isRequired,
    handleToggleUnknown: PropTypes.func.isRequired,
    handleAlexaFromChange: PropTypes.func.isRequired,
    handleAlexaToChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.props.isOn !== nextProps.isOn ||
      this.props.isOnUnknown !== nextProps.isOnUnknown ||
      this.props.alexaFrom !== nextProps.alexaFrom ||
      this.props.alexaTo !== nextProps.alexaTo
    )
  }

  render() {

    console.warn('#dfkfj render FilterAlexa');

    const {
      isOn,
      isOnUnknown,
      alexaFrom,
      alexaTo,
      handleToggleOn,
      handleToggleUnknown,
      handleAlexaFromChange,
      handleAlexaToChange,
    } = this.props;

    return (
      <div className="pt-label" style={{width: 450}}>
        <div
          style={{display: 'flex', justifyContent: 'space-between'}}>
          <Switch
            label={'Alexa Rating'}
            checked={isOn}
            onChange={() => handleToggleOn(!isOn)}
          />
          <div className="spacer-h-12"></div>
          <Switch
            label={'Include with unknown Alexa'}
            checked={isOnUnknown}
            onChange={() => handleToggleUnknown(!isOnUnknown)}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000000}
          stepSize={1000}
          labelStepSize={100000}
          onChange={(range) => {
            if(range[0] !== alexaFrom){
              handleAlexaFromChange(range[0]);
            }
            if(range[1] !== alexaTo){
              handleAlexaToChange(range[1]);
            }
          }}
          value={[alexaFrom, alexaTo]}
          renderLabel={value => <span>{numeral(value).format('0a')}</span>}
        />
      </div>
    );
  }

}
