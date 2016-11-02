import React, { Component, PropTypes } from 'react';


class FilterButtons extends Component {
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
    const isStoreEmpty = (Object.keys(store).length === 0);

    const filterArr = [['R', '🤖', 'Show all Robots'], ['M', '👾', 'Show all Martians'], ['L', '🆘', 'Show all Lost Robots']];
    const FilterButton = filterArr
      .map(([param, icon, title], i) => {
        return <button key={i}
        disabled={isStoreEmpty}
        title={title}
        onClick={e => this.marsViews(e, param)}>{icon}</button>;
    });

    return (
      <div>
        Filter:
        <button onClick={e => this.marsViews(e)} title='Reset Filter'>🔁</button>
        {FilterButton}
      </div>
    );
  }

  static propTypes = {
    filterStore: PropTypes.func.isRequired,
    store: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ])
  };
}

export default FilterButtons;
