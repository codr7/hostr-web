import './style.css';
import { Button, Dialog, DialogActions, DialogContent, FormControl, Stack, TextField } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useState } from 'react';

export default function Component({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
                <Button startIcon={<Login />} onClick={() => onLogin({ email: email, password: password })}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}