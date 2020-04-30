import React, { Component } from 'react'
import request from 'superagent';
import PokemonList from './PokemonList.js';

const data = [{}]

export default class App extends Component {
  state = { typeQuery: null, searchQuery: null, data: data }
  
  handleType = (e) => {
    this.setState({ typeQuery: e.target.value })
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  handleSearch = async () => {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}`)
    this.setState({ data: fetchedData.body.results })
  }
  render() {
    return (
      <div>
        <select onChange={this.handleType}>
          <option value=""></option>
          <option value="pokemon">Pokemon Name</option>
          <option value="type">Type</option>
          <option value="ability">Ability</option>
          <option value="attack">Attack</option>
        </select>
        <input onChange={this.handleChange}></input>
        
        <button onClick={this.handleSearch}>Search</button>
        <PokemonList pokemons={this.state.data} />
      </div>
    )
  }
}
