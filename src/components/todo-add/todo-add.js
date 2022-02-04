import React from 'react';

import './todo-add.css';


class TodoAdd extends React.Component {
  state = {
    label: ''
  }

  onValueChange = (text) => {
    this.setState({
      label: text
    })
  }

  onAddNewTodo = (event) => {
    event.preventDefault();
    this.props.addNewTodo(this.state.label)
    this.setState({
      label: ''
    })
  }

  render() {
    //console.log(this.state.label) <input type='submit' className='btn btn-info' value='Add' />

    return (
      <div className='top-panel d-flex'>
        <form onSubmit={this.onAddNewTodo} >
          <input
            className='todo-input'
            onChange={(event) => this.onValueChange(event.target.value)}
            value={this.state.label}
            type='text'
            placeholder='Feel the todo'
          />
          <button className='todo-button'>Add</button>
        </form>
      </div>
    )
  }
}

export default TodoAdd;
