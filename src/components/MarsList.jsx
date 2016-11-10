import React, { PropTypes } from 'react';
import MarsListItem from './MarsListItem';
import EditListItem from './EditListItem';

export default function MarsList ({store,
  onItemClick = () => {}, onEdit = () => {}, onDelete = () => {}}) {
  return (
    <ul className="MarsList">
      {
        store.map(({name, editing, status, isAlive}) => {
          return <li className='MarsListItem' key={name}>
            <MarsListItem>
              <span>{status}</span>
              &nbsp;
              <EditListItem
                editing={editing}
                value={status}
                onClick={onItemClick.bind(null, name)}
                onEdit={onEdit.bind(null, name)}
                disabled={!isAlive}
              />
              &nbsp;
              <button className="alert badge" onClick={onDelete.bind(null, name)} >x</button>
            </MarsListItem>
          </li>
        }
      )}
    </ul>
  );
}

MarsList.propTypes = {
  store: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ])
};
