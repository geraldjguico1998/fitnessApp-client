
import React from "react";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="container mt-5 text-center">
      {!token ? (
        <>
          <h1>Welcome to Workout Tracker</h1>
          <p>Your go-to app for tracking workouts and fitness progress.</p>
          <p>Please <a href="/login">Login</a> or <a href="/register">Register</a> to start your fitness journey.</p>
        </>
      ) : (
        <>
          <h1>Welcome Back!</h1>
          <p>Start tracking your workouts or add a new one.</p>
          <a href="/workout-log" className="btn btn-primary">View Workouts</a>
          <a href="/add-workout" className="btn btn-secondary ml-2">Add Workout</a>
        </>
      )}
    </div>
  );
};

export default Home;
