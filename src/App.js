import React, { Component } from 'react';
import Instruct from './components/Instruct'
import MarsList from './components/MarsList'
import MarsGrid from './components/MarsGrid'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Instruct/>
          <MarsList/>
        </div>
        <div>
          <MarsGrid/>
        </div>
      </div>
    );
  }
}

export default App;
