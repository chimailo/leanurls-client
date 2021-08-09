import React, { useState } from 'react';
import * as Yup from 'yup';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { useRouter } from 'next/router';
import { ValidationError } from 'yup';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import CircularLoading from '../Loading';
import firebase from '../../lib/firebase';
import NewLinkForm from '../forms/NewLink';
import { validateLink, validateAlias } from '../../lib/validators';
import { TableDataQuery, useCreateLinkMutation } from '../../generated/graphql';
import { setToken } from '../../lib/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

interface NewLinkModalProps {
  open: boolean;
  handleClose: () => void;
  handleRefetch?: () => Promise<ApolloQueryResult<TableDataQuery>>;
}

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

export default function NewLinkModal(props: NewLinkModalProps) {
  const [errors, setError] = useState<ApolloError>();
  const [values, setValues] = useState<FormProps>(initialValues);
  const [formErr, setFormErr] = useState<FormProps>(initialValues);
  const [isSubmitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<TouchedProps>(initialTouched);
  const { open, handleClose, handleRefetch } = props;
  const classes = useStyles();
  const router = useRouter();
  const user = firebase?.auth().currentUser;

  const [createLink, { loading }] = useCreateLinkMutation({
    notifyOnNetworkStatusChange: true,
  });

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
      setSubmitting(true);
      await createLink({ variables: values });
      if (handleRefetch) await handleRefetch();
      handleReset();
      handleClose();
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
    <Dialog
      aria-labelledby='form-dialog-title'
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id='form-dialog-title'>Create New Link</DialogTitle>
      {loading ? (
        <div className={classes.flexCenter}>
          <CircularLoading />
        </div>
      ) : (
        errors && (
          <Alert severity='error' onClose={() => setError(undefined)}>
            {errors?.graphQLErrors.map((err, i) => {
              const validationErrors =
                err.extensions?.exception.validationErrors;
              if (validationErrors) {
                return (
                  <>
                    <AlertTitle key={i}>{errors?.message}</AlertTitle>
                    {validationErrors.map(
                      (e: any) => e.constraints.UniqueAlias
                    )}
                  </>
                );
              }
              switch (err.extensions?.code) {
                case 'UNAUTHENTICATED':
                  return (
                    <>
                      <AlertTitle key={i}>Authentication Error</AlertTitle>
                      Click the button below to reauthenticate, then try again.
                      <br />
                      <Button
                        disableElevation
                        size='small'
                        color='default'
                        variant='contained'
                        className={classes.alertBtn}
                        onClick={async () => {
                          const token = await user?.getIdToken(true);
                          if (token) setToken(token);
                          setError(undefined);
                        }}
                      >
                        Reauthenticate
                      </Button>
                    </>
                  );
                default:
                  return (
                    <>
                      <AlertTitle key={i}>{errors?.name}</AlertTitle>
                      An unexpected error has occured, please try again
                      <br />
                      <Button
                        disableElevation
                        size='small'
                        color='default'
                        variant='contained'
                        onClick={() => router.reload()}
                        className={classes.alertBtn}
                      >
                        Retry
                      </Button>
                    </>
                  );
              }
            })}
          </Alert>
        )
      )}
      <DialogContent>
        <DialogContentText component='div'>
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
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
