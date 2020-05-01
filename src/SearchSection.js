import React, { Component } from 'react'

export default class SearchSection extends Component {
    render() {
        return (
            <div className="selector-container">
                <select onChange={this.props.callBackHandleType}>
                    <option value=""></option>
                    <option value="pokemon">Pokemon Name</option>
                    <option value="type">Type</option>
                    <option value="ability">Ability</option>
                    <option value="attack">Attack (greater than)</option>
                    <option value="defense">Defense (greater than)</option>
                    <option value="special_attack">Special Attack (greater than)</option>
                    <option value="special_defense">Special Defense (greater than)</option>
                    <option value="speed">Speed (greater than)</option>
                </select>
                <input onChange={this.props.callBackHandleChange}></input>
                <button className="search-button" onClick={this.props.callBackHandleSearch}>Search</button>
                {this.props.pageNum > 1 && <button onClick={this.props.callBackHandlePage} value="prev">Previous Page</button>}
                <p>Page# {this.props.pageNum}</p> 
                {<button onClick={this.props.callBackHandlePage} value="next">Next Page</button>}
            </div>
        )
    }
}
