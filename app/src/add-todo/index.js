import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

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
    if (this.state.todoText === '') return;

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
    const { classes } = this.props;

    return (
      <div className="AddTodo">
        <form
          className={`AddTodo_form ${classes.container}`}
          onSubmit={handleSubmit}
        >
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

const styles = (theme) => ({
  container: {
    background: theme.palette.background.paper,
    'box-shadow': theme.shadows['1'],
  },
});

export default withStyles(styles)(AddTodo);
