const apiKey = "3a851b7b6b56b9d51af166f4c4c263ae";
const city = "Fredericksburg";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  const response = await fetch(weatherUrl);
  const data = await response.json();

  // Current
  document.getElementById("temp").textContent =
    `Temp: ${data.list[0].main.temp}°F`;

  document.getElementById("desc").textContent =
    data.list[0].weather[0].description;

  // 3-day forecast (every 8 entries ≈ 24 hours)
  const forecast = document.getElementById("forecast");

  for (let i = 8; i <= 24; i += 8) {
    const day = document.createElement("p");
    day.textContent = `${data.list[i].main.temp}°F`;
    forecast.appendChild(day);
  }
}

getWeather();