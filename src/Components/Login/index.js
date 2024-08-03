import './style.css';
import { Button, Dialog, DialogActions, DialogContent, FormControl, Stack, TextField } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Component(  ) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const onLogin = () => {
        navigate('/home', {replace: true});
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <FormControl>
                    <Stack spacing={2} sx={{mt: 3}}>
                        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} autoFocus />
                        <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </Stack>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button startIcon={<Login />} onClick={onLogin}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}