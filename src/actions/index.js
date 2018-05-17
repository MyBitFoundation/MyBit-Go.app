export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';
export const FETCH_ASSETS = 'FETCH_ASSETS';

export const fetchAssetsSuccess = assets => ({ type: FETCH_ASSETS_SUCCESS, payload: { assets } });
export const fetchAssetsFailure = error => ({ type: FETCH_ASSETS_FAILURE, payload: { error } });

export const fetchAssets = () => async (dispatch, getState) => {
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
