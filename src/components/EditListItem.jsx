import React, { PropTypes, Component } from 'react';
import Robot from '../classes/martianRobot';
import Martian from '../classes/martian';
import { instruct } from '../controller';

export default class EditListItem extends Component {
  constructor(props) {
    super(props);

    /**
     * Control state: http://jamesknelson.com/5-types-react-application-state/
     * @editing: Set by Edit linkbutton
     * toggles between Edit linkbutton and Edit input field
     */
    this.state = {editing: false};
  }

  toggleEditItem = (editing) => {
    this.setState({editing});
  }

  render() {
    if(this.state.editing) {
      return <Edit
        value={this.props.value}
        onEdit={this.props.onEdit}
        toggleEditItem={this.toggleEditItem}
        {...this.props}
      />;
    }

    return <button
      className="linkbutton"
      disabled={this.props.disabled}
      onClick={this.toggleEditItem.bind(null, true)}
      >Edit
    </button>;
  }
}


class Edit extends Component {

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    const value = e.target.value;

    if(this.props.onEdit) {
      if(value.trim().length > 0) {
        const m = instruct(this.getMartian(this.props.martian), value.trim());
        this.props.onEdit(m);
      }
    }

    this.props.toggleEditItem(false);
  }

  /**
   *
   * @param   {object} m plain object to derive martian/robot
   * @returns {object} returns martian/robot
   */
  getMartian(m) {
    const {name, x, y, orientation: o, type: t} = m;
    if(t === 'Martian') {
      return new Martian(name, x, y, o);
    }
    return new Robot(name, x, y, o);
  }

  render() {
    return <input
      type='text'
      placeholder='FRRFLLFFRRFLL'
      title='Enter instructions as a combination of the letters "F", "R", "L"'
      maxLength='100'
      autoFocus={true}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
    />;
  }
}
