async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  const apiKey = '8fb5d49404c57c5b1ebfe460c7fc7457'; // Replace with your real API key from OpenWeatherMap

  if (!city) {
    resultDiv.innerHTML = 'Please enter a city name.';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `Error: ${data.message}`;
    } else {
      resultDiv.innerHTML = `
        <strong>${data.name}, ${data.sys.country}</strong><br/>
        ${data.weather[0].main} - ${data.weather[0].description}<br/>
        Temp: ${data.main.temp}°C<br/>
        Humidity: ${data.main.humidity}%<br/>
        Wind: ${data.wind.speed} m/s
      `;
    }
  } catch (error) {
    resultDiv.innerHTML = 'Failed to fetch weather data.';
  }
}