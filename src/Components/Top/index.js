import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

function NL({ path, icon, caption }) {
    return (<NavLink
        to={path}
        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}
        style={{ marginLeft: 10, color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}}>
        {caption}
    </NavLink>)
}

export default function Component() {

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start">
                    <Menu />
                </IconButton>

                <NL path="/home" caption="Home" />
                <NL path="/events" caption="Events" />
                <NL path="/calendar" caption="Calendar" />
            </Toolbar>
        </AppBar>
    );
}