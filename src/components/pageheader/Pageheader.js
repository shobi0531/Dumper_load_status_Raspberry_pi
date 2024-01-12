import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './PageHeader.css';
import { useNavigate } from 'react-router-dom';

function PageHeader({ pageTitle }) {
  const navigate = useNavigate();

  const getTitle = () => {
    switch (pageTitle) {
      case 'dumperdetails':
        return 'Dumper Details';
      case 'shovel':
        return 'Shovel Operator Details';
      case 'dailyreport':
        return 'Daily Report';  
      case 'report':
        return 'Trip and Load Details';
      case 'employee':
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
      <div className="pageback" onClick={() => navigate(-1)}>
        <h3>Back <FontAwesomeIcon icon={faArrowLeft} /></h3>
      </div>
    </div>
  );
}

export default PageHeader;
