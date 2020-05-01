import React, { Component } from 'react';
import request from 'superagent';
import Card from './Card.js';
import loadingPokeball from './simple_pokeball.gif';

export default class DetailPage extends Component {
    state = {
        data: null
    }

    async componentDidMount() {
        const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.props.match.params.pokemon}`)
        this.setState({ data: fetchedData.body })
    }

    render() {
        return (
            <div>
                {
                    this.state.data
                    ? <Card pokemon={this.state.data.results[0]} />
                    :  <img src={loadingPokeball} className="App-logo" alt="logo" />
                }
                
            </div>
        )
    }
}
