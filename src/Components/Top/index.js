//import './style.css';
import { AppBar, IconButton, Toolbar} from '@mui/material';
import { Menu } from '@mui/icons-material';

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