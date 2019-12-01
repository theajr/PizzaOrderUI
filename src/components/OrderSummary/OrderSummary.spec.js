import React from 'react';
import { shallow } from 'enzyme';
import OrderSummary from './OrderSummary';
import { renderComp } from '../../../tests/utilRender';

describe('<OrderSummary />', () => {
  test('renders', () => {
    const wrapper = renderComp(<OrderSummary />);
    expect(wrapper).toMatchSnapshot();
  });
});
