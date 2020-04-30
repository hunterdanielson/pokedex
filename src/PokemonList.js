import React, { Component } from 'react'

export default class PokemonList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.pokemons.map(pokemon => {
                    return <>
                        <h1>Name: {pokemon.pokemon}</h1>
                        <img src={pokemon.url_image} alt={pokemon.url_image}/>
                        {/* only render 2 types if that pokemon has two types */}
                        Types: {pokemon.type_1} {pokemon.type_2 !== 'NA' && <p>{pokemon.type_2}</p>}

                        </>
                    })
                }
            </div>
        )
    }
}
