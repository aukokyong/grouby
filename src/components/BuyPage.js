import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Typography, makeStyles, Container, CssBaseline, Button, FormControl, InputLabel, Select, MenuItem, Paper, IconButton, TableRow, TableCell, Table } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RefreshIcon from '@material-ui/icons/Refresh';


import OrderSubmission from './OrderSubmission'

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
    const [itemTitle, setItemTitle] = useState('')
    const [itemIndex, setItemIndex] = useState('')
    const [quantity, setQuantity] = useState('')
    const [itemSubTotal, setItemSubTotal] = useState('')
    const [orderTotal, setOrderTotal] = useState(0)
    const [orderItems, setOrderItems] = useState([])
    const [doneClicked, setDoneClicked] = useState(false)
    const [refresh, setRefresh] = useState()

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
    }, [refresh])

    const items = buyData.items

    const handleItemChange = (e) => {
        setItemTitle(e.target.value)
        const index = buyData.items.findIndex(item => item.title === e.target.value)
        setItemIndex(index)
    }
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
        setItemSubTotal(e.target.value * items[itemIndex].price)
    }

    // to fix
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

    const handleAddItem = (e) => {
        e.preventDefault()
        setOrderItems([...orderItems, { itemTitle, 'itemId': items[itemIndex].id, quantity, 'itemSubTotal': items[itemIndex].price * quantity }])
        setItemTitle('')
        setQuantity(1)
    }

    const handleDoneClick = () => {
        setDoneClicked(true)
        const subTotalArray = []
        orderItems.map(item => subTotalArray.push(item.itemSubTotal))
        console.log(subTotalArray)
        setOrderTotal(subTotalArray.reduce((a, b) => (a + b), 0))
    }

    const handleRefresh = () => {
        setRefresh(Math.random())
    }

    const menuItems = items.map((item, index) => (
        <MenuItem value={item.title} name={index}>{item.title} ({item.sku})</MenuItem>
    ))

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const quantities = numbers.map(number => (
        <MenuItem value={number}>{number}</MenuItem>
    ))

    const buyerSelections = (
        <Table size="small">
            {orderItems.map((item) => (
                <>
                    <TableRow className={classes.cartItems}>
                        <TableCell><Typography variant="overline">{item.itemTitle} x {item.quantity}</Typography></TableCell>
                        <TableCell>
                            {doneClicked ? `$${item.itemSubTotal}` : <IconButton color="secondary" align="right" onClick={() => handleDelete(item.itemId)}>
                                <HighlightOffIcon />
                            </IconButton>}
                        </TableCell>
                    </TableRow>
                </>
            ))}
        </Table>
    )

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.header}>
                    <Typography variant="h3"> {buyData.title} </Typography>
                    <span>
                        <IconButton onClick={() => handleRefresh()}><RefreshIcon /></IconButton>
                    </span>
                </div>
                <Typography variant="subtitle1"> {buyData.description} </Typography>
                <Paper className={classes.cart}>
                    <Typography variant="h5">{doneClicked ? "Order Summary" : "Your Cart"}</Typography>
                    {orderItems.length !== 0 ? buyerSelections : <Typography variant="overline">... is empty</Typography>}
                    {doneClicked ? <TableRow className={classes.cartItems}>
                        <TableCell>
                            <Typography variant="overline">Order Total</Typography></TableCell>
                        <TableCell>
                            ${orderTotal}
                        </TableCell>
                    </TableRow>
                        :
                        ""}
                </Paper>
                {doneClicked ? "" :
                    <form className={classes.form} noValidate onSubmit={(e) => handleAddItem(e)}>
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


                {doneClicked ? <OrderSubmission orderItems={orderItems} /> : <Button
                    className={classes.done}
                    variant="contained"
                    color="primary"
                    onClick={() => handleDoneClick()}
                >
                    Next
                    </Button>}
            </div>

        </Container >
    )
}

export default BuyPage