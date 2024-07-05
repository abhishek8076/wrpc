import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';
import { CmsFooter } from '../../components/Footer/CmsFooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { TopHeader } from '../../components/TopHeader/TopHeader';
import apiclient from '../../../Api/ApiClient';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import { Relaysave } from '../../../Api/ApiFunctions';
import './custom-form.scss';
import axios from 'axios';
import apis from '../../../Api/api.json'
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';

export const Performanceindices = () => {
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');

    const [formData, setFormData] = useState({

        utilityname: '',
        correct_operation: '',
        unwanted_operation: '',
        failures_operate: '',
        incorrect_operation: ''
        
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

        if (file) {
            // File is a PDF
            setSelectedFile(file);

            // You can perform additional actions here if needed
        } else {
            // File is not a PDF
            alert('Please upload a  file.');
        }
    };
    const validateForm = () => {
        const errors = {};

        if (!formData.utilityname) {
            errors.utilityname = "Please enter utilityname";
        }

        if (!formData.correct_operation) {
            errors.correct_operation = "Please enter correct_operation";
        }

        if (!formData.unwanted_operation) {
            errors.unwanted_operation = "Please enter details of Incorrect operations ";
        }
        if (!formData.failures_operate) {
            errors.failures_operate = "Please enter name element";
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
             debugger;

            let candidateId=0;
            if (localStorage.getItem("candidateId")) {
                 candidateId = localStorage.getItem("candidateId");
            }
            else{
                 candidateId = 0;
            }
            // const formDataToSend = {
            //     ...formData,
            //     Uploadfile:selectedFile

            // };
            const formDataToSend = new FormData();
            formDataToSend.append('user_id', candidateId);
            formDataToSend.append('utilityname', formData.utilityname);
            formDataToSend.append('correct_operation', formData.correct_operation);
            formDataToSend.append('unwanted_operation', formData.unwanted_operation);
            formDataToSend.append('failures_operate', formData.failures_operate);
            formDataToSend.append('incorrect_operation', formData.incorrect_operation);            
            formDataToSend.append('languagetype', 1);
            debugger;
            const response = await apiclient.post(apis.performance, formDataToSend)
            if (response.status === 200) {
                console.log("user" + response.data)
                // Simulate a 3-second delay
                setTimeout(() => {
                    // Set loading state back to false after the delay
                    setLoading(false);
                    // Show the success dialog
                    setSuccessDialogOpen(true);

                    setFormData({
                        SNo: '',
                        utilityname: '',
                        correct_operation: '',
                        unwanted_operation: '',
                        failures_operate: '',
                        incorrect_operation: ''
                    });
                    setSelectedRole('');
                }, 1000);
            } else if (response.status === 500) {
                alert("Form already exists");

            }

            else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    //   useEffect(() => {
    //     const relaysave = async () => {
    //       try {
    //         const response = await apiClient.get(api.relaysave);
    //         setDropdownOptions(response.data);
    //       } catch (error) {
    //         console.error('Error fetching roles:', error);
    //       }
    //     };
    //     relaysave();
    //   }, []);
    //   useEffect(() => {
    //     const fetchRoles = async () => {
    //       try {
    //         const response = await apiClient.get(api.newuser);
    //         setuser(response.data);
    //       } catch (error) {
    //         console.error('Error fetching roles:', error);
    //       }
    //     };
    //     fetchRoles();
    //   }, []);
    console.log(formData)


    return (
        <>
            <div>
                <div>
                    <TopHeader />

                </div>

                <CmsDisplay />

                <main >
                    <div class="pagetitle">

                        {/* <div className="pagetitle-rgt">
                            <Link to="/dashboard">
                                <button type="button" class="btn btn-info">
                                    Back
                                </button>
                            </Link>
                        </div> */}
                    </div>
                    <div class="main-form">
                        <div class="container-fluid">
                            <div class="InnerSection">
                                <div class="InnerSectionBox">
                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <h4>Performance Indices</h4>
                                        <div class="row">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card">
                                                    <div class="card-body registrationCard">

                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Utility Name <span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.utilityname}</span>
                                                                <input class="form-control"
                                                                    name="utilityname"
                                                                    placeholder="Enter utilityname"
                                                                    maxlength="50"
                                                                    value={formData.utilityname}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.utilityname}
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                            <label
                                                                class="col-sm-2 col-form-label"> Number of correct operations<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.correct_operation}</span>
                                                                <input class="form-control"
                                                                    name="correct_operation"
                                                                    placeholder="Enter correct_operation"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.correct_operation}
                                                                    maxlength="50" value={formData.correct_operation} /><small class="invalid-feedback"></small></div>
                                                                    <label
                                                                        class="col-sm-2 col-form-label"> Number of unwanted operations<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.unwanted_operation}</span>
                                                                <input class="form-control"
                                                                    name="unwanted_operation"
                                                                    placeholder="Enter unwanted_operation"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.unwanted_operation}
                                                                    maxlength="50" value={formData.unwanted_operation} /><small class="invalid-feedback"></small></div>
                                                        </div>
                                                        
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Number of failures<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.failures_operate}</span>
                                                                <input class="form-control" name="failures_operate" placeholder="failures operate"
                                                                    maxlength="50" value={formData.failures_operate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.failures_operate} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Incorrect operations<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                {/* <input class="form-control" name="Protection" type='file'
                                                    maxlength="50" value={formData.Uploadfile}
                                                    onChange={handleFileChange}
                                                    isInvalid={!!formErrors.Uploadfile} /> */}
                                                                <span style={{ color: "red" }}>{formErrors.incorrect_operation}</span>

                                                                <input
                                                                    className="form-control"
                                                                    type="file"

                                                                    name="incorrect_operation"

                                                                    onChange={handleFileChange}
                                                                />


                                                                <small class="invalid-feedback"></small></div>
                                 
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="submitButton"><button type="submit" class="btn btn-outline-success btn-icon-text btn-sm"><i
                                            class="mdi mdi-file-check btn-icon-prepend"></i>Submit</button><button type="button"
                                                class="btn btn-outline-danger btn-sm" style={{ marginLeft: "10px" }}><i
                                                    class="mdi mdi-refresh"></i>Reset</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CmsFooter />
                </main>

            </div>
            <ToastContainer />
            {/* Confirmation Dialog */}
            <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Create</DialogTitle>
                <DialogContent>
                    Are you sure you want to submit ?
                </DialogContent>
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
}

