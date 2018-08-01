/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableData, PaginationV2 } from 'carbon-components-react';
import '../../styles/TransactionHistory.css';
import LoadingPage from './LoadingPage';
import OverflowMenuCustom from '../OverflowMenuCustom';

class TransactionHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      currentPage: 0,
      itemsPerPage: 10,
      sortBy: 'date',
      sortDir: 'ASC',
    };
  }

  render() {
    const { loading } = this.props;

    if (loading.transactionHistory) {
      return (
        <LoadingPage
          message="Loading transactions"
        />
      );
    }
    const { transactions } = this.props;
    let transactionsToRender = transactions.slice();
    const {
      currentPage, itemsPerPage, sortBy, sortDir,
    } = this.state;

    if (sortBy === 'amount' && sortDir === 'DESC') {
      transactionsToRender = transactionsToRender.sort((a, b) => a.amount - b.amount);
    } else if (sortBy === 'amount' && sortDir === 'ASC') {
      transactionsToRender = transactionsToRender.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'date' && sortDir === 'DESC') {
      transactionsToRender =
        transactionsToRender.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'date' && sortDir === 'ASC') {
      transactionsToRender =
        transactionsToRender.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'status' && sortDir === 'DESC') {
      transactionsToRender =
        transactionsToRender.sort((a, b) => {
          if (a.status > b.status) {
            return -1;
          }
          if (a.status < b.status) {
            return 1;
          }
          return 0;
        });
    } else if (sortBy === 'status' && sortDir === 'ASC') {
      transactionsToRender =
        transactionsToRender.sort((a, b) => {
          if (a.status < b.status) {
            return -1;
          }
          if (a.status > b.status) {
            return 1;
          }
          return 0;
        });
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = (currentPage + 1) * itemsPerPage;
    transactionsToRender = transactionsToRender.splice(startIndex, endIndex);

    return (
      <div>
        <div className="Transactions">
          <div className="Transactions__history">
            <b className="Transactions__table-name">Transaction History</b>
            <Table className="Transactions__history-table">
              <TableHead className="Transactions__history-table-header">
                <TableRow header>
                  <TableHeader
                    className={sortBy === 'date' ? '' : 'Transactions__history-column-header'}
                    onClick={() => {
                      this.setState({
                        itemsPerPage,
                        currentPage,
                        sortBy: 'date',
                        sortDir: sortDir === 'ASC' ? 'DESC' : 'ASC',
                      });
                    }}
                    sortDir={sortBy === 'date' ? sortDir : 'ASC'}
                  >
                    Date
                  </TableHeader>
                  <TableHeader
                    className={sortBy === 'amount' ? '' : 'Transactions__history-column-header'}
                    onClick={() => {
                      this.setState({
                        itemsPerPage,
                        currentPage,
                        sortBy: 'amount',
                        sortDir: sortDir === 'ASC' ? 'DESC' : 'ASC',
                      });
                    }}
                    sortDir={sortBy === 'amount' ? sortDir : 'ASC'}
                  >
                    Amount
                  </TableHeader>
                  <TableHeader
                    className={sortBy === 'status' ? '' : 'Transactions__history-column-header'}
                    onClick={() => {
                      this.setState({
                        itemsPerPage,
                        currentPage,
                        sortBy: 'status',
                        sortDir: sortDir === 'ASC' ? 'DESC' : 'ASC',
                      });
                    }}
                    sortDir={sortBy === 'status' ? sortDir : 'ASC'}
                  >
                    Status
                  </TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionsToRender.map((transaction, index) => (
                  <TableRow key={transaction.txId} even={index % 2 !== 0}>
                    <TableData>
                      {dayjs(transaction.date).format('MMMM D, YYYY, HH:mm')}
                    </TableData>
                    <TableData>
                      {transaction.amount} <b>{transaction.type}</b>
                    </TableData>
                    <TableData style={{ display: 'flex', alignItems: 'center' }}>
                      {transaction.status}
                      <OverflowMenuCustom url={transaction.type === 'ETH' ? `https://ropsten.etherscan.io/tx/${transaction.txId}` : `https://ropsten.etherscan.io/token/0x40fff37c1e5f48cee320bed447329a93f6d015c0?a=${transaction.txId}`} />
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationV2
              onChange={
                (val) => {
                  this.setState({
                    itemsPerPage: val.pageSize,
                    currentPage: val.page - 1,
                    sortBy,
                    sortDir,
                  });
                }}
              pageSizes={[10, 50, 100, 500]}
              page={currentPage + 1}
              totalItems={transactions.length}
              pageSize={itemsPerPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

TransactionHistoryPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default TransactionHistoryPage;
