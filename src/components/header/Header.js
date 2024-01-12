import React from 'react';
import './Header.css';

function PageHeader({ pageTitle }) {

  const getTitle = () => {
    switch (pageTitle) {
      case 'dumperdetails':
        return 'Dumper Details';
      case 'shoveloperator':
        return 'Shovel Operator Details';
      case 'dailyreport':
        return 'Daily Report';  
      case 'report':
        return 'Trip and Load Details';
      case 'employeedetails':
        return 'Employee Details';
      default:
        return 'Admin Dashboard';
    }
  };

  return (
    <div className="pageHeader">
      <div className="pagedash">
        <h1>{getTitle()}</h1>
      </div>
    </div>
  );
}

export default PageHeader;
