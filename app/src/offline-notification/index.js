import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class OfflineNotification extends React.Component {
  render() {
    const { open, handleClose, message } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    );
  }
}

export default OfflineNotification;
