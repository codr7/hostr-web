import { AppBar, IconButton, Toolbar } from '@mui/material';
import { House, Menu } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

function NL({ path, icon, caption }) {
    return (<NavLink
        to={path}
        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}
        style={{ marginLeft: 10 }}>
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

                <NL path="/home" icon={House} caption="Home" />
                <NL path="/events" icon={House} caption="Events" />
            </Toolbar>
        </AppBar>
    );
}