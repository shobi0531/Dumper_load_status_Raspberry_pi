import React, { useState } from "react";
import "./SModal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      shovelid: "",
      shovelname: "",
      status: "Active",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.shovelid && formState.shovelname && formState.status) {
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
      const response = await fetch("http://localhost:5000/shovel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shovelid: formState.shovelid,
          shovelname: formState.shovelname,
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
        <form>
          <div className="form-group">
            <label htmlFor="shovelid">Shovel ID</label>
            <input
              name="shovelid"
              onChange={handleChange}
              value={formState.shovelid}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shovelname">Shovel Name</label>
            <textarea
              name="shovelname"
              onChange={handleChange}
              value={formState.shovelname}
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
          {errors && (
            <div className="error">{`Please include: ${errors}`}</div>
          )}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
