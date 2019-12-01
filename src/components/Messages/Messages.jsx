import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from '../../util/appContext';
import { REMOVE_MESSAGE } from '../../util/constants';

const Messages = props => {
  return props.errors.map(err => (
    <Snackbar
      key={err.id}
      open={true}
      onClose={(e, r) => {
        props.removeMessage(err.id);
      }}
      // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={2000}
      ContentProps={{}}
      message={<span>{err.message}</span>}
    />
  ));
};

const mapStateToProps = state => {
  return {
    errors: state.errors || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMessage: msg => dispatch({ type: REMOVE_MESSAGE, payload: msg }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
