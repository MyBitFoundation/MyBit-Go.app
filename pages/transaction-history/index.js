/* eslint-disable class-methods-use-this */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'antd';
import Loading from 'components/Loading';
import { withBlockchainContext } from 'components/Blockchain'
import GetColumns from 'constants/transactions';
import StyledTransactionsPage from './styledTransactionsPage';
import StyledTransactionsPageStatusIcon from './styledTransactionsPageStatusIcon';

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
        <StyledTransactionsPageStatusIcon status={status} />
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
      <StyledTransactionsPage>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ pageSize: itemsPerPage }}
          onChange={this.handleChange}
        />
      </StyledTransactionsPage>
    );
  }
}

TransactionHistoryPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withBlockchainContext(TransactionHistoryPage);
