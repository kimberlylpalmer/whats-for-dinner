// Home.js

import React from "react";
import "../styles.css"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   // Perform the fetch request to the test-cors endpoint
  //   fetch('/api/test-cors')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error fetching test CORS:', error));
  // }, []);


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
              <h1 className="home-header">WHAT'S FOR DINNER?</h1>
            <div className="mainContent"></div>
            </div>
          </main>
          <div className="rightColumn homeColumn">
            <p>Feast Your Eyes, Fuel Your Soul.</p>
          </div>
          <div>
            <button className="button" onClick={() => navigate('/recipes')}>View Recipes</button> 
          </div>
        </div>
      </>
    );
  }
  
  export default Home;