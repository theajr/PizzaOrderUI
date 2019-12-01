import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
  },
  palette: {},
  status: {},
  shape: {
    borderRadius: 1,
  },
  overrides: {
    MuiTextField: {
      root: {},
    },
    MuiTableCell: {
      root: {
        padding: 4,
      },
    },
  },
});
