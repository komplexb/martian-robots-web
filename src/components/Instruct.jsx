import React, { Component, PropTypes } from 'react';
import Chance from 'chance';
import { demoInstructions } from '../helpers';
import { bounds } from '../config';
import { instruct } from '../controller';
import Robot from '../classes/martianRobot';
import Martian from '../classes/martian';

const chance = new Chance();

export default class Instruct extends Component {

  constructor(props) {
    super(props);

    this.state = {txtInstructions: ''};
  }

  /*
   * Set state with the instruction value so we can use it
   * to update a couple UI elements.
   * Since this is just 'component state', we don't need it to be persisted
   * and it doesn't need to be managed at app level.
   * @txtInstructions: set by #txtIntructions
   *
   */
  handleInstructionChange = (event) => {
    this.setState({txtInstructions: event.target.value});
  }


  /**
   * Make it easier for users to get started by using predefined instructions
   */
  setDemoText = (e) => {
    e.preventDefault();
    this.setState({txtInstructions: demoInstructions});
  }


  /**
   * Handler for submitting instructions and updating application
   * state with data required to render MarsList, MarsGrid etc.
   * TODO: Add error text for failed instructions.
   */
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
          currentInstructionSet.shift(); // after we get the bounds delete its element from the instruction array.
        }
      }

      const [martianStr, instructionsStr] = currentInstructionSet;
      const [x, y, o, type = 'R'] = martianStr.trim().split(' ');

      // create a martian/robot with the line 1 of each instruction pair
      if (type.trim().toUpperCase() === 'M') {
        return instruct(new Martian(chance.syllable({length: 5}), Number.parseInt(x, 10), Number.parseInt(y, 10), o), instructionsStr);
      }

      return instruct(new Robot(chance.syllable({length: 5}), Number.parseInt(x, 10), Number.parseInt(y, 10), o), instructionsStr);
    });
    this.props.addToStore(afterInstructions);
    this.setState({txtInstructions: ''}); // clear text area
  }


  /**
   * Toggles ability to submit instructions.
   * We need at least 2 or 3 lines to try and do anything valuable
   */
  isValidInstruction = () => {
    const compareTo = bounds.isSet ? 2 : 3;
    return !(this.state.txtInstructions.length >= 0 &&
      this.state.txtInstructions.trim().split('\n').length >= compareTo);
  }


  /**
   * Does what it says on the label: clears text from instruction area
   */
  resetForm = (e) => {
    e.preventDefault();
    this.setState({txtInstructions: ''});
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
        <div className='small expanded button-group'>
          <button title='Run Instructions' className='success button' type='submit' disabled={this.isValidInstruction()} >Instruct</button>
          <button title='Insert Demo Instructions' className='button' type='button' onClick={this.setDemoText} >Demo</button>
          <button title='Clear Instructions' className='button' type='button' disabled={this.state.txtInstructions.length === 0} onClick={this.resetForm} >Clear</button>
        </div>
      </form>
    );
  }

  static propTypes = {
    addToStore: PropTypes.func.isRequired,
  };

}
