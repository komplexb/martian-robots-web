import React, { Component, PropTypes } from 'react';


class FilterButtons extends Component {
  constructor(props) {
    super(props);

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
        return <button className='button' key={i+1}
        disabled={isStoreEmpty}
        title={title}
        onClick={e => this.marsViews(e, param)}>{icon}</button>;
    });
    // not in filter array because it shouldn't be disabled at any point
    FilterButton.unshift(<button className='button' key='0' onClick={e => this.marsViews(e)} title='Reset Filter'>🔁</button>);

    return (
      <div>
        <label htmlFor="">Filter:</label>
        <div className='small expanded button-group'>
          {FilterButton}
        </div>
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
