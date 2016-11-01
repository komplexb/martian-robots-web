import React, { Component, PropTypes } from 'react';
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
    )
  }

  return null;
}

CustomTooltip.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
};

class MarsGrid extends Component {

  render() {
    const store = this.props.store;

    /*
     * this doesn't seem like the best move since state may already be filtered
     * i was thinking about passing the filtered arrays as props
     * but it seems like duplicated effort, will think about it and try again later
     */
    const robots = Object.keys(store)
      .filter(key => store[key].type === 'Robot')
      .map(value => store[value]);
    const martians = Object.keys(store)
      .filter(key => store[key].type === 'Martian')
      .map(value => store[value]);

    const { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } = Recharts;

    const robotEmoji = <span>🤖</span>;

    return (
      <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis dataKey={'x'} name='x' allowDecimals={true} />
        <YAxis dataKey={'y'} name='y' allowDecimals={true} />
        <ZAxis dataKey={'status'} name='status' />
        <CartesianGrid />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip/>} />
        <Legend />
        <Scatter name='Robots' data={robots} fill='gray' shape='triangle' />
        <Scatter name='Martians' data={martians} fill='red' shape='wye' />
      </ScatterChart>
    );
  }
}

MarsGrid.propTypes = {
  store: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ])
};

export default MarsGrid;
