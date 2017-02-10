import React, {Component, PropTypes} from 'react';
import DataExportEmpty from './empty';
import DataExportContent from './content';
import {Dialog} from "@blueprintjs/core";

export default class DataExportLayout extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data_export: PropTypes.object.isRequired,
  };

  render() {

    console.warn('#jskdfdjskf render DataExportLayout');
    console.log('DataExportLayout props: #mfkds ', this.props);

    const {actions, data_export} = this.props;

    const styles = this.getStyles();

    const content = data_export.get('rows').size === 0 ?
      <DataExportEmpty /> : <DataExportContent rows={data_export.get('rows')} mode={data_export.get('mode')}/>;

    return (
      <div className="pt-card pt-elevation-4" style={styles.container}>
        <div style={styles.title} onClick={() => actions.openToggle({value: !data_export.get('open')})}>
          <span style={{opacity: 0.6, cursor: 'inherit', marginLeft: 6}}>
            Data export <span className="t-muted">({data_export.get('rows').size}/500 domains)</span>
          </span>
          <button
            className="pt-button pt-minimal"
            style={{color: 'inherit', cursor: 'inherit'}}
          >
            <span className="pt-icon-standard pt-icon-chevron-down" style={styles.icon}></span>
          </button>
        </div>
        <div style={styles.body}>
          <div style={styles.content}>{content}</div>
          <div className="pt-card pt-elevation-0" style={styles.footer}>
            <div>
              <div className="pt-button-group" style={{marginLeft: 6}}>
                <button
                  className={`pt-button ${data_export.get('mode') === 'csv' ? 'pt-active' : ''}`}
                  role="button"
                  onClick={() =>  actions.modeSet({value: 'csv'})}
                >
                  CSV
                </button>
                <button
                  className={`pt-button ${data_export.get('mode') === 'json' ? 'pt-active' : ''}`}
                  role="button"
                  onClick={() =>  actions.modeSet({value: 'json'})}
                >
                  JSON
                </button>
              </div>
              <button
                type="button"
                style={{margin: '0 3px'}}
                className="pt-button pt-minimal pt-icon-help"
                onClick={() => actions.dialogToggle({value: !data_export.get('dialog_open')})}
              />
            </div>

            <button
              className="pt-button pt-minimal pt-icon-trash pt-intent-danger"
              role="button"
              disabled={data_export.get('rows').size === 0}
              onClick={() =>  actions.reset()}
            >
              Clear
            </button>
          </div>
        </div>

        <Dialog
          style={{width: '90%', maxWidth: 550}}
          title={'Data export'}
          lazy={true}
          isOpen={data_export.get('dialog_open')}
          onClose={() => actions.dialogToggle({value: false})}
        >
          <div className="pt-dialog-body">
            <p>
              You can easily export up to 500 domains in one go. You can repeat and export as many domains as needed.
            </p>
            <h6 style={{margin: '12px 0 6px'}}>How use CSV?</h6>
            <p>
              Files in the CSV format can be imported to and exported from programs that store data in tables, such as
              Microsoft Excel, OpenOffice Calc or LibreOffice Calc. CSV stands for "comma-separated values".
            </p>
            <p>
              If you don't have any software which works with CSV, try
              out <a href="http://www.libreoffice.org/download/download/" target="_blank">LibreOffice</a>.
              It's free and we tried it.

              <ol>
                <li>Open LibreOffice and create new "Calc Spreadsheet"</li>
                <li>Paste CSV copied from GeekyStats.com. "Text Import" will open.</li>
                <li>Under "Separator options" uncheck Tab, check Comma and preview will update. Click OK.</li>
                <li>Continue working with LibreOffice or save file in your preferred format via "File -> Save As"</li>
              </ol>
            </p>
            <h6 style={{margin: '12px 0 6px'}}>How use JSON?</h6>
            <p>
              If you use some web-based software you probably can import data with JSON format.
              If building a custom solution, ask your developers, they might prefer JSON over other formats.
            </p>
            <h6 style={{margin: '12px 0 6px'}}>Help</h6>
            <p>If help is needed, please contact us at mbgerbora@gmail.com</p>
          </div>
        </Dialog>

      </div>
    );
  }

  getStyles() {
    const {data_export} = this.props;
    return {
      container: {
        width: 300,
        height: data_export.get('open') ? 300 : 40,
        transition: 'height 350ms ease-in-out',
        bottom: 0,
        left: 10,
        position: 'fixed',
        zIndex: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: 0,
      },
      title: {
        borderRadius: 'inherit',
        padding: 6,
        width: 300,
        height: 42,
        backgroundColor: data_export.get('rows').size > 0 ? '#ffc940' : '#ccc',
        transition: 'background-color 350ms ease-in-out',
        color: '#10161a',
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
      },
      icon: {
        margin: 0,
        opacity: 0.4,
        transition: 'all 350ms ease-in-out',
        transform: data_export.get('open') ? 'rotate(0deg)' : 'rotate(180deg)',
        cursor: 'inherit',
      },
      content: {
        height: 216,
        overflow: 'hidden',
      },
      footer: {
        padding: 6,
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }
    };
  }
}
