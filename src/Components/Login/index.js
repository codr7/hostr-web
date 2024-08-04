import { Button, Dialog, DialogActions, DialogContent, FormControl, Stack, TextField } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AppConfig, AppContext } from '../../app.js';

export default function Component(  ) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const {appCx, setAppCx} = useContext(AppContext);
    
    const onLogin = async () => { 
        console.log(`${AppConfig.apiPath}/login`);

        var res = await (await 
          fetch(`${AppConfig.apiPath}/login`, 
            {method: 'POST', 
             mode: 'cors', 
             headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
             body: JSON.stringify({email: email, password: password,})})).json();
            
        setAppCx({...appCx, jwtToken: res.token});
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