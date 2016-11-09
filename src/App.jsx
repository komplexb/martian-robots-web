import React, { Component } from 'react';
import Instruct from './components/Instruct';
import MarsList from './components/MarsList';
import MarsGrid from './components/MarsGrid';
import FilterButtons from './components/FilterButtons';
import connect from './libs/connect';
import MarsActions from './actions/MarsActions';

import { default as Store } from './store';
import { filterMars } from './controller';

const mars = new Store();

class App extends Component {
  constructor(props) {
    super(props);

    // getInitialState
    this.state = {
      initialStore: {},
      store: {},
      lostList: {}
    };
  }

  addToStore = (martians) => {
    martians.forEach((m) => {
      this.props.MarsActions.create(m.plainObject);
    });
  }

  filterStore = (condition) => {
    switch (condition) {
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

  filterStateStore = (type) => {
    const {store} = this.props;

    return Object.keys(store)
      .filter(key => store[key].type === type)
      .map(value => store[value]);
  }

  render() {
    const { store } = this.props;
    return (
      <div className='row' id='content'>
        <div id='instruct' className='small-12 medium-6 large-4 columns'>
          <Instruct addToStore={this.addToStore} />
        </div>
        <div id='filter' className="small-12 medium-6 large-4 columns">
          <FilterButtons store={store} filterStore={this.filterStore} />
          <MarsList store={store} />
        </div>
        <div id='grid' className='small-12 medium-12 large-4 columns'>
          <MarsGrid robots={this.filterStateStore('Robot')} martians={this.filterStateStore('Martian')} />
        </div>
      </div>
    );
  }
}

export default connect(({store}) => ({
  store
}), {
  MarsActions
})(App);
