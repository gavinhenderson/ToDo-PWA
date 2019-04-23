import React from 'react';
import Nav from './nav';
import Drawer from './drawer';
import AddTodo from './add-todo';
import List from './list';
import { withStyles } from '@material-ui/core/styles';
import './app.css';

class App extends React.Component {
  constructor() {
    super();

    this.newTodo = React.createRef();

    this.state = {
      todos: [],
      drawerOpen: false,
      installApp: null,
    };
  }

  componentDidMount() {
    window.addEventListener(
      'beforeinstallprompt',
      this.handleInstall.bind(this),
    );

    if ('Notification' in window) {
      if (Notification.permission !== 'granted') {
        this.notificationPermission = () => {
          Notification.requestPermission(function(status) {
            console.log('Notification permission status:', status);
          });
        };
      }
    }
  }

  handleInstall(event) {
    event.preventDefault();

    const promptFunc = (e) => {
      event.prompt();
    };

    this.setState({ installApp: promptFunc });
  }

  addTodo = (todo) => {
    this.setState({ todos: [...this.state.todos, todo] });
  };

  toggleDrawer = () => {
    const { drawerOpen } = this.state;

    this.setState({ drawerOpen: !drawerOpen });
  };

  render() {
    const { classes } = this.props;
    const { installApp, todos, drawerOpen } = this.state;

    return (
      <div className={`App_container ${classes.mainBackground}`}>
        <Nav toggleDrawer={this.toggleDrawer} />
        <Drawer
          toggleDrawer={this.toggleDrawer}
          open={drawerOpen}
          installApp={installApp}
          notificationPermission={this.notificationPermission}
        />
        <AddTodo addTodo={this.addTodo} />
        <List todos={todos} />
      </div>
    );
  }
}

const styles = (theme) => ({
  mainBackground: { background: theme.palette.grey['200'] },
});

export default withStyles(styles)(App);
