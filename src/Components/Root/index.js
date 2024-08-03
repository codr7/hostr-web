import Top from '../Top';
import { Outlet } from "react-router-dom";
import { useState } from 'react';
import { AppContext } from '../../app.js';

export default function Component() {
    const [appCx, setAppCx] = useState({});

    return (
        <div>
            <AppContext.Provider value={{appCx: appCx, setAppCx: setAppCx}}>
                {appCx.jwtToken && <Top />}
                <Outlet />
            </AppContext.Provider>
        </div>
    );
}