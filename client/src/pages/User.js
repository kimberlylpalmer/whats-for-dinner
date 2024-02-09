import React, { useEffect, useState } from "react";
import "../styles.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import EditUserForm from "../components/EditUser";



function User() {
  const [userData, setUserData] = useState(() => JSON.parse(sessionStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);

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
        {/* <p>User ID: {userData?.id}</p> */}
      </main>
          <button className="button" onClick={() => navigate('/recipes')}>View Recipes</button> 
          <button className="button" onClick={() => navigate('/recipes')}>Meal Planning</button> 
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
          </div>
          <div>
            {/* <button onClick={() => setIsEditing(true)}>Edit Profile</button> */}
          </div>
        <div>
        <button className="button" onClick={() => setIsEditing(!isEditing)}>Toggle Edit User</button> 
          {/* <button className="button" onClick={() => navigate('/recipes')}>Delete Account</button>  */}
              </div>
            </div>
        </>
      )}
    </div>
  );
}

export default User;