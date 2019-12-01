import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from './SignUpForm';
import { renderComp } from '../../../tests/utilRender';

describe('<SignUpForm />', () => {
  test('renders', () => {
    const wrapper = renderComp(<SignUpForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
