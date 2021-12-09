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
import { MEMBERS_API } from '../../components/urls';
import NavbarAdmin from '../../components/NavbarAdmin';
import { Account, AccountContext } from '../../components/Account';

export default Index;

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

function Index() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();

    const [session, setSession] = useState();
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);
            axios.get(MEMBERS_API + '/members' + sessionData['url'])
            .then(x => {
                    //debugger;
                    for(let i = 0; i < x.data.length ; i++) {
                        users.push(x.data[i])
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
        console.log(users);
    }, [users]);

    
    const classes = useStyles();

    return (
        <div>
            <NavbarAdmin session={session} />
            {
                (loading) ? '' :
                <>
                    <br />
                    <br />
                        {(session.accessLevel === 'club') ? 
                            <Link href='/members/add'>
                                <button class="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded">
                                    Add Member
                                </button>
                            </Link>
                            : null}
                    <br />
                    <br />
                    <div className="mx-8">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>RI ID</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.full_name}</TableCell>
                                        <TableCell>{row.ri_id}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>
                                            <Link href={`/members/edit/${encodeURIComponent(row.id)}`}>
                                                <a><EditIcon /></a>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            }
        </div>
    );
}



