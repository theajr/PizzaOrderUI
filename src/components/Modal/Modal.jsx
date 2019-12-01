import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { connect } from '../../util/appContext';
import { SHOW_MODAL, HIDE_MODAL } from '../../util/constants';

const Modal = ({ modalConf, hideModal, ...rest }) => {
  const {
    active = false,
    options: {
      title = '',
      description,
      confirmLable = 'OK',
      cancelLabel,
      onClickOK = () => {},
      onClickCancel = () => {},
    },
  } = modalConf || { options: {} };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    hideModal();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={active}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      {description && (
        <DialogContent>
          {React.createElement(description.type, description.props)}
        </DialogContent>
      )}
      <DialogActions>
        {cancelLabel && (
          <Button
            onClick={() => {
              onClickCancel();
              handleClose();
            }}
            color="secondary"
            variant="contained"
          >
            {cancelLabel}
          </Button>
        )}

        <Button
          onClick={() => {
            onClickOK();

            handleClose();
          }}
          color="primary"
          variant="contained"
          autoFocus
        >
          {confirmLable}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ modalConf }) => {
  return {
    modalConf,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showModal: options => dispatch({ type: SHOW_MODAL, payload: options }),
    hideModal: () => dispatch({ type: HIDE_MODAL }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
