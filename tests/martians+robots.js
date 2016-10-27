/* global describe:false, before:false, it:false */

import { bounds } from '../src/js/config';
import Martian from '../src/js/classes/martian';
import Robot from '../src/js/classes/martianRobot';

const assert = require('chai').assert;

describe('Martians & Robots', () => {
  before(() => {
    bounds.x = 5; bounds.y = 3;
  });

  it('Martians', () => {
    const m = new Martian('', -1, 4, 'sw');
    assert.isAbove(m.name.length, 0, "Name can't be blank, should have been defaulted to Date.now().");
    try {
      m.name = 'Byron';
    }
    catch (e) {
      console.log(e);
    }
    assert.notEqual(m.name, 'Byron', "Can't set the name after initialization.");


    assert.strictEqual(m.x, 0, 'Negative values are invalid for initialization, defaults to zero.');
    assert.strictEqual(m.y, 0, 'Values above the boundary are invalid for initialization, defaults to zero.');
    assert.strictEqual(m.point, '0,0', 'Invalid x,y values defaults to zero.');

    assert.strictEqual(m.orientation, 'N', 'Invalid orientations will be set to north on initialization.');
    try {
      m.orientation = 'se';
    }
    catch (e) {
      console.log(e);
    }
    assert.strictEqual(m.orientation, 'N', 'Invalid orientations will fail on assignment, thus leaving the previous value.');

    assert.strictEqual(m.isAlive, true, 'Invalid live status will be set to true on initialization.');
    try {
      m.isAlive = 'fL';
    }
    catch (e) {
      console.log(e);
    }
    assert.strictEqual(m.isAlive, true, 'Invalid live status will fail on assignment, thus leaving the previous value.');
  });

  it('Robots', () => {
    const r = new Robot(' ', 4, 2, 'E');
    assert.isAbove(r.name.length, 0, "Name can't be blank, should have been defaulted to Date.now().");
  });
});
