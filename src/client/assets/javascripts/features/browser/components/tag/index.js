import React, {Component, PropTypes} from 'react';

export default class Tag extends Component {
  render() {
    console.warn('#skfksdjdf render: Tag', this.props);

    const {type, value, country_code, handleRemove} = this.props;

    let img = null;

    if (type === 'country') {
      img = <img
        style={{width: 16, height: 16, position: 'absolute', left: 4, top: 3}}
        src={`/images/flags/16/${country_code}.png`}
      />;
    }

    let keyword = null;

    if (type === 'keyword') {
      keyword = <span className="t-muted">Keyword: </span>;
    }

    return (
      <div className="pt-tag pt-tag-removable" style={{margin: '3px 6px',paddingLeft: type === 'country' ? 23 : null}}>
        {img}
        {keyword}{value}
        <button className="pt-tag-remove" onClick={handleRemove}></button>
      </div>
    );
  }
}
