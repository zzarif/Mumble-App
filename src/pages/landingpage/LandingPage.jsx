import React, { useState } from "react";
import Background from "../../components/background/Background";
import Login from "../../components/authcard/Login";
import { Navigate } from "react-router-dom";
import { urls } from "../../constants/urls";

function LandingPage() {
  return localStorage.getItem("mumble") ? (
    <Navigate to={urls.DISTRICT} />
  ) : (
    <div>
      <Background />
      <Login />
    </div>
  );
}

export default LandingPage;
