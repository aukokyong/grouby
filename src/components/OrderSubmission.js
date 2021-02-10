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

const OrderSubmission = (props) => {
    const classes = useStyles();

    const [formData, setFormData] = useState(
        {
            buyer_name: "",
            buyer_contact: "",
            buy: sessionStorage.getItem('buyId'),
            paid: false,
        }
    )

    const [orderSubmitted, setorderSubmitted] = useState(false)

    const handleChange = (e, key) => {
        setFormData({ ...formData, [key]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('/data/orders', formData)
            .then(response => {
                console.log(response)
                props.orderItems.map((item) => {
                    const data = {
                        'buy': Number(sessionStorage.getItem('buyId')),
                        'order': response.data.id,
                        'item': item.itemId,
                        'quantity': item.quantity
                    }
                    return axios.post('/data/ordereditems', data).then(() => {
                        sessionStorage.removeItem('buyId')
                        setorderSubmitted(true)
                    })

                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    if (orderSubmitted) {
        return <Redirect to={`/orders/${formData.buyer_contact}`} />
    }
    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Contact Details
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={formData.buyer_name}
                        onChange={(e) => handleChange(e, 'buyer_name')}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="contact"
                        label="Mobile Number"
                        type="number"
                        id="contact"
                        value={formData.buyer_contact}
                        onChange={(e) => handleChange(e, 'buyer_contact')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit Order
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default OrderSubmission