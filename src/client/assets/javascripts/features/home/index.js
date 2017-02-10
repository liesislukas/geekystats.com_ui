import React, {Component} from 'react';
import {Link} from 'react-router';
import {Button} from "@blueprintjs/core";

export default class Home extends Component {
  render() {

    const url_wiki = 'https://en.wikipedia.org/wiki/Software_release_life_cycle#Pre-alpha';

    return (
      <div style={{padding: 24, textAlign: 'center'}}>
        <h1 style={{margin: 24}}>We provide tool to find clients</h1>
        <div className="pt-card pt-elevation-0" style={{maxWidth: 700, width: '95%', margin: '24px auto'}}>
          <p>
            We are in a <a href={url_wiki} target="_blank">pre-alpha stage</a> now.
            This is the prototype of tool we build.
            All data we collect is public. Only <abbr title="Oldest bit of data is 90 days old">fresh data</abbr>.
            We don't own data, we just provide a useful way to browse it.
          </p>
          <p>
            We collect HTML, DNS, whois and some other public information.
            We apply machine learning algorithms to produce what you see in data browser and way more.
          </p>
          <h3 style={{margin: 24}}>Feedback and suggestions are very welcome</h3>
          <p>
            <a href="mailto:mbgerbora@gmail.com" target="_blank">mbgerbora@gmail.com</a>
          </p>
          <p>
            If you find this tool useful or would like to discuss with us what we could do
             better - please write us a message. We would love to talk.
          </p>
        </div>

        <Link to="/data-browser">
          <button type="button" className="pt-button pt-large pt-intent-success">
            Go to Data Browser
            <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
          </button>
        </Link>
      </div>
    );
  }
}
