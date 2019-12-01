import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from './ErrorBoundary';
import { renderComp } from '../../../tests/utilRender';

describe('<ErrorBoundary />', () => {
  test('renders', () => {
    const wrapper = renderComp(<ErrorBoundary />);
    expect(wrapper).toMatchSnapshot();
  });
});
