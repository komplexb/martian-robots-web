import React, { Component, PropTypes } from 'react';
import Chance from 'chance';
import { demoInstructions } from '../helpers';
import { bounds } from '../config';
import { instruct } from '../controller';
import Robot from '../classes/martianRobot';
import Martian from '../classes/martian';

const chance = new Chance();

class Instruct extends Component {

  constructor(props) {
    super(props);

    this.state = {txtInstructions: ''};
  }

  handleInstructionChange = (event) => {
    this.setState({txtInstructions: event.target.value});
  }

  setDemoText = (event) => {
    this.setState({txtInstructions: demoInstructions});
  }

  submitInstructions = (e) => {
    e.preventDefault();

    const inputArr = this.state.txtInstructions.split('\n\n');
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
        return instruct(new Martian(chance.syllable(), Number.parseInt(x, 10), Number.parseInt(y, 10), o), instructionsStr);
      }

      return instruct(new Robot(chance.syllable(), Number.parseInt(x, 10), Number.parseInt(y, 10), o), instructionsStr);
    });
    this.props.addToStore(afterInstructions);
  }

  validateInstruction = () => {
    // we need at least 3 lines to try and do anything valuable
    this.submitBtn.disabled = !(this.textInstructions.value.length >= 0 &&
      this.textInstructions.value.trim().split('\n').length >= 3);
  }

  isValidInstruction = () => {
    // we need at least 3 lines to try and do anything valuable
    return !(this.state.txtInstructions.length >= 0 &&
      this.state.txtInstructions.trim().split('\n').length >= 3);
  }

  render() {
    return (
      <form ref={input => this.instructionsForm = input} onSubmit={e => this.submitInstructions(e)}>
        <label>
          Please enter intructions or use the demo instructions:
          <textarea
            id='txtIntructions'
            onChange={this.handleInstructionChange}
            cols='30'
            value={this.state.txtInstructions}
          >
          </textarea>
        </label>
        <button className='success button' disabled={this.isValidInstruction()} >Instruct</button>
        &nbsp;&nbsp;
        <button className='button' type='button' onClick={this.setDemoText} >Demo Instructions</button>
      </form>
    );
  }

  static propTypes = {
    addToStore: PropTypes.func.isRequired,
  };

}

export default Instruct;
