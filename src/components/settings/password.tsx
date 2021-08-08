import React, { useState } from 'react';
import clsx from 'clsx';
import { InputBase, Typography } from '@material-ui/core';
import EditButton from '../../components/settings/buttons';
import LoginDialog from '../../components/dialog/login';

interface PasswordInputProps {
  title: string;
  values: { password: string; password2: string };
  err: { password?: string; password2?: string };
  classes: any;
  editing: boolean;
  handleCancel: () => void;
  handleSave: () => Promise<void>;
  handlePasswordBlur: () => void;
  handlePassword2Blur: () => void;
  handleEditing: (property: 'email' | 'password') => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePassword2Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput(props: PasswordInputProps) {
  const [openModal, setModal] = useState(false);
  const {
    title,
    values: { password, password2 },
    classes,
    err,
    editing,
    handleEditing,
    handlePasswordBlur,
    handlePassword2Blur,
    handlePasswordChange,
    handlePassword2Change,
    handleCancel,
    handleSave,
  } = props;

  return (
    <section className={`${classes.section} ${classes.dFlex}`}>
      <div className={classes.flex}>
        <Typography variant='h6' paragraph>
          {title}
        </Typography>
        {editing ? (
          <form className={classes.mw480}>
            <InputBase
              fullWidth
              autoFocus
              type='password'
              color='secondary'
              name='password'
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={clsx(classes.flex, classes.borderBottom)}
              error={!!err?.password}
              inputProps={{
                placeholder: title,
                'aria-label': title,
              }}
            />
            {err?.password && (
              <Typography gutterBottom variant='subtitle1' color='error'>
                <small>{err.password}</small>
              </Typography>
            )}
            <InputBase
              fullWidth
              type='password'
              color='secondary'
              name='password2'
              value={password2}
              onChange={handlePassword2Change}
              onBlur={handlePassword2Blur}
              className={clsx(
                classes.flex,
                classes.borderBottom,
                classes.margin
              )}
              error={!!err?.password2}
              inputProps={{
                placeholder: 'Confirm your password',
                'aria-label': 'Confirm your password',
              }}
            />
            {err?.password2 && (
              <Typography gutterBottom variant='subtitle1' color='error'>
                <small>{err?.password2}</small>
              </Typography>
            )}
          </form>
        ) : (
          <div className={classes.mw480}>
            <Typography variant='subtitle2'>
              Click the edit button to change your password. This requires you
              to reauthenticate.
            </Typography>
          </div>
        )}
      </div>
      <EditButton
        classes={classes}
        editing={editing}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleEdit={() => setModal(true)}
      />
      <LoginDialog
        open={openModal}
        handleClose={() => setModal(false)}
        handleEditing={() => handleEditing('password')}
      />
    </section>
  );
}
