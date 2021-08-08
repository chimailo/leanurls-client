import React, { useEffect, useState } from 'react';
import router from 'next/router';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core';

import CircularLoading from '../src/components/Loading';
import DeleteAccount from '../src/components/settings/deleteAccount';
import PasswordInput from '../src/components/settings/password';
import UserPhoto from '../src/components/settings/photo';
import UserInput from '../src/components/settings/name';
import Wrapper from '../src/components/Wrapper';
import { getToken } from '../src/lib/utils';
import { useUser } from '../src/lib/hooks';
import { useUpdateUserMutation } from '../src/generated/graphql';
import * as ROUTES from '../src/lib/routes';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '../src/lib/validators';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 768,
      '& > *': {
        padding: theme.spacing(4, 0),
      },
    },
    section: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
    flex: {
      flex: '1 1 100%',
    },
    borderBottom: {
      borderBottom: `1px solid ${theme.palette.grey['200']}`,
    },
    dFlex: {
      display: 'flex',
    },
    mw480: {
      maxWidth: 480,
    },
    margin: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    imgButton: {
      position: 'relative',
      padding: 0,
      marginLeft: theme.spacing(2),
      '&:hover $imageBackdrop': {
        backgroundColor: fade(theme.palette.secondary.main, 0.6),
      },
      '&:hover $cameraIcon': {
        color: theme.palette.grey[200],
      },
    },
    avatar: {
      width: 80,
      height: 80,
      [theme.breakpoints.down('xs')]: {
        width: 60,
        height: 60,
      },
    },
    imageBackdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
      borderRadius: '50%',
      backgroundColor: fade(theme.palette.secondary.main, 0),
      transition: theme.transitions.create('background-color'),
    },
    cameraIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 3,
      opacity: 1,
      color: 'transparent',
      transition: theme.transitions.create('color'),
    },
  })
);

type FieldProps = 'name' | 'email' | 'password';

interface Alert extends AlertProps {
  message: string;
}

interface InputErrorProps {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const ErrorInitState: InputErrorProps = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

export default function Settings() {
  const [isEditing, setEditing] = useState<FieldProps>();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [err, setErr] = useState<InputErrorProps>();
  const classes = useStyles();
  const { user, isLoading } = useUser();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (!getToken() && user && user.isAnonymous) {
      router.replace(ROUTES.LOGIN);
    }
  }, []);

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(null);
  };

  const isNameValid = (value: string) =>
    validateName()
      .validate(value)
      .catch((e) => setErr({ ...ErrorInitState, name: e.errors }));
  const isEmailValid = (value: string) =>
    validateEmail()
      .validate(value)
      .catch((e) => setErr({ ...ErrorInitState, email: e.errors }));
  const isPasswordValid = (value: string) =>
    validatePassword()
      .validate(value)
      .catch((e) => setErr({ ...ErrorInitState, password: e.errors }));
  const isPassword2Valid = (value: string) =>
    validatePasswordConfirm()
      .validate(value)
      .catch((e) => setErr({ ...ErrorInitState, password2: e.errors }));

  const handleCancel = () => {
    isEditing === 'name' && setName(user?.displayName as string);
    isEditing === 'email' && setEmail(user?.email as string);
    if (isEditing === 'password') {
      setPassword('');
      setPassword2('');
    }

    setErr(undefined);
    setEditing(undefined);
  };

  const handleSaveName = async () => {
    try {
      if (isNameValid(name)) {
        await user?.updateProfile({ displayName: name });
        await updateUser({ variables: { key: 'name', value: name } });
        setEditing(undefined);
      }
      setAlert({
        severity: 'success',
        message: 'Successfully updated your name',
      });
    } catch (error) {
      setAlert({
        severity: 'error',
        message:
          'An error, most probably a network error, has occured. Check your connection and try again.',
      });
    }
  };
  const handleSaveEmail = async () => {
    try {
      if (isEmailValid(email)) {
        await user?.updateEmail(email);
        await updateUser({ variables: { key: 'email', value: email } });
        setEditing(undefined);
      }
      setAlert({
        severity: 'success',
        message: 'Successfully updated your email',
      });
    } catch (error) {
      setAlert({
        severity: 'error',
        message:
          'An error, most probably a network error, has occured. Check your connection and try again.',
      });
    }
  };
  const handleSavePassword = async () => {
    try {
      if (isPasswordValid(password) && isPassword2Valid(password2)) {
        await user?.updatePassword(password);
        setEditing(undefined);
        setAlert({
          severity: 'success',
          message: 'Successfully changed your password',
        });
      }
    } catch (error) {
      setAlert({
        severity: 'error',
        message:
          'An error occured, most probably a network error. Check your connection and try again.',
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword2(e.target.value);

  const handleNameEdit = () => {
    setErr(undefined);
    setEditing('name');
  };

  const handleEditing = (property: 'email' | 'password') => {
    setErr(undefined);
    setEditing(property);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='100vh'
        >
          <CircularLoading size={40} />
        </Box>
      ) : (
        <Container maxWidth='md' classes={{ maxWidthMd: classes.container }}>
          <Snackbar
            open={!!alert}
            autoHideDuration={6000}
            onClose={handleAlertClose}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleAlertClose}
              elevation={6}
              variant='filled'
              severity={alert?.severity}
            >
              {alert?.message}
            </Alert>
          </Snackbar>
          <UserInput
            user={user}
            title='Your Name'
            classes={classes}
            value={name ? name : (user?.displayName as string)}
            err={err?.name}
            editing={isEditing === 'name'}
            handleEdit={handleNameEdit}
            handleBlur={() => isNameValid(name)}
            handleChange={handleNameChange}
            handleCancel={handleCancel}
            handleSave={handleSaveName}
          />
          <UserPhoto user={user} classes={classes} />
          <UserInput
            user={user}
            title='Email'
            classes={classes}
            value={email ? email : (user?.email as string)}
            err={err?.email}
            editing={isEditing === 'email'}
            handleEditing={handleEditing}
            handleBlur={() => isEmailValid(email)}
            handleChange={handleEmailChange}
            handleCancel={handleCancel}
            handleSave={handleSaveEmail}
          />
          <PasswordInput
            title='Password'
            classes={classes}
            values={{ password, password2 }}
            err={{ password: err?.password, password2: err?.password2 }}
            handleEditing={handleEditing}
            editing={isEditing === 'password'}
            handleCancel={handleCancel}
            handleSave={handleSavePassword}
            handlePasswordBlur={() => isPasswordValid(password)}
            handlePassword2Blur={() => isPassword2Valid(password2)}
            handlePasswordChange={handlePasswordChange}
            handlePassword2Change={handlePassword2Change}
          />
          <DeleteAccount classes={classes} />
        </Container>
      )}
    </Wrapper>
  );
}
