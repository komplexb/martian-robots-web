/* global describe:false, before:false, it:false */

import os from 'os';
import { bounds } from '../src/js/config';
import Martian from '../src/js/classes/martian';
import Robot from '../src/js/classes/martianRobot';
import { instruct, searchMars } from '../src/js/controller';
import { default as Store, lostList } from '../src/js/store';

const assert = require('chai').assert;

describe('controller.js', () => {
  before(() => {
    bounds.x = 5; bounds.y = 3;
  });

  it('instruct()', () => {
    const bot1 = new Robot('bot 1', 1, 1, 'E'); // instruct 1 1 E RFRFRFRF
    const bot2 = new Robot('bot 2', 3, 2, 'N'); // instruct 3 2 N FRRFLLFFRRFLL
    const bot3 = new Robot('bot 3', 0, 3, 'W'); // instruct 0 3 W LLFFFLFLFL
    const aMartian = new Martian('aMartian', 3, 2, 'N'); // instruct -m 3 2 N FRRFLLFFRRFLLFFF

    assert.strictEqual(instruct(bot1, 'RFRFRFRF').toString(), '1 1 E', 'Test: 1 1 E');
    assert.strictEqual(instruct(bot2, 'FRRFLLFFRRFLL').toString(), '3 3 N LOST', 'Test: 3 2 N');
    assert.strictEqual(lostList.find((point => point === '3,3')), '3,3', 'confirm that the position of the lost robot is added to the list');
    assert.isAtLeast(instruct(aMartian, 'FRRFLLFFRRFLLFFF').y, 3, "Y coords should be greater than 3 which is where bot 2 was lost '3,3'");
    assert.strictEqual(lostList.find((point => point === '3,3')), '3,3', 'confirm that the position of the lost robot is added to the list');
    assert.strictEqual(instruct(bot3, 'LLFFFLFLFL').toString(), '2 3 S', 'Test: 0 3 W');
  });

  it('searchMars()', () => {
    const a = instruct(new Robot('bot 1', 1, 1, 'E'), 'RFRFRFRFFFFFF');
    const b = instruct(new Robot('bot 2', 3, 2, 'N'), 'FRRFLLFFRRFLL');
    const c = instruct(new Robot('bot 3', 0, 3, 'W'), 'LLFFFLFLFL');
    const m = instruct(new Martian('aMartian', 3, 2, 'N'), 'FRRFLLFFRRFLLFFF');
    const mars = new Store();

    mars.add(a, b, c, m);
    // const marsArr = mars.getAll().values();

    if (os.type() === 'Darwin') {
      assert.deepEqual(searchMars(mars.getAll().values(), false, 'isAlive').array, ['🤖 5 1 ➡️ 🆘'], 'Show lost Robots.');
      assert.deepEqual(searchMars(mars.getAll().values(), 'Robot').array, ['🤖 5 1 ➡️ 🆘', '🤖 3 2 ⬆️', '🤖 2 3 ⬇️'], 'Show all Robots.');
      assert.deepEqual(searchMars(mars.getAll().values(), 'Martian').array, ['👾 3 6 ⬆️'], 'Show all Martians');
    }
    else {
      assert.deepEqual(searchMars(mars.getAll().values(), false, 'isAlive').array, ['Robot 5 1 E LOST'], 'Show lost Robots.');
      assert.deepEqual(searchMars(mars.getAll().values(), 'Robot').array, ['Robot 5 1 E LOST', 'Robot 3 2 N', 'Robot 2 3 S'], 'Show all Robots.');
      assert.deepEqual(searchMars(mars.getAll().values(), 'Martian').array, ['Martian 3 6 N'], 'Show all Martians');
    }
  });
});
