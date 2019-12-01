import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  placeholder: {
    height: 40,
  },
}));

const Loader = props => {
  const classes = useStyles();

  const { show = false, message = 'Loading...' } = props;

  return show ? (
    <div className={classes.root}>
      <div className={classes.placeholder}>
        <Fade
          in={show}
          style={{
            transitionDelay: '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </div>
      <h3>{message}</h3>
    </div>
  ) : (
    <React.Fragment>{props.children}</React.Fragment>
  );
};

export default Loader;
