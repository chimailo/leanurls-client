import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import LoginDialog from '../../components/dialog/login';
import { logout } from '../../lib/utils';
import { useDeleteUserMutation } from '../../generated/graphql';
import { useUser } from '../../lib/hooks';
import * as ROUTES from '../../lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    danger: {
      borderBottom: `1px solid ${theme.palette.error.light}`,
    },
    mTop: {
      marginTop: theme.spacing(3),
    },
    button: {
      borderRadius: 8,
      whiteSpace: 'nowrap',
      fontSize: '0.8rem',
      textTransform: 'capitalize',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
  })
);

export default function DeleteAccount({ classes }: { classes: any }) {
  const [openModal, setModal] = useState(false);
  const [reAuth, setReAuth] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const { handleLogout, user } = useUser();
  const router = useRouter();
  const styles = useStyles();

  return (
    <section className={`${classes.section}`}>
      <div className={styles.danger}>
        <Typography gutterBottom variant='h5' color='error'>
          Danger Zone
        </Typography>
      </div>
      <div className={`${styles.mTop} ${classes.mw480}`}>
        <Typography variant='h6' paragraph>
          Delete Account
        </Typography>
        <Typography variant='subtitle2' component='p' gutterBottom>
          Click the 'Delete Account' button to delete your account. This
          requires you to reauthenticate.
        </Typography>
        <Typography variant='subtitle2' component='p' gutterBottom>
          By deleting your account, all of your links and corresponding data
          would also be deleted
        </Typography>
      </div>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          disableElevation
          variant='contained'
          onClick={async () => {
            if (reAuth) {
              await user?.delete();
              await deleteUser();
              logout(() => handleLogout());
              router.replace(ROUTES.LANDING);
            } else {
              setModal(true);
            }
          }}
          className={styles.button}
        >
          Delete Account
        </Button>
      </Box>
      <LoginDialog
        open={openModal}
        handleClose={() => setModal(false)}
        handleEditing={() => {}}
        handleReAuth={() => setReAuth(true)}
      />
    </section>
  );
}
