import { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart'; 
import BotanicalInsight from './BotanicalInsight';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); 
  const [error, setError] = useState('');
  // State: 'metric' for Celsius, 'imperial' for Fahrenheit
  const [unit, setUnit] = useState('metric');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (e, forcedUnit = unit) => {
    if (e) e.preventDefault();
    if (!city) return;
    setError('');
    
    try {
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${forcedUnit}&appid=${API_KEY}`
      );
      if (!currentRes.ok) throw new Error("City not found");
      const currentData = await currentRes.json();
      setWeather(currentData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${forcedUnit}&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

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

  // Helper to change unit and immediately re-fetch
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if (city) fetchWeather(null, newUnit);
  };

  return (
    <div className="app-container">
      <h1>Weather Station</h1>
      
      <div className="unit-controls">
        <button 
          className={unit === 'metric' ? 'active' : ''} 
          onClick={() => handleUnitChange('metric')}
        >°C</button>
        <button 
          className={unit === 'imperial' ? 'active' : ''} 
          onClick={() => handleUnitChange('imperial')}
        >°F</button>
      </div>

      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

      {error && <p className="error">{error}</p>}

      {/* Passing 'unit' as a prop so the card knows which symbol to show */}
      <WeatherCard weather={weather} unit={unit} />
      
      {forecast && <WeatherChart data={forecast} unit={unit} />}
      <BotanicalInsight weather={weather} />
    </div>
  );
}

export default App;