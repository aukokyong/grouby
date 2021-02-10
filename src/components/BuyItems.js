import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { makeStyles, IconButton, Button } from '@material-ui/core';
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

const useStyles = makeStyles({
    table: {
        minWidth: 500,
        maxWidth: 700,
        alignItems: 'center',
    },
});

const BuyItems = () => {
    const classes = useStyles();

    const [editClicked, setEditClicked] = useState(false)
    const [editItemId, setEditItemId] = useState()
    const [addClicked, setAddClicked] = useState(false)
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

    const populatedRows = (rows.map((row) => (
        <TableRow key={row.id}>
            <TableCell component="th" scope="row">
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
                <IconButton variant="contained" color="secondary">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ))
    )


    return (
        <>
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
        </>

    )
}


export default BuyItems
