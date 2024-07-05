import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import { CmsFooter } from '../../components/Footer/CmsFooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiclient from '../../../Api/ApiClient';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import apis from '../../../Api/api.json';
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import './custom-form.scss';

export const Performanceindices = () => {
    const [formData, setFormData] = useState({
        utilityname: '',
        correct_operation: '',
        unwanted_operation: '',
        failures_operate: '',
        incorrect_operation: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            setSelectedFile(file);
        } else {
            alert('Please upload a valid Excel file.');
            setSelectedFile(null);
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
            errors.unwanted_operation = "Please enter unwanted_operation";
        }
        if (!formData.failures_operate) {
            errors.failures_operate = "Please enter failures_operate";
        }
        // if (!selectedFile) {
        //     errors.incorrect_operation = "Please upload an Excel file";
        // }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setConfirmDialogOpen(true);
        }
    };

    const handleDeleteCancel = () => {
        setConfirmDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        setConfirmDialogOpen(false);
        setLoading(true);
        try {
            let candidateId = localStorage.getItem("candidateId") || 0;
            const formDataToSend = new FormData();
            formDataToSend.append('user_id', candidateId);
            formDataToSend.append('utilityname', formData.utilityname);
            formDataToSend.append('correct_operation', formData.correct_operation);
            formDataToSend.append('unwanted_operation', formData.unwanted_operation);
            formDataToSend.append('failures_operate', formData.failures_operate);
            formDataToSend.append('incorrect_operation', selectedFile);            
            formDataToSend.append('languagetype', 1);

            const response = await apiclient.post(apis.performance, formDataToSend);
            if (response.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    setSuccessDialogOpen(true);
                    setFormData({
                        utilityname: '',
                        correct_operation: '',
                        unwanted_operation: '',
                        failures_operate: '',
                        incorrect_operation: ''
                    });
                    setSelectedFile(null);
                }, 1000);
            } else if (response.status === 500) {
                alert("Form already exists");
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <div>
                    <TopHeader />
                </div>
                <CmsDisplay />
                <main>
                    <div className="pagetitle"></div>
                    <div className="main-form">
                        <div className="container-fluid">
                            <div className="InnerSection">
                                <div className="InnerSectionBox">
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <h4>Performance Indices</h4>
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card">
                                                    <div className="card-body registrationCard">
                                                        <div className="form-group row">
                                                            <label className="col-sm-2 col-form-label">Utility Name <span><b>*</b></span>:</label>
                                                            <div className="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.utilityname}</span>
                                                                <input className="form-control"
                                                                    name="utilityname"
                                                                    placeholder="Enter utilityname"
                                                                    maxLength="50"
                                                                    value={formData.utilityname}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.utilityname}
                                                                />
                                                                <small className="invalid-feedback"></small>
                                                            </div>
                                                            <label className="col-sm-2 col-form-label">Number of correct operations <span><b>*</b></span>:</label>
                                                            <div className="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.correct_operation}</span>
                                                                <input className="form-control"
                                                                    name="correct_operation"
                                                                    placeholder="Enter correct_operation"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.correct_operation}
                                                                    maxLength="50" value={formData.correct_operation} />
                                                                <small className="invalid-feedback"></small>
                                                            </div>
                                                            <label className="col-sm-2 col-form-label">Number of unwanted operations <span><b>*</b></span>:</label>
                                                            <div className="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.unwanted_operation}</span>
                                                                <input className="form-control"
                                                                    name="unwanted_operation"
                                                                    placeholder="Enter unwanted_operation"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.unwanted_operation}
                                                                    maxLength="50" value={formData.unwanted_operation} />
                                                                <small className="invalid-feedback"></small>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-2 col-form-label">Number of failures <span><b>*</b></span>:</label>
                                                            <div className="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.failures_operate}</span>
                                                                <input className="form-control" name="failures_operate" placeholder="failures operate"
                                                                    maxLength="50" value={formData.failures_operate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.failures_operate} />
                                                                <small className="invalid-feedback"></small>
                                                            </div>
                                                            <label className="col-sm-2 col-form-label">Incorrect operations <span><b>*</b></span>:</label>
                                                            <div className="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.incorrect_operation}</span>
                                                                <input
                                                                    className="form-control"
                                                                    type="file"
                                                                    name="incorrect_operation"
                                                                    onChange={handleFileChange}
                                                                />
                                                                <small className="invalid-feedback"></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="submitButton">
                                            <button type="submit" className="btn btn-outline-success btn-icon-text btn-sm">
                                                <i className="mdi mdi-file-check btn-icon-prepend"></i>Submit
                                            </button>
                                            <button type="button" className="btn btn-outline-danger btn-sm" style={{ marginLeft: "10px" }}>
                                                <i className="mdi mdi-refresh"></i>Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CmsFooter />
                </main>
            </div>
            <ToastContainer />
            <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Submit</DialogTitle>
                <DialogContent>Are you sure you want to submit?</DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>Saved successfully!</DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessDialogOpen(false)} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
