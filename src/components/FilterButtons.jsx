import React, { PropTypes } from 'react';

/**
 * Sets filter conditions for Application `store` state in App.jsx
 * @store store object from props
 * @onClick function stub from props
 */
export default function FilterButtons ({store, onClick = () => {}}) {
  const isStoreEmpty = (Object.keys(store).length === 0);

  const filterArr = [['R', '🤖', 'Show all Robots'], ['M', '👾', 'Show all Martians'], ['L', '🆘', 'Show all Lost Robots']];
  const FilterButton = filterArr
    .map(([param, icon, title], i) => {
      return <button className='button' key={i+1}
      disabled={isStoreEmpty}
      title={title}
      onClick={onClick.bind(null, param)}>{icon}</button>;
  });

  /*
   * not in filter array because it shouldn't be disabled at any point
   * basically ensures the user can undo if they filtered to zero values
   */
  FilterButton.unshift(<button className='button' key='0' onClick={onClick.bind(null, 'A')} title='Reset Filter'>🔁</button>);

  return (
    <div>
      <label htmlFor="">Filter:</label>
      <div className='small expanded button-group'>
        {FilterButton}
      </div>
    </div>
  );
}

FilterButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
  store: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ])
};
