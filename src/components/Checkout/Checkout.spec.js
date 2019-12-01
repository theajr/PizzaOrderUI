import React from 'react';
import { shallow } from 'enzyme';
import Checkout from './Checkout';
import { renderComp } from '../../../tests/utilRender';

describe('<Checkout />', () => {
  test('renders', () => {
    const wrapper = renderComp(<Checkout />);
    expect(wrapper).toMatchSnapshot();
  });
});
