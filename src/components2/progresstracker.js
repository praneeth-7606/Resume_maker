// import React, { useState, useEffect } from 'react';
// import { Card } from 'react-bootstrap';
// import { 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText,
//   CircularProgress,
//   Button
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import DownloadIcon from '@mui/icons-material/Download';

// function ProgressTracker({ candidateId }) {
//   const [status, setStatus] = useState('pending');
//   const [messages, setMessages] = useState([]);
//   const [filename, setFilename] = useState(null);

//   useEffect(() => {
//     const checkProgress = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/progress?candidate_id=${candidateId}`
//         );
//         const data = await response.json();

//         setStatus(data.status);
//         setMessages(data.messages || []);
//         if (data.filename) {
//           setFilename(data.filename);
//         }
//       } catch (error) {
//         console.error('Error checking progress:', error);
//       }
//     };

//     const interval = setInterval(checkProgress, 2000);
//     return () => clearInterval(interval);
//   }, [candidateId]);

//   const handleDownload = () => {
//     window.open(`http://localhost:8000/download/${filename}`, '_blank');
//   };

//   return (
//     <Card className="p-4">
//       <Card.Title>Generation Progress</Card.Title>
//       <Card.Body>
//         <List>
//           {messages.map((message, index) => (
//             <ListItem key={index}>
//               <ListItemIcon>
//                 {status === 'ready' ? (
//                   <CheckCircleIcon color="success" />
//                 ) : (
//                   <CircularProgress size={20} />
//                 )}
//               </ListItemIcon>
//               <ListItemText primary={message} />
//             </ListItem>
//           ))}
//         </List>
//         {status === 'ready' && filename && (
//           <div className="text-center mt-3">
//             <Button
//               variant="contained"
//               color="primary"
//               style={{textTransform:"capitalize"}}
//               startIcon={<DownloadIcon />}
//               onClick={handleDownload}
//             >
//               Download Generated Resume
//             </Button>
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   );
// }

// export default ProgressTracker;


import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Paper } from '@mui/material';
import { Download, Clock, Check } from 'lucide-react';
// import { Progress } from '@/components/ui/progress';
import { ProgressBar } from 'react-bootstrap';
const ProgressTracker = ({ candidateId }) => {
  const [status, setStatus] = useState('pending');
  const [messages, setMessages] = useState([]);
  const [filename, setFilename] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkProgress = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/progress?candidate_id=${candidateId}`
        );
        const data = await response.json();

        setStatus(data.status);
        setMessages(data.messages || []);
        if (data.filename) {
          setFilename(data.filename);
        }
        setProgress(prev => (prev < 100 && status !== 'ready') ? prev + 10 : prev);
      } catch (error) {
        console.error('Error checking progress:', error);
      }
    };

    const interval = setInterval(checkProgress, 2000);
    return () => clearInterval(interval);
  }, [candidateId, status]);

  const handleDownload = () => {
    window.open(`http://localhost:8000/download/${filename}`, '_blank');
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Generation Progress
        </Typography>

        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
            border: '1px solid rgba(33, 150, 243, 0.2)',
            borderRadius: 2
          }}
        >
          <Box sx={{ mb: 3 }}>
            <ProgressBar value={progress} className="w-full" />
            {/* <Typography 
              variant="body2" 
              color="textSecondary" 
              align="center"
              sx={{ mt: 1 }}
            >
              {progress}% Complete */}
            {/* </Typography> */}
          </Box>

          {messages.map((message, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2 
              }}
            >
              {status === 'ready' ? (
                <Check className="text-green-500 mr-2" size={20} />
              ) : (
                <Clock className="text-blue-500 mr-2 animate-spin" size={20} />
              )}
              <Typography>{message}</Typography>
            </Box>
          ))}

          {status === 'ready' && filename && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                startIcon={<Download size={20} />}
                onClick={handleDownload}
              >
                Download Generated Resume and Cover Letter
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Fade>
  );
};

export default ProgressTracker;