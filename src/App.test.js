import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const toRender = <App />;
  const wrapper = shallow(toRender);
  const expected = 1;
  const actual = wrapper.length;
  expect(actual).toEqual(expected);
});
