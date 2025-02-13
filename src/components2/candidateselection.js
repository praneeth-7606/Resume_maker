




// // components/CandidateSelection.js
// import React, { useState } from 'react';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow,
//   Paper,
//   TablePagination,
//   Radio,
//   Typography,
//   Box,
//   Chip,
//   TextField,
//   InputAdornment
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import PersonIcon from '@mui/icons-material/Person';

// function CandidateSelection({ candidates, onCandidateSelected }) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [selectedId, setSelectedId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSelect = async (candidate) => {
//     setSelectedId(candidate.ID);
//     try {
//       const formData = new FormData();
//       formData.append('candidate_id', candidate.ID);

//       const response = await fetch('http://localhost:8000/select-candidate', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to select candidate');
//       }

//       const data = await response.json();
//       onCandidateSelected(data.selected_candidate);
//     } catch (error) {
//       console.error('Error selecting candidate:', error);
//     }
//   };

//   const filteredCandidates = candidates.filter(candidate => 
//     `${candidate['First Name']} ${candidate['Last Name']}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     candidate.Expertise.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Select Candidate
//       </Typography>
      
//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="Search by name or expertise..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ mb: 3 }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//       />

//       <TableContainer component={Paper} sx={{ mb: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: 'primary.light' }}>
//               <TableCell>Select</TableCell>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Experience</TableCell>
//               <TableCell>Expertise</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredCandidates
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((candidate) => (
//                 <TableRow 
//                   key={candidate.ID}
//                   hover
//                   selected={selectedId === candidate.ID}
//                   sx={{ '&:hover': { cursor: 'pointer' } }}
//                   onClick={() => handleSelect(candidate)}
//                 >
//                   <TableCell padding="checkbox">
//                     <Radio
//                       checked={selectedId === candidate.ID}
//                       onChange={() => handleSelect(candidate)}
//                     />
//                   </TableCell>
//                   <TableCell>{candidate.ID}</TableCell>
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
//                       {`${candidate['First Name']} ${candidate['Last Name']}`}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Chip 
//                       label={`${candidate.Experience} years`}
//                       color="primary"
//                       variant="outlined"
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>{candidate.Expertise}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           component="div"
//           count={filteredCandidates.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </Box>
//   );
// }

// export default CandidateSelection;



import React, { useState, useCallback } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  TablePagination,
  Radio,
  Typography,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import { Search, User } from 'lucide-react';
import {Fade} from '@mui/material';

const CandidateSelection = ({ candidates, onCandidateSelected }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelect = useCallback(async (candidate) => {
    setSelectedId(candidate.ID);
    try {
      const formData = new FormData();
      formData.append('candidate_id', candidate.ID);

      const response = await fetch('http://localhost:8000/select-candidate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to select candidate');
      }

      const data = await response.json();
      onCandidateSelected(data.selected_candidate);
    } catch (error) {
      console.error('Error selecting candidate:', error);
    }
  }, [onCandidateSelected]);

  const filteredCandidates = candidates.filter(candidate => 
    `${candidate['First Name']} ${candidate['Last Name']}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.Expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Select Candidate
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or expertise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer 
          component={Paper} 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell>Select</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Expertise</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((candidate) => (
                  <TableRow 
                    key={candidate.ID}
                    hover
                    selected={selectedId === candidate.ID}
                    sx={{ 
                      '&:hover': { cursor: 'pointer' },
                      transition: 'background-color 0.2s'
                    }}
                    onClick={() => handleSelect(candidate)}
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selectedId === candidate.ID}
                        onChange={() => handleSelect(candidate)}
                      />
                    </TableCell>
                    <TableCell>{candidate.ID}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <User size={20} className="text-blue-500 mr-2" />
                        {`${candidate['First Name']} ${candidate['Last Name']}`}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${candidate.Experience} years`}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{candidate.Expertise}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredCandidates.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Fade>
  );
};

export default CandidateSelection;