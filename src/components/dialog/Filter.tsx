import React from 'react'
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Theme, withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 8,
    letterSpacing: 1.1,
    textTransform: 'capitalize',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}))(Button);

interface FilterProps {
  open: boolean
  handleClose: () => void
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFilterFromChange: (date: Date | null) => void
  handleFilterToChange: (date: Date | null) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  values: {
    field: string
    filterFrom: Date | null
    filterTo: Date | null
  }
}

export default function Filter(props: FilterProps) {
  const {
    open,
    handleClose,
    handleFieldChange,
    handleFilterFromChange,
    handleFilterToChange,
    handleSubmit,
    values: { filterFrom, filterTo, field }
  } = props

  const errors = () => {
    if (!filterTo) return true
    if (filterFrom) {
      if (filterFrom > filterTo) return true
    }
    return false
  }
  
  const helperText = errors()
    ? "'from' cannot be a later date than 'to'"
    : 'Select date to filter to'

  return (
    <Dialog aria-labelledby="form-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Filter</DialogTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DialogContent>
          <DialogContentText component='div'>
            <form onSubmit={(e) => {
              handleSubmit(e)
              !errors() && handleClose()
            }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    name="field"
                    fullWidth
                    select
                    label="Field"
                    value={field}
                    onChange={handleFieldChange}
                    helperText="Select a field to filter on"
                  >
                    <MenuItem value='createdAt'>Created At</MenuItem>
                    <MenuItem disabled value='lastHit'>Last Hit</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <KeyboardDateTimePicker
                    disableToolbar
                    disableFuture
                    fullWidth
                    name="from"
                    id="from"
                    label="From"
                    helperText='Select date to filter from'
                    value={filterFrom}
                    onChange={handleFilterFromChange}
                    KeyboardButtonProps={{
                      'aria-label': 'Select date to filter from',
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <KeyboardDateTimePicker
                    disableToolbar
                    disableFuture
                    fullWidth
                    name="to"
                    id="to"
                    label="Pick Date To"
                    value={filterTo}
                    onChange={handleFilterToChange}
                    KeyboardButtonProps={{
                      'aria-label': 'Select date to filter to',
                    }}
                    helperText={helperText}
                    error={errors()}
                  />
                </Grid>
              </Grid>
              <Box display='flex' alignItems='center' justifyContent='flex-end'>
                <StyledButton onClick={handleClose}>
                  Cancel
                </StyledButton>
                <StyledButton
                  type='submit'
                  color='secondary'
                  variant='contained'
                >
                  Submit
                </StyledButton>
              </Box>
            </form>
          </DialogContentText>
        </DialogContent>
      </MuiPickersUtilsProvider>
    </Dialog>
  )
}
