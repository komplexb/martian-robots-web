import React, { PropTypes } from 'react';
import { beingAsEmoji } from '../helpers';
import { bounds } from '../config';

const Recharts = require('recharts');

/**
 * Component displayed when grid items are hovered or long pressed.
 * Its contents are a bit hacky, 
 * it only receives dataKeys x,y,z from the ScatterChart component.
 * Z controls the item sizes, but I've passed a `status` string instead.
 * That way hover displays something like '🤖 3 3 ⬆️ 🆘'.
 * Would be nice to still have size though.
 * 
 * @param   {object}   props [[Description]]
 * @returns {React Component} Consumed by MarsGrid
 */
export function CustomTooltip(props) {
  if (props.active) {
    const { payload } = props;
    // console.log(payload);

    return (
      <div className='custom-tooltip'>
        <p className='desc'>{`${beingAsEmoji(payload[2].value)}`}</p>
      </div>
    );
  }

  return null;
}

CustomTooltip.propTypes = {
  payload: PropTypes.array,
};


/**
 * Displays MarsList items on a interactive grid.
 * <Tooltip /> is set with <CustomTooltip />
 * @param   {object}   props
 * @returns {React Component}
 */
export default function MarsGrid(props) {

  const boundsStr = <span>| Bounds: x: {bounds.x}, y: {bounds.y}</span>;
  const { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } = Recharts;

  return (
    <div>
      <label htmlFor="">
        Mars {bounds.isSet ? boundsStr : ''}
      </label>
      <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis dataKey={'x'} name='x' allowDecimals={true} />
        <YAxis dataKey={'y'} name='y' allowDecimals={true} />
        <ZAxis dataKey={'status'} name='status' />
        <CartesianGrid />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
        <Legend />
        <Scatter name='Robots' data={props.robots} fill='gray' shape='triangle' />
        <Scatter name='Martians' data={props.martians} fill='red' shape='wye' />
      </ScatterChart>
    </div>
  );
}

MarsGrid.propTypes = {
  store: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ])
};
