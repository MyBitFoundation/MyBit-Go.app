import { CHANGE_TRANSACTION_HISTORY_FILTERS, RESET_STATE, FILL_STATE } from '../actions';

const initialState = {
  history: [],
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TRANSACTION_HISTORY_FILTERS:
      return { ...state, ...action.payload };
    case RESET_STATE:
      return { history: [] };
    case FILL_STATE:
      return {
        ...state, history: action.payload.transactionsHistory, sortBy: 'date', sortDir: 'ASC', itemsPerPage: 10, currentPage: 0,
      };
    default:
      return state;
  }
};

export default transactions;
