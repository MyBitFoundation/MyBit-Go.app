import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store/configureStore';

const store = configureStore();

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const toRender = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const wrapper = shallow(toRender);
  const expected = 1;
  const actual = wrapper.length;
  expect(actual).toEqual(expected);
});
