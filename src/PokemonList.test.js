import React from 'react';
import PokemonList from './PokemonList.js';
import { shallow } from 'enzyme';
// was getting a super strange error in testing if the following wasn't added
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

const data=[{
    pokemon: 'pikachu',
    type_1: 'electric',
    type_2: 'NA',
    
}]

test('if there is only 1 type, render no span', () => {
    const wrapper = shallow(<PokemonList pokemons={data}/>);

    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('span').length).toBe(0);
});

const dataTwoType=[{
    pokemon: 'charizard',
    type_1: 'fire',
    type_2: 'flying',
    
}]

test('if there is a pokemon with 2 types, render a span', () => {
    const wrapper = shallow(<PokemonList pokemons={dataTwoType} />);
    const myP = wrapper.find('span')
    expect(myP.contains('flying')).toBe(true);
});
