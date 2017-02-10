import {createStructuredSelector} from 'reselect';
const Immutable = require('immutable');

// Action Types

// let store = {
//   browser: {
//     filters: {
//       keywords: ['one', 'two'],
//       optimization_scores: ['one', 'two'],
//       countries: ['one', 'two'],
//       only_with_email: false,
//       only_with_phone: false,
//       only_with_screenshot: false,
//       alexa_on: false,
//       alexa_unknown_on: false,
//       word_count_on: false,
//       word_count_unknown_on: false,
//       alexa_from: 0,
//       alexa_to: 1000000,
//       word_count_from: 0,
//       word_count_to: 1000,
//     },
//     rows: {
//       loading: true,
//       error: '',
//       data: {
//         123: {
//           id: 123,
//           domain: 'example.com',
//           screenshot: 'https://static-host.com/img.jpg',
//           contacts: [
//             {type: 'email', value: 'hey@gmail.com'},
//             {type: 'phone', value: '+370 654 77963'},
//           ],
//           optimization: 24,
//           alexa: 495305,
//           word_count: 355,
//         },
//       },
//     },
//     meta: {
//       page: 3,
//       per_page: 10,
//       total: 3495,
//     }
//   },
//   csv: {
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
//     mode: 'table', // table | plain text
//   }
// };

const FILTERS_KEYWORDS_ADD = 'browser/FILTERS_KEYWORDS_ADD';
const FILTERS_KEYWORDS_REMOVE = 'browser/FILTERS_KEYWORDS_REMOVE';
const FILTERS_OPTIMIZATION_SCORES_ADD = 'browser/FILTERS_OPTIMIZATION_SCORES_ADD';
const FILTERS_OPTIMIZATION_SCORES_REMOVE = 'browser/FILTERS_OPTIMIZATION_SCORES_REMOVE';
const FILTERS_COUNTRIES_ADD = 'browser/FILTERS_COUNTRIES_ADD';
const FILTERS_COUNTRIES_REMOVE = 'browser/FILTERS_COUNTRIES_REMOVE';
const FILTERS_ONLY_WITH_EMAIL_TOGGLE = 'browser/FILTERS_ONLY_WITH_EMAIL_TOGGLE';
const FILTERS_ONLY_WITH_PHONE_TOGGLE = 'browser/FILTERS_ONLY_WITH_PHONE_TOGGLE';
const FILTERS_ONLY_WITH_SCREENSHOT_TOGGLE = 'browser/FILTERS_ONLY_WITH_SCREENSHOT_TOGGLE';
const FILTERS_ALEXA_TOGGLE = 'browser/FILTERS_ALEXA_TOGGLE';
const FILTERS_ALEXA_UNKNOWN_TOGGLE = 'browser/FILTERS_ALEXA_UNKNOWN_TOGGLE';
const FILTERS_WORD_COUNT_TOGGLE = 'browser/FILTERS_WORD_COUNT_TOGGLE';
const FILTERS_WORD_COUNT_UNKNOWN_TOGGLE = 'browser/FILTERS_WORD_COUNT_UNKNOWN_TOGGLE';
const FILTERS_SET_ALEXA_FROM = 'browser/FILTERS_SET_ALEXA_FROM';
const FILTERS_SET_ALEXA_TO = 'browser/FILTERS_SET_ALEXA_TO';
const FILTERS_SET_WORD_COUNT_FROM = 'browser/FILTERS_SET_WORD_COUNT_FROM';
const FILTERS_SET_WORD_COUNT_TO = 'browser/FILTERS_SET_WORD_COUNT_TO';
const FILTERS_RESET = 'browser/FILTERS_RESET';

const ROWS_LOADING_TOGGLE = 'browser/ROWS_LOADING_TOGGLE';
const ROWS_ERROR_SET = 'browser/ROWS_ERROR_SET';
const ROWS_DATA_SET = 'browser/ROWS_DATA_SET';

const META_PAGE_SET = 'browser/META_PAGE_SET';
const META_TOTAL_SET = 'browser/META_TOTAL_SET';

// This will be used in our root reducer and selectors
export const NAME = 'browser';

const initialState = Immutable.Map({
  filters: Immutable.Map(
    {
      keywords: Immutable.Set(),
      optimization_scores: Immutable.Set(),
      countries: Immutable.Set(),
      only_with_email: false,
      only_with_phone: false,
      only_with_screenshot: false,
      alexa_on: false,
      alexa_unknown_on: false,
      word_count_on: false,
      word_count_unknown_on: false,
      alexa_from: 0,
      alexa_to: 1000000,
      word_count_from: 0,
      word_count_to: 1500,
    }
  ),
  rows: Immutable.Map({
    loading: false,
    error: 'Not loaded!',
    data: Immutable.List(),
  }),
  meta: Immutable.Map({
    page: 1,
    total: 0,
  })
});

let tmp;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FILTERS_KEYWORDS_ADD:
      tmp = state.getIn(['filters', 'keywords']).add(action.value.toString());
      return state.setIn(['filters', 'keywords'], tmp);
    case FILTERS_KEYWORDS_REMOVE:
      tmp = state.getIn(['filters', 'keywords']).delete(action.value.toString());
      return state.setIn(['filters', 'keywords'], tmp);
    case FILTERS_OPTIMIZATION_SCORES_ADD:
      tmp = state.getIn(['filters', 'optimization_scores']).add(action.value.toString());
      return state.setIn(['filters', 'optimization_scores'], tmp);
    case FILTERS_OPTIMIZATION_SCORES_REMOVE:
      tmp = state.getIn(['filters', 'optimization_scores']).delete(action.value.toString());
      return state.setIn(['filters', 'optimization_scores'], tmp);
    case FILTERS_COUNTRIES_ADD:
      tmp = state.getIn(['filters', 'countries']).add(action.value.toString());
      return state.setIn(['filters', 'countries'], tmp);
    case FILTERS_COUNTRIES_REMOVE:
      tmp = state.getIn(['filters', 'countries']).delete(action.value.toString());
      return state.setIn(['filters', 'countries'], tmp);
    case FILTERS_ONLY_WITH_EMAIL_TOGGLE:
      return state.setIn(['filters', 'only_with_email'], Boolean(action.value));
    case FILTERS_ONLY_WITH_PHONE_TOGGLE:
      return state.setIn(['filters', 'only_with_phone'], Boolean(action.value));
    case FILTERS_ONLY_WITH_SCREENSHOT_TOGGLE:
      return state.setIn(['filters', 'only_with_screenshot'], Boolean(action.value));
    case FILTERS_ALEXA_TOGGLE:
      return state.setIn(['filters', 'alexa_on'], Boolean(action.value));
    case FILTERS_ALEXA_UNKNOWN_TOGGLE:
      return state.setIn(['filters', 'alexa_unknown_on'], Boolean(action.value));
    case FILTERS_WORD_COUNT_TOGGLE:
      return state.setIn(['filters', 'word_count_on'], Boolean(action.value));
    case FILTERS_WORD_COUNT_UNKNOWN_TOGGLE:
      return state.setIn(['filters', 'word_count_unknown_on'], Boolean(action.value));
    case FILTERS_SET_ALEXA_FROM:
      return state.setIn(['filters', 'alexa_from'], parseInt(action.value));
    case FILTERS_SET_ALEXA_TO:
      return state.setIn(['filters', 'alexa_to'], parseInt(action.value));
    case FILTERS_SET_WORD_COUNT_FROM:
      return state.setIn(['filters', 'word_count_from'], parseInt(action.value));
    case FILTERS_SET_WORD_COUNT_TO:
      return state.setIn(['filters', 'word_count_to'], parseInt(action.value));
    case FILTERS_RESET:
      return state.set('filters', initialState.get('filters'));
    case ROWS_LOADING_TOGGLE:
      return state.setIn(['rows', 'loading'], Boolean(action.value));
    case ROWS_ERROR_SET:
      return state.setIn(['rows', 'error'], action.value.toString());
    case ROWS_DATA_SET:
      return state.setIn(['rows', 'data'], Immutable.fromJS(action.value));
    case META_PAGE_SET:
      let new_page = parseInt(action.value) || 1;
      if (new_page < 1) {
        new_page = 1;
      }
      return state.setIn(['meta', 'page'], new_page);
    case META_TOTAL_SET:
      return state.setIn(['meta', 'total'], parseInt(action.value));
    default:
      return state;
  }
}

// Action Creators

function filtersKeywordsAdd({value}) {
  return {type: FILTERS_KEYWORDS_ADD, value};
}
function filtersKeywordsRemove({value}) {
  return {type: FILTERS_KEYWORDS_REMOVE, value};
}
function filtersOptimizationScoresAdd({value}) {
  return {type: FILTERS_OPTIMIZATION_SCORES_ADD, value};
}
function filtersOptimizationScoresRemove({value}) {
  return {type: FILTERS_OPTIMIZATION_SCORES_REMOVE, value};
}
function filtersCountriesAdd({value}) {
  return {type: FILTERS_COUNTRIES_ADD, value};
}
function filtersCountriesRemove({value}) {
  return {type: FILTERS_COUNTRIES_REMOVE, value};
}
function filtersOnlyWithEmailToggle({value}) {
  return {type: FILTERS_ONLY_WITH_EMAIL_TOGGLE, value};
}
function filtersOnlyWithPhoneToggle({value}) {
  return {type: FILTERS_ONLY_WITH_PHONE_TOGGLE, value};
}
function filtersOnlyWithScreenshotToggle({value}) {
  return {type: FILTERS_ONLY_WITH_SCREENSHOT_TOGGLE, value};
}
function filtersAlexaToggle({value}) {
  return {type: FILTERS_ALEXA_TOGGLE, value};
}
function filtersAlexaUnknownToggle({value}) {
  return {type: FILTERS_ALEXA_UNKNOWN_TOGGLE, value};
}
function filtersWordCountToggle({value}) {
  return {type: FILTERS_WORD_COUNT_TOGGLE, value};
}
function filtersWordCountUnknownToggle({value}) {
  return {type: FILTERS_WORD_COUNT_UNKNOWN_TOGGLE, value};
}
function filtersSetAlexaFrom({value}) {
  return {type: FILTERS_SET_ALEXA_FROM, value};
}
function filtersSetAlexaTo({value}) {
  return {type: FILTERS_SET_ALEXA_TO, value};
}
function filtersSetWordCountFrom({value}) {
  return {type: FILTERS_SET_WORD_COUNT_FROM, value};
}
function filtersSetWordCountTo({value}) {
  return {type: FILTERS_SET_WORD_COUNT_TO, value};
}
function filtersReset() {
  return {type: FILTERS_RESET};
}
function rowsLoadingToggle({value}) {
  return {type: ROWS_LOADING_TOGGLE, value};
}
function rowsErrorSet({value}) {
  return {type: ROWS_ERROR_SET, value};
}
function rowsDataSet({value}) {
  return {type: ROWS_DATA_SET, value};
}
function metaPageSet({value}) {
  return {type: META_PAGE_SET, value};
}
function metaTotalSet({value}) {
  return {type: META_TOTAL_SET, value};
}

// Selectors

const browser = (state) => state[NAME];

export const selector = createStructuredSelector({
  browser
});

export const actionCreators = {
  filtersKeywordsAdd,
  filtersKeywordsRemove,
  filtersOptimizationScoresAdd,
  filtersOptimizationScoresRemove,
  filtersCountriesAdd,
  filtersCountriesRemove,
  filtersOnlyWithEmailToggle,
  filtersOnlyWithPhoneToggle,
  filtersOnlyWithScreenshotToggle,
  filtersAlexaToggle,
  filtersAlexaUnknownToggle,
  filtersWordCountToggle,
  filtersWordCountUnknownToggle,
  filtersSetAlexaFrom,
  filtersSetAlexaTo,
  filtersSetWordCountFrom,
  filtersSetWordCountTo,
  filtersReset,
  rowsLoadingToggle,
  rowsErrorSet,
  rowsDataSet,
  metaPageSet,
  metaTotalSet,
};

export const actionTypes = {
  FILTERS_KEYWORDS_ADD,
  FILTERS_KEYWORDS_REMOVE,
  FILTERS_OPTIMIZATION_SCORES_ADD,
  FILTERS_OPTIMIZATION_SCORES_REMOVE,
  FILTERS_COUNTRIES_ADD,
  FILTERS_COUNTRIES_REMOVE,
  FILTERS_ONLY_WITH_EMAIL_TOGGLE,
  FILTERS_ONLY_WITH_PHONE_TOGGLE,
  FILTERS_ONLY_WITH_SCREENSHOT_TOGGLE,
  FILTERS_ALEXA_TOGGLE,
  FILTERS_ALEXA_UNKNOWN_TOGGLE,
  FILTERS_WORD_COUNT_TOGGLE,
  FILTERS_WORD_COUNT_UNKNOWN_TOGGLE,
  FILTERS_SET_ALEXA_FROM,
  FILTERS_SET_ALEXA_TO,
  FILTERS_SET_WORD_COUNT_FROM,
  FILTERS_SET_WORD_COUNT_TO,
  FILTERS_RESET,
  ROWS_LOADING_TOGGLE,
  ROWS_ERROR_SET,
  ROWS_DATA_SET,
  META_PAGE_SET,
  META_TOTAL_SET,
};
