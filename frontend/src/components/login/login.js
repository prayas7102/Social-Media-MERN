import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Button } from "@mui/material";
import { LoginUser } from "../../Actions/User";
import "./Login.css";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(LoginUser(email, password))
    }
    return (
        <div className='login'>
            <form onSubmit={handleLogin} className='loginForm'>
                <Typography variant="h3">Media Block</Typography>
                <input
                    type="email"
                    name=""
                    value={email}
                    placeholder='Email'
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type="password"
                    name=""
                    value={password}
                    placeholder='Password'
                    required
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Link to="/forgot/password">
                    <h3><Typography>Forgot Password</Typography></h3>
                </Link>
                <Button type='submit'>LOGIN</Button>
            </form>
        </div>
    )
}

export default Login