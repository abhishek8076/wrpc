import React, { useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import TextField from "@mui/material/TextField";
import { MenuItem, Button } from "@mui/material";
import { Link } from "react-router-dom"; 
const Formoneallparts = () => {
  return (
    <>
    <div>
      <TopHeader />
      <CmsDisplay />
      <main>
        <div className="container mt-4 vh-100">
          <h2>Tripping Reporting and Compliance of PCM Monitoring</h2>
          <div className="date-sec row">
            <div className="col-md-4">
              
              <h5>Form1 parts</h5>
              <p>Part1</p>
              <p>Part2</p>
              <p>Part3</p>
              <p>Part4</p>
              <p>Part5</p>
            </div>
            <div className="col-md-4">
              
            <h5>Status of form1 parts</h5>
            <p><a href='form1part1list'>View List</a></p>
            <p><a href='form1part2'>Fill Form</a></p>
            <p><a href='form1part3'>Fill Form</a></p>
            <p><a href='nbban'>Fill Form</a></p>
            <p><a href='nbban'>Fill Form</a></p>
            </div>
            <div className="col-md-2">
  <Link to="/form1part1">
    <Button 
      variant="contained" 
      color="primary"
    >
      Add New Record
    </Button>
  </Link>
</div>
          </div>
          <div className="row mt-4">
              <div className="col-md-12">
                <Button 
                  variant="contained" 
                  color="primary" 
                >
                  Add New Record
                </Button>
              </div>
            </div>
          
        </div>
      </main>
    </div>
  </>
  );
};

export default Formoneallparts;
