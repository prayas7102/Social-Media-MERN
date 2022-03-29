import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import {LoginUser} from "../Actions/User";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch=useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(LoginUser(email,password))
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <h3>Media Block</h3>
                <input
                    type="email"
                    name=""
                    value={email}
                    id=""
                    placeholder='Email'
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type="password"
                    name=""
                    value={password}
                    id=""
                    placeholder='Password'
                    required
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Link to="/forgot/password">
                    Forgot Password
                </Link>
                <button>LOGIN</button>
            </form>
        </div>
    )
}

export default Login