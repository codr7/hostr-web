//import './style.css';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../app.js';
import {useNavigate} from 'react-router-dom';

export default function Component() {
    const { appCx } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!appCx.jwtToken) { navigate('/login', { replace: true }); }
    });

    return (
        <div></div>
    );
}