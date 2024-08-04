import './style.css';
import { AppConfig, AppContext, formatDateTime, useAuth } from '../../app.js';
import { Button, Stack, Table, TableBody, TableHead, TableRow, TextField } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Search, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useContext, useState } from 'react';

export default function Component() {
    useAuth();

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [data, setData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasPrev, setHasPrev] = useState();
    const [hasNext, setHasNext] = useState();

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

    const { appCx } = useContext(AppContext);

    const refresh = async (pageIndex, pageSize) => {
        setIsSearching(true);
        setResultStart(pageSize * pageIndex);
        setResultEnd(pageSize * (pageIndex + 1));

        try {
            const d = await (
                await fetch(`${AppConfig.apiPath}/events?rowOffset=${pageIndex * pageSize}&rowLimit=${pageSize}`,
                    { mode: 'cors', headers: { 'Accept': 'application/json', Authorization: `Bearer ${appCx.jwtToken}` } })
            ).json();

            setData(d);
            setHasNext(d.length >= pageSize);
        } finally {
            setIsSearching(false);
        }
    };

    const onSearch = async () => {
        setPageIndex(0);
        await refresh(0, pageSize);
    };

    const onNext = async () => {
        const i = pageIndex + 1;
        await refresh(i, pageSize);
        setPageIndex(i);
        setHasPrev(true);
    };

    const onPrev = async () => {
        const i = pageIndex - 1;
        await refresh(i, pageSize);
        setPageIndex(i);
        setHasPrev(i > 0);
    };

    return (
        <Stack>
            <div style={{ marginLeft: 20, marginTop: 20 }}>
                <TextField style={{ width: 100 }} label="Page size" value={pageSize} onChange={(e) => {
                    const v = parseInt(e.target.value);
                    setPageSize(v ? v : "");
                    setIsSearching(false);
                }} />
                <Button style={{ verticalAlign: 'bottom' }} onClick={onSearch} disabled={isSearching || pageSize === ""}><Search /></Button>
            </div>
            <div>
                {(data.length > 0) && <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 300 }}>
                    <Button style={{ verticalAlign: 'bottom' }} onClick={onPrev} disabled={isSearching || !hasPrev}><SkipPrevious /></Button>
                    <span>page {pageIndex + 1} | record {resultStart} to {resultEnd}</span>
                    <Button style={{ verticalAlign: 'bottom' }} onClick={onNext} disabled={isSearching || !hasNext}><SkipNext /></Button>
                </div>}

                <Table sx={{
                    [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
                }}>
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