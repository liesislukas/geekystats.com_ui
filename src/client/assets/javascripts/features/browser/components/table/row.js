import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';
const numeral = require('numeral');

export default class TableRow extends Component {

  static propTypes = {
    img_src: PropTypes.string,
    optimization: PropTypes.number,
    alexa: PropTypes.number,
    contacts: PropTypes.array,
    id: PropTypes.number,
    domain: PropTypes.string,
    word_count: PropTypes.number,
    data_export: PropTypes.object.isRequired,
    handleRowAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {show_big_image: false};
    this.handleRowAdd = this.handleRowAdd.bind(this);
    this.renderBigImage = this.renderBigImage.bind(this);
  }

  handleRowAdd() {
    this.props.handleRowAdd({
      value: {
        img_src: this.props.img_src,
        optimization: this.props.optimization,
        alexa: this.props.alexa,
        contacts: this.props.contacts,
        id: this.props.id,
        domain: this.props.domain,
        word_count: this.props.word_count,
      }
    });
  }

  render() {

    const default_img_src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MSAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU5ZmYxMTA2ZTAgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTlmZjExMDZlMCI+PHJlY3Qgd2lkdGg9IjE3MSIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI1OS41NTQ2ODc1IiB5PSI5NC41Ij4xNzF4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+';
    const img_src = this.props.img_src || default_img_src;

    let optimization = null;

    if (this.props.optimization > 80) {
      optimization = <span className="pt-tag pt-intent-success">{this.props.optimization}</span>;
    } else if (this.props.optimization > 50) {
      optimization = <span className="pt-tag pt-intent-warning">{this.props.optimization}</span>;
    } else if (this.props.optimization !== null) {
      optimization = <span className="pt-tag pt-intent-danger">{this.props.optimization}</span>;
    }

    let alexa = this.props.alexa !== null ? numeral(this.props.alexa).format('0a') : null;

    let contacts = [];

    let key = 0;
    this.props.contacts.forEach(contact => {
      key++;
      if (contact.type === 'email') {
        contacts.push(<div key={key}><a href={`mailto:${contact.value}`} target="_blank">{contact.value}</a></div>);
      } else if (contact.type === 'phone') {
        contacts.push(<div key={key}><a href={`tel:${contact.value}`} target="_blank">{contact.value}</a></div>);
      }
    });

    return (
      <tr>
        <td>{this.props.id}</td>
        <td>
          <div style={{width: 130, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div>
              <a href={`http://${this.props.domain}/`} target="_blank">
                {this.props.domain}
              </a>
            </div>
            <div style={{position: 'relative'}}>
              <img
                style={{width: 120, height: 100, border: '2px solid #ccc', margin: '6px 0 0', borderRadius: 3}}
                src={img_src}
                onMouseEnter={() => this.setState({show_big_image: true})}
                onClick={() => this.setState({show_big_image: true})}
              />
              <div style={{position: 'absolute', bottom: 12, right: 10}}>
                <span style={{padding: 3}} className="pt-icon pt-icon-zoom-in"></span>
              </div>
              {this.state.show_big_image ? this.renderBigImage(img_src) : null}
            </div>
          </div>
        </td>
        <td>
          {contacts}
        </td>
        <td className="visible-mobile">
          <div><span className="t-muted">Optimization:</span> {optimization}</div>
          <div><span className="t-muted">Alexa:</span> {alexa}</div>
          <div><span className="t-muted">Words:</span> {this.props.word_count}</div>
          <button
            type="button"
            className="pt-button"
            style={{marginTop: 6}}
            onClick={this.handleRowAdd}
          >
            Export
            <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
          </button>
        </td>
        <td className="hide-mobile">
          {optimization}
        </td>
        <td className="hide-mobile">
          {alexa}
        </td>
        <td className="hide-mobile">
          {this.props.word_count}
        </td>
        <td className="hide-mobile">
          <button
            type="button"
            className="pt-button"
            style={{width: 86}}
            onClick={this.handleRowAdd}
          >
            Export
            <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
          </button>
        </td>
      </tr>
    );
  }

  renderBigImage(img_src) {

    const styles = {
      container: {
        position: 'absolute',
        width: 306,
        height: 256,
        zIndex: 9,
        left: 0,
        top: 0,
        padding: 3,
        margin: 0,
      },
      img: {
        width: 300,
        height: 250,
      }
    };

    return (
      <div className="pt-card pt-elevation-3" style={styles.container}>
        <img
          style={styles.img}
          src={img_src}
          onMouseLeave={() => this.setState({show_big_image: false})}
          onClick={() => this.setState({show_big_image: false})}
        />
        <div style={{position: 'absolute', bottom: 12, right: 10}}>
          <span style={{padding: 3}} className="pt-icon pt-icon-zoom-out"></span>
        </div>
      </div>
    )
  }
}
