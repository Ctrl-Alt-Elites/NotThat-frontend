import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import './LoginForm.css'

export default function LoginForm(props) {

    // States
    const [info, setInfo] = useState({ username: "", password: ""})

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault()        
        console.log(props.getUsers())
        // props.postRestaurant(info, setInfo)
    }

     // handling the input changes
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        const copy = Object.assign({}, info)

        copy[name] = value

        setInfo(copy)
    }

    // Setting Cuisine Changes

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <input className="input-field" onChange={handleChange} type="text" name="username" placeholder="Username" value={info.username}/>
                <input className="input-field" onChange={handleChange} type="password" name="password" placeholder="Password" value={info.password}/>
                <button className="submit-button" type="submit">Login</button>
            </form>
            <p> No account? Sign up <Link to="/register" >here</Link> </p> 
        </div>
    )
}