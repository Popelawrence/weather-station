import { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart'; 
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); 
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Fetch Current Weather
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!currentRes.ok) throw new Error("City not found");
      const currentData = await currentRes.json();
      setWeather(currentData);

      // Fetch Forecast Data
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      // ETL Step: Transform the raw API list into the specific array the Chart needs
      const chartData = forecastData.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp)
      }));
      
      setForecast(chartData);

    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Station</h1>
      
      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

      {error && <p className="error">{error}</p>}

      <WeatherCard weather={weather} />
      
      {/* Dynamic Render: Only shows the chart once the data is transformed */}
      {forecast && <WeatherChart data={forecast} />}
    </div>
  );
}

export default App;