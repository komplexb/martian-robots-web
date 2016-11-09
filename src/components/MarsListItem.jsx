import React, { PropTypes } from 'react';

// Remember that this declaration is equivalent to: const {details} = props;
export default function MarsListItem({details, onDelete = () => {}}) {
  const style = (details.isAlive === false) ? 'MarsListItem__lost' : '';
  return (
    <li className={style}>
      <span>{details.status}</span>
      &nbsp;
      <button className="alert badge" onClick={onDelete.bind(null, details.name)} >x</button>
    </li>
  );
}

MarsListItem.propTypes = {
  details: PropTypes.object.isRequired,
};
