import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './App';
import Home from 'features/home';
import BrowserView from 'features/browser/components/BrowserView';
import NotFoundView from 'components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/data-browser" component={BrowserView}/>
    <Route path="404" component={NotFoundView}/>
    <Redirect from="*" to="404"/>
  </Route>
);
