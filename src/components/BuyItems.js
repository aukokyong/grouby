import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { makeStyles, IconButton, Button, Container, CssBaseline, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ItemDetailsForm from './ItemDetailsForm';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        // minWidth: 500,
        maxWidth: 600,
        alignItems: 'center',
    },
}));

const BuyItems = () => {
    const classes = useStyles();

    const [editClicked, setEditClicked] = useState(false)
    const [editItemId, setEditItemId] = useState()
    const [addClicked, setAddClicked] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [doneClicked, setDoneClicked] = useState(false)
    const [newItem, setNewItem] = useState()
    const [editedItem, setEditedItem] = useState()
    const [rows, setRows] = useState([])

    const buyId = sessionStorage.getItem('buyId')

    useEffect(() => {
        axios
            .get(`/data/buys/${buyId}`)
            .then(response => {
                setRows(response.data.items)
            })
            .catch(error => {
                console.log(error)
            })
    }, [newItem, editedItem])

    if (doneClicked) {
        sessionStorage.removeItem('buyId')
        return <Redirect to="/hostedbuys" />
    }

    const handleDeleteClicked = (id) => {
        setDeleteClicked(true)
        const tmpRows = [...rows]
        tmpRows.map((row, index) => {
            if (row.id === id) {
                // console.log('matched')
                tmpRows.splice(index, 1)
                return tmpRows
            }
        })
        setRows(tmpRows)
    }

    const populatedRows = (rows.map((row) => (
        <TableRow key={row.id}>
            <TableCell align="center">
                {row.title}
            </TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">{row.sku}</TableCell>
            <TableCell align="center">{row.price}</TableCell>
            <TableCell align="center">
                <IconButton variant="contained" color="primary" onClick={() => {
                    setEditClicked(true)
                    setEditItemId(row.id)
                }}>
                    <EditIcon />
                </IconButton>
                <IconButton variant="contained" color="secondary" onClick={() => {
                    handleDeleteClicked(row.id)
                }}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ))
    )


    return (
        <>
            <Container component="main">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.header}>
                        <Typography variant="h3"> Add Items to Your Buy </Typography>
                    </div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="items table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">SKU</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {populatedRows}
                                <TableRow key='add'>
                                    <TableCell component="th" scope="row" />
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="center">
                                        <IconButton variant="contained" color="primary">
                                            <AddIcon onClick={() => setAddClicked(true)} />
                                        </IconButton>
                                        <Button variant="contained" color="primary" onClick={() => setDoneClicked(true)}>
                                            Done
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ItemDetailsForm editClicked={editClicked} setEditClicked={setEditClicked} editItemId={editItemId} setEditItemId={setEditItemId} addClicked={addClicked} setAddClicked={setAddClicked} setNewItem={setNewItem} setEditedItem={setEditedItem} />
                </div>
            </Container>
        </>

    )
}


export default BuyItems
