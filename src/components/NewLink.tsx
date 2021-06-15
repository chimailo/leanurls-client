import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Theme, useTheme, withStyles } from '@material-ui/core/styles';
import { useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import NewLinkForm from './forms/NewLink';
import { validateLink, validateAlias } from '../lib/validators';

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 8,
    letterSpacing: 1.1,
    textTransform: 'capitalize',
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    fontWeight: theme.typography.fontWeightBold,
  },
}))(Button);
  
interface NewLinkModalProps {
  isOpen: boolean;
  handleClose: () => void;
};

export default function NewLinkModal(props: NewLinkModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const {isOpen, handleClose} = props

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='Create New Link'
    >
      <DialogTitle id='createNewLink'>Create new link.</DialogTitle>
      <Formik
        initialValues={{
          link: '',
          alias: '',
          domain: 'https://leanurls.web.app/'
        }}
        validateOnChange={false}
        validationSchema={Yup.object({
          alias: validateAlias(),
          link: validateLink(),
        })}
        onSubmit={async (values) => {}}
      >
        {(props) => (
          <>
            <DialogContent>
              <DialogContentText>
                <NewLinkForm formik={props} modal />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <StyledButton onClick={handleClose}>Cancel</StyledButton>
              <StyledButton
                type='submit'
                color='primary'
                variant='contained'
                style={{color: 'white'}}
                onClick={() => {}}
              >
                Create url
              </StyledButton>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  )
}
