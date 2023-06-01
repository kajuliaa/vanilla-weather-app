
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response){
  console.log(response.data.daily);
  let forecast = response.data.daily;;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri","Sat"];
  let forecastHTML= `<div class="row">`
  forecast.forEach(function(forecastDay, index){
    if(index<6){
    forecastHTML= forecastHTML+
    `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
              <img src="${forecastDay.condition.icon_url}" width="36">
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
              </div>
            </div>
    `}
  })

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(city){
  let apiKey = "e981ee31a3f3cof0400b42t3a1bfad08";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celsiusTemperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = `Last updated: ${formatDate(response.data.time * 1000)}`;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.city);
}


function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  //getForecast(cityInputElement.value);
}

function search(city){
  let apiKey = "e981ee31a3f3cof0400b42t3a1bfad08";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showFahrenheitTemperature(event){
  event.preventDefault();
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9/5) + 32);
}

function showCelsiusTemperature(event){
  event.preventDefault();
  fahrenheitlink.classList.remove("active");
  celsiuslink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

search("Bamberg");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showFahrenheitTemperature);

let celsiusTemperature = null;

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemperature);
