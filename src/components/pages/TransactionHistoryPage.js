/* eslint-disable class-methods-use-this */

import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import 'antd/lib/table/style';
import '../../styles/TransactionHistory.css';
import LoadingPage from '../LoadingPage';
import GetColumns from '../../constants/transactions';

class TransactionHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      itemsPerPage: 10,
      sortedInfo: {
        order: 'descend',
        columnKey: 'date',
      },
      filteredInfo: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getStatusImage(status, text) {
    let className = '';

    switch (status) {
      case 'Confirmed':
        className = 'Transactions__status--is-confirmed';
        break;
      case 'Pending':
        className = 'Transactions__status--is-pending';
        break;
      default:
        className = 'Transactions__status--is-error';
        break;
    }
    return (
      <div>
        <span className={className} />{text}
      </div>
    );
  }

  handleChange(pagination, filters, sorter) {
    this.setState({
      sortedInfo: sorter,
      filteredInfo: filters,
    });
  }

  render() {
    const { loading, transactions } = this.props;

    if (loading.transactionHistory) {
      return <LoadingPage message="Loading transactions" />;
    }

    const {
      itemsPerPage, sortedInfo, filteredInfo,
    } = this.state;

    const columns = GetColumns(sortedInfo, filteredInfo, this.getStatusImage);

    return (
      <div className="Transactions">
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ pageSize: itemsPerPage }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

TransactionHistoryPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionHistoryPage;
