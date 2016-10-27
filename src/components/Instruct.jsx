import React, { Component } from 'react';

class Instruct extends Component {
  getDemoInstructions() {
    const str = `1 1 E RFRFRFRF
3 2 N FRRFLLFFRRFLL
0 3 W LLFFFLFLFL`;

    return str;
  }

  submitInstructions(e) {
    e.preventDefault();
    console.log(this.textInstructions);
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.submitInstructions(e)}>
        <textarea ref={(input) => { this.textInstructions = input }}
        name="" id="" cols="30" rows="10"
        defaultValue={this.getDemoInstructions()}>
        </textarea>
        <button>Instruct</button>
      </form>
    )
  }
}

export default Instruct;
