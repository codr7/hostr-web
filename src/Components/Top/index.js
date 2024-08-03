//import './style.css';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import {useLocation} from 'react-router-dom';

export default function Component() {
    const location = useLocation();
    const path = new RegExp('/(.*)$').exec(location.pathname)[1];

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start">
                    <Menu />
                </IconButton>
                <Typography
                    variant="button"
                    color="common.white"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {path}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}