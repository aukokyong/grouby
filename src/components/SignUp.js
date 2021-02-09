import axios from 'axios'
import { Component } from 'react'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            mobile_num: "",
            password: "",
        }
    }

    handleChange = (e, key) => {
        this.setState({ ...this.state, [key]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/hosts/', this.state)
            .then(response => {
                this.setState({ name: "", email: "", mobile_num: "" })
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
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleChange(e, "name")} />
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e, "email")} />
                    <label htmlFor="mobile_num">Mobile Number: </label>
                    <input type="number" name="mobile_num" value={this.state.mobile_num} onChange={(e) => this.handleChange(e, "mobile_num")} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e, "password")} />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }
}

export default SignUp;
