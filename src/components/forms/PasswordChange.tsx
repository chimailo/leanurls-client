import React from "react";
import { FormikProps } from "formik";
import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      maxWidth: 400,
      margin: 'auto',
    },
    field: {
      marginTop: theme.spacing(3),
    },
    button: {
      borderRadius: 8,
      fontSize: '1rem',
      textTransform: 'capitalize',
      marginTop: theme.spacing(4),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

export default function SignupForm({formik}: {formik: FormikProps<{
  password: string;
  password2: string;
}>}) {
  const classes = useStyles();
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = formik
  
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        name='password'
        placeholder='Enter new password'
        label='Password'
        type='password'
        size='small'
        className={classes.field}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.password && touched.password && errors.password}
        error={!!(touched.password && errors.password)}
        fullWidth
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
                <LockIcon color='disabled' />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name='password2'
        placeholder='Confirm your new password'
        label='Confirm Your Password'
        type='password'
        size='small'
        className={classes.field}
        value={values.password2}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={ errors.password2 && touched.password2 && errors.password2}
        error={!!(touched.password2 && errors.password2)}
        fullWidth
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
                <LockIcon color='disabled' />
            </InputAdornment>
          ),
        }}
      />
      <Button
        type='submit'
        color='primary'
        variant='contained'
        className={classes.button}
        disabled={isSubmitting}
        disableElevation
        fullWidth
      >
        Change Password
      </Button>
    </form>
  )
}