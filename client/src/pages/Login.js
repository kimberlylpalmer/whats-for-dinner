import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../components/AuthContext";


export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Wrong username or password");
        }
        return r.json();
      })
      .then((data) => {
        login(data);
        console.log(data);
        navigate("/user");
      })
      .catch((e) => {
        console.error(e);
        setErrorMessage(e.message);
        setLoginInfo({...loginInfo, password: ""})
      });
  };

  return (
    <main>
      <header>
        <NavBar />
      </header>
        <div className="titleContainer">
          <h1 className="loginTitle">What's For Dinner?</h1>
        </div>
      <div></div>
      <div className="loginMain">
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginPage">
            <label className='label' htmlFor="username">Username: </label>
            <input
              value={loginInfo.username}
              id="username"
              name="username"
              onChange={handleLoginChange}
              className="input"
            />
          </div>
          <div className="loginPage">
            <label className='label' htmlFor="password">Password: </label>
            <input
              onChange={handleLoginChange}
              value={loginInfo.password}
              type="password"
              id="password"
              name="password"
              className="input"
            />
          </div>
          {errorMessage && (
            <div className="error" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}
          <div>
            <div>
              <input className="button" type="submit" value="Login" />
            </div>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
