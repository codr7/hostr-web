//import './style.css';
import { AppBar, IconButton, Toolbar} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export default function Component({ label }) {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start">
                    <Menu/>
                </IconButton>
                {label}
            </Toolbar>
        </AppBar>
    );
}