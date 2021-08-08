import React, { useState } from 'react';
import clsx from 'clsx';
import { InputBase, Typography } from '@material-ui/core';
import EditButton from './buttons';
import firebase from '../../lib/firebase';
import LoginDialog from '../dialog/login';

interface UsersInputProps {
  user: firebase.User;
  title: string;
  value: string;
  err?: string;
  classes: any;
  editing: boolean;
  handleBlur: () => void;
  handleEdit: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditing: (property: 'email' | 'password') => void;
  handleCancel: () => void;
  handleSave: () => Promise<void>;
}

export default function UserInput(props: UsersInputProps) {
  const [openModal, setModal] = useState(false);
  const {
    user,
    title,
    value,
    classes,
    err,
    editing,
    handleEdit,
    handleBlur,
    handleChange,
    handleEditing,
    handleCancel,
    handleSave,
  } = props;
  const isEditingEmail = title.toLowerCase() === 'email';

  return (
    <section className={`${classes.section} ${classes.dFlex}`}>
      <div className={classes.flex}>
        <Typography variant='h6' paragraph>
          {title}
        </Typography>
        <div className={classes.mw480}>
          {editing ? (
            <form>
              <InputBase
                fullWidth
                autoFocus
                color='secondary'
                name='displayName'
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx(classes.flex, classes.borderBottom)}
                error={!!err}
                inputProps={{
                  'aria-label': title,
                }}
              />
              {err && (
                <Typography gutterBottom variant='subtitle1' color='error'>
                  <small>{err}</small>
                </Typography>
              )}
            </form>
          ) : (
            <Typography
              noWrap
              variant='subtitle1'
              className={clsx(classes.flex, classes.borderBottom)}
              style={{ padding: '2px 0' }}
            >
              {title.toLowerCase() === 'email' ? user.email : user.displayName}
            </Typography>
          )}
        </div>
      </div>
      <EditButton
        classes={classes}
        editing={editing}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleEdit={() => (isEditingEmail ? setModal(true) : handleEdit())}
      />
      <LoginDialog
        open={openModal}
        handleClose={() => setModal(false)}
        handleEditing={() => handleEditing('email')}
      />
    </section>
  );
}
