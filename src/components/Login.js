import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
// import Cookies from 'js-cookie'

import { Button, CssBaseline, TextField, Typography, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();

    const [formData, setFormData] = useState(
        {
            username: "",
            password: "",
        }
    )

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleChange = (e, key) => {
        setFormData({ ...formData, [key]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitting..", formData)
        // const csrftoken = Cookies.get('csrftoken')
        axios
            .post('/auth/login', formData)
            .then(response => {
                console.log(response)
                sessionStorage.setItem('token', response.data.key)
                setIsLoggedIn(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    if (isLoggedIn) {
        return <Redirect to="/createbuy" />
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={(e) => handleChange(e, 'username')}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => handleChange(e, 'password')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Login