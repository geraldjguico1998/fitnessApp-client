
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WorkoutLog from "./pages/WorkoutLog";
import AddWorkout from "./pages/AddWorkout";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workout-log" element={<WorkoutLog />} />
        <Route path="/add-workout" element={<AddWorkout />} />
      </Routes>
    </Router>
  );
};

export default App;
