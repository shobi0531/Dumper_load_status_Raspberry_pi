import React, { useState } from "react";
import { Table } from "./DTable";
import { Modal } from "./DModal";
import PageHeader from "../components/header/Header";

function Dumper() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dumpers, setDumpers] = useState([
    {
      dumperid: "Home",
      dumpername: "This is the main page of the website",
      status: "Active",
    },
    {
      dumperid: "About Us",
      dumpername: "This page has details about the company",
      status: "Inactive",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setDumpers((prevDumpers) =>
      prevDumpers.filter((_, idx) => idx !== targetIndex)
    );
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    setDumpers((prevDumpers) =>
      rowToEdit === null
        ? [...prevDumpers, newRow]
        : prevDumpers.map((currRow, idx) =>
            idx !== rowToEdit ? currRow : newRow
          )
    );
    setModalOpen(false);
    setRowToEdit(null);
  };

  return (
    <div className="dumper">
      <PageHeader pageTitle={'dumperdetails'} />
      <Table dumpers={dumpers} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null ? dumpers[rowToEdit] : null}
        />
      )}
    </div>
  );
}

export default Dumper;
