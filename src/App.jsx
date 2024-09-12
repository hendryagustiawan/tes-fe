import { useEffect, useState } from "react";
// import "./App.css";
import { useNavigate, Link, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import { ToastComponent } from "./Components/ToastComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <ToastComponent />
    </>
  );
}

export default App;
