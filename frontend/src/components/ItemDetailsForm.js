import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, CssBaseline, Typography, TextField, Modal, Button } from '@material-ui/core';

const modalStyle = {
    top: 50,
    left: 500,
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    close_button: {
        top: 5,
        left: 280,
    }
}));

const ItemDetailsForm = (props) => {
    const classes = useStyles();
    const open = props.editClicked || props.addClicked
    const buyId = sessionStorage.getItem('buyId')

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        sku: "",
        price: "",
        buy: `http://localhost:8000/data/buys/${buyId}`,
    })

    useEffect(() => {
        if (props.editItemId) {
            axios.get(`http://localhost:8000/data/items/${props.editItemId}`)
                .then(response => {
                    setFormData({
                        ...formData,
                        title: response.data.title,
                        description: response.data.description,
                        sku: response.data.sku,
                        price: response.data.price,
                    })
                })
        }
    }, [props.editItemId, open])

    const handleClose = () => {
        setFormData({
            title: "",
            description: "",
            sku: "",
            price: "",
            buy: `http://localhost:8000/data/buys/${buyId}`,
        })
        if (props.editClicked) {
            props.setEditClicked(false)
        }
        props.setAddClicked(false)
    }

    const handleChange = (e, key) => {
        setFormData({ ...formData, [key]: e.target.value })
        console.log(formData)
    }
    // need if-else for edit vs add
    const handleSubmit = (e) => {
        e.preventDefault()
        if (props.editClicked) {
            props.setEditClicked(false)
        }
        props.setAddClicked(false)
        if (props.editItemId) {
            return axios
                .put(`http://localhost:8000/data/items/${props.editItemId}`, formData, {
                    headers: {
                        Authorization: `Token ${sessionStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    console.log(response)
                    props.setEditedItem(response.data.id)
                })
        }
        axios
            .post('http://localhost:8000/data/items', formData, {
                headers: {
                    Authorization: `Token ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log(response)
                props.setNewItem(response.data.id)
            })
            .catch(error => console.log(error))
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <CssBaseline />
            <Button className={classes.close_button} onClick={() => handleClose()}>Close</Button>
            <Typography component="h1" variant="h5">
                {props.editClicked ? "Edit Item" : "Add Item"}
            </Typography>
            <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e, 'title')}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleChange(e, 'description')}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="sku"
                    label="SKU"
                    name="sku"
                    value={formData.sku}
                    onChange={(e) => handleChange(e, 'sku')}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={(e) => handleChange(e, 'price')}
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {props.editClicked ? "Save Changes" : "Add Item"}
                </Button>
            </form>
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default ItemDetailsForm