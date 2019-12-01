import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
import { renderComp } from '../../../tests/utilRender';

describe('<LoginForm />', () => {
  test('renders', () => {
    const wrapper = renderComp(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
