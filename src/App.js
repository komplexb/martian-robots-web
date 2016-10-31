import React, { Component } from 'react';
import Instruct from './components/Instruct'
import MarsList from './components/MarsList'
import MarsGrid from './components/MarsGrid'
import { default as Store } from './store';
import { filterMars } from './controller';

const mars = new Store();

class App extends Component {
  constructor() {
    super();

    this.addToStore = this.addToStore.bind(this);
    this.filterStore = this.filterStore.bind(this);

    // getInitialState
    this.state = {
      initialStore: {},
      store: {},
      lostList: {}
    }
  }

  addToStore(martians) {
    const store = {...this.state.store};

    martians.forEach(m => {
      if(mars.getAll().size < mars.add(m)) {
        store[m.name] = m.plainObject;
        this.setState({ store: store });
      }
    });

    // console.log(mars.getAll());
  }

  filterStore(condition) {
    switch(condition) {
      case 'L':
        this.setState({ store: filterMars(mars.getAll().values(), false, 'isAlive') });
        break;
      case 'R':
        this.setState({ store: filterMars(mars.getAll().values(), 'Robot') });
        break;
      case 'M':
        this.setState({ store: filterMars(mars.getAll().values(), 'Martian') });
        break;
      default:
        this.setState({ store: [...mars.getAll().values()].map(value => value.plainObject) });
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <Instruct addToStore={this.addToStore} />
          <MarsList store={this.state.store} filterStore={this.filterStore} />
        </div>
        <div>
          <MarsGrid store={this.state.store} />
        </div>
      </div>
    );
  }
}

export default App;
