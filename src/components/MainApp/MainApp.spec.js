import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import MainApp from './MainApp';

describe('MainApp unit tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<MainApp />);
    expect(wrapper).toBeTruthy();
  });
});
