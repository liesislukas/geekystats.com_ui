import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actionCreators as dataExportActions, selector} from '../';
import DataExportLayout from './DataExportLayout';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(dataExportActions, dispatch)
}))

export default class DataExportView extends Component {
  render() {

    return (
      <div>
        <DataExportLayout {...this.props} />
      </div>
    );
  }
}
