import * as React from "react";
import LogIn from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Main from "./pages/Main/Main";
import PassRecovery from "./pages/PassRecovery/PassRecovery";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import "./App.css";

function App() {
  return (
    <div className="page-container">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        {/* <Route exact path="/profile/:id" element={<Profile />} /> */}
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/password-recovery" element={<PassRecovery />} />
      </Routes>
    </div>
  );
}

export default App;
