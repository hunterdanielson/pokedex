import React, { Component } from 'react'
import request from 'superagent';
import PokemonList from './PokemonList.js';
import './App.css';

const data = [{}]

export default class App extends Component {
  state = { typeQuery: null, searchQuery: null, data: data, visibility: 'hidden' }
  
  handleType = (e) => {
    this.setState({ typeQuery: e.target.value })
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  handleSearch = async () => {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}`)
    this.setState({ data: fetchedData.body.results, visibility: 'visible' })
  }
  render() {
    return (
      <div className="app-container">
        <div>
          <div className="selector-container">
            <select onChange={this.handleType}>
              <option value=""></option>
              <option value="pokemon">Pokemon Name</option>
              <option value="type">Type</option>
              <option value="ability">Ability</option>
              <option value="attack">Attack (greater than)</option>
              <option value="defense">Defense (greater than)</option>
              <option value="special_attack">Special Attack (greater than)</option>
              <option value="special_defense">Special Defense (greater than)</option>
            </select>
            <input onChange={this.handleChange}></input>
            <button className="search-button" onClick={this.handleSearch}>Search</button>
          </div>
          
          <div className="pokemon-list-container" style={{visibility: this.state.visibility}}>
            <PokemonList pokemons={this.state.data} />
          </div>
        </div>
      </div>
    )
  }
}
