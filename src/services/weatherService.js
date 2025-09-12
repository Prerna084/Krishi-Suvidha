// src/services/weatherService.js
// src/services/weatherService.js
import axios from "axios";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // replace with your key

export async function getWeather(city) {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return res.data;
}
