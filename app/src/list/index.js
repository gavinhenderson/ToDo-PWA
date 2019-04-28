import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import './list.css';
import Divider from '@material-ui/core/Divider';

const TodoList = (props) => {
  const { todos, classes } = props;

  return (
    <div className={`List_container`}>
      <List className={classes.background}>
        {todos.map((todo, index) => (
          <React.Fragment key={`todo-${index}`}>
            <ListItem>
              <ListItemText primary={todo} />
            </ListItem>
            {todos.length - 1 !== index && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

const styles = (theme) => {
  return {
    background: {
      backgroundColor: theme.palette.background.paper,
      padding: 0,
      'box-shadow': theme.shadows['1'],
    },
  };
};

export default withStyles(styles)(TodoList);
