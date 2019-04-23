import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const rawTheme = createMuiTheme({
  palette: {
      primary: {
        light: '#4f5792',
        main: '#1f2e64',
        dark: '#000439',
        contrastText: '#fff'
      },
    secondary: {
      light: '#70e779',
      main: '#37b44a',
      dark: '#00831b',
      contrastText: '#fff'
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      xLight: green[50],
      dark: green[700],
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
    useNextVariants: true,
  },
  shape: {
    borderRadius: 8,
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  textTransform: 'uppercase',
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
  // overrides: {
  //   MuiDrawer: {
  //     paper: {
  //       backgroundColor: '#18202c',
  //     },
  //   },
  //   MuiButton: {
  //     label: {
  //       textTransform: 'initial',
  //     },
  //     contained: {
  //       boxShadow: 'none',
  //       '&:active': {
  //         boxShadow: 'none',
  //       },
  //     },
  //   },
  //   MuiTabs: {
  //     root: {
  //       marginLeft: rawTheme.spacing.unit,
  //     },
  //     indicator: {
  //       height: 3,
  //       borderTopLeftRadius: 3,
  //       borderTopRightRadius: 3,
  //       backgroundColor: rawTheme.palette.common.white,
  //     },
  //   },
  //   MuiTab: {
  //     root: {
  //       textTransform: 'initial',
  //       margin: '0 16px',
  //       minWidth: 0,
  //       [rawTheme.breakpoints.up('md')]: {
  //         minWidth: 0,
  //       },
  //     },
  //     labelContainer: {
  //       padding: 0,
  //       [rawTheme.breakpoints.up('md')]: {
  //         padding: 0,
  //       },
  //     },
  //   },
  //   MuiIconButton: {
  //     root: {
  //       padding: rawTheme.spacing.unit,
  //     },
  //   },
  //   MuiExpansionPanel: {
  //     root: {
  //       boxShadow: "none"
  //     }
  //   },
  //   MuiTooltip: {
  //     tooltip: {
  //       borderRadius: 4,
  //     },
  //   },
  //   MuiDivider: {
  //     root: {
  //       backgroundColor: 'rawTheme.palette.common.white',
  //     },
  //   },
  //   MuiListItemText: {
  //     primary: {
  //       fontWeight: rawTheme.typography.fontWeightMedium,
  //     },
  //   },
  //   MuiListItemIcon: {
  //     root: {
  //       color: 'inherit',
  //       marginRight: 5,
  //       '& svg': {
  //         fontSize: 20,
  //       },
  //     },
  //   },
  //   MuiAvatar: {
  //     root: {},
  //   },
  // },
  // props: {
  //   MuiTab: {
  //     disableRipple: true,
  //   },
  // },
  // mixins: {
  //   ...rawTheme.mixins,
  //   toolbar: {
  //     minHeight: 48,
  //   },
  // },
};

export default theme;
