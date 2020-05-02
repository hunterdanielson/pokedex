import React, { Component } from 'react';
import './App.js';
import { Link } from 'react-router-dom';

export default class Card extends Component {
    render() {
        const pokemon = this.props.pokemon;
        return (
            <>
                <div className="full-pokemon-container">
                        <h1>{pokemon.pokemon} #{pokemon.species_id}</h1>
                        <img src={pokemon.url_image} alt={pokemon.url_image} />
                        <ul>
                            <li>
                                {/* only render 2 types if that pokemon has two types */}
                                Type: {pokemon.type_1} {pokemon.type_2 !== 'NA' && <span>{pokemon.type_2}</span>}
                            </li>
                            <li>
                                Ability: {pokemon.ability_1} {pokemon.ability_2 !== 'NA' && <span>or {pokemon.ability_2}</span>}
                            </li>
                            <li>
                                Stats:
                                <ul>
                                    <li>Attack: {pokemon.attack}</li>
                                    <li>Defense: {pokemon.defense}</li>
                                    <li>Special Attack: {pokemon.special_attack}</li>
                                    <li>Special Defense: {pokemon.special_defense}</li>
                                    <li>Speed: {pokemon.speed}</li>
                                </ul>
                            </li>
                            <li>
                                <a href={pokemon.pokedex}>Pokemon.com</a>
                            </li>
                            <br/>
                            <li>
                                <Link to={`/`}>
                                    <p>Back Home</p>
                                </Link>
                            </li>
                        </ul>
                </div>
            </>
        )
    }
}
