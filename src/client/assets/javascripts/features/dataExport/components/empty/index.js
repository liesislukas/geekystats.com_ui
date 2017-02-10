import React, {Component, PropTypes} from 'react';

export default class DataExportEmpty extends Component {
  render() {

    console.warn('#jskdfdjskf render DataExportEmpty');

    return (
      <div style={{height: 192, padding: 24, textAlign: 'center', opacity: 0.6}}>
        Search for domains and click
        <div style={{margin: 12}}>
          <button type="button" className="pt-button">
            Export
            <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
          </button>
        </div>
        Your data will be here
      </div>
    );
  }
}
