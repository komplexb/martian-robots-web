import React, { Component } from 'react';
import { beingAsEmoji } from '../helpers';

class MarsList extends Component {
  render() {
    const store = this.props.store;
    const mListItems = Object.keys(store)
      .map(key => <li key={key}>{beingAsEmoji(store[key].status)}</li>)

    return (
      <ul>
        {mListItems}
      </ul>
    )
  }
}

export default MarsList;
