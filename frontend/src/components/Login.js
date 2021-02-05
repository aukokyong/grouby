import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
        }
    }

    handleChange = (e, key) => {
        this.setState({ ...this.state, [key]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/users/', this.state)
            .then(response => {
                this.setState({username: "", email: "", password: ""})
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleChange(e, "username")} />
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e, "email")} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e, "password")} />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }
}

export default Login;