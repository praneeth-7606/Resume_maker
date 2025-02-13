


// import React, { useState } from 'react';
// import { Card } from 'react-bootstrap';
// import { 
//   Button, 
//   Alert, 
//   LinearProgress, 
//   Box, 
//   Typography,
//   Paper
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import BackupIcon from '@mui/icons-material/Backup';

// function SkillMatrix({ onCandidatesLoaded }) {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const [dragActive, setDragActive] = useState(false);

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       await handleFileUpload(file);
//     }
//   };

//   const handleFileUpload = async (file) => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     setUploading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:8000/upload-skill-matrix', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload skill matrix');
//       }

//       const data = await response.json();
//       onCandidatesLoaded(data.candidates);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Upload Skill Matrix
//       </Typography>
//       <Typography variant="body1" sx={{ mb: 3 }}>
//         Please upload your Excel file containing the skill matrix data
//       </Typography>
      
//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       <Paper
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//         sx={{
//           p: 5,
//           border: '2px dashed',
//           borderColor: dragActive ? 'primary.main' : 'grey.300',
//           borderRadius: 2,
//           backgroundColor: dragActive ? 'action.hover' : 'background.paper',
//           textAlign: 'center',
//           cursor: 'pointer',
//           transition: 'all 0.3s ease'
//         }}
//       >
//         <input
//           type="file"
//           accept=".xlsx"
//           onChange={(e) => handleFileUpload(e.target.files[0])}
//           style={{ display: 'none' }}
//           id="skill-matrix-upload"
//         />
//         <label htmlFor="skill-matrix-upload">
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             {dragActive ? (
//               <BackupIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
//             ) : (
//               <CloudUploadIcon sx={{ fontSize: 48, color: 'action.active', mb: 2 }} />
//             )}
//             <Typography variant="h6" gutterBottom>
//               {dragActive ? 'Drop file here' : 'Drag and drop your file here'}
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               or
//             </Typography>
//             <Button
//               variant="contained"
//               component="span"
//               disabled={uploading}
//               sx={{ mt: 2 ,textTransform:"none"}}
//             >
//               Browse Files
//             </Button>
//           </Box>
//         </label>
//       </Paper>

//       {uploading && (
//         <Box sx={{ mt: 3 }}>
//           <LinearProgress />
//           <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
//             Uploading...
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default SkillMatrix;



import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Fade } from '@mui/material';
import { Upload } from 'lucide-react';
// import { Progress } from '@/components/ui/progress';
import { ProgressBar } from 'react-bootstrap';

const SkillMatrix = ({ onCandidatesLoaded }) => {
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
      const response = await fetch('http://localhost:8000/upload-skill-matrix', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload skill matrix');
      }

      const data = await response.json();
      onCandidatesLoaded(data.candidates);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Upload Skill Matrix
        </Typography>

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
          backgroundColor: 'rgba(33, 150, 243, 0.04)',
          mb: 3
        }}>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="skill-matrix-upload"
          />
          <label htmlFor="skill-matrix-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<Upload size={20} />}
              disabled={uploading}
              sx={{ mb: 2 }}
            >
              Select Skill Matrix File
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

export default SkillMatrix;