import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from "@blueprintjs/core";
const Immutable = require('immutable');

export default class FilterOptimizationScore extends Component {
  static propTypes = {
    optimization_scores: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !Immutable.is(this.props.optimization_scores, nextProps.optimization_scores)
      || this.state.show_dialog !== nextState.show_dialog
    );
  }

  constructor(props) {
    super(props);
    this.state = {show_dialog: false};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let value = e.target.value.trim();
    if (value !== '') {
      if (this.props.optimization_scores.has(value)) {
        this.props.handleRemove(e.target.value);
      } else {
        this.props.handleAdd(e.target.value);
      }
    }
  }

  render() {

    console.warn('#dfkfj render FilterOptimizationScore');

    const options = [];
    options.push({value: "95", title: 'Optimization score 95 and more'});
    options.push({value: "60", title: 'Optimization score 60 - 95'});
    options.push({value: "25", title: 'Optimization score 25 - 60'});
    options.push({value: "0", title: 'Optimization score less then 25'});
    options.push({value: "-1", title: 'Optimization score not available'});

    let html_options_selected = [];
    let html_options_unselected = [];

    options.forEach(option => {
      if (this.props.optimization_scores.has(option.value)) {
        html_options_selected.push(<option key={option.value} value={option.value}>{option.title}</option>)
      } else {
        html_options_unselected.push(<option key={option.value} value={option.value}>{option.title}</option>)
      }
    });

    if (html_options_selected.length > 0) {
      html_options_selected =
        <optgroup label="Selected filters">
          {html_options_selected}
        </optgroup>;

      html_options_unselected =
        <optgroup label="Other options">
          {html_options_unselected}
        </optgroup>;
    }

    return (
      <div style={{display: 'flex', justifyContents: 'space-between', alignItems: 'baseline'}}>

        <label className="pt-label pt-inline" style={{marginRight: 12}}>
          <div className="pt-select" style={{marginLeft: 0}}>
            <select value={'whatver'} onChange={this.handleSubmit}>
              <option value={''}>Filter optimization score</option>
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

        <Dialog
          style={{width: '90%', maxWidth: 550}}
          title={'What is optimization score?'}
          lazy={true}
          isOpen={this.state.show_dialog === true}
          onClose={() => this.setState({show_dialog: false})}
        >
          <div className="pt-dialog-body">
            <p>We use on-page properties to count optimization score. Optimization score is between 0 and 100.</p>
            <table className="pt-table pt-bordered pt-condensed pt-interactive" style={{marginTop: 12}}>
              <thead>
              <tr>
                <th>Property</th>
                <th>Points</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>HTTP version 2</td>
                <td><span className="pt-tag pt-intent-success">+20</span></td>
              </tr>
              <tr>
                <td>Expires or Cache-Control headers</td>
                <td><span className="pt-tag pt-intent-success">+20</span></td>
              </tr>
              <tr>
                <td>gzip enabled</td>
                <td><span className="pt-tag pt-intent-success">+20</span></td>
              </tr>
              <tr>
                <td>SSL certificate</td>
                <td><span className="pt-tag pt-intent-success">+10</span></td>
              </tr>
              <tr>
                <td>Etag usage</td>
                <td><span className="pt-tag pt-intent-success">+5</span></td>
              </tr>
              <tr>
                <td>Minified JavaScript/CSS <span className="t-muted">(depends on file size)</span></td>
                <td style={{display: 'flex', flexWrap: 'wrap'}}>
                  <div style={{margin: '1px 3px 1px 1px'}}>from <span
                    className="pt-tag pt-intent-success">+10</span></div>
                  <div style={{margin: 1}}>to <span className="pt-tag pt-intent-danger">-50</span></div>
                </td>
              </tr>
              <tr>
                <td>Unscaled images <span className="t-muted">(depends on file size)</span></td>
                <td style={{display: 'flex', flexWrap: 'wrap'}}>
                  <div style={{margin: '1px 3px 1px 1px'}}>from <span
                    className="pt-tag pt-intent-success">+5</span></div>
                  <div style={{margin: 1}}>to <span className="pt-tag pt-intent-danger">-50</span></div>
                </td>
              </tr>
              <tr>
                <td>DOM elements count under 1000 <span className="t-muted">(depends on count)</span></td>
                <td style={{display: 'flex', flexWrap: 'wrap'}}>
                  <div style={{margin: '1px 3px 1px 1px'}}>from <span
                    className="pt-tag pt-intent-success">+5</span></div>
                  <div style={{margin: 1}}>to <span className="pt-tag pt-intent-danger">-50</span></div>
                </td>
              </tr>
              <tr>
                <td>Page size <span className="t-muted">(depends on file size)</span></td>
                <td style={{display: 'flex', flexWrap: 'wrap'}}>
                  <div style={{margin: '1px 3px 1px 1px'}}>from <span
                    className="pt-tag pt-intent-success">+5</span></div>
                  <div style={{margin: 1}}>to <span className="pt-tag pt-intent-danger">-50</span></div>
                </td>
              </tr>
              <tr>
                <td>Redirects <span className="t-muted">(depends on redirects count)</span></td>
                <td style={{display: 'flex', flexWrap: 'wrap'}}>
                  <div style={{margin: '1px 3px 1px 1px'}}>from <span className="pt-tag">0</span></div>
                  <div style={{margin: 1}}>to <span className="pt-tag pt-intent-danger">-50</span></div>
                </td>
              </tr>
              <tr>
                <td>Duplicate JavaScript/CSS files <span className="t-muted">(depends on count)</span></td>
                <td style={{display: 'flex', flexWrap: 'wrap'}}>
                  <div style={{margin: '1px 3px 1px 1px'}}>from <span className="pt-tag">0</span></div>
                  <div style={{margin: 1}}>to <span className="pt-tag pt-intent-danger">-50</span></div>
                </td>
              </tr>
              <tr>
                <td>Img tags with empty src value <span className="t-muted">(depends on count)</span></td>
                <td style={{display: 'flex', flexWrap: 'wrap'}}>
                  <div style={{margin: '1px 3px 1px 1px'}}>from <span className="pt-tag">0</span></div>
                  <div style={{margin: 1}}>to <span className="pt-tag pt-intent-danger">-50</span></div>
                </td>
              </tr>
              </tbody>
            </table>

            <p className="t-muted" style={{margin: '12px 0'}}>
              It is easy to go wrong. The site which displays image of size 150x80
              but loads the 10Mb file in the background would get -50 points.
            </p>

          </div>
        </Dialog>
      </div>
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
