const apiKey = "3a851b7b6b56b9d51af166f4c4c263ae";  
const city = "Fredericksburg,VA,US";  

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    
    const current = data.list[0];
    document.getElementById("temp").textContent = `Temp: ${current.main.temp.toFixed(1)}°F`;
    document.getElementById("desc").textContent = current.weather[0].description;

    
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = ""; 

    for (let i = 8; i <= 24; i += 8) {
      const forecastItem = data.list[i];
      const day = document.createElement("p");
      day.textContent = `${forecastItem.main.temp.toFixed(1)}°F - ${forecastItem.weather[0].description}`;
      forecastContainer.appendChild(day);
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    document.getElementById("temp").textContent = "Weather data unavailable";
    document.getElementById("desc").textContent = "";
    document.getElementById("forecast").textContent = "";
  }
}


getWeather();