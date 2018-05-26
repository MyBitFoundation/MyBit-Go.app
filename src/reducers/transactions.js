import { CHANGE_TRANSACTION_HISTORY_FILTERS } from '../actions';

const initialState = {
  history: [{
    date: 'January 01, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 02, 2018, 19:51', amount: 3, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 03, 2018, 19:51', amount: 47, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 0.7, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 01, 2018, 19:51', amount: -37, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 04, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -3, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.8, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'April 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'January 01, 2018, 19:51', amount: -0.4, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 22, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 14, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -15, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 13.22, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -17.87, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }],
  currentPage: 0,
  itemsPerPage: 10,
  sortBy: 'date',
  sortDir: 'ASC',
  loaded: true,
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TRANSACTION_HISTORY_FILTERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default transactions;
