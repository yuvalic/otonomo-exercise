import React, { Component } from 'react'
import Events from './components/Events'
import StreamersList from './components/StreamersList'
import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <StreamersList />
        <Events />
      </div>
    )
  }
}

export default App
