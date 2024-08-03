import React from 'react';
import { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export const AppConfig = {apiPath: 'http://localhost:5000/api/v1'}

export const AppContext = React.createContext();

export const DateTimeFormat = new Intl.DateTimeFormat('sv-SE', {dateStyle: 'short', timeStyle: 'short'});

export const formatDateTime = (value) => {
    return DateTimeFormat.format(value);
};

export const useAuth = () => {
    const { appCx } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!appCx.jwtToken) { navigate('/login', { replace: true }); }
    });
};