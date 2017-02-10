import React, {Component, PropTypes} from 'react';
const stringify = require('csv-stringify');
const Immutable = require('immutable');
import {Spinner} from '@blueprintjs/core';

export default class DataExportContent extends Component {

  static propTypes = {
    mode: PropTypes.string.isRequired,
    rows: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading_csv: false,
      loading_json: false,
      visual_csv: null,
      visual_json: null,
      source_csv: Immutable.Set(),
      source_json: Immutable.Set(),
    };

    this.handleVisualUpdate = this.handleVisualUpdate.bind(this);
    this.handleVisualUpdateJson = this.handleVisualUpdateJson.bind(this);
    this.handleVisualUpdateCsv = this.handleVisualUpdateCsv.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    e.target.select();
  }

  handleVisualUpdateJson(rows, state) {
    console.log('jkfddkjfsjd handleVisualUpdateJson');
    if (state.visual_json === null || !Immutable.is(rows, state.source_json)) {

      this.setState({loading: true, source_json: rows});
      const input = [];

      rows.forEach(row => {
        const contacts_email = [];
        const contacts_phone = [];

        row.contacts.forEach(contact => {
          if (contact.type === 'email') {
            contacts_email.push(contact.value);
          } else if (contact.type === 'phone') {
            contacts_phone.push(contact.value);
          }
        });

        let id = Boolean(row.id) === false && row.id !== 0 ? '' : row.id;
        let domain = row.domain || '';
        let optimization = Boolean(row.optimization) === false && row.optimization !== 0 ? '' : row.optimization;
        let alexa = Boolean(row.alexa) === false && row.alexa !== 0 ? '' : row.alexa;
        let word_count = Boolean(row.word_count) === false && row.word_count !== 0 ? '' : row.word_count;
        let img_src = row.img_src || '';

        input.push({
          id: id,
          domain: domain,
          contacts_email: contacts_email.join(', '),
          contacts_phone: contacts_phone.join(', '),
          optimization: optimization,
          alexa: alexa,
          word_count: word_count,
          img_src: img_src,
          source: 'GeekyStats.com',
        });
      });

      this.setState({visual_json: JSON.stringify(input), loading: false});

    }
  }

  handleVisualUpdateCsv(rows, state) {
    console.log('#f43f34wad handleVisualUpdateCsv');
    if (state.loading_csv === false && (state.visual_csv === null || !Immutable.is(rows, state.source_csv))) {
      // re-parse
      this.setState({loading_csv: true, source_csv: rows});
      const input = [];
      input.push(['id', 'domain', 'contacts_email', 'contacts_phone', 'optimization', 'alexa', 'word_count', 'screenshot', 'source']);

      rows.forEach(row => {
        const csv_row = [];
        const contacts_email = [];
        const contacts_phone = [];

        row.contacts.forEach(contact => {
          if (contact.type === 'email') {
            contacts_email.push(contact.value);
          } else if (contact.type === 'phone') {
            contacts_phone.push(contact.value);
          }
        });

        let id = Boolean(row.id) === false && row.id !== 0 ? '' : row.id;
        let domain = row.domain || '';
        let optimization = Boolean(row.optimization) === false && row.optimization !== 0 ? '' : row.optimization;
        let alexa = Boolean(row.alexa) === false && row.alexa !== 0 ? '' : row.alexa;
        let word_count = Boolean(row.word_count) === false && row.word_count !== 0 ? '' : row.word_count;
        let img_src = row.img_src || '';

        input.push([
          id,
          domain,
          contacts_email.join(', '),
          contacts_phone.join(', '),
          optimization,
          alexa,
          word_count,
          img_src,
          'GeekyStats.com'
        ]);
      });

      stringify(input, (err, output) => {
        this.setState({visual_csv: output, loading_csv: false});
      });

    }
  }

  handleVisualUpdate(props, state) {
    if (props.mode === 'json') {
      this.handleVisualUpdateJson(props.rows, state);
    } else {
      this.handleVisualUpdateCsv(props.rows, state);
    }
  }

  componentWillMount() {
    this.handleVisualUpdate(this.props, this.state);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.handleVisualUpdate(nextProps, nextState);
  }

  render() {

    console.log('#jkf5f423 ', this.props, this.state);

    const style = {
      resize: 'none',
      width: 292,
      height: 215,
      padding: 6,
      margin: '0 auto',
      border: 'none',
      fontSize: '0.8em',
      position: 'absolute',
    };

    if (
      (this.state.loading_csv && this.props.mode === 'csv')
      || (this.state.loading_json && this.props.mode === 'json')
    ) {
      return <div style={{textAlign: 'center', marginTop: 48}}><Spinner/></div>;
    }

    const style_json = Object.assign({}, style, {
      visibility: this.props.mode === 'json' ? 'visible' : 'hidden',
      opacity: this.props.mode === 'json' ? 1 : 0,
    });
    const style_csv = Object.assign({}, style, {
      visibility: this.props.mode === 'csv' ? 'visible' : 'hidden',
      opacity: this.props.mode === 'csv' ? 1 : 0,
    });

    return (
      <div>
        <textarea onMouseOver={this.handleSelect} readOnly value={this.state.visual_json || ''} style={style_json}/>
        <textarea onMouseOver={this.handleSelect} readOnly value={this.state.visual_csv || ''} style={style_csv}/>
      </div>
    );

  }
}
