import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MEETINGS_API } from '../../components/urls';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';

export default Index;

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function Index() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const [session, setSession] = useState();
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);
            axios.get(MEETINGS_API + '/meetings' + sessionData['url'])
            .then(x => {
                    for(let i = 0; i < x.data.length ; i++) {
                        meetings.push(x.data[i]);
                    }
                    setLoading(false)
                }
            ).catch((error) => {
                console.log(error);
                router.push('/admin');
            });
        });
    }, []);

    useEffect(() => {
        //debugger;
        console.log(meetings);
    }, [meetings]);
    
    const classes = useStyles();

    return (
        <div>
            <NavbarAdmin session={session} />
            <br />
            <br />
                <Link href='/meetings/add'>
                    <button class="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded">
                        Add Meeting
                    </button>
                </Link>
            <br />
            <br />
            {
                (loading) ? '' :
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Participating Clubs</TableCell>
                                <TableCell>Venue</TableCell>
                                <TableCell>Members</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {meetings.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.meeting_date}</TableCell>
                                    <TableCell>{row.meeting_type}</TableCell>
                                    <TableCell>{row.participating_clubs}</TableCell>
                                    <TableCell>{row.venue}</TableCell>
                                    <TableCell>{(Array.isArray(row.members)) ? row.members.length : row.members}</TableCell>
                                    <TableCell>
                                        <Link href={`/meetings/edit/${encodeURIComponent(row.id)}`}>
                                            <a><EditIcon /></a>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
}