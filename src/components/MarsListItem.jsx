import React, { Component } from 'react';
import { beingAsEmoji } from '../helpers';

class MarsListItem extends Component {
  render() {
    const details = this.props.details;

    return (
      <li>
        <button>{details.status}</button>
      </li>
    )
  }
}

export default MarsListItem;
