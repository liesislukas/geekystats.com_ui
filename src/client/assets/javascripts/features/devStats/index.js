import React, {Component, PropTypes} from 'react';

export default class DevStats extends Component {
  state = {dom_elements_count: '', toggle: true};
  intervals = [];

  componentDidMount() {
    this.intervals.push(
      setInterval(() => {
        this.setState({
          dom_elements_count: document.getElementsByTagName('*').length,
          toggle: !this.state.toggle,
        });
      }, 1000)
    );
  }

  componentWillUnmount() {
    this.intervals.forEach(interval => {
      clearInterval(interval);
    });
  }

  render() {

    const color_toggle_1 = this.state.dom_elements_count < 500 ? '#0f0' : '#f00';
    const color_toggle_2 = this.state.dom_elements_count < 500 ? '#0c0' : '#c00';

    return (
      <div
        style={{
          position: 'fixed',
          left: 0,
          padding: '12px 12px 24px',
          backgroundColor: 'black',
          zIndex: 999999999999,
          bottom: 0,
        }}
      >
        <span
          style={{
            color: this.state.toggle ? color_toggle_1:color_toggle_2,
          }}
        >
          DOM size: {this.state.dom_elements_count}
        </span>
      </div>
    );
  }
}
