import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Profile from './';
import { renderComp } from '../../../tests/utilRender';

describe('<Profile />', () => {
  test('renders', () => {
    const wrapper = renderComp(Profile);
    expect(wrapper).toMatchSnapshot();
  });
});
