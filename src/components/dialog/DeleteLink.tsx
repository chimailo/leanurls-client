import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme, useMediaQuery } from '@material-ui/core';

interface DeleteLinkDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export default function DeleteLinkDialog(props: DeleteLinkDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { open, handleClose, handleDelete } = props;

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      scroll='paper'
      aria-labelledby='Delete link'
      aria-describedby='Delete link'
    >
      <DialogTitle id='Delete link'>Delete link?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action is irreversible. Are you sure you want to delete this
          link?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disableElevation
          variant='contained'
          color='primary'
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
