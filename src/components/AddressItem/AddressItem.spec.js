import React from 'react';
import { shallow } from 'enzyme';
import AddressItem from './AddressItem';
import { renderComp } from '../../../tests/utilRender';

describe('<AddressItem />', () => {
  test('renders', () => {
    const wrapper = renderComp(<AddressItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
