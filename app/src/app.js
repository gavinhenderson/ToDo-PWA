import React from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.newTodo = React.createRef();

    this.state = {
      todos: [],
    };
  }

  addTodo = () => {
    const todo = this.newTodo.current.value;
    this.newTodo.current.value = '';

    this.setState({ todos: [...this.state.todos, todo] });
  };

  render() {
    return (
      <div>
        <button>Install</button>
        <p>Add a new todo:</p>
        <input ref={this.newTodo} />
        <button onClick={this.addTodo}>Add</button>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={`todo-${index}`}>{todo}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
