import React from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const AlertMessage = ({ open, onClose, message }) => {
  const horizontal = 'right';
  const vertical = 'top';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        severity="success"
        variant="filled"
        sx={{ width: '100%'}}
      >{message}</Alert>
    </Snackbar>
  );
};

export default AlertMessage;
