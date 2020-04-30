import React from 'react';
import App from './App.js';
import { shallow } from 'enzyme';



test('if there is no greeting, render no h1', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('h1').length).toBe(0);
});

test('if there is a greeting, render an h1', () => {
    const wrapper = shallow(<Header greeting="hello" />);
    const myH1 = wrapper.find('h1')
    expect(myH1.contains('hello!')).toBe(true);
});


it('renders correctly when there is not a greeting', () => {
    const header = renderer.create(<Header />).toJSON();
    expect(header).toMatchSnapshot();
  });

  it('renders correctly when there is a greeting', () => {
    const header = renderer.create(<Header greeting="hello!" />).toJSON();
    expect(header).toMatchSnapshot();
  });