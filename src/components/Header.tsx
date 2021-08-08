import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors/';

import Link from './Link';
import { LogoIcon } from './svg';
import { logout } from '../lib/utils';
import { useUser } from '../lib/hooks';
import * as ROUTES from '../lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandName: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginLeft: theme.spacing(2),
    },
    button: {
      color: theme.palette.grey[200],
    },
  })
);

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 8,
    textTransform: 'capitalize',
    marginLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
}))(Button);

interface HeaderProps {
  page?: string;
}

export default function Header({ page }: HeaderProps) {
  const classes = useStyles();
  const router = useRouter();
  const { user, handleLogout } = useUser();

  return (
    <AppBar
      position='static'
      elevation={0}
      color={page ? 'transparent' : 'secondary'}
    >
      <Container maxWidth='lg' disableGutters>
        <Toolbar>
          <Link href={ROUTES.LANDING} underline='none'>
            <Box display='flex' alignItems='center'>
              <LogoIcon viewBox='0 0 40 40' />
              <Typography
                variant='h4'
                className={classes.brandName}
                style={{ color: grey['100'] }}
              >
                <strong>LeanUrls</strong>
              </Typography>
            </Box>
          </Link>
          <Box
            component='nav'
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            flexGrow={1}
          >
            {user && !user.isAnonymous ? (
              <>
                <IconButton
                  size='small'
                  aria-label='menu'
                  aria-controls='menu'
                  aria-haspopup='true'
                  onClick={() => router.push(ROUTES.SETTINGS)}
                >
                  {
                    // @ts-expect-error
                    <Avatar alt={user.displayName} src={user.photoURL} />
                  }
                </IconButton>
                <StyledButton
                  disableElevation
                  onClick={() => {
                    logout(() => handleLogout());
                    router.push(ROUTES.LOGIN);
                  }}
                  className={classes.button}
                >
                  Log out
                </StyledButton>
              </>
            ) : (
              <>
                <StyledButton
                  disableElevation
                  color='primary'
                  variant='contained'
                  style={{ marginLeft: 16 }}
                  onClick={() => router.push(ROUTES.SIGNUP)}
                >
                  Sign up
                </StyledButton>
                <StyledButton
                  disableElevation
                  onClick={() => router.push(ROUTES.LOGIN)}
                  className={classes.button}
                >
                  Login
                </StyledButton>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
