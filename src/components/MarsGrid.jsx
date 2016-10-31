import React, { Component } from 'react';
import { beingAsEmoji } from '../helpers';

const Recharts = require('recharts');

class MarsGrid extends Component {

  render() {
    const store = this.props.store;
    const robots = Object.keys(store)
      .filter(key => store[key].type === 'Robot')
      .map(value => store[value]);
    const martians = Object.keys(store)
      .filter(key => store[key].type === 'Martian')
      .map(value => store[value]);

    const {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} = Recharts;

    return (
    	<ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
      	<XAxis dataKey={'x'} name='x' />
      	<YAxis dataKey={'y'} name='y' />
        {/* <ZAxis dataKey={'z'} range={[60, 400]} name='score' unit='km'/> */}
        <CartesianGrid />
      	<Tooltip cursor={{strokeDasharray: '3 3'}} />
        <Legend/>
      	<Scatter name='Robots' data={robots} fill='gray' shape="triangle"/>
        <Scatter name='Martians' data={martians} fill='red' shape="wye"/>
      </ScatterChart>
    );
  }
}

export default MarsGrid;
