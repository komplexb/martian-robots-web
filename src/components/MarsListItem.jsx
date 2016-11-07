import React, { PropTypes } from 'react';

export default function MarsListItem(props) {
  const {details} = props;
  const style = (details.isAlive === false) ? 'MarsListItem__lost' : '';
  return (
    <li className={style}>
      {details.status}
    </li>
  );
}

MarsListItem.propTypes = {
  details: PropTypes.object.isRequired,
};
