import { CssBaseline, Typography, makeStyles, Container } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(9),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const OrderSuccess = () => {
    const classes = useStyles()
    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Thank you for your order! The host will contact you soon.
                </Typography>
                <Link to='/enterbuyid'>
                    <Typography component="h1" variant="overline">
                        View Another Buy
                    </Typography>
                </Link>
            </div>
        </Container>

    )
}

export default OrderSuccess;