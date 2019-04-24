import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class OfflineNotification extends React.Component {
  constructor() {
    super();

    this.state = { open: false };
  }

  componentDidMount() {
    window.addEventListener('online', () => {
      this.setState({ message: 'Navigator has come back online', open: true });
    });

    window.addEventListener('offline', () => {
      this.setState({ message: 'Navigator has gone offline', open: true });
    });
  }

  handleClose = () => {
    this.setState({ open: false });
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
