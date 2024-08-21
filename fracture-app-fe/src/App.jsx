import { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fractureType, setFractureType] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('uploadImg', selectedImage);
      try {
        const { data } = await axios.post("http://127.0.0.1:5000/upload", formData);
        setFractureType(data.message);
        setUploadError('');
      } catch (error) {
        setUploadError('An error occurred during file upload.');
        setFractureType('');
      }
    } else {
      setUploadError('Please select an image to upload.');
      setFractureType('');
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className='col lg-4'>
          <h1>Input File</h1>
          <input
            type="file"
            name="fileUpload"
            className="form-control"
            onChange={(e) => {
              setSelectedImage(e.target.files[0]);
              setFractureType('');
              setUploadError('');
            }}
          />
          <br /><br />
          {uploadError && (
            <div style={{ color: 'red' }}>Error: {uploadError}</div>
          )}
          <button onClick={handleFileUpload}>Upload File</button>
        </div>
        <div className="col lg-4">
          {selectedImage ? (
            <div>
              <img
                alt="Selected Image"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
          ) : (
            <div>
              <h1>No Image Selected</h1>
            </div>
          )}
          <br /><br />
        </div>
        <div className="col lg-4">
          <h2>Fracture Type:</h2>
          <h3>{fractureType || 'No fracture detected'}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
