import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AllBuyOrders = () => {
    const buyer_contact = useParams().contact
    const [orders, setOrders] = useState([])
    // const [buyTitles, setBuyTitles] = useState([])

    useEffect(() => {
        axios
            .get(`/data/orders?contact=${buyer_contact}`)
            .then(response => {
                console.log(response)
                setOrders(response.data)

            })
    }, [])

    const orderRows = (
        orders.map(order => (
            <p>{order.buy}</p>
        ))
    )

    return (
        <>
            <h1>Buyer's Orders</h1>
            {orderRows}
        </>
    )
}

export default AllBuyOrders