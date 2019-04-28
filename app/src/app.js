import React from 'react';
import Nav from './nav';
import Drawer from './drawer';
import AddTodo from './add-todo';
import List from './list';
import OfflineNotification from './offline-notification';
import { withStyles } from '@material-ui/core/styles';
import { BASE_URL } from './utils';
import './app.css';

class App extends React.Component {
  constructor() {
    super();

    this.newTodo = React.createRef();

    this.state = {
      todos: [],
      drawerOpen: false,
      installApp: null,
      queue: [],
      open: false,
      message: '',
    };
  }

  componentDidMount() {
    this.updateTodos();

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

    window.addEventListener('online', () => {
      this.addToQueue('Navigator has come back online');

      setTimeout(() => {
        this.updateTodos();
      }, 5000);
    });

    window.addEventListener('offline', () => {
      this.addToQueue('Navigator has gone offline');
    });
  }

  updateTodos() {
    fetch(BASE_URL + '/list')
      .then((response) => {
        response.json().then((body) => {
          let todos = body.todos.map((current) => current.todo);
          this.setState({ todos });
        });
      })
      .catch(console.log);
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

    fetch(BASE_URL + '/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newTodo: todo }),
    }).catch(console.log);
  };

  toggleDrawer = () => {
    const { drawerOpen } = this.state;

    this.setState({ drawerOpen: !drawerOpen });
  };

  dispatchEvent() {
    const latest = this.state.queue[this.state.queue.length - 1];

    if (latest) {
      this.setState({ message: latest.message, open: latest.open });
    }
  }

  addToQueue(message) {
    this.setState({ queue: [{ message, open: true }, ...this.state.queue] });

    if (this.state.queue.length === 1) this.dispatchEvent();
  }

  handleClose = () => {
    this.setState({
      open: false,
      queue: this.state.queue.slice(0, this.state.queue.length - 1),
    });

    setTimeout(() => {
      this.dispatchEvent();
    }, 500);
  };

  render() {
    const { classes } = this.props;
    const { installApp, todos, drawerOpen, open, message } = this.state;
    const { handleClose } = this;

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
        <OfflineNotification
          open={open}
          message={message}
          handleClose={handleClose}
        />
      </div>
    );
  }
}

const styles = (theme) => ({
  mainBackground: { background: theme.palette.grey['200'] },
});

export default withStyles(styles)(App);
