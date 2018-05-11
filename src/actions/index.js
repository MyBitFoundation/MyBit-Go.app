import TEST_ACTION from './types';

export const sendTestAction = val => ({ type: TEST_ACTION, payload: val });
export const sendAnotherTestAction = val => ({ type: TEST_ACTION, payload: val });
