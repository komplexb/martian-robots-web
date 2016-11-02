import React, { Component, PropTypes } from 'react';
import { demoInstructions } from '../helpers';
import { bounds } from '../config';
import { instruct } from '../controller';
import Robot from '../classes/martianRobot';
import Martian from '../classes/martian';

class Instruct extends Component {
  constructor() {
    super();

    this.submitInstructions = this.submitInstructions.bind(this);
    this.validateInstruction = this.validateInstruction.bind(this);
  }

  componentDidMount() {
    this.validateInstruction();
  }

  submitInstructions(e) {
    e.preventDefault();

    const inputArr = this.textInstructions.value.split('\n\n');
    // const beforeInstructions = [];

    const afterInstructions = inputArr.map((instruction, i) => {
      const currentInstructionSet = instruction.split('\n');

      if (i === 0) {
        const defaultsArr = currentInstructionSet[0].split(' ');
        if (bounds.isSet === false) {
          bounds.x = defaultsArr[0];
          bounds.y = defaultsArr[1];
        }
        currentInstructionSet.shift(); // after we get the bounds delete its element from the instruction array.
      }

      const [martianStr, instructionsStr] = currentInstructionSet;
      const [x, y, o, type = 'R'] = martianStr.trim().split(' ');

      // create a martian/robot with the line 1 of each instruction pair
      if (type.trim().toUpperCase() === 'M') {
        return instruct(new Martian('', Number.parseInt(x, 10), Number.parseInt(y, 10), o), instructionsStr);
      }

      return instruct(new Robot('', Number.parseInt(x, 10), Number.parseInt(y, 10), o), instructionsStr);
    });
    this.props.addToStore(afterInstructions);
  }

  validateInstruction() {
    // we need at least 3 lines to try and do anything valuable
    this.submitBtn.disabled = !(this.textInstructions.textLength >= 0 &&
      this.textInstructions.value.trim().split('\n').length >= 3);
  }

  render() {
    return (
      <form ref={input => this.instructionsForm = input} onSubmit={e => this.submitInstructions(e)}>
        <label>
          Please enter intructions or use the demo instructions:
          <textarea
            ref={input => this.textInstructions = input}
            onKeyUp={this.validateInstruction}
            name='' id='' cols='30' rows='10'
            defaultValue={demoInstructions}
          >
          </textarea>
        </label>
        <button className='success button' disabled={true} ref={btn => this.submitBtn = btn}>Instruct</button>
      </form>
    );
  }

  static propTypes = {
    addToStore: PropTypes.func.isRequired,
  };

}

export default Instruct;
