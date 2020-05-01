import React, { Component } from 'react'
import request from 'superagent';
import PokemonList from './PokemonList.js';
import SearchSection from './SearchSection.js';
import './App.css';

export default class App extends Component {
  state = { typeQuery: null, searchQuery: null, data: [{}], pageNum: 1, loading: false }
  // initially load all data in the best order
  async componentDidMount() {
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?sort=species_id&direction=asc&page=${this.state.pageNum}`)
    this.setState({ data: data.body.results })
  }
  
  handleType = (e) => {
    this.setState({ typeQuery: e.target.value })
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  handleSearch = async () => {
    console.log(this.state.pageNum);
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}&page=${this.state.pageNum}`)
    this.setState({ data: fetchedData.body.results })
  }
  handlePage = (e) => {
    
    if(e.target.value === 'next') {
      this.setState((state) => {return { pageNum: state.pageNum + 1 }});
    } else {
      this.setState((state) => {return { pageNum: state.pageNum - 1 }});
    }    
  }
  render() {
    return (
      <div className="app-container">
        <div>
          <SearchSection 
          callBackHandleType={this.handleType}
          callBackHandleChange={this.handleChange}
          callBackHandleSearch={this.handleSearch}
          pageNum={this.state.pageNum}
          callBackHandlePage={this.handlePage}
          />
          <div className="pokemon-list-container">
            <PokemonList pokemons={this.state.data} />
          </div>
        </div>
      </div>
    )
  }
}
