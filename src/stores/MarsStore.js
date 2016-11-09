// In Alt we model stores using ES6 classes

import MarsActions from '../actions/MarsActions';

export default class MarsStore {
  constructor() {

    this.bindActions(MarsActions);

    this.store = [
      {
        isAlive: true,
        name: 'hej-1478664304452',
        orientation: 'S',
        status: 'Robot 1 1 S',
        type: 'Martian',
        x: 1,
        y: 1
      }
    ];
  }

  create(martian) {
    this.setState({
      store: this.store.concat(martian)
    });
  }

  update(updatedMartian) {
    this.setState({
      store: this.store.map(martian => {
        if(martian.name === updatedMartian.name) {
          return Object.assign({}, martian, updatedMartian);
        }

        return martian;
      })
    });
  }

  delete(name) {
    this.setState({
      store: this.store.filter(martian => martian.name !== name)
    })
  }
}
