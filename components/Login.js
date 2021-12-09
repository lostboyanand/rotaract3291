import { useContext } from "react";
import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useState } from 'react';
import { Grid, Button, FormControl, InputLabel, Input, FormHelperText, InputAdornment, IconButton } from '@material-ui/core';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import UserPool from '../components/UserPool';
import router, { useRouter } from 'next/router';
import { AccountContext } from './Account';

const useStyles = makeStyles({
    root: {
        maxWidth: '25rem',
        alignItems: 'center' 
    },
    field: {
        minWidth: '20rem'
    }
});

export default function Login() {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({
        email: false,
        login: false,
    });

    var router = useRouter();

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
      
        if(name === 'email') {
            setEmail(value);
            //if (value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
            //    setError({email: false});
            //else setError({email: true});
        }
        else if(name === 'password'){
          setPassword(value);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

	//const poolData = UserPool

	//const UserPool = new CognitoUserPool(poolData);

    const { authenticate } = useContext(AccountContext);

    const onSubmit = event => {
		//debugger;
		event.preventDefault();
        
        setError({
            ...error,
            login: false
        });

        authenticate(email, password)
            .then((data) => {
            console.log("Logged in!", data);
        })
        .catch((err) => {
            setError({
                ...error,
                login: true
            });
            console.error("Failed to login", err);
        });

	};

	return (
		<div style={{ height: '100vh' }}>

                    <Grid container direction="column" justify="center" alignItems="center" style={{ marginTop: '3rem' }}>
                        <Card style={{ backgroundColor: '#fff' }} variant="outlined" className={classes.root}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <CardContent>
                                    <h2 style={{padding: 15, fontSize: '1.5rem', fontWeight: 600, textTransform: 'uppercase'}}>Login</h2>
                                    
                                    <Alert variant="outlined" severity="error" className={classes.field} style={{ display: (error.login)?'':'none', margin: ' 0 0 1.5rem 0' }}>
                                        Incorrect username or password.
                                    </Alert>

                                    <FormControl className={classes.field} error={(error.email)}>
                                        <InputLabel htmlFor="email">Username</InputLabel>
                                        <Input
                                            name="email"
                                            type="email"
                                            id="email"
                                            onChange={(event) => onChangeHandler(event)}
                                            aria-describedby={(error.email)?'email-error-text.':''}
                                            value={email}
                                            />
                                        <FormHelperText style={{ display: (error.email)?'':'none' }} id="email-error-text">Incorrect Email</FormHelperText>
                                    </FormControl>
                                    
                                    <FormControl className={classes.field}>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(event) => onChangeHandler(event)}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained" 
                                        onClick={(event) => onSubmit(event, email, password)}
                                        style={{margin: 15}}
                                    >
                                        Login
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Card>
                    </Grid>
                    
        </div>
	);
};