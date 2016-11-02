import React, { Component, PropTypes } from 'react';
import MarsListItem from './MarsListItem';

class MarsList extends Component {

  render() {
    const store = this.props.store;

    return (
      <ul>
        {
          Object.keys(store)
            .map(key => <MarsListItem key={key} details={store[key]} />)
        }
      </ul>
    );
  }

  static propTypes = {
    store: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ])
  };
}

export default MarsList;
