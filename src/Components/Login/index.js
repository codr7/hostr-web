import './style.css';
import { Button, Dialog, DialogActions, DialogContent, FormControl, TextField } from '@material-ui/core';
import { Check, LockOpen } from '@material-ui/icons';
import { useState } from 'react';

export default function Component({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Dialog open={true}>
            <DialogContent>
                <FormControl>
                    <LockOpen className="big-icon" />
                    <TextField label="Email" onChange={(e) => setEmail(e.target.value)} autoFocus />
                    <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button startIcon={<Check />} onClick={() => onLogin({ email: email, password: password })}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}