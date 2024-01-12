import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Content from './components/content/Content';
import Dumper from './dumper/Dumper';
import Shovel from './shovel/Shovel';
import Navbar from './sidebar/Navbar';
import DailyReport from './dailyreport/DailyReport';
import Tripdetails from './tripdetails/Tripdetails';
import LoginForm from './LoginForm/LoginForm';
import Employee from './employee/Employee';

function App() {
  const location = useLocation();
  const showNavbarRoutes = ["/content", "/dumperdetails", "/shovel", "/dailyreport", "/report", "/employee"];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <div>
        <Routes>
        <Route path="/" element={<LoginForm />} />
          <Route path="/content" element={<Content />} />
          <Route path="/dumperdetails" element={<Dumper />} />
          <Route path="/shovel" element={<Shovel />} />
          <Route path="/dailyreport" element={<DailyReport />} />
          <Route path="/report" element={<Tripdetails />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
