import axios from 'axios'
import Cookies from 'js-cookie'
import { Component } from 'react'

const token = Cookies.get('csrftoken')

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/hosts')
            .then(response => {
                console.log(response.data)
                this.setState({ "response": response.data })
            })
            .then(
                console.log(this.state.response)
            )
    }

    handleDelete = (e) => { // not working - error in console.
        e.preventDefault()
        const hostId = e.target.id
        axios.delete(`http://localhost:8000/hosts/${hostId}`)
    }

    // // , {
    //     headers: {
    //         'HTTP_X_CSRFToken': token // might be 'X-CSRFToken: token
    //     },
    //     credentials: 'include'
    render() {
        return (
            <>
                <h1>All Hosts</h1>
                <p>{token}</p>
                <ol>
                    {this.state.response.map(item => {
                        return <li key={item.id}>{item.name}, {item.mobile_num}, {item.email} <button id={item.id} onClick={(e) => this.handleDelete(e)}>Delete</button></li>
                    }
                    )
                    }
                </ol>

            </>
        )
    }
}

export default SignUp;
