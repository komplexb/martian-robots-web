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
    const store = {...this.state.store};

    martian.forEach(m => {
      if(mars.getAll().size < mars.add(m)) {
        const { name, x, y, isAlive, type } = m;
        store[name] = {
          name,
          x,
          y,
          isAlive,
          type,
          status: m.toString(type)
        };
        this.setState({ store: store });
      }
    });

    // console.log(mars.getAll());
  }

  render() {
    return (
      <div className="App">
        <div>
          <Instruct addToStore={this.addToStore} />
          <MarsList store={this.state.store}/>
        </div>
        <div>
          <MarsGrid/>
        </div>
      </div>
    );
  }
}

export default App;
