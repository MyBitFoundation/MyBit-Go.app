import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableData, PaginationV2, OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import '../../styles/TransactionHistory.css';
import LoadingPage from './LoadingPage';

const OverflowMenuCuston = ({ url }) => (
  <OverflowMenu className="Transactions__overflowOption" floatingMenu>
    <OverflowMenuItem
      onClick={() => { window.open(url, '_blank'); }}
      itemText="View on Etherscan"
      primaryFocus
    />
  </OverflowMenu>
);

const TransactionHistoryPage = ({ state, setTransactionHistoryFilters }) => {
  const loadedTransactions = state.transactions.loaded;
  let transactionsToRender = [...state.transactions.history];
  const { currentPage } = state.transactions;
  const { itemsPerPage } = state.transactions;
  const { sortBy } = state.transactions;
  const { sortDir } = state.transactions;

  if (sortBy === 'amount' && sortDir === 'DESC') {
    transactionsToRender = transactionsToRender.sort((a, b) => a.amount - b.amount);
  } else if (sortBy === 'amount' && sortDir === 'ASC') {
    transactionsToRender = transactionsToRender.sort((a, b) => b.amount - a.amount);
  } else if (sortBy === 'date' && sortDir === 'DESC') {
    transactionsToRender = transactionsToRender.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === 'date' && sortDir === 'ASC') {
    transactionsToRender = transactionsToRender.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;
  transactionsToRender = transactionsToRender.splice(startIndex, endIndex);

  return (
    <div>
      {!loadedTransactions &&
        <LoadingPage
          message="Loading transactions"
          hasBackButton={false}
        />
      }
      {loadedTransactions &&
        <div className="Transactions">
          <div className="Transactions__history">
            <b className="Transactions__table-name">Transaction History</b>
            <Table className="Transactions__history-table">
              <TableHead className="Transactions__history-table-header">
                <TableRow header>
                  <TableHeader className={sortBy === 'date' ? '' : 'Transactions__history-column-header'} onClick={() => { setTransactionHistoryFilters(itemsPerPage, currentPage, 'date', sortDir === 'ASC' ? 'DESC' : 'ASC'); }} sortDir={sortBy === 'date' ? sortDir : 'ASC'}>
                  Date
                  </TableHeader>
                  <TableHeader className={sortBy === 'amount' ? '' : 'Transactions__history-column-header'} onClick={() => { setTransactionHistoryFilters(itemsPerPage, currentPage, 'amount', sortDir === 'ASC' ? 'DESC' : 'ASC'); }} sortDir={sortBy === 'amount' ? sortDir : 'ASC'}>
                  Amount
                  </TableHeader>
                  <TableHeader>
                  Status
                  </TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionsToRender.map((transaction, index) => (
                  <TableRow key={transaction.txId} even={index % 2 !== 0}>
                    <TableData>
                      {transaction.date}
                    </TableData>
                    <TableData>
                      {transaction.amount} <b>{transaction.type}</b>
                    </TableData>
                    <TableData style={{ display: 'flex', alignItems: 'center' }}>
                      {transaction.status}
                      <OverflowMenuCuston url={`https://etherscan.io/tx/${transaction.txId}`} />
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationV2
              onChange={
              (val) => {
                setTransactionHistoryFilters(
                  val.pageSize,
                  val.page - 1,
                  sortBy,
                  sortDir,
                );
              }}
              pageSizes={[10, 50, 100, 500]}
              page={currentPage + 1}
              totalItems={state.transactions.history.length}
              pageSize={itemsPerPage}
            />
          </div>
        </div>
      }
    </div>
  );
};

OverflowMenuCuston.propTypes = {
  url: PropTypes.string.isRequired,
};

TransactionHistoryPage.propTypes = {
  setTransactionHistoryFilters: PropTypes.func.isRequired,
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
};


export default TransactionHistoryPage;
