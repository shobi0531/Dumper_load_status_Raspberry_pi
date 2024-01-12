import React, { useState } from "react";
import "./DailyReport.css";
import { Table } from "./DailyTable";
import { Modal } from "./Modal";
import PageHeader from "../components/header/Header";

function DailyReport() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      date: "2023-12-01",
      loaddetails: "Details of the Load One",
      loadcount: "20",
      status: "Active",
      inTime:"03:00",
      outTime:"03:30",
    },
    {
      date: "2023-12-02",
      loaddetails: "Details of the Load two",
      loadcount: "15",
      status: "Inactive",
      inTime:"03:00",
      outTime:"03:30",
    },
    {
      date: "2023-12-03",
      loaddetails: "Details of the Load One",
      loadcount: "13",
      status: "Active",
      inTime:"03:00",
      outTime:"03:30",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;
            return newRow;
          })
        );
  };

  return (
    <div className="dailyreport">
        <PageHeader pageTitle={'dailyreport'} />
        <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
        <button onClick={() => setModalOpen(true)} className="dbtn">
          Add
        </button>
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />
        )}

    </div>
  );
}

export default DailyReport;
