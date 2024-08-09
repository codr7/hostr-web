import React from 'react';
import { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';

export const AppConfig = {apiPath: 'http://localhost:5000/api/v1'}

export const AppContext = React.createContext();

export const DateFormat = 'YY-MM-DD';
export const DayFormat = 'dd DD';

export const TimeFormat = 'HH:mm';

export const formatDay = (value) => {
    return dayjs(value).format(DayFormat);
};

export const formatTime = (value) => {
    return dayjs(value).format(TimeFormat);
};

export const formatDateTime = (value) => {
    return dayjs(value).format(`${DateFormat} ${TimeFormat}`);
};

export const useAuth = () => {
    const { appCx } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!appCx.jwtToken) { navigate('/login', { replace: true }); }
    });
};