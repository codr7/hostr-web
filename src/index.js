import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import defaultTheme from './theme.js'

import ErrorPage from "./error-page";

import Calendar from './Components/Calendar';
import Events from './Components/Events';
import Home from './Components/Home';
import Login from './Components/Login';
import Root from './Components/Root';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import 'dayjs/locale/sv';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/events',
        element: <Events />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='sv'>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);