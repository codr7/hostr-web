import './style.css';
import { AppConfig, AppContext, formatDateTime, useAuth } from '../../app.js';
import { Button, Stack, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Search } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useContext, useState, } from 'react';
import dayjs from 'dayjs';

export default function Component() {
    useAuth();

    const now = new Date();
    var d = new Date(now.getUTCFullYear(), now.getMonth(), now.getDay());
    var iv = 24 * 60;

    const [data, setData] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [startAt, setStartAt] = useState(dayjs(d));
    const [endAt, setEndAt] = useState(dayjs(new Date(d.getTime() + iv * 60 * 1000)));
    const [interval, setInterval] = useState(iv);

    const headerStyle = {
        fontSize: '110%',
        textTransform: 'uppercase',
        color: 'silver',
    };

    const dataStyle = {
        fontSize: '100%',
        maxWidth: 50,
        textAlign: 'right'
    };

    const { appCx } = useContext(AppContext);

    const refresh = async () => {
        setIsSearching(true);

        try {
            var q = `${AppConfig.apiPath}/calendars?startAt=${startAt.toJSON()}&endAt=${endAt.toJSON()}&interval=${interval}`

            const d = await (
                await fetch(q,
                    { mode: 'cors', headers: { 'Accept': 'application/json', Authorization: `Bearer ${appCx.jwtToken}` } })
            ).json();

            setData(d);
        } finally {
            setIsSearching(false);
        }
    };

    const onSearch = async () => await refresh();

    return (
        <Stack>
            <Stack direction='row' spacing={2} style={{ marginLeft: 20, marginTop: 20 }}>
                <DateTimePicker label='Start at' value={startAt} onChange={setStartAt} />
                <DateTimePicker label='End at' value={endAt} onChange={setEndAt} />
                <Button variant='outlined' style={{ verticalAlign: 'bottom' }} startIcon={<Search />} onClick={onSearch} disabled={isSearching || interval === ""}>Search</Button>
            </Stack>
            {data && <TableContainer><Table sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none" } }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={headerStyle}>Pool</TableCell>
                        {data.intervals.map((it) => (<TableCell style={headerStyle}>
                            {formatDateTime(new Date(it))}
                        </TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.calendars.filter(cal => !cal.pool.hasInfiniteCapacity).map(cal => (<TableRow>
                        <TableCell>{cal.pool.name}</TableCell>
                        {cal.capacity.map(cap => (<TableCell style={dataStyle}>
                            {parseInt(cap.total) - parseInt(cap.used)}
                        </TableCell>))}
                    </TableRow>)
                    )}
                </TableBody>
            </Table></TableContainer>}
        </Stack>
    );
}