import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Paper, Button, CircularProgress} from '@mui/material'; 
import CloudIcon from '@mui/icons-material/Cloud';
import ClearIcon from '@mui/icons-material/Clear';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Weather = () => {
  const [city, setCity] = useState('Budapest');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pictureUrl, setPictureUrl] = useState()

  const getWeatherData = async () => {
    try {
      setIsLoading(true);
      const apiKey = 'e988376fe7f2ab430d6c0bff77dc4cc9';
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();
      setCity("")
      const pictureRequest = await fetch(
        `https://api.pexels.com/v1/search?query=${city}&orientation=landscape`,
        {
          headers: {
            Authorization: "3p8KB43NbRC9CQU0NcYRyb4u2HWHqzDxp5akz44BZdCMExTVBRLgPODt",
          },
        }
      );
      const pictureResponse = await pictureRequest.json()

      setPictureUrl(pictureResponse.photos[0].src.original)

      setTimeout(() => {
        setWeatherData(data);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error('Hiba a lekérés közben:', error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  const weatherIcons = {
    Clear: <ClearIcon />, 
    Clouds: <CloudIcon />, 
    Sunny: <WbSunnyIcon />,
  };

  const renderWeatherData = () => {
    if (isLoading) {
      return <Typography variant="h2"><CircularProgress color="inherit" /></Typography>;
    }

    if (!weatherData) {
      return null;
    }

    const celsiusTemperature = weatherData.main.temp - 273.15;
    return (
      <div>
        <Typography variant="h2">{weatherData.name}</Typography>
        <Typography variant="body1">
          {weatherIcons[weatherData.weather[0].main]}
          Temperature: {celsiusTemperature.toFixed(2)} °C
        </Typography>
        <Typography variant="body1">Description: {weatherData.weather[0].description}</Typography>
      </div>
    );
  };

  return (
    <>
      <Typography variant="h2">Weather</Typography>
      <Paper style={{margin:"32px", marginTop:"100px", display:"flex", height:"200px", alignItems:"center"}}>
        <Container style={{display:"flex", height:"50px",width:"400px", alignItems:"center", gap:"10px"}}>
          <TextField
            type="text"
            label="City name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button variant="contained" onClick={getWeatherData}>
            Search
          </Button>
          </Container>
          <Container style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
            {renderWeatherData()}
            <img src={pictureUrl} style={{width:"250px", boxShadow:"0px 0px 10px white"}}>
            </img>
          </Container>
      </Paper>
    </>
  );
};

export default Weather;
