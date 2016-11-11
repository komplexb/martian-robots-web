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
      filterMode: 'A'
    };
  }

  addToStore = (martians) => {
    martians.forEach((m) => {
      this.props.MarsActions.create(m.plainObject);
    });
  }

  deleteItem = (name, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();
    this.props.MarsActions.delete(name);
  }

  editItem = (martian) => {
    this.props.MarsActions.update({...martian.plainObject});
  }

  setFilterMode = (condition) => {
    this.setState({ filterMode: condition })
  }

  filteredStore = () => {
    switch (this.state.filterMode) {
      case 'L':
        return this.filterStateStore(false, 'isAlive', undefined);
      case 'R':
        return this.filterStateStore('Robot', undefined, undefined);
      case 'M':
        return this.filterStateStore('Martian', undefined, undefined);
      default:
        return this.props.store;
    }
  }

  filterStateStore = (condition, property = 'type', store = this.props.store) => {
    return Object.keys(store)
      .filter(key => store[key][property] === condition)
      .map(value => store[value]);
  }

  render() {
    const store = this.filteredStore();
    // console.log(store);
    return (
      <div className='row' id='content'>
        <div id='instruct' className='small-12 medium-6 large-4 columns'>
          <Instruct addToStore={this.addToStore} />
        </div>
        <div id='filter' className="small-12 medium-6 large-4 columns">
          <FilterButtons
          store={store}
          setFilterMode={this.setFilterMode} />

          <MarsList
          store={store}
          onEdit={this.editItem}
          onDelete={this.deleteItem} />
        </div>
        <div id='grid' className='small-12 medium-12 large-4 columns'>
          <MarsGrid
          robots={this.filterStateStore('Robot', undefined, store)}
          martians={this.filterStateStore('Martian', undefined, store)} />
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
