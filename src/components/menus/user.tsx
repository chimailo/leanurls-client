import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Fade from '@material-ui/core/Fade';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import firebase from '../../lib/firebase';
import NewLinkModal from '../dialog/NewLink';
import { logout } from '../../lib/utils';
import { useUser } from '../../lib/hooks';
import * as ROUTES from '../../lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuPaper: {
      minWidth: '220px',
    },
    menuDivider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    menuItem: {
      minHeight: '32px',
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(2),
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: theme.spacing(0, 2),
    },
    listItemIcon: {
      color: 'inherit',
      minWidth: 0,
      alignItems: 'center',
      marginRight: theme.spacing(2),
    },
  })
);

interface UserMenuProps {
  user: firebase.User;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

export default function UserMenu(props: UserMenuProps) {
  const [openModal, setModal] = useState(false);
  const { user, anchorEl, handleClose } = props;
  const router = useRouter();
  const classes = useStyles();
  const { handleLogout } = useUser();

  return (
    <>
      <Menu
        id='user-menu'
        classes={{ paper: classes.menuPaper }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div className={classes.profile}>
          <Avatar
            alt={`${user.displayName}`}
            // @ts-expect-error
            src={user.photoURL}
            className={classes.avatar}
          />
          <div>
            <Typography variant='subtitle1'>
              {`${user?.displayName}`}
            </Typography>
          </div>
        </div>
        <Divider className={classes.menuDivider} />
        <MenuItem
          onClick={() => {
            router.push(ROUTES.SETTINGS);
            handleClose();
          }}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <SettingsOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Edit account' />
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout(() => handleLogout());
            handleClose();
            router.push(ROUTES.LOGIN);
          }}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </MenuItem>
      </Menu>
      <NewLinkModal open={openModal} handleClose={() => setModal(false)} />
    </>
  );
}
