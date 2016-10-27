import React, { Component } from 'react';
import { demoInstructions } from '../helpers';

class Instruct extends Component {
  constructor() {
    super();
    this.submitInstructions = this.submitInstructions.bind(this);
    this.validateInstruction = this.validateInstruction.bind(this);
  }

  submitInstructions(e) {
    e.preventDefault();
    console.log(this.textInstructions.value);
  }

  validateInstruction() {
    // we need at least 3 lines to try and do anything valuable
    if(this.textInstructions.textLength >= 0 &&
      this.textInstructions.value.trim().split("\n").length >= 3) {
      console.log(this.textInstructions.textLength, this.submitBtn)
      this.submitBtn.disabled = false;
    }
    else {
      console.log(this.textInstructions.textLength, this.submitBtn);
      this.submitBtn.disabled = true;
    }
  }

  componentDidMount() {
    this.validateInstruction();
    // console.log(this.textInstructions.value, this.submitBtn)
  }

  render() {
    return (
      <form
        onSubmit={this.submitInstructions}>
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
