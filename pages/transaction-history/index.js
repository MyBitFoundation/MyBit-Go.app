/* eslint-disable class-methods-use-this */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'antd';
import Loading from 'components/Loading';
import { withBlockchainContext } from 'components/BlockchainContext'
import { withMetamaskErrors } from 'components/MetamaskErrors';
import GetColumns from 'constants/transactions';
import TransactionsPageWrapper from 'components/transaction-history/transactionsPageWrapper';
import TransactionsPageStatusIcon from 'components/transaction-history/transactionsPageStatusIcon';
import ErrorPage from 'components/ErrorPage';

class TransactionHistoryPage extends React.Component {
  state = {
    itemsPerPage: 10,
    sortedInfo: {
      order: 'descend',
      columnKey: 'date',
    },
    filteredInfo: {},
  };

  getStatusImage = (status, text) => {
    return (
      <div>
        <TransactionsPageStatusIcon status={status} />
        {text}
      </div>
    );
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
      filteredInfo: filters,
    });
  }

  render() {
    const {
      blockchainContext,
    } = this.props;

    const {
      loading,
      transactions,
    } = blockchainContext;

    if (loading.transactionHistory) {
      return <Loading message="Loading transactions" />;
    }

    const {
      itemsPerPage,
      sortedInfo,
      filteredInfo,
    } = this.state;

    const columns = GetColumns(sortedInfo, filteredInfo, this.getStatusImage);

    return (
      <TransactionsPageWrapper>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ pageSize: itemsPerPage }}
          onChange={this.handleChange}
        />
      </TransactionsPageWrapper>
    );
  }
}

export default withMetamaskErrors(withBlockchainContext(TransactionHistoryPage), false);;
