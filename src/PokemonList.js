import React, { Component } from 'react';
import './App.js';
import { Link } from 'react-router-dom';

export default class PokemonList extends Component {
    render() {
        return (
            <div className="pokemon-data-container">
                {
                    this.props.pokemons.map(pokemon => {
                    return <div className="full-pokemon-container">
                        <h1>{pokemon.pokemon} #{pokemon.species_id}</h1>
                        <img src={pokemon.url_image} alt={pokemon.url_image} />
                        <Link to={`/pokemon/${pokemon.pokemon}`}>
                                <p>{pokemon.pokemon}</p>
                        </Link>                    
                        </div>
                    })
                }
            </div>
        )
    }
}
