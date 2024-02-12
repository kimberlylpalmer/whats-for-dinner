import React, { useEffect, useInsertionEffect, useState } from "react";
import "../styles.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import EditUserForm from "../components/EditUser";



function User() {
  const [userData, setUserData] = useState(() => JSON.parse(sessionStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState('theUserId');
  const [recipes, setRecipes] = useState([]);
  const [authoredRecipesCount, setAuthoredRecipesCount] = useState(0);

  const handleUpdateUser = async (updatedUserData) => {
    try {
      const response = await fetch(`/api/user/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      setUserData(data);
      sessionStorage.setItem('user', JSON.stringify(data));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userData)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = userData?.id;
  
        if (!userId) {
          console.error("No user ID found");
          return; // Optionally handle this case, e.g., redirect to login
        }
  
        const response = await fetch(`/api/user/${userId}`, {
          method: 'GET',
          credentials: 'include', 
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('User profile data:', data);
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (userData?.id) {
      fetchUserProfile();
    }
  }, []);



  useEffect(() => { 
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRecipes(data);
      })
      .catch(error => {
        console.error('Error fetching authored recipes:', error);
    })
  }, [])

  console.log("outside ", recipes)
 
  useEffect(() => {
    if (recipes.length > 0 && userData?.id) {
      const count = recipes.filter(recipe => recipe.author_id.toString() === userData.id.toString()).length;
      setAuthoredRecipesCount(count);
      console.log(`Number of recipes authored by user ${userData.id}:`, authoredRecipesCount);
    }
  }, [recipes, userData.id]);
  
  const calculateAuthoredRecipes = () => {
    const authoredRecipesCount = recipes.filter(recipes => recipes.author_id === userId).length;
    console.log(`number of recipes ${userId}:`, authoredRecipesCount)
    return authoredRecipesCount
  }



  return (
    <div>
      <header>
        <NavBar />
      </header>
      {isEditing ? (
        <EditUserForm userData={userData} onUpdateUser={handleUpdateUser} />
      ) : (
        <>
      <main className="homeBackground">
        <h1>Welcome {userData?.first_name}</h1>
      </main>
          <button className="button" onClick={() => navigate('/recipes')}>View Recipes</button> 
          {/* <button className="button" onClick={() => navigate('/mealplanner')}>Meal Planning</button>  */}
      <div className="homeGridContainer">
        <div className="leftColumn homeColumn">
          <p>
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
        </div>
        <div>
          <h2>User Profile</h2>
          <p>Username: {userData?.username}</p>
          <p>First Name: {userData?.first_name}</p>
          <p>Last Name: {userData?.last_name}</p>
          <p>Email: {userData?.email}</p>
                <p>Contributed Recipes: </p>
                <p>Contributed Recipes: {authoredRecipesCount}</p>
        <button className="button" onClick={() => setIsEditing(!isEditing)}>Edit User Profile</button> 
          </div>
        <div>
          {/* <button className="button" onClick={() => navigate('/recipes')}>Delete Account</button>  */}
              </div>
            </div>
        </>
      )}
    </div>
  );
}

export default User;