import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AppConfig, AppContext } from '../../app.js';

export default function Component() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { appCx, setAppCx } = useContext(AppContext);

    const onLogin = async () => {
        var res = await (await
            fetch(`${AppConfig.apiPath}/login`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: password, })
                })).json();

        setAppCx({ ...appCx, jwtToken: res.token });
        navigate('/home', { replace: true });
    };

    return (
        <Dialog open={true}>
            <DialogTitle style={{marginTop: 10, textTransform: 'uppercase', color: 'silver'}}>Hostr Login</DialogTitle>
            <DialogContent style={{paddingTop: 10}}>
                <Stack spacing={2}>
                    <TextField autoFocus label='Email' onChange={(e) => setEmail(e.target.value)}/>
                    <TextField label='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                </Stack>
            </DialogContent>
            <DialogActions style={{margin: 10}}>
                <Button variant='outlined' startIcon={<Check />} onClick={onLogin}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}