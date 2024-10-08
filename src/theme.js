import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const defaultTheme = createTheme({
    palette: {
        primary: {
          main: orange[500],
        },
        secondary: {
          main: orange[300],
        },
      },
});

export default defaultTheme;