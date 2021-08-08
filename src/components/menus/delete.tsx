import React, { useState } from 'react';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteLinkDialog from '../dialog/DeleteLink';

interface DeleteProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleDelete: () => Promise<void>;
  handleDisable: () => Promise<void>;
}

export default function DeleteMenu(props: DeleteProps) {
  const [openModal, setModal] = useState(false);
  const { anchorEl, handleClose, handleDelete, handleDisable } = props;

  return (
    <Menu
      id='fade-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      {/* <MenuItem
        onClick={() => {
          handleDisable();
          handleClose();
        }}
      >
        Disable Link
      </MenuItem> */}
      <MenuItem
        onClick={() => {
          setModal(true);
          handleClose();
        }}
      >
        Delete Link
      </MenuItem>
      <DeleteLinkDialog
        open={openModal}
        handleClose={() => setModal(false)}
        handleDelete={handleDelete}
      />
    </Menu>
  );
}
