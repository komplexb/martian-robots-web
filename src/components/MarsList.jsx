import React, { Component } from 'react';
import MarsListItem from './MarsListItem';

class MarsList extends Component {
  constructor() {
    super();

    this.marsViews = this.marsViews.bind(this);
  }

  marsViews(e, condition) {
    e.preventDefault();
    this.props.filterStore(condition);
  }

  render() {
    const store = this.props.store;

    return (
      <div>
        <div>
          Filter:
          <button onClick={e => this.marsViews(e)}>All</button>
          <button onClick={e => this.marsViews(e, 'R')}>🤖</button>
          <button onClick={e => this.marsViews(e, 'M')}>👾</button>
          <button onClick={e => this.marsViews(e, 'L')}>🆘</button>
        </div>
        <ul>
          {
            Object.keys(store)
              .map(key => <MarsListItem key={key} details={store[key]} />)
          }
        </ul>
      </div>
    );
  }
}

export default MarsList;
