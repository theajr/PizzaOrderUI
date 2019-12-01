import React from 'react';
import { shallow } from 'enzyme';
import PizzaItemsList from './PizzaItemsList';
import { renderComp } from '../../../tests/utilRender';

describe('<PizzaItemsList />', () => {
  test('renders', () => {
    const wrapper = renderComp(<PizzaItemsList />);
    expect(wrapper).toMatchSnapshot();
  });
});
