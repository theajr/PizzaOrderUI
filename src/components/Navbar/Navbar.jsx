import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from '@reach/router';
import React from 'react';
import { LOGOUT, TOGGLE_CHECKOUT } from '../../util/constants';
import { connect } from '../../util/appContext';
import LocalPizzaOutlinedIcon from '@material-ui/icons/LocalPizzaOutlined';
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function PrimarySearchAppBar(props) {
  const { loggedIn } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to="/dashboard/profile"
      >
        Profiles
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to="/dashboard/my-orders"
      >
        My orders
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.logout();
          window.location = '/';
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to="/dashboard/profile"
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to="/dashboard/my-orders"
      >
        My orders
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.logout();
          window.location = '/';
        }}
      >
        Logout
      </MenuItem>

      <MenuItem onClick={handleMenuClose} component={Link} to="/login">
        Login
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/signup">
        Singup
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            OrderMyPizza
          </Typography>
          <div className={classes.grow} />
          <IconButton
            aria-label="show 17 new notifications"
            color="inherit"
            component={Link}
            to="/dashboard/checkout"
          >
            <Badge badgeContent={props.cartCount} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
          <IconButton
            component={Link}
            to="/dashboard"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <LocalPizzaOutlinedIcon />
          </IconButton>
          <div className={classes.sectionDesktop}>
            {!loggedIn && (
              <>
                <Button component={Link} to="/login" style={{ color: 'white' }}>
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  style={{ color: 'white' }}
                >
                  Signup
                </Button>
              </>
            )}
            {loggedIn && (
              <>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state?.auth?.access_token ? true : false,
    token: state?.auth?.access_token,
    cartCount: Object.values(state.cart || {}).reduce(
      (total, qty) => total + qty,
      0,
    ),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: LOGOUT }),
    toggleCheckout: () => dispatch({ type: TOGGLE_CHECKOUT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimarySearchAppBar);
