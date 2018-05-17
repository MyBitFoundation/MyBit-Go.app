// Action constants
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';
export const FETCH_ASSETS = 'FETCH_ASSETS';

// Synchronous action creators
export const fetchAssetsSuccess = assets => ({ type: FETCH_ASSETS_SUCCESS, payload: { assets } });
export const fetchAssetsFailure = error => ({ type: FETCH_ASSETS_FAILURE, payload: { error } });
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Asynchronous action creators
export const fetchAssets = () => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: FETCH_ASSETS });
  try {
    getState(); // TODO: Get the user credentials, etc
    // TODO: Fetch with web3
    const data = [1, 2, 3];
    dispatch(fetchAssetsSuccess(data));
  } catch (error) {
    dispatch(fetchAssetsFailure(error));
  }
};
