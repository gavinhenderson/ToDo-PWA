import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class OfflineNotification extends React.Component {
  constructor() {
    super();

    this.state = { queue: [], open: false, message: '' };
  }

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

  componentDidMount() {
    window.addEventListener('online', () => {
      this.addToQueue('Navigator has come back online');
    });

    window.addEventListener('offline', () => {
      this.addToQueue('Navigator has gone offline');
    });
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
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={2000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
      />
    );
  }
}

export default OfflineNotification;
