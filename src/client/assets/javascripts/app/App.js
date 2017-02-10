import React, {PropTypes} from 'react';
import {Navbar} from "@blueprintjs/core";
import {Link} from 'react-router';

const App = (props) => (
  <div className="page-container">
    <nav className="pt-navbar">
      <div style={{margin: '0 auto', maxWidth: (1100-24)}}>
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading" style={{fontSize: 25}}>
            <span style={{color: '#10161a'}}>Geeky</span>
            <span style={{color: '#ffc940'}}>Stats</span>
          </div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <Link to="/" className="pt-button pt-minimal">
            Home
          </Link>
          <Link to="/data-browser" className="pt-button pt-minimal">
            Data Browser
          </Link>
          <span className="pt-navbar-divider"></span>
          <div className="spacer-h-12"></div>
          <input className="pt-input" placeholder="Search for report" type="text"/>
        </div>
      </div>
    </nav>
    <div>
      {React.cloneElement({...props}.children, {...props})}
    </div>
    <div
      className="pt-card pt-elevation-0 t-muted"
      style={{marginTop: 24, padding: 24, textAlign: 'center', borderRadius: 0}}
    >
      © GeekyStats.com 2017
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
