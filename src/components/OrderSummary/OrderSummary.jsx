import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// export default OrderSummary;
import React from 'react';
import clsx from 'clsx';

const TAX_RATE = 0.07;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
  },
  expand: {
    float: 'right',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const precision = n => parseFloat(Math.round(n * 100) / 100).toFixed(2);

export default function SpanningTable(props) {
  const classes = useStyles();
  const { address = {}, items = [], amount, created_at } = props.info;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const pizzaItems = items.map(item => {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.pizza.title}</TableCell>
        <TableCell align="right">${precision(item.amount)}</TableCell>
        <TableCell align="right">{item.quantity}</TableCell>
        <TableCell align="right">
          ${precision(item.amount * item.quantity)}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Paper className={classes.root}>
      <Paper
        elevation={0}
        className={classes.root}
        style={{ display: 'flex', alignItems: 'center', padding: 8 }}
      >
        <span>
          {items.length} Pizza{items.length > 1 ? 's' : ''} Delived to{' '}
          {address.street_address} on{' '}
          <strong style={{ color: 'green' }}>
            {new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(created_at))}
          </strong>
        </span>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Pizza Name</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Quntity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pizzaItems}
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right">
                <b>Total</b>
              </TableCell>
              <TableCell align="right">
                <b>${precision(amount)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Collapse>
    </Paper>
  );
}
