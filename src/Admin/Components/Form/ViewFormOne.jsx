import React, { useState, useEffect,useRef  } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../../Api/ApiClient';
import apis from '../../../Api/api.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link,useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header'
import Footer from '../footer/Footer';
import './custom-form.scss';
import { BASE_URL } from '../../../Api/ApiFunctions';


export const ViewFormOne= () => {
    const {id}= useParams()
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [selectedFile4, setSelectedFile4] = useState(null);
    const [selectedFile5, setSelectedFile5] = useState(null);
    const [selectedFile6, setSelectedFile6] = useState(null);
    const [selectedFile7, setSelectedFile7] = useState(null);
    const [selectedFile8, setSelectedFile8] = useState(null);
    const [selectedFile9, setSelectedFile9] = useState(null);
    const [formData, setFormData] = useState({
        SNo: '',
        RecommondationofPCM: '',
        kVLevel: '',
        PCMNumber: '',
        PCMDate: '',
        ItemNo: '',
        RecommondationofPCM: '',
        TrippingDate: '',
        TrippingTime: '',
        OwnerS: '',
        FIRS: '',
        DRS: '',
        ELS: '',
        TRS: '',
        CategoryS: '',
        OwnerR: '',
        FIRR: '',
        DRR: '',
        ELR: '',
        TRR: '',
        CategoryR: '',
        Analysis: '',
        FinalReport: '',
        NotifiedStatus: '',
        UtilityAttending: '',
        UtilityActiontaken: '',
        Dateattended: '',
        Remarks: ''
    });


    // New state variables for confirmation dialog and loading
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
    // const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);

        } else {

            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange1 = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile1(file);

        } else {

            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile2(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange3 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile3(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange4 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile4(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange5 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile5(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange6 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile6(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange7 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile7(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange8 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile8(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange9 = (event) => {
        const file = event.target.files[0];
        
            setSelectedFile9(file);
        
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const validateForm = () => {
        const errors = {};

        if (!formData.RecommondationofPCM) {
            errors.RecommondationofPCM = 'Do not left the field blank';
        }
        if (!formData.kVLevel) {
            errors.kVLevel = 'Required';
        }
        if (!formData.PCMNumber) {
            errors.PCMNumber = 'Do not left the field blank';
        }
        if (!formData.PCMDate) {
            errors.PCMDate = 'Required';
        }
        if (!formData.ItemNo) {
            errors.ItemNo = 'Required';
        }
        if (!formData.TrippingDate) {
            errors.TrippingDate = 'Required';
        }
        if (!formData.TrippingTime) {
            errors.TrippingTime = 'Required';
        }
        if (!formData.OwnerS) {
            errors.OwnerS = 'Required';
        }
        if (!formData.FIRS) {
            errors.FIRS = 'Required';
        }
        if (!formData.DRS) {
            errors.DRS = 'Required';
        }
        if (!formData.ELS) {
            errors.ELS = 'Required';
        }
        if (!formData.TRS) {
            errors.TRS = 'Required';
        }
        if (!formData.CategoryS) {
            errors.CategoryS = 'Required';
        }
        if (!formData.OwnerR) {
            errors.OwnerR = 'Required';
        }
        if (!formData.FIRR) {
            errors.FIRR = 'Required';
        }
        if (!formData.DRR) {
            errors.DRR = 'Required';
        }
        if (!formData.ELR) {
            errors.ELR = 'Required';
        }
        if (!formData.TRR) {
            errors.TRR = 'Required';
        }
        if (!formData.CategoryR) {
            errors.CategoryR = 'Required';
        }
        if (!formData.Analysis) {
            errors.Analysis = 'Required';
        }
        if (!formData.Remarks) {
            errors.Remarks = 'Required';
        }
        if (!selectedFile9) {
            errors.selectedFile9 = 'Required';
        }
        if (!formData.NotifiedStatus) {
            errors.NotifiedStatus = 'Required';
        }
        if (!formData.UtilityAttending) {
            errors.UtilityAttending = 'Required';
        }
        if (!formData.UtilityActiontaken) {
            errors.UtilityActiontaken = 'Required';
        }
        if (!formData.Dateattended) {
            errors.Dateattended = 'Required';
        }
        


        // Add similar checks for other fields

        setFormErrors(errors);

        // Focus on the first invalid field
        if (Object.keys(errors).length > 0) {
            if (recommondationRef.current) {
                recommondationRef.current.focus();
            }
            // Focus on other fields as needed
        }

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
            const formDataToSend = new FormData();

            formDataToSend.append('Recommendation_of_PCM', formData.RecommondationofPCM);
            formDataToSend.append('kV_Level', formData.kVLevel);
            formDataToSend.append('PCM_Number',  formData.PCMNumber);
            formDataToSend.append('PCM_Date',  formData.PCMDate);
            formDataToSend.append('Item_No_Heading',formData.ItemNo);
            formDataToSend.append('Tripping_Date',formData.TrippingDate);
            formDataToSend.append('Tripping_Time',formData.TrippingTime);
            formDataToSend.append('Owner_SEND', formData.OwnerS);
            formDataToSend.append('FIR_S',selectedFile);
            formDataToSend.append('DR_S',selectedFile1);
            formDataToSend.append('EL_S',selectedFile2);
            formDataToSend.append('TR_S',selectedFile3);
            formDataToSend.append('Category_S', formData.CategoryS);
            formDataToSend.append('Owner_REND', formData.OwnerR);
            formDataToSend.append('FIR_R',selectedFile4);
            formDataToSend.append('DR_R',selectedFile5);
            formDataToSend.append('EL_R',selectedFile6);
            formDataToSend.append('TR_R',selectedFile7);
            formDataToSend.append('Category_R', formData.CategoryR);
            formDataToSend.append('Analysis', selectedFile8);
            formDataToSend.append('Final_Report',selectedFile9);
            formDataToSend.append('Notified_Status',formData.NotifiedStatus);
            formDataToSend.append('Utility_Responsible_for_Attending', formData.UtilityAttending);
            formDataToSend.append('Action_Taken_by_Utility_to_Allow_Completion',formData.UtilityActiontaken);
            formDataToSend.append('Date_on_Which_Attended', formData.Dateattended);
            formDataToSend.append('Remarks', formData.Remarks);


            const response = await apiClient.post(apis.Trippingcompliance, formDataToSend);
            if (response.status === 200) {
               
                // Simulate a 3-second delay
                setTimeout(() => {
                    // Set loading state back to false after the delay
                    setLoading(false);
                    // Show the success dialog
                    setSuccessDialogOpen(true);

                    setFormData({
                        SNo: '',
                        RecommondationofPCM: '',
                        kVLevel: '',
                        PCMNumber: '',
                        PCMDate: '',
                        ItemNo: '',
                        RecommondationofPCM: '',
                        TrippingDate: '',
                        TrippingTime: '',
                        OwnerS: '',
                        FIRS: '',
                        DRS: '',
                        ELS: '',
                        TRS: '',
                        CategoryS: '',
                        OwnerR: '',
                        FIRR: '',
                        DRR: '',
                        ELR: '',
                        TRR: '',
                        CategoryR: '',
                        Analysis: '',
                        FinalReport: '',
                        NotifiedStatus: '',
                        UtilityAttending: '',
                        UtilityActiontaken: '',
                        Dateattended: '',
                        Remarks: ''
                    });
                    setSelectedRole('');
                }, 1000);
            } else if (response.status === 500) {
                alert("User already exists");

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

    useEffect(() => {
        async function fetchData2() {
          try {
            const response = await apiClient.get('/api/FormReports/Get_tppa_monitoring');
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
                            <h1>Tripping compliance of PCM Discussions</h1>
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Dashboard</li>
                                    <li class="breadcrumb-item ">Form one </li>
                                    <li class="breadcrumb-item active"> Tripping compliance of PCM Discussions </li>
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
                                                        Tripping compliance of PCM Discussions
                                                    </h2>
                                                    <div className="mb-3">

                                                        <form className="ui form" onSubmit={handleSubmit}>
                                                            <tbody>
                                                                {/* <tr>
                                                                    <td className="ui header">S.No</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Serial no" />
                                                                    </td>
                                                                </tr> */}
                                                                <tr>
                                                                    <td className="ui header">Recommendations of PCM </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.RecommondationofPCM ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Recommendations of PCM"
                                                                            name='RecommondationofPCM'
                                                                            value={formData.RecommondationofPCM}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.RecommondationofPCM}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.RecommondationofPCM}</span>
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">KV Level </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.kVLevel ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="KV Level"
                                                                            name='kVLevel'
                                                                            value={formData.kVLevel}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.kVLevel}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.kVLevel}</span>
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">PCM Number</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.PCMNumber ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="PCM Number"
                                                                            name='PCMNumber'
                                                                            value={formData.PCMNumber}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.PCMNumber}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.PCMNumber}</span>
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">PCM Date</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.PCMDate ? 'is-invalid' : ''}`}
                                                                            type="date"
                                                                            placeholder="PCM Date"
                                                                            name='PCMDate'
                                                                            value={formData.PCMDate}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.PCMDate}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.PCMDate}</span>
                                                                    </td>
                                                                    
                                                                </tr>   
                                                                <tr>
                                                                    <td className="ui header">Item No</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.ItemNo ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Item No"
                                                                            name='ItemNo'
                                                                            value={formData.ItemNo}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.ItemNo}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.ItemNo}</span>
                                                                    </td>
                                                                    
                                                                </tr>  
                        
                                                                    
                                                                <tr>
                                                                    <td className="ui header">Tripping Date </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.TrippingDate ? 'is-invalid' : ''}`}
                                                                            type="date"
                                                                            placeholder="Tripping Date"
                                                                            name='TrippingDate'
                                                                            value={formData.TrippingDate}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.TrippingDate}
                                                                             
                                                                        />
                                                                     </td>   
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.TrippingDate}</span>
                                                                    </td>
                                                                   
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Tripping Time </td>
                                                                   
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.TrippingTime ? 'is-invalid' : ''}`}
                                                                            type="time"
                                                                            placeholder="Tripping Time"
                                                                            name='TrippingTime'
                                                                            value={formData.TrippingTime}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.TrippingTime}
                                                                             
                                                                        />
                                                                      </td>  
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.TrippingTime}</span>
                                                                    </td>
                                                                   
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Owner(Send) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.OwnerS ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Owner(Send)"
                                                                            name='OwnerS'
                                                                            value={formData.OwnerS}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.OwnerS}
                                                                             
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.OwnerS}</span>
                                                                    </td>
                                                                
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">FIR(S) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.FIRS ? 'is-invalid' : ''}`}
                                                                            type="file"
                                                                            placeholder="FIR(S)"
                                                                            name='FIRS'
                                                                            
                                                                            onChange={handleFileChange}
                                                                            isInvalid={!!formErrors.FIRS}
                                                                             
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.FIRS}</span>
                                                                    </td>
                                                                  
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">DR(S) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.DRS ? 'is-invalid' : ''}`}
                                                                            type="file"
                                                                            placeholder="DR(S)"
                                                                            name='DRS'
                                                                           
                                                                            onChange={handleFileChange1}
                                                                            isInvalid={!!formErrors.DRS}
                                                                             
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.DRS}</span>
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">EL(S) </td>
                                                                    
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="TR(S)"
                                                                            name='TRS'
                                                                           
                                                                            onChange={handleFileChange3}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.ELS}</span>
                                                                    </td>
                                                                 
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">TR(S) </td>
                                                                 
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="TR(S)"
                                                                            name='TRS'
                                                                           
                                                                            onChange={handleFileChange3}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.selectedFile3}</span>
                                                                    </td>
                                                                 
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Category(Send) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.CategoryS ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Category(Send)"
                                                                            name='CategoryS'
                                                                            value={formData.CategoryS}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.CategoryS}
                                                                             
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.CategoryS}</span>
                                                                    </td>
                                                                
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Owner(R) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.OwnerR ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Owner(R)"
                                                                            name='OwnerR'
                                                                            value={formData.OwnerR}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.OwnerR}
                                                                             
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.OwnerR}</span>
                                                                    </td>
                                                                
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">FIR(R) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="FIR(R)"
                                                                            name='FIRR'
                                                                           
                                                                            onChange={handleFileChange4}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.selectedFile4}</span>
                                                                    </td>
                                                                 
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">DR(R) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="DR(R)"
                                                                            name='DRR'
                                                                           
                                                                            onChange={handleFileChange5}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.selectedFile5}</span>
                                                                    </td>
                                                                 
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">EL(R) </td>
                                                                 
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="EL(R)"
                                                                            name='ELR'
                                                                           
                                                                            onChange={handleFileChange5}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.selectedFile5}</span>
                                                                    </td>
                                                                 
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">TR(R) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="TR(R)"
                                                                            name='TRR'
                                                                           
                                                                            onChange={handleFileChange6}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.selectedFile6}</span>
                                                                    </td>
                                                                 
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Category(R) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="CategoryR"
                                                                            name='CategoryR'
                                                                           
                                                                            onChange={handleFileChange7}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.selectedFile7}</span>
                                                                    </td>
                                                                
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Analysis </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="Analysis"
                                                                            name='Analysis'
                                                                           
                                                                            onChange={handleFileChange8}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.selectedFile8}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Final Reports </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={FinalReport}
                                                                         className={`form-control`}
                                                                            type="file"
                                                                            placeholder="FinalReport"
                                                                            name='FinalReport'
                                                                           
                                                                            onChange={handleFileChange9}
                                                                       
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.selectedFile9}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Notified Status </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={NotifiedStatus}
                                                                         className={`form-control ${formErrors.NotifiedStatus ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Notified Status"
                                                                            name='NotifiedStatus'
                                                                            value={formData.NotifiedStatus}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.NotifiedStatus}
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.NotifiedStatus}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Utility responsible for Attending </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={UtilityAttending}
                                                                         className={`form-control ${formErrors.UtilityAttending ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Utility responsible for Attending"
                                                                            name='UtilityAttending'
                                                                            value={formData.UtilityAttending}
                                                                            onChange={handleChange}
                                                                            // isInvalid={!!formErrors.UtilityAttending}
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.UtilityAttending}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Action taken by utility to  allow complition</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={UtilityActiontaken}
                                                                         className={`form-control ${formErrors.UtilityActiontaken ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Utility Action taken"
                                                                            name='UtilityActiontaken'
                                                                            value={formData.UtilityActiontaken}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.UtilityActiontaken}
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.UtilityActiontaken}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Date on which attended</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={Dateattended}
                                                                         className={`form-control ${formErrors.Dateattended ? 'is-invalid' : ''}`}
                                                                            type="date"
                                                                            placeholder="Date on which attended"
                                                                            name='Dateattended'
                                                                            value={formData.Dateattended}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.Dateattended}
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.Dateattended}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Remarks</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={Remarks}
                                                                         className={`form-control ${formErrors.Remarks ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Remarks"
                                                                            name='Remarks'
                                                                            value={formData.Remarks}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.Remarks}
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.Remarks}</span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
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

                                                        </form>



                                                        <Dialog className="backdrop" open={confirmDialogOpen} onClick={handleDeleteCancel}>
                                                            <Spinner animation="border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </Spinner>
                                                        </Dialog>

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


