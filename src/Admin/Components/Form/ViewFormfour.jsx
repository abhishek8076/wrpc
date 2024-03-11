import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";

// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from "../../../Api/ApiClient";
import api from "../../../Api/api.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Import Material-UI components
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap/esm";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export const ViewFormfour = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedFile, setSelectedFile] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [getuser, setuser] = useState("");
  const [formData, setFormData] = useState({
    SNo: "",
    StationName: "",
    kVLevel: "",
    Owner: "",
    Location: "",
    PlannedDateAudit: "",
    DateAudit: "",
    AuditEntity: "",
    Report: "",
    Compliances: "",
    Issuesobserved: "",
    Remarks: "",
  });

  // New state variables for confirmation dialog and loading
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedRole(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      // File is a PDF
      setSelectedFile(file);

      // You can perform additional actions here if needed
    } else {
      // File is not a PDF
      alert("Please upload a PDF file.");
    }
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Please enter your name";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      errors.name = "Please input alphabet characters only";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = `E-mail must include "@" character `;
    }

    if (!formData.mobile_no) {
      errors.mobile_no = "Please enter your mobile number";
    } else if (!/^(\+91|\+91\-|0)?[789]\d{9}$/.test(formData.mobile_no)) {
      errors.mobile_no = "Please enter a valid 10-digit phone number ";
    }

    if (!formData.address) {
      errors.address = "Please enter your address";
    }

    if (!selectedRole) {
      errors.selectedRole = "Role is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Open the confirmation dialog when the user clicks "Submit"
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    // Handle cancel action in the confirmation dialog
    setConfirmDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    // Close the confirmation dialog
    setConfirmDialogOpen(false);
    // Set loading state to true
    setLoading(true);

    try {
      const formDataToSend = {
        ...formData,
        usertype: parseInt(selectedRole, 10),
      };

      const response = await apiClient.post(api.newuser, formDataToSend);
      if (response.status === 200) {
        // console.log("user" + response.data);
        // Simulate a 3-second delay
        setTimeout(() => {
          // Set loading state back to false after the delay
          setLoading(false);
          // Show the success dialog
          setSuccessDialogOpen(true);

          setFormData({
            SNo: "",
            StationName: "",
            kVLevel: "",
            Owner: "",
            Location: "",
            PlannedDateAudit: "",
            DateAudit: "",
            AuditEntity: "",
            Report: "",
            Compliances: "",
            Issuesobserved: "",
            Remarks: "",
          });
          setSelectedRole("");
        }, 1000);
      } else if (response.status === 500) {
        alert("User already exists");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  // console.log(formData);
  useEffect(() => {
    async function fetchData2() {
      try {
        const response = await apiClient.get();
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData2();
  }, []);

  return (
    <>
      <div>
        <Header />
        <Sidebar />
        <main id="main" class="main">
          <div class="pagetitle">
            <div className="pagetitle-lft">
              <h1>Relay Settings Data </h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">Dashboard</li>
                  <li class="breadcrumb-item ">Form two </li>
                  <li class="breadcrumb-item active"> Relay settings data </li>
                </ol>
              </nav>
            </div>
            <div className="pagetitle-rgt">
              <Link to="/dashboard">
                <button type="button" class="btn btn-info">
                  Back
                </button>
              </Link>
            </div>
          </div>
          <div className="home">
            <div className="homeContainer">
              <div className="bgimg">
                {/* <Container> */}
                <Row className="vh-100 d-flex justify-content-center align-items-left">
                  <Col md={10} lg={12} xs={12}>
                    <Card>
                      <Card.Body>
                        <div className="mb-3 mt-md-4">
                          <h2 className="fw-bold mb-4 text-center text-uppercase">
                            Relay settings data
                          </h2>
                          <div className="mb-3">
                            <Form onSubmit={handleSubmit}>
                              <form className="ui form">
                                <tbody>
                                  <tr>
                                    <td className="ui header">S.No</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Serial no"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Substation</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Substation"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">KV Level</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="KV Level"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Owner</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Owner"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">
                                      Name of the element
                                    </td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Name of the element"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">
                                      Protection(M!/M2/Backup){" "}
                                    </td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Protection(M!/M2/Backup)"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Make of Relay</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Make of Relay"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">
                                      Sr No of relay
                                    </td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Sr No of relay"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Uploaded File</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="file"
                                        onChange={handleFileChange}
                                        placeholder="Uploaded File"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Remarks</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Remarks"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </form>

                              <div
                                id="button"
                                className="d-flex "
                                style={{ justifyContent: "space-between" }}
                              >
                                <Button
                                  variant="primary"
                                  type="submit"
                                  style={{ width: 100 }}
                                >
                                  Submit
                                </Button>
                              </div>

                              <Dialog
                                className="backdrop"
                                open={confirmDialogOpen}
                                onClick={handleDeleteCancel}
                              >
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </Spinner>
                              </Dialog>
                            </Form>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* </Container> */}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <ToastContainer />
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Create</DialogTitle>
        <DialogContent>Are you sure you want to submit ?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Saved successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
