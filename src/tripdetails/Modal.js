import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal }) => {
  const [formState, setFormState] = useState({
    date: "",
    inTime: "",
    outTime: "",
    dumperID: "",
    dumperShovelID: "",
    status: "Active",
  });
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(formState.date + "T" + formState.outTime);

    if (
      formState.date &&
      formState.inTime &&
      formState.outTime &&
      formState.dumperID &&
      formState.dumperShovelID &&
      formState.status &&
      formState.inTime < formState.outTime &&
      selectedDate <= currentDate
    ) {
      setErrors("");
      return true;
    } else {
      setErrors(
        "Please make sure Out Time is greater than In Time, Date is not in the future, and all fields are filled correctly"
      );
      return false;
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "date") {
      setFormState({
        ...formState,
        date: e.target.value,
      });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formState.date,
          inTime: formState.inTime,
          outTime: formState.outTime,
          dumperID: formState.dumperID,
          dumperShovelID: formState.dumperShovelID,
          status: formState.status,
        }),
      });

      if (response.ok) {
        console.log("Data inserted Successfully !!!");
        alert("Data Inserted Successfully !!!!!");
        closeModal();
      } else {
        const errorMessage = await response.text();
        setErrors(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrors("Network error. Please try again.");
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={formState.date}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inTime">In Time</label>
            <input
              type="time"
              name="inTime"
              onChange={handleChange}
              value={formState.inTime}
            />
          </div>
          <div className="form-group">
            <label htmlFor="outTime">Out Time</label>
            <input
              type="time"
              name="outTime"
              onChange={handleChange}
              value={formState.outTime}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dumperID">Dumper ID</label>
            <input
              name="dumperID"
              onChange={handleChange}
              value={formState.dumperID}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dumperShovelID">Dumper Shovel ID</label>
            <input
              name="dumperShovelID"
              onChange={handleChange}
              value={formState.dumperShovelID}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        {errors && <div className="error">{errors}</div>}
      </div>
    </div>
  );
};
