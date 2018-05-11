import TEST_ACTION from './types';

const sendTestAction = val => ({
  type: TEST_ACTION,
  payload: val,
});

export default sendTestAction;
