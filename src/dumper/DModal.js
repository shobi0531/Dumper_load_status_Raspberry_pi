import React, { useState } from "react";
import "./DModal.css";

export const Modal = ({ closeModal, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      dumperid: "",
      dumpername: "",
      status: "Active",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.dumperid && formState.dumpername && formState.status) {
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
      const response = await fetch("http://localhost:5000/dumpers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        console.log("Data inserted Successfully !!!");
        alert("Data Inserted Sucessfully !!!!!");
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
            <label htmlFor="dumperid">Dumper ID</label>
            <input
              name="dumperid"
              onChange={handleChange}
              value={formState.dumperid}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dumpername">Dumper Name</label>
            <textarea
              name="dumpername"
              onChange={handleChange}
              value={formState.dumpername}
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
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
