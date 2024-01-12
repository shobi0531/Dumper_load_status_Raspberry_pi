// Employee.js
import React, { useState } from "react";
import "./Employee.css";
import { Table } from "./ETable";
import { Modal } from "./EModal";
import Header from "../components/header/Header";

function Employee() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    setRows(
      rowToEdit === null
        ? [...rows, newRow]
        : rows.map((currRow, idx) => (idx !== rowToEdit ? currRow : newRow))
    );
    setModalOpen(false);
    setRowToEdit(null);
  };

  return (
    <div className="employee">
      <Header pageTitle={'employeedetails'} />
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn btn-add">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null ? rows[rowToEdit] : null}
        />
      )}
    </div>
  );
}

export default Employee;
