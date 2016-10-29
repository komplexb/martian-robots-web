import React, { Component } from 'react';
import Instruct from './components/Instruct'
import MarsList from './components/MarsList'
import MarsGrid from './components/MarsGrid'
import { default as Store } from './store';

const mars = new Store();

class App extends Component {
  constructor() {
    super();

    this.addToStore = this.addToStore.bind(this);

    // getInitialState
    this.state = {
      initialStore: {},
      store: {},
      lostList: {}
    }
  }

  addToStore(martian) {
    // only save to state if persisted
    if(mars.getAll().size < mars.add(martian)) {
      const store = {...this.state.store};
      const { name, x, y, isAlive, type } = martian;
      store[name] = {
        name,
        x,
        y,
        isAlive,
        type,
        status: martian.toString(type)
      };
      this.setState({ store: store });
    }
    console.log(mars.getAll());
  }

  render() {
    return (
      <div className="App">
        <div>
          <Instruct addToStore={this.addToStore} />
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
