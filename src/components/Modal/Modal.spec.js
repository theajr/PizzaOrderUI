import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';
import { renderComp } from '../../../tests/utilRender';

describe('<Modal />', () => {
  test('renders', () => {
    const wrapper = renderComp(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });
});
