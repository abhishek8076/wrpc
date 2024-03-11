import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box, IconButton, Paper, Grid, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import api from '../../utils/apiUrl.json';
import apiClient from '../../../Api/ApiClient';
import api from '../../../Api/api.json';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SliderTable from './SliderTable';

export const Slider = ({ id, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('imgsrc', selectedImage);
    formData.append('content', imageName);

    try {
      const response = await apiClient.post(api.imageAddlogo, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imagePath = response.data.imgpath;

      // console.log('Image uploaded successfully!', response.data);
   

      // Show a success toast notification
      toast.success('Image uploaded successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });

      // Clear the form fields and reset state after successful upload
      setSelectedImage(null);
      setImageName('');

      // Reset the input file element to allow selecting a new image
      const inputFile = document.getElementById(`upload-input-${id}`);
      if (inputFile) {
        inputFile.value = ''; // Clear the selected file
      }

    } catch (error) {
      console.error('Error uploading image:', error);

      // Show an error toast notification
      toast.error('Error uploading image', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };


  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleContentChange = (event) => {
    setImageName(event.target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div>
        <Header/>
        <Sidebar/>
        <main id="main" class="main">

<div class="pagetitle">
  <h1>Create Slider</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Dashboard</li>
      <li class="breadcrumb-item active ">Slider</li>
     
    </ol>
  </nav>
</div>

    <form>
      <Paper elevation={3} sx={{ padding: 2, position: 'relative' }}>
        <h1>Slider</h1>
        {selectedImage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
            />
          </Box>
        )}

        {/* Input for uploading image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id={`upload-input-${id}`}
        />
        <label htmlFor={`upload-input-${id}`}>
          <Button variant="outlined" component="span">
            <AddPhotoAlternateIcon />
            Choose Image
          </Button>
        </label>

        {selectedImage && (
          <IconButton onClick={handleDelete} sx={{ position: 'absolute', top: 5, right: 5 }}>
            <DeleteIcon />
          </IconButton>
        )}

        {/* Text field for image name */}
        <TextField
          label="Link"
          value={imageName}
          placeholder='URL'
          onChange={handleContentChange}
          fullWidth
          sx={{ marginTop: 2 }}
          required
        />

        {/* Upload button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleImageUpload}
          disabled={!selectedImage}
          sx={{ marginTop: 2 }}
        >
          <UploadFileIcon />
          Upload Image
        </Button>
       


        <ToastContainer /> {/* Place this component wherever you want the toast notifications */}
      </Paper>
    </form>
<div>
  <h1>Table</h1>
  <SliderTable/>
</div>
    </main>
    <Footer/>
    </div>
  );
};
