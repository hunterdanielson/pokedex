import React from 'react';
import { shallow } from 'enzyme';
import App from './App.js';

test('testing App', () => {
    const wrapper = shallow(<App />)

    expect(wrapper).toMatchSnapshot();
})