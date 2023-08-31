
import React, { useState } from 'react';
import News from './components/News';
import Blog from './components/Blog';
import Weather from './components/Weather';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, AppBar, Typography, Box } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import Brightness7Icon from '@mui/icons-material/Brightness7';


function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#EEEEEE',
      },
      secondary: {
        main: '#222831',
      },
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const icon = darkMode ? <BedtimeIcon /> : <Brightness7Icon />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar style={{display:'flex', flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
        <Box style={{display:'flex', flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
          <Switch checked={darkMode} onChange={handleThemeChange} />
          {icon}
        </Box>
        <Typography variant="h2">Shameless App</Typography>
      </AppBar>
      <Weather />
      <News />
      <Blog />
    </ThemeProvider>
  );
}

export default App;
