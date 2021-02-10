import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Typography, makeStyles, Container, CssBaseline, Button, FormControl, InputLabel, Select, MenuItem, Paper, IconButton, TableRow, TableCell, Table } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import OrderSubmission from './OrderSubmission'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    cart: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    carttItems: {
        display: 'flex',
        flexDirection: 'column'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    done: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const BuyPage = () => {
    const classes = useStyles()
    const [buyData, setBuyData] = useState({ items: [] })
    const [itemTitle, setItemTitle] = useState("")
    const [itemIndex, setItemIndex] = useState('')
    const [quantity, setQuantity] = useState('')
    const [orderItems, setOrderItems] = useState([])
    const [doneClicked, setDoneClicked] = useState(false)
    const buyId = useParams().id

    useEffect(() => {
        if (!buyData.title) {
            axios
                .get(`/data/buys/${buyId}`)
                .then(response => {
                    setBuyData(response.data)
                    sessionStorage.setItem('buyId', buyId)
                })
        }
    }, [])

    const handleItemChange = (e) => {
        setItemTitle(e.target.value)
        const index = buyData.items.findIndex(item => item.title === e.target.value)
        // console.log(index)
        setItemIndex(index)
    }
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    const handleDelete = (item) => {
        console.log('delete clicked')
        const tmpOrderItems = orderItems
        for (let i = 0; i < orderItems.length; i++) {
            if (tmpOrderItems[i].itemId === item) {
                tmpOrderItems.splice(i, 1)
                break
            }
        }
        console.log(tmpOrderItems)
        setOrderItems(tmpOrderItems)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setOrderItems([...orderItems, { itemTitle, itemIndex, quantity }])
        setItemTitle('')
        setQuantity(1)
    }

    const handleDoneClick = () => {
        setDoneClicked(true)
        sessionStorage.setItem('items', orderItems)
    }

    const items = buyData.items
    const menuItems = items.map((item, index) => (
        <MenuItem value={item.title} name={index}>{item.title} ({item.sku})</MenuItem>
    ))

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const quantities = numbers.map(number => (
        <MenuItem value={number}>{number}</MenuItem>
    ))

    // const orderItemPrice = (
    // item.quantity * items[items.indexOf(item.itemId)].price
    // )
    const buyerSelections = (
        <Table size="small">
            {orderItems.map((item) => (
                <TableRow className={classes.cartItems}>
                    <TableCell><Typography variant="overline">{item.itemTitle} x {item.quantity}</Typography></TableCell>
                    <TableCell>
                        {doneClicked ? "" : <IconButton color="secondary" align="right" onClick={() => handleDelete(item.itemId)}>
                            <HighlightOffIcon />
                        </IconButton>}
                    </TableCell>
                </TableRow>
            ))}
        </Table>
    )

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h3"> {buyData.title} </Typography>
                <Typography variant="subtitle1"> {buyData.description} </Typography>
                <Paper className={classes.cart}>
                    <Typography variant="h5">{doneClicked ? "Order Summary" : "Your Cart"}</Typography>
                    {orderItems.length !== 0 ? buyerSelections : <Typography variant="overline">... is empty</Typography>}
                </Paper>
                {doneClicked ? "" :
                    <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="select-item-label">Item</InputLabel>
                            <Select
                                labelId="select-item-label"
                                id="select-item"
                                value={itemTitle}
                                onChange={handleItemChange}
                            >
                                {menuItems}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="select-quantity-label">Quantity</InputLabel>
                            <Select
                                labelId="select-quantity-label"
                                id="select-quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                            >
                                {quantities}
                            </Select>
                        </FormControl>
                        <IconButton
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </form>}


                {doneClicked ? <OrderSubmission /> : <Button
                    className={classes.done}
                    variant="contained"
                    color="primary"
                    onClick={() => handleDoneClick()}
                >
                    Done!
                    </Button>}
            </div>

        </Container >
    )
}

export default BuyPage