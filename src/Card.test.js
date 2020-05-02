import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card.js';

test('testing card', () => {
    const pokemonData={
        pokemon: 'test',
        species_id: 3,
        url_image: 'linkofsomekind'
    }
    const wrapper = shallow(<Card pokemon={pokemonData}/>)

    expect(wrapper).toMatchSnapshot();
})