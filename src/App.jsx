import React, { Component } from 'react';
import Instruct from './components/Instruct';
import MarsList from './components/MarsList';
import MarsGrid from './components/MarsGrid';
import FilterButtons from './components/FilterButtons';
import connect from './libs/connect';
import MarsActions from './actions/MarsActions';
import Robot from './classes/martianRobot';
import Martian from './classes/martian';
import { instruct } from './controller';

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

  deleteItem = (name, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();
    this.props.MarsActions.delete(name);
  }

  toggleEditItem = (name) => {
    this.props.MarsActions.update({name, editing: true});
    // console.log(name);
  }

  getMartian(m) {
    const {name, x, y, orientation: o, type: t} = m;
    if(t === 'Martian') {
      return new Martian(name, x, y, o);
    }
    return new Robot(name, x, y, o);
  }

  editItem = (name, value) => {
    const { store } = this.props;
    if(value.trim().length > 0) {
      const m = instruct(this.getMartian(...store.filter(martian => martian.name === name)), value.trim());
      this.props.MarsActions.update({...m.plainObject, editing: false});
    }
    else {
      this.props.MarsActions.update({name, editing: false});
    }
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
          <MarsList
          store={store}
          onItemClick={this.toggleEditItem}
          onEdit={this.editItem}
          onDelete={this.deleteItem} />
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
