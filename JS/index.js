const weather_input = document.getElementById("we");
const weather_input_btn = document.getElementById("btn");
const apiKey = "a3bc2bbc349e8f506223783b5076756a";
const mess_weather = document.querySelector(".message-weather");
const not_found = document.querySelector(".not-found");
const weather_info = document.querySelector(".container-info");
const countryTXT = document.querySelector(".country");
const tempTXT = document.querySelector(".temp");
const conditionTXT = document.querySelector(".condition")
const humidityTXT = document.querySelector(".humidity-value")
const windTXT = document.querySelector(".wind-value")
const weatherIMG = document.querySelector(".weather");
weather_input_btn.addEventListener("click", () => {
  if (weather_input.value.trim() !== "") {
    updateWeatherInfo(weather_input.value);
    weather_input.value = "";
    weather_input.blur();
  }
});
weather_input.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && weather_input.value.trim() !== "") {
    updateWeatherInfo(weather_input.value);
    weather_input.value = "";
    weather_input.blur();
  }
});
async function FecthAPI(endpoint, city) {
  const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  return response.json();
}
function getWeatherIcon(id) {
  console.log(id)
  if (id >= 200 && id <= 232) {
    return "thunderstorm.png";
  } else if (id >= 300 && id <= 321) {
    return "drizzle.png";
  } else if (id >= 500 && id <= 531) {
    return "rain.png";
  } else if (id >= 600 && id <= 622) {
    return "snow.png";
  } else if (id >= 701 && id <= 781) {
    return "atmosphere.png";
  } else if (id === 800) {
    return "clear.png";
  } else if (id >= 801 && id <= 804) {
    return "cloud.png";
  }

}
async function updateWeatherInfo(city) {
  const data = await FecthAPI("weather", city);
  console.log(data);
  if (data.cod != 200) {
    showDisplay(not_found);
    return;
  }
  
  const {
    name : country,
    main:{temp , humidity},
    weather:[{id,main}],
    wind :{speed}
  } = data;
  countryTXT.textContent = country;
  tempTXT.textContent = Math.round(temp) +" °C";
  conditionTXT.textContent = main;
  humidityTXT.textContent = Math.round(humidity) + " %"
  windTXT.textContent = Math.round(speed) + "M/s"
  weatherIMG.src =`../IMG/${getWeatherIcon(id)}`
  showDisplay(weather_info);
}
function showDisplay(section) {
  [not_found, mess_weather, weather_info].forEach(
    (section) => (section.style.display = "none"),
  );
  section.style.display='flex';
}
