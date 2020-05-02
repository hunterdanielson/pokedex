import React, { Component } from 'react'
import request from 'superagent';
import PokemonList from './PokemonList.js';
import SearchSection from './SearchSection.js';
import './App.css';
import loadingPokeball from './simple_pokeball.gif';

export default class App extends Component {
  // initialize state so that if they just search without selecting any option it doesn't break
  state = { typeQuery: 'pokemon', searchQuery: '', data: [{}], pageNum: 1, totalCount: 21, loading: true, sortBy: 'species_id', sortDirection: 'asc' }
  // initially load all data in the best order
  async componentDidMount() {
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?sort=species_id&direction=asc&page=${this.state.pageNum}`)
    this.setState({ data: data.body.results, loading: false })
  }
  
  handleType = (e) => {
    this.setState({ typeQuery: e.target.value })
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  handleChangeSortBy = (e) => {
    this.setState({ sortBy: e.target.value })
  }

  handleChangeSortDir = (e) => {
    this.setState({ sortDirection: e.target.value })
  }

  handleSearch = async () => {
    let pageReset = 1;
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}&page=${pageReset}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}`)
    this.setState({ data: fetchedData.body.results, totalCount: fetchedData.body.count, pageNum: pageReset })
  }
  handlePage = async (e) => {
    
    let currentPage = this.state.pageNum;

    if(e.target.value === 'next') {
      const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}&page=${currentPage+1}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}`)
      this.setState({ data: fetchedData.body.results, totalCount: fetchedData.body.count })
      this.setState({ pageNum: currentPage + 1 });
    } else {
      const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}&page=${currentPage-1}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}`)
      this.setState({ data: fetchedData.body.results })
      this.setState({ pageNum: currentPage - 1, totalCount: fetchedData.body.count });
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
          totalCount={this.state.totalCount}
          callBackHandlePage={this.handlePage}
          callBackHandleSortBy={this.handleChangeSortBy}
          callBackHandleSortDir={this.handleChangeSortDir}
          />
          <div className="pokemon-list-container">
            {this.state.loading
            ? <img src={loadingPokeball} className="App-logo" alt="logo" />
          : <PokemonList pokemons={this.state.data} />
          }   
          </div>
        </div>
      </div>
    )
  }
}
