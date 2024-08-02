//import './style.css';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export default function Component({ label }) {
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
                    {label}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}