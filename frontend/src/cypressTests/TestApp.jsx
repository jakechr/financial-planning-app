import React from "react"
import './TestApp.css'
import axios from "axios"

const TestApp = () => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')

    const onSubmit = () => {

        axios.post('http://localhost:3000/login', {
            userId: username,
            password: password,
        })
            .then(({data}) => {
                setMessage(data.success ? 'Success' : 'Failure')
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="login">
            <div className="title">Login</div>
            <div className="field">
                <div>Username</div>
                <input data-cy="username" onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div className="field">
                <div>Password</div>
                <input data-cy="password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button data-cy="submit" onClick={onSubmit} className="submit">
                <div>Submit</div>
            </button>
            <div data-cy="message" className="success">
                { message }
            </div>
        </div>
    )
}
export default TestApp;