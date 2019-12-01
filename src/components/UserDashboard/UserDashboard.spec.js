import React from 'react';
import { shallow } from 'enzyme';
import UserDashboard from './UserDashboard';
import { renderComp } from '../../../tests/utilRender';

describe('<UserDashboard />', () => {
  test('renders', () => {
    const wrapper = renderComp(<UserDashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
