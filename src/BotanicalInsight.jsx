function BotanicalInsight({ weather }) {
  if (!weather) return null;

  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const condition = weather.weather[0].main;
  
  let note = "Standard conditions for field observations.";
  let color = "#00ff96"; // Healthy Green

  if (temp > 30) {
    note = "High thermal stress detected. Monitor C3 specimens for wilting and check soil moisture levels.";
    color = "#ff9a9e"; // Warning Red
  } else if (humidity > 80) {
    note = "Atmospheric saturation high. Increased risk of fungal pathogens; ensure greenhouse ventilation is active.";
    color = "#4facfe"; // Humidity Blue
  } else if (condition === 'Rain') {
    note = "Precipitation event detected. Natural irrigation in progress; ideal time for observing water-runoff patterns.";
  }

  return (
    <div style={{ 
      marginTop: '20px', 
      padding: '15px', 
      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      borderLeft: `5px solid ${color}`,
      borderRadius: '8px',
      maxWidth: '600px',
      textAlign: 'left'
    }}>
      <h4 style={{ margin: '0 0 8px 0', color: color }}>🌿 Botanical Researcher's Note</h4>
      <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', lineHeight: '1.4' }}>{note}</p>
    </div>
  );
}

export default BotanicalInsight;