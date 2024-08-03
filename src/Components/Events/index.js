import { AppConfig, formatDateTime, useAuth } from '../../app.js';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { startTransition, Suspense, useCallback, useEffect, useState } from 'react';
import Loader from '../Loader';

export default function Component() {
    useAuth();

    const { pageIndex, setPageIndex } = useState(0);
    const { pageSize, setPageSize } = useState(10);
    const [data, setData] = useState();

    useEffect(() => {
        const refresh = async () => {
            const d = await (
                await fetch(`${AppConfig.apiPath}/events?rowOffset=${pageIndex * pageSize}&rowLimit=${pageSize}`,
                    { mode: 'cors', headers: { 'Accept': 'application/json' } })
            ).json();

            startTransition(() => setData(d));
        };

        refresh();
    }, [pageIndex, pageSize]);

    return (
        (data ? <Table>
            <TableHead>
                <TableRow>
                    <TableCell width="120">Posted</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Key</TableCell>
                    <TableCell>Data</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {data.map((ev, i) => {
                        console.log(ev);
                        return (<TableRow>
                            <TableCell>{formatDateTime(new Date(ev.postedAt))}</TableCell>
                            <TableCell>{ev.type}</TableCell>
                            <TableCell>{ev.key && JSON.stringify(ev.key, null, 2)}</TableCell>
                            <TableCell>{ev.data && JSON.stringify(ev.data, null, 2)}</TableCell>
                        </TableRow>)
                    })}
            </TableBody>
        </Table > : <Loader/>)
    );
}