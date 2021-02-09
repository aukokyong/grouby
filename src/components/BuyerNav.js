import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, makeStyles, Typography, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justify: "center",
        alignItems: "center",
    },
    paper: {
        marginTop: theme.spacing(9),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justify: "center",
        alignItems: "center",
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

const BuyerNav = () => {
    const classes = useStyles()

    return (
        <Container>
            <Grid container
                className={classes.root}
                spacing={3}
                display="flex"
                flexDirection="row"
                justify="center"
                alignItems="center"
            >
                <Link to="/enterbuyid">
                    <Grid item className={classes.paper}>
                        <ButtonBase
                            focusRipple
                            key='host'
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                            style={{
                                width: '200px',
                            }}
                        >
                            <span
                                className={classes.imageSrc}
                                style={{
                                    backgroundImage: 'https://picsum.photos/200',
                                }}
                            />
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    className={classes.imageTitle}
                                >
                                    Browse a Buy
                                        <span className={classes.imageMarked} />
                                </Typography>
                            </span>
                        </ButtonBase>
                    </Grid>
                </Link>
                <Link to="/entermobilenum">
                    <Grid item className={classes.paper}>
                        <ButtonBase
                            focusRipple
                            key='buyer'
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                            style={{
                                width: '200px',
                            }}
                        >
                            <span
                                className={classes.imageSrc}
                                style={{
                                    backgroundImage: 'https://picsum.photos/200',
                                }}
                            />
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    className={classes.imageTitle}
                                >
                                    Check Orders
                                        <span className={classes.imageMarked} />
                                </Typography>
                            </span>
                        </ButtonBase>
                    </Grid>
                </Link>
            </Grid>
        </Container>
    )
}

export default BuyerNav