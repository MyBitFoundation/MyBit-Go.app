import * as Actions from '../actions';

const initialState = {
  userName: '',
  ethBalance: '0',
  myBitBalance: '0',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOAD_METAMASK_USER_DETAILS_SUCCESS:
      return {
        userName: action.payload.details.userName,
        ethBalance: action.payload.details.ethBalance,
        myBitBalance: action.payload.details.myBitBalance,
      };
    default:
      return state;
  }
};

export default user;
