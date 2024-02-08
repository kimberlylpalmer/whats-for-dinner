// App.js

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "../components/AuthContext";
import PrivateRoute from '../components/PrivateRoute';
import RecipeForm from '../components/RecipeForm';
import Login from "./Login";
// import LogoutButton from "../components/LogoutButton";
import Home from "./Home";
import User from "./User";
import Signup from "./Signup";
import Recipes from "./Recipes"
// import NavBar from "../components/NavBar";


const App = () => {
  // const { user, logout } = useAuth();
  // console.log(user)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path="/recipes" element={<Recipes />} />
          <Route 
            path="/submit-recipe" 
            element={
              <PrivateRoute>
                <RecipeForm />
              </PrivateRoute>
            } 
          />

          {/* Include other routes as necessary */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


