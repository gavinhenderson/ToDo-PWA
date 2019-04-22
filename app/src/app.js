import React from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.newTodo = React.createRef();

    this.state = {
      todos: [],
      installApp: null,
    };
  }

  componentDidMount() {
    window.addEventListener(
      'beforeinstallprompt',
      this.handleInstall.bind(this),
    );
  }

  handleInstall(event) {
    event.preventDefault();

    const promptFunc = (e) => {
      event.prompt();
    };

    this.setState({ installApp: promptFunc });
  }

  addTodo = () => {
    const todo = this.newTodo.current.value;
    this.newTodo.current.value = '';

    this.setState({ todos: [...this.state.todos, todo] });
  };

  render() {
    const { installApp, todos } = this.state;

    return (
      <div>
        {installApp && <button onClick={installApp}>Install</button>}
        <p>Add a new todo:</p>
        <input ref={this.newTodo} />
        <button onClick={this.addTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => (
            <li key={`todo-${index}`}>{todo}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
