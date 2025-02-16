
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { 
  ThemeProvider, 
  createTheme,
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  Box,
  Button,
  IconButton,
  Fade
} from '@mui/material';
import SkillMatrix from './components2/skillmatrix';
import ProgressTracker from './components2/progresstracker';
import ResumeUpload from './components2/resumeupload';
import CandidateSelection from './components2/candidateselection';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon
} from '@mui/icons-material';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

const StepIcon = ({ icon, active }) => {
  const icons = {
    1: <CloudUploadIcon style={{ fontSize: 24 }} />,
    2: <PersonIcon style={{ fontSize: 24 }} />,
    3: <DescriptionIcon style={{ fontSize: 24 }} />,
    4: <TimelineIcon style={{ fontSize: 24 }} />
  };

  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-full 
      ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
      {icons[icon]}
    </div>
  );
};

function App() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Upload Skill Matrix',
    'Select Candidate',
    'Upload Resume',
    'Track Progress'
  ];

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedCandidate(null);
    setProcessingId(null);
    setCandidates([]);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SkillMatrix
            onCandidatesLoaded={(data) => {
              setCandidates(data);
              setActiveStep(1);
            }}
          />
        );
      case 1:
        return (
          <CandidateSelection
            candidates={candidates}
            onCandidateSelected={(candidate) => {
              setSelectedCandidate(candidate);
              setActiveStep(2);
            }}
          />
        );
      case 2:
        return (
          <ResumeUpload
            selectedCandidate={selectedCandidate}
            onProcessingStarted={(id) => {
              setProcessingId(id);
              setActiveStep(3);
            }}
            onChangeUser={() => setActiveStep(1)}
          />
        );
      case 3:
        return <ProgressTracker candidateId={processingId} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        backgroundColor: 'background.default', 
        minHeight: '100vh', 
        py: 4 
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                mb: 4,
                background: 'linear-gradient(135deg, #2196f3 0%, #21CBF3 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="absolute top-0 right-0 p-4">
                <IconButton
                  color="inherit"
                  onClick={handleReset}
                  sx={{ opacity: 0.8 }}
                >
                  <RefreshIcon style={{ fontSize: 24 }} />
                </IconButton>
              </div>
              <Typography variant="h1" align="center" gutterBottom>
                Resume Generator
              </Typography>
              <Typography variant="h6" align="center">
                Transform your resume with our AI-powered generator
              </Typography>
            </Paper>
          </Fade>

          <Fade in timeout={1000}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                borderRadius: 2,
                background: 'white',
                position: 'relative'
              }}
            >
              <Stepper 
                activeStep={activeStep} 
                sx={{ 
                  mb: 4,
                  '& .MuiStepConnector-line': {
                    minHeight: 2
                  }
                }}
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={(props) => 
                      <StepIcon {...props} active={index <= activeStep} />
                    }>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ mt: 2, mb: 1 }}>
                {getStepContent(activeStep)}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ArrowBackIcon style={{ fontSize: 20 }} />}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button
                  onClick={handleReset}
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon style={{ fontSize: 20 }} />}
                >
                  Start Over
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;