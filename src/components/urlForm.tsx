import React, { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import * as Yup from 'yup';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import { ValidationError } from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Paper from '@material-ui/core/Paper';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Box, Button, IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CircularLoading from './Loading';
import firebase from '../lib/firebase';
import NewLinkForm from './forms/NewLink';
import { useCreateLinkMutation } from '../generated/graphql';
import { useUser } from '../lib/hooks';
import { validateAlias, validateLink } from '../lib/validators';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      padding: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        maxWidth: '500px',
        boxShadow: theme.shadows[3],
        padding: theme.spacing(5, 6),
        margin: theme.spacing(4, 'auto'),
      },
    },
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
    },
    alertBtn: {
      textTransform: 'capitalize',
      marginTop: theme.spacing(1),
      color: theme.palette.secondary.main,
    },
  })
);

interface FormProps {
  link: string;
  alias: string;
}

interface TouchedProps {
  link: boolean;
  alias: boolean;
}

const initialValues: FormProps = {
  link: '',
  alias: '',
};

const initialTouched: TouchedProps = {
  link: false,
  alias: false,
};

export default function UrlForm() {
  const [errors, setError] = useState<ApolloError>();
  const [isCopied, setCopied] = useState(false);
  const [result, setResult] = useState<string>();
  const [values, setValues] = useState<FormProps>(initialValues);
  const [formErr, setFormErr] = useState<FormProps>(initialValues);
  const [isSubmitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<TouchedProps>(initialTouched);

  const { isAuthenticated } = useUser();
  const router = useRouter();
  const classes = useStyles();
  const [createLink, { data, loading }] = useCreateLinkMutation({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      setResult(data.createLink.alias);
    }
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 8000);
  }, [isCopied]);

  const copyToClipboard = (url: string) => {
    copy(url);
    setCopied(true);
  };

  const validationSchema = Yup.object({
    alias: validateAlias(),
    link: validateLink(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(values);
      setError(undefined);
      setSubmitting(true);
      if (!isAuthenticated) {
        await firebase.auth().signInAnonymously();
      }
      await createLink({ variables: values });
      handleReset();
      setSubmitting(false);
    } catch (err) {
      if (err.name === 'ValidationError') {
        setFormErr((prevState) => ({ ...prevState, [err.path!]: err.message }));
      } else {
        setError(err);
        setSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setFormErr(initialValues);
    setTouched(initialTouched);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prevState) => ({ ...prevState, [e.target.name]: true }));
    validationSchema
      .validate(values)
      .catch((err: ValidationError) =>
        setFormErr((prevState) => ({ ...prevState, [err.path!]: err.message }))
      );
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prevState) => ({ ...prevState, [e.target.name]: true }));
    setFormErr((prevState) => ({ ...prevState, [e.target.name]: '' }));
  };

  return (
    <Paper color='primary' elevation={0} className={classes.paper}>
      {loading ? (
        <div className={classes.flexCenter}>
          <CircularLoading />
        </div>
      ) : errors ? (
        <Alert severity='error' onClose={() => setError(undefined)}>
          {errors?.graphQLErrors.map((err) => {
            const validationErrors = err.extensions?.exception.validationErrors;
            if (validationErrors) {
              return (
                <>
                  <AlertTitle>{errors?.message}</AlertTitle>
                  {validationErrors.map((e: any) => e.constraints.UniqueAlias)}
                </>
              );
            }
            switch (err.extensions?.code) {
              case 'UNAUTHENTICATED':
                return (
                  <>
                    <AlertTitle>Authentication Error</AlertTitle>
                    Click the button below to reauthenticate.
                    <br />
                    <Button
                      disableElevation
                      size='small'
                      color='default'
                      variant='contained'
                      onClick={() => router.reload()}
                      className={classes.alertBtn}
                    >
                      Reauthenticate
                    </Button>
                  </>
                );
              default:
                return (
                  <>
                    <AlertTitle>{errors?.name}</AlertTitle>
                    An unexpected error has occured, please try again
                  </>
                );
            }
          })}
        </Alert>
      ) : (
        result && (
          <Box py={2} bgcolor={green[50]} className={classes.flexCenter}>
            {isCopied ? (
              <Typography variant='body2' component='span' color='secondary'>
                <small>copied</small>
              </Typography>
            ) : (
              <IconButton
                aria-label='copy to clipboard'
                onClick={() =>
                  copyToClipboard(
                    `${process.env.NEXT_PUBLIC_HOST_URL}_/${result}`
                  )
                }
              >
                <FileCopyOutlinedIcon fontSize='small' />
              </IconButton>
            )}
            <Box flexGrow={1}>
              <Typography variant='body2'>Your Url:</Typography>
              <Typography color='secondary'>
                {`${process.env.NEXT_PUBLIC_HOST_URL}_/${result}`}
              </Typography>
            </Box>
            <IconButton
              aria-label='close this panel'
              onClick={() => setResult(undefined)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
        )
      )}
      <NewLinkForm
        values={values}
        errors={formErr}
        isSubmitting={isSubmitting}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFocus={handleFocus}
      />
    </Paper>
  );
}
