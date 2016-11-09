import React, { PropTypes, Component } from 'react';

export default function({editing, value, onEdit, ...props}) {
  if(editing) {
    return <Edit
      value={value}
      onEdit={onEdit}
      {...props}
    />;
  }

  return <button className="linkbutton" {...props}>Edit</button>;
}

class Edit extends Component {
  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    const value = e.target.value;

    // console.log('finishEdit', value);

    if(this.props.onEdit) {
      this.props.onEdit(value);
    }
  }

  render() {
    const {value, ...props} = this.props;

    return <input
      type='text'
      autoFocus={true}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
    />;
  }
}
