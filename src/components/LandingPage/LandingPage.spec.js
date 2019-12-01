import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from './LandingPage';
import { renderComp } from '../../../tests/utilRender';

describe('<LandingPage />', () => {
  test('renders', () => {
    const wrapper = renderComp(<LandingPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
