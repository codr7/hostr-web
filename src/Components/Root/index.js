import Top from '../Top';
import { Outlet } from "react-router-dom";
import { useState } from 'react';
import { AppCx } from '../../app.js';

export default function Component() {
    const [appCx, setAppCx] = useState({});

    return (
        <div>
            <AppCx.Provider value={{appCx: appCx, setAppCx: setAppCx}}>
                {appCx['jwt-token'] && <Top />}
                <Outlet />
            </AppCx.Provider>
        </div>
    );
}