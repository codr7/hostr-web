import { AppConfig, formatDateTime, useAuth } from '../../app.js';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { Search, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useState } from 'react';

export default function Component() {
    useAuth();

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [data, setData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [resultStart, setResultStart] = useState();
    const [resultEnd, setResultEnd] = useState();

    const headerStyle = {
        fontSize: '110%',
        textTransform: 'uppercase',
        color: 'silver'
    };

    const dataStyle = {
        fontSize: '100%'
    };

    const refresh = async () => {
        setIsSearching(true);

        try {
            const d = await (
                await fetch(`${AppConfig.apiPath}/events?rowOffset=${pageIndex * pageSize}&rowLimit=${pageSize}`,
                    { mode: 'cors', headers: { 'Accept': 'application/json' } })
            ).json();

            setResultStart(pageSize * pageIndex);
            setResultEnd(pageSize * pageIndex + d.length);
            setData(d);
        } finally {
            setIsSearching(false);
        }
    };

    const onSearch = () => {
        setPageIndex(0);
        refresh();
    };

    const onNext = () => {
        setPageIndex(pageIndex + 1);
        refresh();
    };

    const onPrev = () => {
        setPageIndex(pageIndex - 1);
        refresh();
    };

    return (
        <Stack>
            <div style={{ marginLeft: 20, marginTop: 20 }}>
                <TextField style={{ width: 100 }} label="Page Size" value={pageSize} onChange={(e) => {
                    const v = parseInt(e.target.value);
                    setPageSize(v ? v : "");
                    setIsSearching(false);
                }} />
                <Button style={{ verticalAlign: 'bottom' }} onClick={onSearch} disabled={isSearching}><Search /></Button>
            </div>
            <div>
                {(data.length > 0) && <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 200 }}>
                    <Button style={{ verticalAlign: 'bottom' }} onClick={onPrev} disabled={isSearching}><SkipPrevious /></Button>
                    <span>{resultStart} to {resultEnd}</span>
                    <Button style={{ verticalAlign: 'bottom' }} onClick={onNext} disabled={isSearching}><SkipNext /></Button>
                </div>}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={headerStyle} width="130">Posted</TableCell>
                            <TableCell style={headerStyle}>Type</TableCell>
                            <TableCell style={headerStyle} width="200">Key</TableCell>
                            <TableCell style={headerStyle}>Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((ev, i) => {
                            return (<TableRow>
                                <TableCell style={dataStyle}>{formatDateTime(new Date(ev.postedAt))}</TableCell>
                                <TableCell style={dataStyle}>{ev.type}</TableCell>
                                <TableCell style={dataStyle}>{ev.key && JSON.stringify(ev.key, null, 2)}</TableCell>
                                <TableCell style={dataStyle}>{ev.data && JSON.stringify(ev.data, null, 2)}</TableCell>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </div>
        </Stack>
    );
}