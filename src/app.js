import React from 'react';
import { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';

export const AppConfig = {apiPath: 'http://localhost:5000/api/v1'}

export const AppContext = React.createContext();

export const ShortDateFormat = 'DD/MM';
export const LongDateFormat = 'YY-MM-DD';
export const DayFormat = 'dd DD';
export const TimeFormat = 'HH:mm';

export const formatDay = (value) =>
    dayjs(value).format(DayFormat);

export const formatTime = (value) =>
    dayjs(value).format(TimeFormat);

export const formatDateShort = (value) =>
    dayjs(value).format(ShortDateFormat);

export const formatDateLong = (value) =>
    dayjs(value).format(LongDateFormat);

export const formatDateTime = (value) =>
    dayjs(value).format(`${LongDateFormat} ${TimeFormat}`);

export const now = () => new Date();

export const today = () => truncDate(now());

export const truncDate = (value) =>
    new Date(value.getUTCFullYear(), value.getMonth(), value.getDate());

export const useAuth = () => {
    const { appCx } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!appCx.jwtToken) { navigate('/login', { replace: true }); }
    });
};