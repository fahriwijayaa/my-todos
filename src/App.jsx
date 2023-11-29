import React from "react";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "./utils/network";
import Profile from "./pages/Profile";

function NeedLogin() {
  let auth = getAccessToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<NeedLogin />}>
          <Route path="/:username" element={<Home />} />
          <Route path="/:username/add" element={<AddNote />} />
          <Route path="/:username/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
