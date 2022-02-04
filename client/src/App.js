import * as React from "react";
import LogIn from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Main from "./pages/Main/Main";
import PassRecovery from "./pages/PassRecovery/PassRecovery";
import PassReset from "./pages/PassReset/PassReset";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  const [geek, setGeek] = useState({});
  const [eventCards, setEventCards] = useState([]);
  document.title = "GeekOut!";
  // console.log("app", geek);

  if (geek.id) {
    return (
      <div className="page-container">
        <Navbar geek={geek} setGeek={setGeek} />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            exact
            path="/login"
            element={<LogIn geek={geek} setGeek={setGeek} />}
          />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/home"
            element={
              <Home
                geek={geek}
                setGeek={setGeek}
                eventCards={eventCards}
                setEventCards={setEventCards}
              />
            }
          />
          <Route
            exact
            path="/profile/me"
            element={
              <Profile
                geek={geek}
                setGeek={setGeek}
                eventCards={eventCards}
                setEventCards={setEventCards}
              />
            }
          />
          {/* <Route path="/profile/*" element={<Profile />} />
          <Route
            exact
            path="/settings"
            element={<Settings geek={geek} setGeek={setGeek} />}
          /> */}
          <Route exact path="/password-recovery" element={<PassRecovery />} />
          <Route path="/password-reset/*" element={<PassReset />} />
          {/* <Route path="/*" element={<P404 />} /> */}
        </Routes>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="page-container">
        <Navbar geek={geek} setGeek={setGeek} />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            exact
            path="/login"
            element={<LogIn geek={geek} setGeek={setGeek} />}
          />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/password-recovery" element={<PassRecovery />} />
          <Route path="/password-reset/*" element={<PassReset />} />
          <Route path="/*" element={<LogIn />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
