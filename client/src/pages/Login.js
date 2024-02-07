import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from '../components/AuthContext';

export default function Login() {
    const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
        })
            .then((r) => {
                if (!r.ok) {
                    throw new Error("Login failed");
                }
                return r.json();
            })
            .then((data) => {
                login(data);
                console.log(data)
                navigate('/user');
                // localStorage.setItem("user", JSON.stringify(data));  //this is added to locally store the user data for the user page
                // loginInfo(data);
                // setUser(data);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <main>
            <header>
                <NavBar />
            </header>
            <div></div>
            <div className="loginMain">
                <div className="logoContainer">logo container</div>
                <div className="titleContainer">
                    <h1 className="loginTitle">What's For Dinner</h1>
                </div>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="loginPage">
                        <label htmlFor="username">Username: </label>
                        <input
                            value={loginInfo.username}
                            id="username"
                            name="username"
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div className="loginPage">
                        <label htmlFor="password">Password: </label>
                        <input
                            onChange={handleLoginChange}
                            value={loginInfo.password}
                            type="password"
                            id="password"
                            name="password"
                        />
                        <div>
                            <input className="button" type="submit" value="Login" />
                        </div>
                    </div>
                </form>
                <p>Don't have an account? <Link to="/sign_up">Sign up</Link>
                </p>
            </div>
        </main>
    );
}


