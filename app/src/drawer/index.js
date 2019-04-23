import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PlayForWork from '@material-ui/icons/PlayForWork';
import Notifications from '@material-ui/icons/Notifications';

class SideDrawer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {
      open,
      toggleDrawer,
      installApp,
      notificationPermission,
      classes,
    } = this.props;

    return (
      <Drawer open={open} onClose={toggleDrawer}>
        <div className={classes.list}>
          <List>
            {installApp && (
              <>
                <ListItem button onClick={installApp}>
                  <ListItemIcon>
                    <PlayForWork />
                  </ListItemIcon>
                  <ListItemText primary="Install App" />
                </ListItem>
              </>
            )}
            {notificationPermission && (
              <ListItem button onClick={notificationPermission}>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Allow Notifications" />
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    );
  }
}

const styles = {
  list: {
    width: 250,
  },
};

export default withStyles(styles)(SideDrawer);
