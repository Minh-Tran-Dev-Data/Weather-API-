const weather_input = document.getElementById("we");
const weather_input_btn = document.getElementById("btn");
const apiKey = "a3bc2bbc349e8f506223783b5076756a";
const mess_weather = document.querySelector(".message-weather");
const not_found = document.querySelector(".not-found");
const weather_info = document.querySelector(".container-info");
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
async function updateWeatherInfo(city) {
  const data = await FecthAPI("weather", city);
  console.log(data);
  if (data.cod !== 200) {
    showDisplay(not_found);
    return;
  }
}
function showDisplay(section) {
  [not_found, mess_weather, weather_info].forEach(
    (section) => (section.style.display = "none"),
  );
  section.style.display = "flex";
}
