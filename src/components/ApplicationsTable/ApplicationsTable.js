import React from 'react';
import Table from '@mulesoft/anypoint-components/lib/Table';
import styles from './styles.scss';

class ApplicationsTable extends React.PureComponent {
  static getHeaders() {
    return [
      { key: 'id', label: 'Name' },
      { key: 'type', label: 'Server' },
      { key: 'lastReportedStatus', label: 'Status' },
      { key: 'fileName', label: 'File' },
    ];
  }

  static getRows(applications) {
    return applications.map(item => (
      {
        id: item.id,
        type: item.target ? item.target.type : '',
        lastReportedStatus: item.lastReportedStatus,
        fileName: item.artifact && item.artifact.fileName !== 'null' ? item.artifact.fileName : '',
      }
    ));
  }

  constructor(props) {
    super(props);
    this.state = { applications: [] };
  }

  renderApplicationsTable() {
    const { applications } = this.props;

    if (!applications || !applications.length) {
      return (<h4>No data to show</h4>);
    }

    return (
      <Table
        headers={ApplicationsTable.getHeaders()}
        rows={ApplicationsTable.getRows(applications)}
      />
    );
  }

  render() {
    return (
      <div className={styles.applicationsTable}>
        { this.renderApplicationsTable() }
      </div>
    );
  }
}

export default ApplicationsTable;
