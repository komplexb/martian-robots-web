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

    const filterArr = [['', 'All'], ['R', '🤖'], ['M', '👾'], ['L', '🆘']];
    const FilterButton = filterArr
      .map(([param, label], i) => {
        return <button key={i} disabled={isStoreEmpty} onClick={e => this.marsViews(e, param)}>{label}</button>;
    });

    return (
      <div>
        Filter:
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
