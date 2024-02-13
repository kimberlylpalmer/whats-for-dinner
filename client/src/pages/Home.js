// Home.js

import React from "react";
import "../styles.css"
import NavBar from "../components/NavBar"
// import { useNavigate } from "react-router-dom";
import RecipesPageBackground from '../assets/RecipesPageBackground.jpg';


function Home() {
  // const navigate = useNavigate();

    return (
      <>
        <header>
          <NavBar />
        </header>
        <div className="homeGridContainer">
          <div className="leftColumn homeColumn">
            <p> Turning Meal Planning from Chore to Cheer.</p>
          </div>
          <main className="homeBackground">
            <div>
            <div className="mainContent"></div>
            </div>
            <div>
              <img src={RecipesPageBackground} />
            </div>
          </main>
          <div className="rightColumn homeColumn">
            <p>Feast Your Eyes, Fuel Your Soul.</p>
          </div>
          <div>
            {/* <button className="button" onClick={() => navigate('/recipes')}>View Recipes</button>  */}
          </div>
        </div>
      </>
    );
  }
  
  export default Home;