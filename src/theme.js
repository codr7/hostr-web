import { createTheme } from '@material-ui/core/styles';
import { green, purple } from '@mui/material/colors';

const defaultTheme = createTheme({
    spacing: 10,
    palette: {
        primary: {
          main: purple[500],
        },
        secondary: {
          main: green[500],
        },
      },
});
export default defaultTheme;