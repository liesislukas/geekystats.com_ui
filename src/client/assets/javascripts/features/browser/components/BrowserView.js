import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actionCreators as browserActions, selector} from '../';
import {actionCreators as dataExportActions, selector as dataExportSelector} from '../../dataExport';
import DataExportView from './../../dataExport/components/DataExportView';
import BrowserLayout from './BrowserLayout';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(browserActions, dispatch)
}))

@connect(dataExportSelector, (dispatch) => ({
  dataExportActions: bindActionCreators(dataExportActions, dispatch)
}))

export default class BrowserView extends Component {
  render() {
    return (
      <div>
        <BrowserLayout {...this.props} />
        <DataExportView />
      </div>
    );
  }
}
