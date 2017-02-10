import React, {Component, PropTypes} from 'react';
import {Button, RangeSlider, Switch, Control, Tooltip, Dialog, ProgressBar} from '@blueprintjs/core';
import Table from './table';
import Filters from './filters';
import Pagination from './pagination';
import SelectedFilters from './selectedFilters';

export default class BrowserLayout extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    dataExportActions: PropTypes.object.isRequired,
    browser: PropTypes.object.isRequired,
    data_export: PropTypes.object.isRequired,
  };

  render() {

    console.warn('#jskdfdjskf render BrowserLayout');

    console.log('BrowserLayout props: #mfkds ', this.props);

    const {actions, browser} = this.props;

    const selected_filters_count = browser.getIn(['filters', 'keywords']).size +
      browser.getIn(['filters', 'optimization_scores']).size +
      browser.getIn(['filters', 'countries']).size;

    const selected_filters = selected_filters_count > 0 ? this.getSelectedFilters() : null;

    return (
      <div style={{maxWidth: 1076, margin: '0 auto', padding: 12, width: '100%'}}>
        <div className="pt-card">
          <Filters
            filters={browser.get('filters')}
            actions={actions}
          />
        </div>
        {selected_filters}
        <div style={{margin: 6}}>
          <div
            style={{
              opacity: browser.getIn(['rows', 'loading']) ? 1:0,
              transition: 'opacity 350ms ease-in-out',
            }}
          >
            <ProgressBar style={{borderRadius: 0}}/>
          </div>
        </div>
        <div className="pt-card">
          <Table
            {...this.props}
          />
          <div style={{display: 'flex', margin: '24px 0 0 0', justifyContent: 'flex-end'}}>
            <Pagination
              current_page={browser.getIn(['meta','page'])}
              total_items={browser.getIn(['meta','total'])}
              handleNext={() => actions.metaPageSet({value: browser.getIn(['meta','page']) + 1})}
              handlePrev={() => actions.metaPageSet({value: browser.getIn(['meta','page']) - 1})}
            />
          </div>
        </div>

      </div>
    );
  }

  getSelectedFilters() {
    const {actions, browser} = this.props;
    return (
      <div className="pt-card" style={{margin: '6px 0'}}>
        Selected filters:
        <SelectedFilters
          keywords={browser.getIn(['filters','keywords'])}
          optimization_scores={browser.getIn(['filters','optimization_scores'])}
          countries={browser.getIn(['filters','countries'])}
          actions={actions}
        />
      </div>
    );
  }
}
