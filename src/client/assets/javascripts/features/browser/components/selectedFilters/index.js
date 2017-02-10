import React, {Component, PropTypes} from 'react';
import Tag from './../tag';
import {config} from './../../../../../../../../../../config/config';
const Immutable = require('immutable');

export default class SelectedFilters extends Component {

  static propTypes = {
    keywords: PropTypes.object,
    optimization_scores: PropTypes.object,
    countries: PropTypes.object,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !Immutable.is(nextProps.keywords, this.props.keywords)
      || !Immutable.is(nextProps.optimization_scores, this.props.optimization_scores)
      || !Immutable.is(nextProps.countries, this.props.countries)
    );
  }

  render() {

    console.warn('#skfksdjdf render: SelectedFilters');
    let {keywords, optimization_scores, countries, actions} = this.props;

    const tags = {
      keywords: [],
      optimization_scores: [],
      countries: [],
    };


    let n = 0;
    if (keywords.size > 0) {
      keywords.forEach(keyword => {
        tags.keywords.push(
          <Tag
            key={++n}
            type={'keyword'}
            value={keyword}
            handleRemove={() => actions.filtersKeywordsRemove({value: keyword})}
          />
        );
      });
    }
    if (optimization_scores.size > 0) {

      const visual_values = {
        "95": 'Optimization score 95 and more',
        "60": 'Optimization score 60 - 95',
        "25": 'Optimization score 25 - 60',
        "0": 'Optimization score less then 25',
        "-1": 'Optimization score not available',
      };

      optimization_scores.forEach(optimization_score => {
        tags.optimization_scores.push(
          <Tag
            key={++n}
            value={visual_values[optimization_score]}
            handleRemove={() => actions.filtersOptimizationScoresRemove({value: optimization_score})}
          />
        );
      });
    }
    if (countries.size > 0) {

      let countries_names = {};
      config.countries.forEach(country => {
        countries_names[country.iso] = country.name;
      });

      countries.forEach(country => {
        tags.countries.push(
          <Tag
            key={++n}
            type={'country'}
            country_code={country}
            value={countries_names[country]}
            handleRemove={() => actions.filtersCountriesRemove({value: country})}
          />
        );
      });
    }

    return (
      <div style={{display: 'inline'}}>
        {tags.keywords}
        {tags.optimization_scores}
        {tags.countries}
      </div>
    );
  }
}
