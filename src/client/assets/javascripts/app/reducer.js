import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import browserReducer, {NAME as browserName} from 'features/browser';
import dataExportReducer, {NAME as dataExportName} from 'features/dataExport';

export default combineReducers({
  routing,
  [browserName]: browserReducer,
  [dataExportName]: dataExportReducer,
});
