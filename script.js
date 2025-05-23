async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  const apiKey = process.env.OPENWEATHER_API_KEY; // For Netlify
// OR for local testing:
const apiKey = '8fb5d49404c57c5b1ebfe460c7fc7457' || process.env.OPENWEATHER_API_KEY;
  if (!localStorage.getItem('weatherApiKey')) {
  const key = prompt("Enter your OpenWeatherMap API key:");
  localStorage.setItem('weatherApiKey', key);
}
const apiKey = localStorage.getItem('weatherApiKey');

  if (!city) {
    resultDiv.innerHTML = 'Please enter a city name.';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
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
if (response.status === 404) {
  alert("City not found. Try another name!");
}
const iconMap = {
  "01d": "☀️", // Sunny
  "01n": "🌙", // Clear night
  // Add more mappings
};
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  fetchWeatherByCoords(latitude, longitude);
});
const recognition = new webkitSpeechRecognition();
recognition.onresult = (event) => {
  const city = event.results[0][0].transcript;
  fetchWeather(city);
};
recognition.start();
  function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
          .then(response => response.json())
          .then(data => displayWeather(data));
      },
      (error) => alert("Location access denied. Search manually.")
    );
  }
}
  window.addEventListener('load', getLocation);
  function getIcon(iconCode) {
  const iconMap = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    // Add more mappings (or use an icon library like Font Awesome)
  };
  return iconMap[iconCode] || "🌈";
}
// Usage: 
// const icon = getIcon(data.weather[0].icon);
  // Store the key in localStorage after first entry
function startVoiceSearch() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.onresult = (event) => {
    const city = event.results[0][0].transcript;
    fetchWeather(city);
  };
  recognition.start();
}
// Add a button: <button onclick="startVoiceSearch()">🎤 Speak</button>
}