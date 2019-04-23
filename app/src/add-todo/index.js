import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';

import './add-todo.css';

class AddTodo extends React.Component {
  constructor() {
    super();

    this.state = {
      todoText: '',
    };
  }

  updateText = (e) => {
    this.setState({ todoText: e.target.value });
  };

  addTodo = (e) => {
    this.props.addTodo(this.state.todoText);
    this.setState({ todoText: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.addTodo();
  };

  render() {
    const { todoText } = this.state;
    const { updateText, addTodo, handleSubmit } = this;

    return (
      <div className="AddTodo">
        <form onSubmit={handleSubmit}>
          <InputLabel className="AddTodo_label">New Todo</InputLabel>
          <div className="AddTodo_container">
            <div className="AddTodo_input-container">
              <TextField
                id="outlined-full-width"
                placeholder="eg. Get milk from the shop"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={todoText}
                onChange={updateText}
                onBlur={updateText}
              />
            </div>
            <Button
              className="AddTodo_button"
              variant="contained"
              color="primary"
              onClick={addTodo}
            >
              Add
              <Icon>add</Icon>
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTodo;
