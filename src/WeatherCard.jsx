function WeatherCard({ weather, unit }) {
  if (!weather) return null;

  const weatherClass = weather.weather[0].main.toLowerCase();
  
  // Logic to determine the correct symbol based on the unit prop
  const symbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className={`weather-card ${weatherClass}`}>
      <h2>{weather.name}</h2>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt="weather-icon" 
      />
      {/* Now using the dynamic symbol variable */}
      <p className="temp">{Math.round(weather.main.temp)}{symbol}</p>
      <p className="desc">{weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;