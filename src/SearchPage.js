import React, { Component } from 'react'
import request from 'superagent';
import PokemonList from './PokemonList.js';
import SearchSection from './SearchSection.js';
import './App.css';
import loadingPokeball from './simple_pokeball.gif';

export default class App extends Component {
  // initialize state so that if they just search without selecting any option it doesn't break
  state = { typeQuery: 'pokemon', searchQuery: '', data: [{}], pageNum: 1, totalCount: 21, loading: true, sortBy: 'species_id', sortDirection: 'asc', pageNumber: 1 }
  // initially load all data in the best order
  async componentDidMount() {
    let params = (new URL(document.location)).searchParams;
    let pageNumber = params.get('page');
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}&page=${pageNumber}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}`)
    this.setState({ data: data.body.results, loading: false, pageNumber: pageNumber })
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
  
    let params = (new URL(document.location)).searchParams;
    let pageNumber = params.get('page');
    if(!pageNumber) {
      pageNumber = 1;
    }
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}&page=${pageNumber}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}`)
    this.setState({ data: fetchedData.body.results, totalCount: fetchedData.body.count, pageNumber: pageNumber })
  }
  handlePage = async (e) => {
    
    let currentPage = this.state.pageNum;
    let params = (new URL(document.location)).searchParams;
    let pageNumber = params.get('page');
    if(!pageNumber) {
      pageNumber = 1;
    } else {
      currentPage = Number(pageNumber);
    }
  
    if(e.target.value === 'next') {
      const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}&page=${currentPage+1}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}`)
      this.setState({ data: fetchedData.body.results, totalCount: fetchedData.body.count })
      this.setState({ pageNum: currentPage + 1, pageNumber: currentPage + 1 });
      const url = new URL(document.location);
      let search_params = url.searchParams;
      search_params.set('page', currentPage + 1);
      url.search = search_params.toString();
      let new_url = url.toString();
      window.location.href = new_url;
    } else {
      const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.typeQuery}=${this.state.searchQuery}&page=${currentPage-1}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}`)
      this.setState({ data: fetchedData.body.results, totalCount: fetchedData.body.count })
      this.setState({ pageNum: currentPage - 1, pageNumber: currentPage - 1 });
      const url = new URL(document.location);
      let search_params = url.searchParams;
      search_params.set('page', currentPage - 1);
      url.search = search_params.toString();
      let new_url = url.toString();
      window.location.href = new_url;
    }    
  }
  render() {
    console.log(this.state.pageNumber);
    return (
      <div className="app-container">
        <div>
          <SearchSection 
          callBackHandleType={this.handleType}
          callBackHandleChange={this.handleChange}
          callBackHandleSearch={this.handleSearch}
          pageNum={this.state.pageNumber}
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
