import React, { Component, PropTypes } from 'react';
import MarsListItem from './MarsListItem';

class MarsList extends Component {

  render() {
    const {store} = this.props;

    return (
      <ul className="MarsList">
        {
          Object.keys(store)
            .map(key => <MarsListItem
              key={key}
              details={store[key]}
              onDelete={this.props.onDelete} />
            )
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
