import React from 'react';
import { shallow } from 'enzyme';
import Messages from './Messages';
import { renderComp } from '../../../tests/utilRender';

describe('<Messages />', () => {
  test('renders', () => {
    const wrapper = renderComp(<Messages />);
    expect(wrapper).toMatchSnapshot();
  });
});
