import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Tooltip, Typography } from '@material-ui/core';
import EditButton from './buttons';
import firebase from '../../lib/firebase';
import { useUpdateUserMutation } from '../../generated/graphql';

interface UserPhotoProps {
  user: firebase.User;
  classes: any;
}

export default function UserPhoto(props: UserPhotoProps) {
  const [imgErrs, setImgErrs] = useState<string[]>([]);
  const [isEditing, setEditing] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [updateUser] = useUpdateUserMutation();
  const { user, classes } = props;
  const storageRef = firebase.storage().ref();

  const validateImg = (file: File) => {
    const errs = [];
    const validTypes = ['image/png', 'image/jpeg', 'image/gif'];

    if (validTypes.every((type) => file.type !== type)) {
      errs.push(`'${file.type}' is not a supported format`);
    }

    if (file.size > 150000) {
      errs.push(`'${file.name}' is too large, please pick a smaller file`);
    }
    return errs;
  };

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgErrs([]);
    setEditing(true);
    const file = e.target.files?.item(0);

    if (file) {
      const errs = validateImg(file);

      if (errs.length > 0) {
        setImgErrs(errs);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImg(reader.result as string | null);
        setImgFile(file);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setImgErrs([]);
    setImg(null);
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      if (imgFile) {
        const username = user.email.split('@')[0];
        const listRef = storageRef.child(username);
        const imgList = await listRef.listAll();
        imgList.items.map((item) => item.delete());

        const imgRef = storageRef.child(`${username}/${imgFile.name}`);
        await imgRef.put(imgFile);
        const downloadUrl = await imgRef.getDownloadURL();
        await user.updateProfile({
          photoURL: downloadUrl,
        });
        await updateUser({ variables: { key: 'avatar', value: downloadUrl } });
        setEditing(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={`${classes.section} ${classes.dFlex}`}>
      <div className={classes.flex}>
        <Typography variant='h6' paragraph>
          Photo
        </Typography>
        <div className={`${classes.dFlex} ${classes.flex}`}>
          <div className={`${classes.flex} ${classes.mw480}`}>
            <Typography variant='subtitle2' gutterBottom>
              Recommended size is a square image of not more than 150kb
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              File type: JPG, PNG or GIF
            </Typography>
            {imgErrs &&
              imgErrs.map((err, i) => (
                <Typography
                  key={i}
                  gutterBottom
                  variant='subtitle1'
                  color='error'
                >
                  <small>{err}</small>
                </Typography>
              ))}
          </div>
          <input
            accept='image/*'
            id='image-upload'
            type='file'
            onChange={onImgChange}
            style={{ display: 'none' }}
          />
          <label htmlFor='image-upload'>
            <Tooltip title='Click to select a new image'>
              <IconButton
                size='small'
                aria-label='upload picture'
                component='span'
                className={classes.imgButton}
              >
                <Avatar
                  alt={imgFile?.name}
                  src={img ? img : user.photoURL}
                  className={classes.avatar}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.cameraIcon}>
                  <PhotoCamera />
                </span>
              </IconButton>
            </Tooltip>
          </label>
        </div>
      </div>
      {isEditing && (
        <EditButton
          classes={classes}
          editing={isEditing}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleEdit={() => setEditing(true)}
        />
      )}
    </section>
  );
}
