// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Graph from './pages/Graph';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Box sx={{ display: 'flex' }}>
                    
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', padding: 3 }}
                    >
                        <Navbar />
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/roles" element={<Roles />} />
                            <Route path="/graph" element={<Graph />} />
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
