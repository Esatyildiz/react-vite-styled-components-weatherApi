import React, { useState } from 'react';
import styled from 'styled-components';
import search_icon from './assets/search.png';
import clear_icon from './assets/clear.png';
import cloud_icon from './assets/cloud.png';
import drizzle_icon from './assets/drizzle.png';
import rain_icon from './assets/rain.png';
import snow_icon from './assets/snow.png';
import wind_icon from './assets/wind.png';
import humidity_icon from './assets/humidity.png';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
`;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": wind_icon,
    "50n": wind_icon,
  };

  const fetchWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon,
      });
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  return (
    <AppContainer>
      <Title>Weather App</Title>
      <InputContainer>
        <Input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={fetchWeather}>Get Weather</Button>
      </InputContainer>
      {weather && (
        <WeatherInfo>
          <WeatherIcon src={weather.icon} alt="weather icon" />
          <Info>{weather.temperature}°C</Info>
          <Info>{weather.location}</Info>
          <Info>Nem: {weather.humidity}%</Info>
          <Info>Rüzgar hızı: {weather.windSpeed} m/s</Info>
        </WeatherInfo>
      )}
    </AppContainer>
  );
}

export default App;
