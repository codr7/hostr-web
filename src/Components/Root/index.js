import Top from '../Top';
import { Outlet } from "react-router-dom";

export default function Component() {
    return (
        <div>
            <Top/>
            <Outlet />
        </div>
    );
}