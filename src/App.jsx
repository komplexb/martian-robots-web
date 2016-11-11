import React, { Component } from 'react';
import Instruct from './components/Instruct';
import MarsList from './components/MarsList';
import MarsGrid from './components/MarsGrid';
import FilterButtons from './components/FilterButtons';
import connect from './libs/connect';
import MarsActions from './actions/MarsActions';
import { bounds, lostList } from './config';

import { default as Store } from './store';
import { filterMars } from './controller';

const mars = new Store();

class App extends Component {
  constructor(props) {
    super(props);

    /**
     * Control state: http://jamesknelson.com/5-types-react-application-state/
     * @filterMode: Set by FilterButtons Component
     * to define how the store state is filtered
     */
    this.state = {
      filterMode: 'A'
    };
  }

  /* 
   * Invoked once, both on the client and server, 
   * immediately before the initial rendering occurs.
   */
  componentWillMount() {
    // restore bounds from localStorage
    if (localStorage.getItem('xBounds') && localStorage.getItem('yBounds')) {
      bounds.x = localStorage.xBounds;
      bounds.y = localStorage.yBounds;
    }

    // restore lostList from localStorage
    if (localStorage.getItem('lostList')) {
      lostList.push(JSON.parse(localStorage.lostList));
    }
  }

  /**
   * @martians: array of martians/robots
   * to be added to state
   */
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
  
  /**
   * @martian: receives moved martian/robot as plain objectfrom 
   * after being edited by EditListItem component
   */
  editItem = (martian) => {
    this.props.MarsActions.update({...martian.plainObject});
  }

  /**
   * Handler for FilterButton component
   * @condition to update state with
   */
  setFilterMode = (condition) => {
    this.setState({ filterMode: condition })
  }

  
  /**
   * Consumed by components in render method
   */
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

  /**
   * Utiltiy to filter store object
   * @condition {string} compare against with
   * @property {string} compare against martian/robot proerties
   * @store {object} use the provided store to filter and map
   */
  filterStateStore = (condition, property = 'type', store = this.props.store) => {
    return Object.keys(store)
      .filter(key => store[key][property] === condition)
      .map(value => store[value]);
  }

  render() {
    const store = this.filteredStore();
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

/*
 * Reference
 * http://survivejs.com/react/implementing-kanban/react-and-flux/#setting-up-connect-
 */
export default connect(({store}) => ({
  store
}), {
  MarsActions
})(App);
