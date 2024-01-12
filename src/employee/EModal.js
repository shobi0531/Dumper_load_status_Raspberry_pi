// Modal.js
import React, { useState } from "react";
import "./EModal.css";

export const Modal = ({ closeModal, onSubmit }) => {
  const [formState, setFormState] = useState({
    EmployeeId: "",
    EmployeeName: "",
    EmployeeRole: "Showel Operator",
    status: "Active",
  });
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.EmployeeId &&
      formState.EmployeeName &&
      formState.EmployeeRole &&
      formState.status
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmployeeId: formState.EmployeeId,
          EmployeeName: formState.EmployeeName,
          EmployeeRole: formState.EmployeeRole,
          status: formState.status,
        }),
      });

      if (response.ok) {
        console.log("Data inserted Successfully !!!");
        alert("Data Inserted Successfully !!!!!");
        closeModal();
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("Network error:", error);
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="EmployeeId">Employee ID</label>
            <input
              name="EmployeeId"
              onChange={handleChange}
              value={formState.EmployeeId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="EmployeeName">Employee Name</label>
            <textarea
              name="EmployeeName"
              onChange={handleChange}
              value={formState.EmployeeName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="EmployeeRole">Role</label>
            <select
              name="EmployeeRole"
              onChange={handleChange}
              value={formState.EmployeeRole}
            >
              <option value="Showel Operator">Showel Operator</option>
              <option value="Dumper Operator">Dumper Operator</option>
            </select>

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
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
