import React, { Component } from 'react'


export default class App extends Component {
  handleChange = (e) => {
    console.log(e.target.value)
  }

  render() {

    return (
      <div>
        
        <input onChange={this.handleChange}></input>
      </div>
    )
  }
}
