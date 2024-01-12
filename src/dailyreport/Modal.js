// Modal.js
import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      date: "",
      inTime: "",
      outTime: "",
      loaddetails: "",
      loadcount: "",
      status: "Active",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(formState.date + 'T' + formState.outTime);

    if (
      formState.date &&
      formState.inTime &&
      formState.outTime &&
      formState.loaddetails &&
      formState.loadcount &&
      formState.status &&
      formState.inTime < formState.outTime &&
      selectedDate <= currentDate
    ) {
      setErrors("");
      return true;
    } else {
      setErrors("Please make sure Out Time is greater than In Time, Date is not in the future, and all fields are filled correctly");
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
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
            <label htmlFor="loaddetails">Load Details</label>
            <input
              name="loaddetails"
              onChange={handleChange}
              value={formState.loaddetails}
            />
          </div>
          <div className="form-group">
            <label htmlFor="loadcount">Load Count</label>
            <input
              name="loadcount"
              onChange={handleChange}
              value={formState.loadcount}
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
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
