//import './style.css';
import { useContext, useEffect } from 'react';
import { AppCx } from '../../app.js';
import {useNavigate} from 'react-router-dom';

export default function Component() {
    const { appCx, setAppCx } = useContext(AppCx);
    const navigate = useNavigate();

    useEffect(() => {
        if (!appCx['jwt-token']) { navigate('/login', { replace: true }); }
    });

    return (
        <div></div>
    );
}