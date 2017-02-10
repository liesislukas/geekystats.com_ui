import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NotFound extends Component {
  render() {
    return (
      <div style={{textAlign: 'center', padding: 48}}>
        <h1>This is a 404 page!</h1>
        <hr />
        <Link to="/">Back To Home</Link>
      </div>
    );
  }
}
