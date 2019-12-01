import React from 'react';
import { shallow } from 'enzyme';
import AddressesList from './AddressesList';
import { renderComp } from '../../../tests/utilRender';

describe('<AddressesList />', () => {
  test('renders', () => {
    const wrapper = renderComp(<AddressesList />);
    expect(wrapper).toMatchSnapshot();
  });
});
