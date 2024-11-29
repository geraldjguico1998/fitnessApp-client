
import React, { useState, useEffect } from "react";

const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateDuration, setUpdateDuration] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setWorkouts(data.workouts);
    } else {
      alert(data.message || "Failed to fetch workouts.");
    }
  };

  const handleComplete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      alert("Workout marked as completed.");
      fetchWorkouts();
    } else {
      alert("Failed to complete workout.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      alert("Workout deleted successfully.");
      fetchWorkouts();
    } else {
      alert("Failed to delete workout.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${updateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: updateName, duration: updateDuration }),
    });
    if (response.ok) {
      alert("Workout updated successfully.");
      setUpdateId(null);
      setUpdateName("");
      setUpdateDuration("");
      fetchWorkouts();
    } else {
      alert("Failed to update workout.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Workout Log</h2>
      {workouts.length > 0 ? (
        <ul className="list-group">
          {workouts.map((workout) => (
            <li key={workout._id} className="list-group-item">
              <strong>{workout.name}</strong> - {workout.duration} minutes
              <br />
              Status: {workout.status}
              <br />
              Date: {new Date(workout.dateAdded).toLocaleDateString()}
              <br />
              <button className="btn btn-success btn-sm me-2" onClick={() => handleComplete(workout._id)}>
                Complete
              </button>
              <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(workout._id)}>
                Delete
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setUpdateId(workout._id);
                  setUpdateName(workout.name);
                  setUpdateDuration(workout.duration);
                }}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts found.</p>
      )}

      {updateId && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h3>Update Workout</h3>
          <div className="mb-3">
            <label>Workout Name</label>
            <input
              type="text"
              className="form-control"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Duration</label>
            <input
              type="text"
              className="form-control"
              value={updateDuration}
              onChange={(e) => setUpdateDuration(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Workout
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setUpdateId(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default WorkoutLog;
