
import './Content.css';
import {Link} from "react-router-dom";
import React from 'react';
import Dumperimg from './dumper.png';
import Reportimg from './report.png';
import Employeimg from './empl.png';
import Shovelimg from './shovelimg.png';
import Dailyimg from './dailyreport.png'
import Header from "../header/Header";

function Content()
{
    return(
      <div className='content'>
      <Header />
      <Link to='/content'>
      
        <div className="container">
          <div className="row">
              <div className="box">
              <Link to="/dumperdetails">
              <div className="dumperimg">
                <img src={Dumperimg} alt="Dumperimg" />
                <h2>Dumper Details</h2>
              </div>
            </Link>
          </div>


            
              <div className="box">
              <Link to='/report'>
                <div className="report">
                  <img src={Reportimg} alt="Reportimg" />
                  <h2>Trip and Load Details</h2>
                </div>
              </Link>
              </div>


           
              <div className="box">
              <Link to='/employee'>
                <div className="employeeimg">
                  <img src={Employeimg} alt="Employeeimg" />
                  <h2>Employee Details</h2>
                </div>
                </Link>
              </div>

          </div>

          <div className="row">
            
              <div className="box">
              <Link to='/shovel'>

              
                <div className="shovelimg">
                  <img src={Shovelimg} alt="Shivelimg" />
                  <h2>Shovel Operator Details</h2>
                </div>
                </Link>
              </div>


          
              <div className="box">
              <Link to='/dailyreport'>
              <div className="dailyreport">
                <img src={Dailyimg} alt="dailyreport" />
                <h2>Daily Report of the Task </h2>
              </div>
              </Link>
              </div>

          </div>
        </div>
        </Link>
      </div>
        
    )
};

export default Content;