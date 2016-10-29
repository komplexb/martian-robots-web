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
    // update state cuz y'all need to see
    const { name, x, y, isAlive, type } = martian;
    console.log(name, x, y, isAlive, type, martian.toString(type));
    /*if(mars.getAll().size < mars.add(martian)) {
      const store = {...this.state.store};
      store[martian.name] = {...martian};
      this.setState({ store: store });
    }*/

    // persist in native format to do stuff later
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
