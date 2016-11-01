import React, { PropTypes } from 'react';

export default function MarsListItem(props) {
  return (
    <li>
      <button>{props.details.status}</button>
    </li>
  );
}

MarsListItem.propTypes = {
  details: PropTypes.object.isRequired,
};
