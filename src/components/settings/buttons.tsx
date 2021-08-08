import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 8,
    height: theme.spacing(4.5),
    fontSize: '0.8rem',
    textTransform: 'capitalize',
    marginLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
  },
}))(Button);

interface EditButtonProps {
  classes: any;
  editing: boolean;
  handleCancel: () => void;
  handleSave: () => void;
  handleEdit: () => void;
}

export default function EditButton(props: EditButtonProps) {
  const { classes, editing, handleCancel, handleEdit, handleSave } = props;

  return (
    <div className={classes.dFlex}>
      {editing ? (
        <>
          <StyledButton variant='outlined' onClick={() => handleCancel()}>
            Cancel
          </StyledButton>
          <StyledButton
            variant='outlined'
            color='secondary'
            onClick={() => handleSave()}
          >
            Save
          </StyledButton>
        </>
      ) : (
        <StyledButton
          variant='outlined'
          color='secondary'
          onClick={() => handleEdit()}
        >
          Edit
        </StyledButton>
      )}
    </div>
  );
}
