import React from "react";
import {  FormikProps } from "formik";
import { Box, Typography, Button, TextField, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LinkIcon, WandIcon } from '../svg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontWeight: theme.typography.fontWeightMedium,
      marginLeft: theme.spacing(1),
    },
    form: {
      maxWidth: 400,
      margin: 'auto',
    },
    button: {
      borderRadius: 8,
      letterSpacing: 1.1,
      textTransform: 'capitalize',
      marginTop: theme.spacing(3),
      padding: theme.spacing(1.5, 4),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

export default function NewLinkForm({ formik, modal }: { modal?: boolean, formik: FormikProps<{
  alias: string
  link: string
  domain: string
}>}) {
  const classes = useStyles()
  const { values, isSubmitting, handleChange, handleBlur, handleSubmit } = formik

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' alignItems='center' mt={3} mb={1}>
        <LinkIcon viewBox="0 0 511.999 511.999" color='secondary' fontSize='small' />
        <Typography
          variant='subtitle1'
          align='center'
          color='secondary'
          className={classes.label}
        >
          Enter a long URL to make a LeanUrl
        </Typography>
      </Box>
      <TextField
        name='link'
        type='text'
          variant='outlined'
          color='secondary'
        value={values.link}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
      />
      <Box display='flex' alignItems='center' mt={3} mb={1}>
        <WandIcon viewBox="0 0 512 512" color='secondary' fontSize='small' />
        <Typography
          variant='subtitle1'
          align='center'
          color='secondary'
          className={classes.label}
        >
          Customize your link
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={6} >
          <TextField
            name='domain'
            type='text'
              variant='outlined'
              color='secondary'
            fullWidth
            disabled
          value={values.domain}
          />
        </Grid>
        <Grid item xs={12} md={6} >
        <TextField
          name='alias'
          type='text'
            variant='outlined'
            color='secondary'
            placeholder='alias'
          value={values.alias}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        />
        </Grid>
      </Grid>
      {!modal && 
        <Button
          type='submit'
          size='large'
          color='primary'
          variant='contained'
          className={classes.button}
          disableElevation
          fullWidth
          disabled={isSubmitting}
        >
          Make LeanUrl
        </Button>
      }
    </form>
  )
}