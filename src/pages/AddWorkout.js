
import React, { useState } from "react";

const AddWorkout = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addWorkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, duration }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Workout added successfully!");
      setName("");
      setDuration("");
    } else {
      alert(data.error || "Failed to add workout.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Workout Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Duration</label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;
