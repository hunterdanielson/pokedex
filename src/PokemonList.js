import React, { Component } from 'react'

export default class PokemonList extends Component {
    render() {
        return (
            <div className="pokemon-data-container">
                {
                    this.props.pokemons.map(pokemon => {
                    return <div className="full-pokemon-container">
                        <h1>{pokemon.pokemon}</h1>
                        <img src={pokemon.url_image} alt={pokemon.url_image}/>
                        <ul>
                            <li>
                                {/* only render 2 types if that pokemon has two types */}
                                Type: {pokemon.type_1} {pokemon.type_2 !== 'NA' && <span>{pokemon.type_2}</span>}
                            </li>
                            <li>
                                Stats: 
                                <ul>
                                    <li>Attack: {pokemon.attack}</li>
                                    <li>Defense: {pokemon.defense}</li>
                                    <li>Special Attack: {pokemon.special_attack}</li>
                                    <li>Special Defense: {pokemon.special_defense}</li>
                                </ul> 
                            </li>
                            <li>
                                <a href={pokemon.pokedex}>{pokemon.pokemon}</a>
                            </li>
                        </ul>
                        
                        </div>
                    })
                }
            </div>
        )
    }
}
