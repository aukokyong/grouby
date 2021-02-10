import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false)
    axios
        .post('/auth/logout', 'logout requested', {
            headers: {
                Authorization: `Token ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response)
            setIsLoggedOut(true)
            sessionStorage.removeItem('token')
        })

    if (isLoggedOut) {
        return <Redirect to='/' />
    }

    return (
        <h1>Logout page</h1>
    )
}

export default Logout