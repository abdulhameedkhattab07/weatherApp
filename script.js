// API Key (replace with your actual Visual Crossing API key)
const API_KEY = 'C9Z5M8S3WRUAW488BYLFSLFYF';

const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");

let isCelsius = true;

// Fetch Weather Data
async function fetchWeather(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`;
  const response = await fetch(url);
  if (!response.ok) {
    alert("City not found! Please try again.");
    return;
  }
  const data = await response.json();
  displayWeather(data);
}

// Display Weather Data
function displayWeather(data) {
  const { resolvedAddress, currentConditions } = data;

  // Populate Weather Details
  document.getElementById("city-name").textContent = resolvedAddress;
  document.getElementById("temperature").textContent = currentConditions.temp;
  document.getElementById("feels-like").textContent = currentConditions.feelslike;
  document.getElementById("condition").textContent = currentConditions.conditions;
  document.getElementById("humidity").textContent = currentConditions.humidity;
  document.getElementById("wind-speed").textContent = currentConditions.windspeed;
  document.getElementById("visibility").textContent = currentConditions.visibility;
  document.getElementById("uv-index").textContent = currentConditions.uvindex;
  document.getElementById("pressure").textContent = currentConditions.pressure;
  document.getElementById("sunrise").textContent = currentConditions.sunrise;
  document.getElementById("sunset").textContent = currentConditions.sunset;

  // Update Background
  setDynamicBackground(currentConditions.conditions);

  weatherDisplay.classList.remove("hidden");
}

// Set Dynamic Background
function setDynamicBackground(condition) {
  document.body.className = ""; // Clear existing classes
  if (condition.toLowerCase().includes("sunny")) {
    document.body.style.background = "linear-gradient(to bottom, #f7b733, #fc4a1a)";
  } else if (condition.toLowerCase().includes("cloudy")) {
    document.body.style.background = "linear-gradient(to bottom, #3e5151, #decba4)";
  } else if (condition.toLowerCase().includes("rain")) {
    document.body.style.background = "linear-gradient(to bottom, #4e54c8, #8f94fb)";
  } else {
    document.body.style.background = "linear-gradient(to bottom, #6dd5ed, #2193b0)";
  }
}

// Toggle Unit Conversion
document.getElementById("unit-toggle").addEventListener("click", () => {
  const tempElement = document.getElementById("temperature");
  const feelsLikeElement = document.getElementById("feels-like");

  let temp = parseFloat(tempElement.textContent);
  let feelsLike = parseFloat(feelsLikeElement.textContent);

  if (isCelsius) {
    temp = (temp * 9/5) + 32; // Convert to Fahrenheit
    feelsLike = (feelsLike * 9/5) + 32;
    document.getElementById("unit-toggle").textContent = "Switch to °C";
  } else {
    temp = (temp - 32) * 5/9; // Convert to Celsius
    feelsLike = (feelsLike - 32) * 5/9;
    document.getElementById("unit-toggle").textContent = "Switch to °F";
  }

  tempElement.textContent = temp.toFixed(1);
  feelsLikeElement.textContent = feelsLike.toFixed(1);
  isCelsius = !isCelsius;
});

// Form Submit Event
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});
