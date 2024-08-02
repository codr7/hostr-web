import './style.css';
import Home from '../Home';
import Login from '../Login';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import defaultTheme from '../../theme.js'

export default function Component() {
  const [authenticated, setAuthenticated] = useState(false)

  const onLogin = ({email, password}) => {
    console.log("onAuthenticate ", email, password)
    setAuthenticated(true);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <div className="App">
       {!authenticated && <Login onLogin={onLogin}/>}
       {authenticated && <Home/>}
    </div>
    </ThemeProvider>
  );
};