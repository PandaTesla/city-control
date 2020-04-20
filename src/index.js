import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import { createMuiTheme, ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { create } from 'jss';
import rtl from 'jss-rtl';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    type: 'dark',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#009688',
    },
    background: {
      paper: '#455a64'
    }
  },
  overrides: {
    MuiDivider: {
      root: {
        marginTop: '10px',
        marginBottom: '10px'
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
          }}>
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </StylesProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
