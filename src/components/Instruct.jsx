import React, { Component } from 'react';
import { demoInstructions } from '../helpers';
import { bounds } from '../config';
import { instruct } from '../controller';
import Robot from '../classes/martianRobot';

class Instruct extends Component {
  constructor() {
    super();

    this.submitInstructions = this.submitInstructions.bind(this);
    this.validateInstruction = this.validateInstruction.bind(this);
  }

  submitInstructions(e) {
    e.preventDefault();

    const inputArr = this.textInstructions.value.split("\n\n");
    // const beforeInstructions = [];

		const afterInstructions = inputArr.map((instruction, i) => {
			let currentInstructionSet = instruction.split("\n");

			if (i === 0) {
				var defaultsArr = currentInstructionSet[0].split(" ");
				bounds.x = defaultsArr[0];
				bounds.y = defaultsArr[1];
				currentInstructionSet.shift(); // after we get the bounds delete its element from the instruction array.
			}
			let posArr = currentInstructionSet[0].trim().split(" ");

      // next linee should be conditional
      let martian = new Robot('', Number.parseInt(posArr[0], 10), Number.parseInt(posArr[1], 10), posArr[2]);  // create a martian/robot with the line 1 of each instruction pair

      return instruct(martian, currentInstructionSet[1]);
		});
    this.props.addToStore(afterInstructions);
  }

  validateInstruction() {
    // we need at least 3 lines to try and do anything valuable
    this.submitBtn.disabled = !(this.textInstructions.textLength >= 0 &&
      this.textInstructions.value.trim().split("\n").length >= 3);
  }

  componentDidMount() {
    this.validateInstruction();
  }

  render() {
    return (
      <form
        ref={(input) => {this.instructionsForm = input}}
        onSubmit={(e) => this.submitInstructions(e)}>
        <textarea ref={(input) => {this.textInstructions = input}}
          onKeyUp={this.validateInstruction}
          name="" id="" cols="30" rows="10"
          defaultValue={demoInstructions}>
        </textarea>

        <button disabled={true}ref={(btn) => {this.submitBtn = btn}}>Instruct</button>
      </form>
    )
  }
}

export default Instruct;
