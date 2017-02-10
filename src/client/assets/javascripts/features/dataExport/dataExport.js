import {createStructuredSelector} from 'reselect';
const Immutable = require('immutable');

// Action Types

// let store = {
//   data_export: {
//     rows: {
//       123: {
//         id: 123,
//         domain: 'example.com',
//         screenshot: 'https://static-host.com/img.jpg',
//         contacts: [
//           {type: 'email', value: 'hey@gmail.com'},
//           {type: 'phone', value: '+370 654 77963'},
//         ],
//         optimization: 24,
//         alexa: 495305,
//         word_count: 355,
//       },
//     },
//     synced_with_localstorage: true, // if false - localstorage is probably full and data will be lost on page refresh
//     mode: 'csv'
//   }
// };

const DIALOG_TOGGLE = 'data_export/DIALOG_TOGGLE';
const ROW_ADD = 'data_export/ROW_ADD';
const ROW_REMOVE = 'data_export/ROW_REMOVE';
const OPEN_TOGGLE = 'data_export/OPEN_TOGGLE';
const BROWSER_STORAGE_SYNC_TRY = 'data_export/BROWSER_STORAGE_SYNC_TRY';
const BROWSER_STORAGE_SYNC_SUCCESS = 'data_export/BROWSER_STORAGE_SYNC_SUCCESS';
const BROWSER_STORAGE_SYNC_FAILED = 'data_export/BROWSER_STORAGE_SYNC_FAILED';
const BROWSER_STORAGE_CLEAR = 'data_export/BROWSER_STORAGE_CLEAR';
const MODE = 'data_export/MODE';
const RESET = 'data_export/RESET';

// This will be used in our root reducer and selectors
export const NAME = 'data_export';

const initialState = Immutable.Map({
  rows: Immutable.Set(),
  synced: true, // if false - localstorage is probably full and data will be lost on page refresh
  synced_error: '',
  synced_loading: false,
  dialog_open: false,
  open: false,
  mode: 'csv',
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ROW_ADD:
      if (state.get('rows').size < 500) {
        state = state.set('rows', state.get('rows').add(action.value));
      }
      return state;
    case ROW_REMOVE:
      return state.set('rows', state.get('rows').delete(action.value));
    case BROWSER_STORAGE_SYNC_TRY:
      return state.set('synced_loading', true);
    case BROWSER_STORAGE_SYNC_SUCCESS:
      return state.set('synced', true).set('synced_loading', false);
    case BROWSER_STORAGE_SYNC_FAILED:
      return state.set('synced', false).set('synced_loading', false).set('synced_error', action.value.toString().trim());
    case BROWSER_STORAGE_CLEAR:
      return state.set('rows', state.get('rows').clear());
    case MODE:
      return state.set('mode', action.value.toString());
    case OPEN_TOGGLE:
      return state.set('open', Boolean(action.value));
    case RESET:
      return initialState.set('open', state.get('open'));
    case DIALOG_TOGGLE:
      return state.set('dialog_open', Boolean(action.value));
    default:
      return state;
  }
}

// Action Creators

function dialogToggle({value}) {
  return {type: DIALOG_TOGGLE, value};
}
function rowAdd({value}) {
  return {type: ROW_ADD, value};
}
function openToggle({value}) {
  return {type: OPEN_TOGGLE, value};
}
function rowRemove({value}) {
  return {type: ROW_REMOVE, value};
}
function browserStorageSyncTry() {
  return {type: BROWSER_STORAGE_SYNC_TRY};
}
function browserStorageSyncSuccess() {
  return {type: BROWSER_STORAGE_SYNC_SUCCESS};
}
function browserStorageSyncFailed({value}) {
  return {type: BROWSER_STORAGE_SYNC_FAILED, value};
}
function browserStorageClear() {
  return {type: BROWSER_STORAGE_CLEAR};
}
function modeSet({value}) {
  return {type: MODE, value};
}
function reset() {
  return {type: RESET};
}

// Selectors

const data_export = (state) => state[NAME];

export const selector = createStructuredSelector({
  data_export
});

export const actionCreators = {
  dialogToggle,
  openToggle,
  rowAdd,
  rowRemove,
  browserStorageSyncTry,
  browserStorageSyncSuccess,
  browserStorageSyncFailed,
  browserStorageClear,
  modeSet,
  reset,
};

export const actionTypes = {
  DIALOG_TOGGLE,
  ROW_ADD,
  ROW_REMOVE,
  BROWSER_STORAGE_SYNC_TRY,
  BROWSER_STORAGE_SYNC_SUCCESS,
  BROWSER_STORAGE_SYNC_FAILED,
  BROWSER_STORAGE_CLEAR,
  MODE,
  RESET,
  OPEN_TOGGLE,
};
