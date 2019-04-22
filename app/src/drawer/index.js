import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlayForWork from '@material-ui/icons/PlayForWork';

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
    } = this.props;

    return (
      <Drawer open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={installApp}>
            <ListItemIcon>
              <PlayForWork />
            </ListItemIcon>
            <ListItemText primary="Install App" />
          </ListItem>
          <ListItem>Test</ListItem>
        </List>
      </Drawer>
    );
  }
}

export default SideDrawer;
