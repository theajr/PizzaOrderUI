import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "../../util/appContext";
import { SHOW_MODAL, HIDE_MODAL } from "../../util/constants";

const Modal = ({ modalConf, ...rest }) => {
  const {
    active,
    options: { title, description, confirmLable, cancelLabel }
  } = modalConf || { options: {} };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={active}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>{title}</DialogTitle>
        {description && (
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            {cancelLabel}
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            {confirmLable}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ modalConf }) => {
  return {
    modalConf
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (options) => dispatch({ type: SHOW_MODAL, payload: options }),
    hideModal: () => dispatch({ type: HIDE_MODAL })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
