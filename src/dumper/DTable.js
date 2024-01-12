import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import './DTable.css';

export const Table = ({ deleteRow, editRow }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getdumper");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="etable-wrapper">
      <table className="etable">
        <thead>
          <tr>
            <th className="eexpand">Dumper ID</th>
            <th className="eexpand">Dumper Name</th>
            <th className="eexpand">Status</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td className="eexpand">{row.dumperid}</td>
                <td className="eexpand">{row.dumpername}</td>
                <td className="eexpand">{row.status}</td>
                <td>
                  <span className={`elabel elabel-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="efit">
                  <span className="eactions">
                    <BsFillTrashFill
                      className="edelete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="eedit-btn"
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

export default Table;
