import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import TodoAdd from '../todo-add';
import Login from '../login';
import TodoApi from '../../services/todo-api';

import './app.css';

class App extends React.Component {
  state = {
      todos: [],
      filter: 'all',
      searchString: '',
  }

  todoApi = new TodoApi()

  onToggleFilter = (status) => {
    this.setState({
      filter: status
    })
  }

  onStatusFilter  = (todos, status) => {
    if (status === 'active') {
      return todos.filter((item) => item.done === false)
    } else if (status === 'done') {
      return todos.filter((item) => item.done === true)
    } else {
      return todos
    }
  }

  onSearchFilter = (todos, searchString) => {
    const result = todos.filter((todo) => todo.label.toLowerCase().includes(searchString.toLowerCase()))
    return result
  }

  onSearchChange = (searchString) => {
    this.setState({
      searchString: searchString.toLowerCase()
    })
  }
  
  onLoadTodos = () => {
    this.todoApi.getTodos().then(todos => {
      this.setState({
        todos: todos
      })
    })
  }

  addNewTodo = (labelText) => {
    this.todoApi.createTodo(labelText).then(data => {
      this.onLoadTodos()
    })
  }

  onToggleImportant = (id) => {
    const idx = this.state.todos.findIndex((item) => item.id === id)
    const old = this.state.todos[idx]

    const newTodo = {
      label: old.label,
      important: !old.important,
      done: old.done,
    }

    this.todoApi.updateTodo(old.id, newTodo).then(date => {
      this.onLoadTodos()
    })
  }

  onToggleDone = (id) => {
    const idx = this.state.todos.findIndex((item) => item.id === id)
    const old = this.state.todos[idx]

    const newTodo = {
      label: old.label,
      important: old.important,
      done: !old.done,
    }

    this.todoApi.updateTodo(old.id, newTodo).then(date => {
      this.onLoadTodos()
    })
  }

  onDelete = (id) => {
    this.todoApi.deleteTodo(id).then(data => {
      this.onLoadTodos()
    })
  }

  componentDidMount = () => {
    const credentials = localStorage.getItem('credentials')

    if (credentials) {
      this.onLoadTodos()
    }
  }

  render() {
    const credentials = localStorage.getItem('credentials')

    if (credentials) {
      const filteredTodos = this.onStatusFilter(this.state.todos, this.state.filter)

      const filterBySearchTodos = this.onSearchFilter(filteredTodos, this.state.searchString);

      const doneTodos = this.state.todos.filter((item) => {return (item.done === true)})
      const nondoneTodos = this.state.todos.filter((item) => {return (item.done === false)})

      return (
        <div className="todo-app">
          <AppHeader toDo={nondoneTodos.length} done={doneTodos.length} />

          <div className="top-panel d-flex">
            <SearchPanel onSearchChange={this.onSearchChange}/>
            <ItemStatusFilter onToggleFilter={this.onToggleFilter} filter={this.state.filter} />
          </div>
          
          <TodoAdd addNewTodo={this.addNewTodo} />

          <TodoList
            onToggleDone={this.onToggleDone}
            onDelete={this.onDelete}
            onToggleImportant={this.onToggleImportant}
            todos={filterBySearchTodos}
          />

          
        </div>
      );
    } else {
      return <Login />
    }
  }
    
};

export default App;
