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
import { Link as LinkIcon } from '@material-ui/icons';
import Link from 'next/link';
import { BULLETINS_API } from '../../components/urls';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';

export default Index;

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function Index() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const [session, setSession] = useState();
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);

            axios.get(BULLETINS_API + '/bulletins' + sessionData['url'])
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
                            <Link href='/bulletins/add'>
                                <button class="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded">
                                    Add Bulletin
                                </button>
                            </Link>
                            : null}
                    <br />
                    <br />
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Publication Date</TableCell>
                                <TableCell>Link</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.publication_date}</TableCell>
                                    <TableCell>
                                        <a href={row.bulletin_link} rel="noreferrer" target="_blank"><LinkIcon /></a>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/bulletins/edit/${encodeURIComponent(row.id)}`}>
                                            <a><EditIcon /></a>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
        </div>
  );
}



