import React, { useState } from 'react'
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

const BuyerEntry = (props) => {
    const classes = useStyles();

    const [formData, setFormData] = useState(
        {
            [props.entryPoint]: "",
        }
    )

    const handleChange = (e) => {
        setFormData({ ...formData, [props.entryPoint]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitting..", formData)
        // to replace with axios call when ready
    }

    return (
        <>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {props.entryPoint === 'buyId' ? 'Enter Buy ID' : 'Enter Mobile Number'}
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id={props.entryPoint}
                            label={props.entryPoint === 'buyId' ? 'Buy ID' : 'Mobile Number'}
                            name={props.entryPoint}
                            value={formData.username}
                            onChange={(e) => handleChange(e)}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Enter
                    </Button>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default BuyerEntry