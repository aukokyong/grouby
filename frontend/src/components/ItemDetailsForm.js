import React, { useState } from 'react';
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

    const handleClose = () => {
        if (props.editClicked) {
            props.setEditClicked(false)
        }
        props.setAddClicked(false)
    }

    const handleChange = (e, key) => {
        setFormData({ ...formData, [key]: e.target.value })
        console.log(formData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('http://localhost:8000/data/items', formData, {
                headers: {
                    Authorization: `Token d24f301e0088dc621807c6bf3996b6e3c1d03c64`
                }
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <CssBaseline />
            <Button className={classes.close_button} onClick={() => handleClose()}>Close</Button>
            <Typography component="h1" variant="h5">
                Create A Buy
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
                    Add Items
                    </Button>
            </form>
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={() => props.setAddClicked(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default ItemDetailsForm