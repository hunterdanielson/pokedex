import React from 'react';
import PokemonList from './PokemonList.js';
import { shallow } from 'enzyme';

const data=[{
    pokemon: 'pikachu',
    type_1: 'electric',
    type_2: 'NA',
}]

test('testing PokemonList', () => {
    const wrapper = shallow(<PokemonList pokemons={data}/>);

    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('span').length).toBe(0);
});

