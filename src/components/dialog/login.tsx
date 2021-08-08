import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { TextField, useTheme, useMediaQuery } from '@material-ui/core';
import firebase from '../../lib/firebase';
import { useUser } from '../../lib/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginTop: theme.spacing(3),
    },
  })
);

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 8,
    letterSpacing: 1.1,
    textTransform: 'capitalize',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}))(Button);

interface AuthError {
  code: string;
  message: string;
}

interface LoginDialogProps {
  open: boolean;
  handleClose: () => void;
  handleEditing: () => void;
  handleReAuth?: () => void;
}

interface InputProps {
  email: string;
  password: string;
}

const initState = {
  email: '',
  password: 'password',
};

export default function LoginDialog({
  open,
  handleClose,
  handleEditing,
  handleReAuth,
}: LoginDialogProps) {
  const [error, setError] = useState<AuthError | null>(null);
  const [alert, setAlert] = useState(false);
  const [values, setValues] = useState<InputProps>(initState);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const { user } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { email, password }: InputProps
  ) => {
    e.preventDefault();
    try {
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      await user?.reauthenticateWithCredential(credential);
      handleReAuth && handleReAuth();
      setValues(initState);
      setAlert(false);
      setError(null);
      handleClose();
      handleEditing();
    } catch (error) {
      const errorCode =
        error.code === 'auth/invalid-email'
          ? 'Invalid email'
          : error.code === 'auth/user-disabled'
          ? 'Account disabled'
          : 'User not found';
      const errorMsg =
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
          ? 'Either no user with that email exist or the password is invalid.'
          : error.message;

      setError({
        code: errorCode,
        message: errorMsg,
      });
      setAlert(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      scroll='paper'
      aria-labelledby='login'
      aria-describedby='login'
    >
      <DialogTitle id='login'>This action requires a recent login</DialogTitle>
      <DialogContent>
        {alert && (
          <Alert severity='error' onClose={() => setAlert(false)}>
            <AlertTitle>{error?.code}</AlertTitle>
            {error?.message}
          </Alert>
        )}
        <form onSubmit={(e) => handleSubmit(e, values)}>
          <TextField
            name='email'
            label='Email'
            type='text'
            size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <MailIcon color='disabled' />
                </InputAdornment>
              ),
            }}
            variant='outlined'
            className={classes.field}
            value={values.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name='password'
            label='Password'
            type='password'
            size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <LockIcon color='disabled' />
                </InputAdornment>
              ),
            }}
            variant='outlined'
            className={classes.field}
            value={values.password}
            onChange={handleChange}
            fullWidth
          />
          <Box display='flex' alignItems='center' justifyContent='flex-end'>
            <StyledButton
              onClick={() => {
                setValues(initState);
                setError(null);
                setAlert(false);
                handleClose();
              }}
            >
              Cancel
            </StyledButton>
            <StyledButton
              type='submit'
              color='secondary'
              variant='contained'
              // disabled={isSubmitting}
            >
              Submit
            </StyledButton>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
