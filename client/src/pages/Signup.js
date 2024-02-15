//signup

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from '../components/AuthContext';
import WFDIcon from '../assets/WFDIcon.png'

export default function Signup() {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
    });
    const [errorMsg, setErrorMsg] = useState(""); //Username exists

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        console.log("Submitting signup data:", loginInfo);
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
        })

            .then((r) => {
                console.log("Raw response from signup:", r); 
                if (!r.ok) {
                    if (r.status === 409) { // Assuming 409 Conflict for existing username
                        throw new Error("Username already exists. Please try another.");
                    }
                    throw new Error("Username already exists. Please try another.");
                }
                return r.json();
            })
            .then((data) => {
                console.log("Processed signup data recieved:", data);
                login(data)
                navigate('/user')
            })
            .catch((error) => {
                console.error("Signup error:", error);
                setErrorMsg(error.message);
            })
    };

    return (
        <main>
            <header>
            <NavBar />
            </header>
            <div className="signupMain">

                <div className="titleContainger">
                    <h1>What's For Dinner</h1>
                </div>
                <div>
                {errorMsg && <div className="error">{errorMsg}</div>}
                </div>
                
                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor='username'>Username: </label>
                        <input
                            value={loginInfo.username}
                            id="username"
                            name="username"
                            onChange={handleLoginChange}
                            className="input"
                        />
                    </div>
                    <div className="input-constainer">
                        <label htmlFor="first_name">First Name: </label>
                        <input
                            value={loginInfo.first_name}
                            id="first_name"
                            name="first_name"
                            onChange={handleLoginChange}
                            className="input"
                        />
                        </div>
                    <div className="input-constainer">
                        <label htmlFor="last_name">Last Name: </label>
                        <input
                            value={loginInfo.last_name}
                            id="last_name"
                            name="last_name"
                            onChange={handleLoginChange}
                            className="input"
                        />
                        </div>
                    <div className="input-constainer">
                        <label htmlFor="email">Email: </label>
                        <input
                            value={loginInfo.email}
                            id="email"
                            name="email"
                            onChange={handleLoginChange}
                            className="input"
                        />
                    </div>
                    <div className="input-constainer">
                        <label htmlFor="password">Password: </label>
                        <input
                            onChange={handleLoginChange}
                            value={loginInfo.password}
                            type="password"
                            id="password"
                            name="password"
                            className="input"
                        />
                    <div>
                        <input className="button" type="submit" value="Signup" />
                    </div>
                    </div>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    )
}

