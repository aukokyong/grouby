import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { Button, CssBaseline, TextField, Typography, makeStyles, Container } from '@material-ui/core';
// import { format, startOfToday } from 'date-fns'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    dateField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 180,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const BuyForm = () => {
    const classes = useStyles();

    // const today = format(new Date(startOfToday()), 'yyyy-MM-dd')

    const [formData, setFormData] = useState(
        {
            title: "",
            description: "",
            closing_date: "",
            collection_date: "",
        }
    )

    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e, key) => {
        console.log(e.target)
        setFormData({ ...formData, [key]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitting..", formData)
        // to replace with axios call when ready 
        axios
            .post('http://localhost:8000/data/buys', formData, {
                headers: {
                    Authorization: `Token ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log(response)
                sessionStorage.setItem('buyId', response.data.id)
                setIsSubmitted(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    if (isSubmitted) {
        return <Redirect to="/additems" />
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create A Buy
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleChange(e, 'title')}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleChange(e, 'description')}
                    />
                    <TextField
                        required
                        id="date"
                        label="Closing Date"
                        type="date"
                        value={formData.closing_date}
                        className={classes.dateField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => handleChange(e, 'closing_date')}
                    />
                    <TextField
                        required
                        id="date"
                        label="Collection Date"
                        type="date"
                        value={formData.collection_date}
                        className={classes.dateField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => handleChange(e, 'collection_date')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add Items
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default BuyForm