import React from 'react';
import { shallow } from 'enzyme';
import AddressForm from './AddressForm';
import { renderComp } from '../../../tests/utilRender';

describe('<AddressForm />', () => {
  test('renders', () => {
    const wrapper = renderComp(<AddressForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
