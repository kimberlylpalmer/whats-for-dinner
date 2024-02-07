import React from "react";
import "../styles.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";



function User() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="homeBackground">
        <h1>Welcome {userData?.first_name}</h1>
        <p>User ID: {userData?.id}</p>
        <button className="button" onClick={() => navigate('/recipes')}>View Recipes</button> {/* Add this button */}
      </main>
      <div className="homeGridContainer">
        <div className="leftColumn homeColumn">
          <p>
            {" "}
            Turning Meal Planning from Chore to Cheer.
          </p>
        </div>
        <main className="homeBackground">
          <div>
            <h1 className="home-header">WHAT'S FOR DINNER</h1>
            <div className="mainContent"></div>
          </div>
        </main>
        <div className="rightColumn homeColumn">
          <p>
          Feast Your Eyes, Fuel Your Soul.
          </p>
          <button>does nothing(user page)</button>
        </div>
      </div>
    </>
  );
}

export default User;