import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { makeStyles, IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
        maxWidth: 700,
        alignItems: 'center',
    },
});

const AllHostedBuys = () => {
    const classes = useStyles()
    const [rows, setRows] = useState([])

    useEffect(() => {
        axios.get('/data/hostedbuys', {
            headers: {
                Authorization: `Token ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log(response)
                setRows(response.data)
            })
    }, [])

    const handleViewMore = (buyId) => {
        const url = `/hostedbuys/${buyId}`
        console.log(url)
        return <Redirect to={url} />
    }

    const populatedRows = (rows.map((row) => (
        <TableRow key={row.id}>
            <TableCell align="center">
                {row.id}
            </TableCell>
            <TableCell align="center">
                {row.title}
            </TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">{row.closing_date}</TableCell>
            <TableCell align="center">{row.collection_date}</TableCell>
            <TableCell align="center">
                <IconButton variant="contained" color="primary" onClick={() => handleViewMore(row.id)}>
                    <PageviewIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ))
    )

    return (
        <>
            <h1>All Hosted Buys</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="items table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Buy ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Closing Date</TableCell>
                            <TableCell align="center">Collection Date</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ? populatedRows : <TableRow>Start by adding items!</TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AllHostedBuys