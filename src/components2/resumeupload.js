// import React, { useState } from 'react';
// import { Card } from 'react-bootstrap';
// import { Button, Alert, LinearProgress } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// function ResumeUpload({ selectedCandidate, onProcessingStarted }) {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     setUploading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:8000/upload-old-resume', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload resume');
//       }

//       const data = await response.json();
//       onProcessingStarted(data.candidate_id);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Card className="p-4">
//       <Card.Title>Upload Old Resume</Card.Title>
//       <Card.Body>
//         <div className="mb-3">
//           <strong>Selected Candidate: </strong>
//           {`${selectedCandidate['First Name']} ${selectedCandidate['Last Name']}`}
//         </div>
//         {error && <Alert severity="error" className="mb-3">{error}</Alert>}
//         <div className="d-flex flex-column align-items-center">
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={handleFileUpload}
//             style={{ display: 'none' }}
//             id="resume-upload"
//           />
//           <label htmlFor="resume-upload">
//             <Button
//               variant="contained"
//               component="span"
//               startIcon={<PictureAsPdfIcon />}
//               disabled={uploading}
//             >
//               Upload PDF Resume
//             </Button>
//           </label>
//           {uploading && <LinearProgress className="mt-3 w-100" />}
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// export default ResumeUpload;




import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Fade, Paper } from '@mui/material';
import { Upload, RefreshCw, User } from 'lucide-react';
// import { Progress } from '@/components/ui/progress';
import { ProgressBar } from 'react-bootstrap';

const ResumeUpload = ({ selectedCandidate, onProcessingStarted, onChangeUser }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload-old-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const data = await response.json();
      onProcessingStarted(data.candidate_id);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <Typography variant="h5">Upload Resume</Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshCw size={20} />}
            onClick={onChangeUser}
          >
            Change Candidate
          </Button>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
            border: '1px solid rgba(33, 150, 243, 0.2)',
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <User size={24} className="text-blue-500 mr-2" />
            <Typography variant="h6">
              {`${selectedCandidate['First Name']} ${selectedCandidate['Last Name']}`}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            ID: {selectedCandidate.ID} | Experience: {selectedCandidate.Experience} years
          </Typography>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ 
          border: '2px dashed #2196f3',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          backgroundColor: 'rgba(33, 150, 243, 0.04)'
        }}>
          <input
  type="file"
  accept=".pdf,.doc,.docx,.txt"  // Added .doc and .docx for Word files
  onChange={handleFileUpload}
  style={{ display: 'none' }}
  id="resume-upload"
/>
<label htmlFor="resume-upload">
  <Button
    variant="contained"
    component="span"
    startIcon={<Upload size={20} />}
    disabled={uploading}
    sx={{ mb: 2 }}
  >
    Select Resume (PDF, DOC, DOCX, TXT)  
  </Button>
</label>
          
          {fileName && (
            <Typography variant="body2" color="textSecondary">
              Selected file: {fileName}
            </Typography>
          )}
          
          {uploading && (
            <Box sx={{ mt: 2 }}>
              <ProgressBar value={undefined} className="w-full" />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Uploading...
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Fade>
  );
};

export default ResumeUpload;