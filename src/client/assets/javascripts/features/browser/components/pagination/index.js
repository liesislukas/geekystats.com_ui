import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';
const numeral = require('numeral');

export default class Pagination extends Component {

  static propTypes = {
    current_page: PropTypes.number.isRequired,
    total_items: PropTypes.number.isRequired,
    handleNext: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.props.current_page !== nextProps.current_page ||
      this.props.total_items !== nextProps.total_items
    );
  }

  render() {
    console.warn('#skfksdjdf render: Pagination');

    // first page has index 1

    let {current_page, total_items, handleNext, handlePrev} = this.props;

    current_page = current_page || 1;

    if (!total_items && total_items !== 0) {
      console.error('#kldfsfk total items is not a number!', total_items);
      return null;
    }

    const per_page = 10;
    const from = (current_page * per_page) - per_page;
    const to = from + per_page;

    return (
      <div>
        <strong>{from}</strong>–<strong>{to}</strong> of <strong>{numeral(total_items).format('0,0')}</strong>
        <div className="pt-button-group" style={{marginLeft: 12}}>
          <button className="pt-button pt-icon-chevron-left" role="button" onClick={handlePrev}/>
          <button className="pt-button pt-icon-chevron-right" role="button" onClick={handleNext}/>
        </div>
      </div>
    );
  }
}
