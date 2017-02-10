import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog} from '@blueprintjs/core';
import FilterCountry from './Country';
import FilterAlexa from './Alexa';
import FilterWordCount from './WordCount';
import FilterOnlyEmail from './OnlyEmail';
import FilterOnlyPhone from './OnlyPhone';
import FilterOnlyScreenShot from './OnlyScreenShot';
import FilterKeyword from './Keyword';
import FilterOptimizationScore from './OptimizationScore';
const numeral = require('numeral');
const Immutable = require('immutable');

export default class Filters extends Component {

  static propTypes = {
    filters: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !Immutable.is(nextProps.filters, this.props.filters);
  }

  render() {
    const styles = this.getStyles();

    console.warn('#skfksdjdf render: Filters');
    // console.log('#jfksdj props of filters: ', this.props);

    return (
      <div style={styles.container}>

        <div style={{width: 240, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 12}}>
          <div style={styles.filter_box}>
            <FilterKeyword
              handleSubmit={value => this.props.actions.filtersKeywordsAdd({value})}
            />
          </div>
          <div style={styles.filter_box}>
            <FilterOptimizationScore
              optimization_scores={this.props.filters.get('optimization_scores')}
              handleAdd={value => this.props.actions.filtersOptimizationScoresAdd({value})}
              handleRemove={value => this.props.actions.filtersOptimizationScoresRemove({value})}
            />
          </div>
          <div style={styles.filter_box}>
            <FilterCountry
              countries={this.props.filters.get('countries')}
              handleAdd={value => this.props.actions.filtersCountriesAdd({value})}
              handleRemove={value => this.props.actions.filtersCountriesRemove({value})}
            />
          </div>
        </div>

        <div style={{width: 210, margin: '0 24px', display: 'flex', flexWrap: 'wrap'}}>
          <div style={styles.filter_box}>
            <FilterOnlyEmail
              isOn={this.props.filters.get('only_with_email')}
              handleChange={
                () => this.props.actions.filtersOnlyWithEmailToggle({value: !this.props.filters.get('only_with_email')})
              }
            />
          </div>

          <div style={styles.filter_box}>
            <FilterOnlyPhone
              isOn={this.props.filters.get('only_with_phone')}
              handleChange={
                () => this.props.actions.filtersOnlyWithPhoneToggle({value: !this.props.filters.get('only_with_phone')})
              }
            />
          </div>

          <div style={styles.filter_box}>
            <FilterOnlyScreenShot
              isOn={this.props.filters.get('only_with_screenshot')}
              handleChange={
                () => this.props.actions.filtersOnlyWithScreenshotToggle({value: !this.props.filters.get('only_with_screenshot')})
              }
            />
          </div>
        </div>

        <div style={{width: 480, display: 'flex', flexWrap: 'wrap', marginBottom: 12}}>
          <div style={styles.filter_box}>
            <FilterAlexa
              isOn={this.props.filters.get('alexa_on')}
              isOnUnknown={this.props.filters.get('alexa_unknown_on')}
              alexaFrom={this.props.filters.get('alexa_from')}
              alexaTo={this.props.filters.get('alexa_to')}
              handleToggleOn={() => this.props.actions.filtersAlexaToggle({value: !this.props.filters.get('alexa_on')})}
              handleToggleUnknown={() => this.props.actions.filtersAlexaUnknownToggle({value: !this.props.filters.get('alexa_unknown_on')})}
              handleAlexaFromChange={value => this.props.actions.filtersSetAlexaFrom({value})}
              handleAlexaToChange={value => this.props.actions.filtersSetAlexaTo({value})}
            />
          </div>
          <div style={{margin: 12}}></div>
          <div style={styles.filter_box}>
            <FilterWordCount
              isOn={this.props.filters.get('word_count_on')}
              isOnUnknown={this.props.filters.get('word_count_unknown_on')}
              wordCountFrom={this.props.filters.get('word_count_from')}
              wordCountTo={this.props.filters.get('word_count_to')}
              handleToggleOn={() => this.props.actions.filtersWordCountToggle({value: !this.props.filters.get('word_count_on')})}
              handleToggleUnknown={() => this.props.actions.filtersWordCountUnknownToggle({value: !this.props.filters.get('word_count_unknown_on')})}
              handleWordCountFromChange={value => this.props.actions.filtersSetWordCountFrom({value})}
              handleWordCountToChange={value => this.props.actions.filtersSetWordCountTo({value})}
            />
          </div>
        </div>

      </div>
    );
  }

  getStyles() {
    return {
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '24px auto',
        padding: '0 12px',
        maxWidth: 1100,
        width: '100%',
      },
      filter_box: {
        margin: 12,
      }
    }
  }
}
