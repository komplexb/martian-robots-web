import React, { PropTypes } from 'react';
import MarsListItem from './MarsListItem';
import EditListItem from './EditListItem';

export default function MarsList ({store,
  onItemClick = () => {}, onEdit = () => {}, onDelete = () => {}}) {
  return (
    <ul className="MarsList">
      {
        store.map((m) => {
          const style = (m.isAlive === false) ? 'MarsListItem__lost' : '';
          return <li className='MarsListItem' key={m.name}>
            <MarsListItem>
              <span className={style}>{m.status}</span>
              &nbsp;
              <EditListItem
                value={m.status}
                onEdit={onEdit}
                disabled={!m.isAlive}
                martian={m}
              />
              &nbsp;
              <button className="alert badge" onClick={onDelete.bind(null, m.name)} >x</button>
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
