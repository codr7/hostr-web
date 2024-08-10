import './style.css';
import { AppConfig, AppContext, formatDateShort, formatDay, formatTime, today, truncDate, useAuth } from '../../app.js';
import { Button, MenuItem, InputAdornment, Stack, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Check, Search } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useCallback, useContext, useEffect, useState, } from 'react';
import dayjs from 'dayjs';

export default function Component() {
    useAuth();

    var startDate = today();
    var endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [data, setData] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [startAt, setStartAt] = useState(dayjs(startDate));
    const [endAt, setEndAt] = useState(dayjs(endDate));
    const [interval, setInterval] = useState(24 * 60);
    const [searchInterval, setSearchInterval] = useState(24 * 60);
    const [poolName, setPoolName] = useState('');
    const [selPoolId, setSelPoolId] = useState(null);
    const [selStartAt, setSelStartAt] = useState(null);
    const [selEndAt, setSelEndAt] = useState(null);


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

    const refresh = async (poolName, startAt, endAt, interval) => {
        setIsSearching(true);

        try {
            var q = `${AppConfig.apiPath}/calendars?poolName=${encodeURIComponent(poolName + '%')}&startAt=${startAt.toJSON()}&endAt=${endAt.toJSON()}&interval=${interval}`

            const d = await (
                await fetch(q,
                    { mode: 'cors', headers: { 'Accept': 'application/json', Authorization: `Bearer ${appCx.jwtToken}` } })
            ).json();

            setData(d);
            setSearchInterval(interval);
            setSelPoolId(null);
            setSelStartAt(null);
            setSelEndAt(null);
        } finally {
            setIsSearching(false);
        }
    };

    const formatHeader = it => {
        let result;

        switch (searchInterval) {
            case WEEKS:
                result = formatDateShort(it);
                break;
            case DAYS:
                result = formatDay(it);
                break;
            case HOURS:
                result = formatTime(it);
                break;
            default:
                throw new Error(`Invalid header: ${it}`)
        }

        return result;
    };

    const getCellStyle = (poolId, startsAt) => {
        const s = { ...dataStyle, width: 70, minWidth: 70, maxWidth: 70, cursor: 'pointer' };

        if (poolId === selPoolId) {
            if ((selEndAt == null && startsAt.getTime() === selStartAt.getTime()) ||
                ((selEndAt != null) && startsAt.getTime() >= selStartAt.getTime() && startsAt.getTime() <= selEndAt.getTime())) {
                s.backgroundColor = '#89CFF0';
            }
        }

        return s;
    };

    const onSelect = (poolId, startsAt) => {
        if (selStartAt == null || selEndAt != null || poolId !== selPoolId) {
            setSelStartAt(startsAt);
            setSelPoolId(poolId);
            setSelEndAt(null);
        } else {
            setSelEndAt(startsAt);
        }
    };

    const onDrillTime = async (target) => {
        let result;

        switch (interval) {
            case WEEKS:
                result = DAYS;
                break;
            case DAYS:
                result = HOURS;
                break;
            case HOURS:
                target = truncDate(target);
                result = WEEKS;
                break;
            default:
                throw new Error(`Invalid interval: ${interval}`);
        }

        setInterval(result);
        setStartAt(dayjs(target));
        await refresh(poolName, target, endAt, result);
    };

    const onDrillPool = async (poolName) => {
        setPoolName(poolName);
        await refresh(poolName, startAt, endAt, interval);
    };

    const onSearch = async () => await refresh(poolName, startAt, endAt, interval);

    const HOURS = 60;
    const DAYS = 24 * HOURS;
    const WEEKS = DAYS * 7;

    const handleKeyPress = useCallback(async (event) => {
        if (event.key === 's' && event.altKey) {
            await onSearch();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return (
        <Stack>
            <Stack direction='row' spacing={2} style={{ marginLeft: 20, marginTop: 20 }}>
                <TextField
                    autoFocus
                    value={poolName}
                    label='Pool name'
                    onChange={e => setPoolName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                <DateTimePicker label='Start at' value={startAt} onChange={setStartAt} />
                <DateTimePicker label='End at' value={endAt} onChange={setEndAt} />
                <TextField
                    select
                    value={interval}
                    label='Interval'
                    onChange={e => setInterval(e.target.value)}>
                    <MenuItem value={WEEKS}>Weeks</MenuItem>
                    <MenuItem value={DAYS}>Days</MenuItem>
                    <MenuItem value={HOURS}>Hours</MenuItem>
                </TextField>

                <Stack>
                    <Button variant='outlined' style={{ padding: 15 }} startIcon={<Check />} onClick={onSearch} disabled={isSearching || interval === ""}>Show</Button>
                    <span style={{ fontSize: '14px', color: 'silver', textAlign: 'right', marginRight: 4, marginTop: -18 }}>alt+s</span>
                </Stack>
            </Stack>
            {data && <TableContainer><Table sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none", } }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={headerStyle}>Pool</TableCell>
                        {data.intervals.map((it) => (<TableCell style={headerStyle}>{formatHeader(it)}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.calendars.filter(cal => !cal.pool.hasInfiniteCapacity).map(cal => (<TableRow>
                        <TableCell style={{ minWidth: 100, maxWidth: 100, width: 100, cursor: 'pointer' }}
                            onDoubleClick={() => onDrillPool(cal.pool.name)}>{cal.pool.name}</TableCell>
                        {cal.capacity.map(cap => (
                            <TableCell style={getCellStyle(cal.pool.id, new Date(cap.interval))}
                                onClick={() => onSelect(cal.pool.id, new Date(cap.interval))}
                                onDoubleClick={() => onDrillTime(new Date(cap.interval))}>
                                {parseInt(cap.total) - parseInt(cap.used)}
                            </TableCell>))}
                        <TableCell />
                    </TableRow>)
                    )}
                </TableBody>
            </Table></TableContainer>}
        </Stack>
    );
}