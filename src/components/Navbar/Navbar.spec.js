import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';
import { renderComp } from '../../../tests/utilRender';

describe('<Navbar />', () => {
  test('renders', () => {
    const wrapper = renderComp(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
