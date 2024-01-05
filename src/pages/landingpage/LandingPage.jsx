import React, { useState } from "react";
import Background from "../../components/background/Background";
import Login from "../../components/authcard/Login";
import { Navigate } from "react-router-dom";
import { urls } from "../../constants/urls";
import SignUp from "../../components/authcard/SignUp";

function LandingPage() {
  const [authMethod, setAuthMethod] = useState(true);

  return localStorage.getItem("mumble") ? (
    <Navigate to={urls.GIRL_REGISTRATION} />
  ) : (
    <div>
      <Background />
      {authMethod? 
        <Login setAuthMethod={setAuthMethod}/> : 
        <SignUp setAuthMethod={setAuthMethod}/>
      }
    </div>
  );
}

export default LandingPage;
