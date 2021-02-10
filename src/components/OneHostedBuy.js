import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { makeStyles } from '@material-ui/core';
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

const OneHostedBuy = () => {
    const classes = useStyles()

    const [buyTitle, setBuyTitle] = useState()
    const [rows, setRows] = useState([])
    const hostedBuyId = useParams().id

    useEffect(() => {
        axios
            .get(`/data/buys/${hostedBuyId}`)
            .then(response => {
                console.log(response)
                setBuyTitle(response.data.title)
                setRows(response.data.items)
            })
    }, [])

    const populatedRows = (rows.map((row) => (
        <TableRow key={row.id}>
            <TableCell align="center">
                {row.title}
            </TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">{row.sku}</TableCell>
            <TableCell align="center">{row.price}</TableCell>
        </TableRow>
    ))
    )

    return (
        <>
            <h1>{buyTitle}</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="items table">
                    <TableHead>
                        <TableRow align="center">
                            <TableCell>Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">SKU</TableCell>
                            <TableCell align="center">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {populatedRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default OneHostedBuy