// Table.js
import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./DailyTable.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="expand">Date</th>
            <th className="expand">Load Details</th>
            <th className="expand">Load Count</th>
            <th >In Time</th>
            <th >Out Time</th>
            <th >Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
              <td className="expand">{row.date}</td>
                <td className="expand">{row.loaddetails}</td>
                <td className="expand">{row.loadcount}</td>
                <td>{row.inTime}</td>
                <td >{row.outTime}</td>
                <td >
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
