import React, { PropTypes } from 'react';

export default function MarsListItem(props) {
  return (
    <li>
      {props.details.status}
    </li>
  );
}

MarsListItem.propTypes = {
  details: PropTypes.object.isRequired,
};
