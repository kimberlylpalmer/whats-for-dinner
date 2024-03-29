import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useAuth } from "./AuthContext";




function EditUserForm({ userData, onUpdateUser, onCancel }) {
  // Local state to manage form inputs, initialized from props
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [email, setEmail] = useState(userData.email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for updating
    const updatedUserData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    // Call the onUpdateUser prop, passing the updated user data
    onUpdateUser(updatedUserData);
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name: </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-input"
        />
      </div>
      <div>
        <label>Last Name: </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-input"
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>
      <button type="submit" className='button'>Update Profile</button>
      <button type="button" className='button' onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditUserForm;