import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { makeStyles, Container, Typography, CssBaseline, Checkbox, IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RefreshIcon from '@material-ui/icons/Refresh';

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
    overline: {
        marginTop: theme.spacing(2)
    },
    table: {
        // minWidth: 500,
        maxWidth: 600,
        alignItems: 'center',
    },
}));

const OneHostedBuy = () => {
    const classes = useStyles()

    const [buyTitle, setBuyTitle] = useState()
    const [itemRows, setItemRows] = useState([])
    const [orders, setOrders] = useState([])
    const [refresh, setRefresh] = useState()
    const hostedBuyId = useParams().id

    useEffect(() => {
        // handleRefresh()
        axios
            .get(`/data/buys/${hostedBuyId}`)
            .then(response => {
                console.log(response)
                // setOrders(response.data.orders)
                let tmpOrders = [...response.data.orders]
                console.log(tmpOrders)
                for (let i = 0; i < orders.length; i++) {
                    for (let j = 0; j < orders[i].order_items.length; j++) {
                        const itemId = orders[i].order_items[j].item
                        const itemIndex = itemRows.findIndex((element) => (element.id === itemId))
                        const itemTitle = itemRows[itemIndex].title
                        const itemPrice = itemRows[itemIndex].price
                        console.log(i, j, itemTitle)
                        tmpOrders[i].order_items[j].title = itemTitle
                        tmpOrders[i].order_items[j].price = itemPrice
                        tmpOrders[i].order_items[j].subTotal = itemPrice * tmpOrders[i].order_items[j].quantity
                        tmpOrders[i].orderTotal = 0
                        tmpOrders[i].orderTotal += tmpOrders[i].order_items[j].subTotal
                    }
                }
                setBuyTitle(response.data.title)
                setItemRows(response.data.items)
                setOrders(tmpOrders)
                // handleRefresh()
            })
    }, [refresh])

    const handleChecked = (e, order) => {
        axios
            .put(`/data/orders/${order.id}`, { buyer_name: order.buyer_name, buyer_contact: order.buyer_contact, buy: order.buy, paid: !order.paid }, {
                headers: {
                    Authorization: `Token ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                handleRefresh()
            })
    }

    const handleRefresh = () => {
        setRefresh(Math.random())
    }

    const populatedItemRows = (itemRows.map((row) => (
        <TableRow key={row.id}>
            <TableCell align="center">
                {row.id}
            </TableCell>
            <TableCell align="center">
                {row.title}
            </TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">{row.sku}</TableCell>
            <TableCell align="center">{row.price}</TableCell>
        </TableRow>
    ))
    )

    const populatedOrderRows = (orders.map((order) => (
        <TableRow key={order.id}>
            <TableCell align="center">
                {order.id}
            </TableCell>
            <TableCell align="center">{order.buyer_name}</TableCell>
            <TableCell align="center">{order.buyer_contact}</TableCell>
            <TableCell align="center">{order.order_items.map(one => <li>{one.title} x {one.quantity}</li>)}</TableCell>
            <TableCell align="center">{order.orderTotal}</TableCell>
            <TableCell align="center"><Checkbox
                checked={order.paid}
                onChange={(e) => handleChecked(e, order)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            /></TableCell>
        </TableRow>
    ))
    )

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.header}>
                    <Typography variant="h3"> {buyTitle} </Typography>
                    <span>
                        <IconButton onClick={() => handleRefresh()}><RefreshIcon /></IconButton>
                    </span>
                </div>
                <Typography variant="overline" className={classes.overline}>Items in Buy</Typography>
                <TableContainer component={Paper} className={classes.table}>
                    <Table className={classes.table} aria-label="items table">
                        <TableHead>
                            <TableRow align="center">
                                <TableCell align="center">Item ID</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">SKU</TableCell>
                                <TableCell align="center">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {populatedItemRows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={classes.paper}>
                <Typography variant="overline" className={classes.overline}>Orders</Typography>
                <TableContainer component={Paper} className={classes.table}>
                    <Table className={classes.table} aria-label="items table">
                        <TableHead>
                            <TableRow align="center">
                                <TableCell align="center">Order ID</TableCell>
                                <TableCell align="center">Buyer</TableCell>
                                <TableCell align="center">Contact</TableCell>
                                <TableCell align="center">Items</TableCell>
                                <TableCell align="center">Order Total ($)</TableCell>
                                <TableCell align="center">Paid?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {populatedOrderRows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    )
}
export default OneHostedBuy