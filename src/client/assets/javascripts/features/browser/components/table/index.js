import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';
import Row from './row';

export default class BrowserTable extends Component {

  static propTypes = {
    dataExportActions: PropTypes.object.isRequired,
    data_export: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    return false;
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
  }

  render() {
    console.warn('#skfksdjdf render: BrowserTable');

    console.log('#jkfjdskf props: ', this.props);

    const rows = [];

    const fixture_contacts = [];

    fixture_contacts.push([
      {type: 'email', value: 'info@example.com'},
      {type: 'email', value: 'info2@example.com'},
      {type: 'phone', value: '+370 655 12315'},
    ]);
    fixture_contacts.push([{type: 'email', value: 'info@example.com'}]);
    fixture_contacts.push([{type: 'phone', value: '+370 699 12315'}]);
    for (let i = 1; i <= 10; i++) {
      rows.push(
        <Row
          key={i}
          id={i}
          img_src={null}
          optimization={Math.round(Math.random()*100)}
          alexa={Math.round(Math.random() * 1000000)}
          domain={'example.com'}
          contacts={fixture_contacts[Math.floor(Math.random() * (fixture_contacts.length - 0) + 0)]}
          word_count={Math.round(Math.random() * (5000 - 20) + 20)}
          data_export={this.props.data_export}
          handleRowAdd={({value}) => {
            if(this.props.data_export.get('rows').size === 0){
              this.props.dataExportActions.openToggle({value: true});
            }
            this.props.dataExportActions.rowAdd({value});
          }}
        />
      );
    }

    return (
      <table className="pt-table pt-condensed pt-striped domains" style={{width: '100%'}}>
        <thead>
        <tr>
          <th>ID</th>
          <th>Domain</th>
          <th>Contacts</th>
          <th className="visible-mobile">
            Stats
          </th>
          <th className="hide-mobile">Optimization</th>
          <th className="hide-mobile">Alexa</th>
          <th className="hide-mobile">Word Count</th>
          <th className="hide-mobile">Action</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}
