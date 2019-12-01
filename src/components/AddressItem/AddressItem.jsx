import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../../util/axios';
import { SHOW_MODAL, REMOVE_ADDRESS } from '../../util/constants';
import { connect } from '../../util/appContext';
const useStyles = makeStyles({
  card: {
    minWidth: 100,
    marginBottom: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const AddressItem = props => {
  const { info, readOnly = false } = props;
  const doNotDisplay = [
    'id',
    'deleted_at',
    'created_at',
    'updated_at',
    'user_id',
  ];
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {info.street_address}
        </Typography>
        {Object.entries(info)
          .filter(item => doNotDisplay.indexOf(item[0]) === -1)
          .map(([key, value], s) => {
            return <React.Fragment key={key}>{value},</React.Fragment>;
          })}
      </CardContent>
      {!readOnly && (
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              const confirm = window.confirm(
                'Are you sure to delete this address?',
              );
              if (confirm) {
                axios
                  .delete('/addresses/' + info.id)
                  .then(res => {
                    console.log('DEETE', res.data);
                    props.showModal({
                      onClickOK: () => {
                        props.removeAddress(info.id);
                      },
                      title: 'Address deleted successfully',
                    });
                  })
                  .catch(e => console.warn('ERRR', e));
              }
            }}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    showModal: options => dispatch({ type: SHOW_MODAL, payload: options }),
    removeAddress: id => dispatch({ type: REMOVE_ADDRESS, payload: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressItem);
