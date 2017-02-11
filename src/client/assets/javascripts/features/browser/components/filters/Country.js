import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from "@blueprintjs/core";
import {countries} from 'app/config';
import {Chart} from 'react-google-charts';
const Immutable = require('immutable');

export default class FilterCountry extends Component {

  static propTypes = {
    countries: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {show_dialog: false};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !Immutable.is(this.props.countries, nextProps.countries)
      || this.state.show_dialog !== nextState.show_dialog
    );
  }

  handleSubmit(e) {
    let value = e.target.value.trim();
    if (value !== '') {
      if (this.props.countries.has(value)) {
        this.props.handleRemove(e.target.value);
      } else {
        this.props.handleAdd(e.target.value);
      }
    }
  }

  render() {

    console.warn('#dfkfj render FilterCountry');

    let html_options_selected = [];
    let html_options_unselected = [];

    let counter = 0;

    countries.forEach(country => {
      if (this.props.countries.has(country.iso)) {
        html_options_selected.push(
          <option key={`country.iso ${counter++}`} value={country.iso}>{country.name}</option>
        );
      } else {
        html_options_unselected.push(
          <option key={`country.iso ${counter++}`} value={country.iso}>{country.name}</option>
        );
      }
    });

    if (html_options_selected.length > 0) {
      html_options_selected =
        <optgroup label="Selected countries">
          {html_options_selected}
        </optgroup>;

      html_options_unselected =
        <optgroup label="Other countries">
          {html_options_unselected}
        </optgroup>;
    }


    return (
      <div style={{display: 'flex', justifyContents: 'space-between', alignItems: 'baseline'}}>

        <label className="pt-label pt-inline" style={{marginRight: 12}}>
          <div className="pt-select" style={{marginLeft: 0, width: 188}}>
            <select defaultValue={''} onChange={this.handleSubmit}>
              <option value={''}>Filter country</option>
              {html_options_selected}
              {html_options_unselected}
            </select>
          </div>
        </label>
        <div
          style={{cursor: 'pointer'}}
          content={'Click to see details'}
          onClick={() => this.setState({show_dialog: true})}
        >
          <span className="pt-icon-standard pt-icon-help">{''}</span>
        </div>
        {this.renderDialog()}
      </div>
    );
  }

  renderDialog() {

    const countries_graph_data = [];
    const supported_countries = [];

    countries_graph_data.push(['Country']);
    countries.forEach(country => {
      countries_graph_data.push([country.name]);
      supported_countries.push(country.name);
    });

    return (
      <Dialog
        style={{width: '90%', maxWidth: 550}}
        title={'How country is detected?'}
        lazy={true}
        isOpen={this.state.show_dialog === true}
        onClose={() => this.setState({show_dialog: false})}
      >
        <div className="pt-dialog-body">
          <p>
            There several factors to detect country. The list of all things we check:
          </p>

          <ol>
            <li>Domain TLD</li>
            <li>Website hosting location</li>
            <li>Static files hosting location</li>
            <li>Language used on site</li>
            <li>Currency used on site</li>
          </ol>

          <div style={{margin: '12px 0 6px 0', fontWeight: 'bold'}}>We currently support these countries:</div>

          <div style={{margin: '12px 0'}}>
            <Chart
              chartType="GeoChart"
              data={countries_graph_data}
              graph_id="countries_graph_data"
              width="510px"
              height="315px"
              legend_toggle={false}
            />
          </div>


          <div className="t-muted">{supported_countries.join(', ')}</div>

        </div>
      </Dialog>
    );
  }

  getStyles() {
    return {
      filter_box: {
        margin: 12,
      }
    }
  }
}
