import React from 'react';
import { shallow } from 'enzyme';
import PizzaItem from './PizzaItem';
import { renderComp } from '../../../tests/utilRender';

describe('<PizzaItem />', () => {
  test('renders', () => {
    const wrapper = renderComp(<PizzaItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
