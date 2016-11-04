import React, { PropTypes } from 'react';
import { beingAsEmoji } from '../helpers';

const Recharts = require('recharts');

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

export default function MarsGrid(props) {

  const { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } = Recharts;

  return (
    <div>
      <label htmlFor="">Mars</label>
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
