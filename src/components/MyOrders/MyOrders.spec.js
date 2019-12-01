import React from 'react';
import { shallow } from 'enzyme';
import MyOrders from './MyOrders';
import { renderComp } from '../../../tests/utilRender';

describe('<MyOrders />', () => {
  test('renders', () => {
    const wrapper = renderComp(<MyOrders />);
    expect(wrapper).toMatchSnapshot();
  });
});
