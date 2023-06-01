let apiKey = "e981ee31a3f3cof0400b42t3a1bfad08";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Odesa&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function displayTemperature(response){
 console.log(response.data.temperature.current);
 let temperatureElement = document.querySelector("#temperature");
 let cityElement = document.querySelector("#city");
 let descriptionElement = document.querySelector("#description");
 let humidityElement = document.querySelector("#humidity");
 let windElement = document.querySelector("#wind");
 temperatureElement.innerHTML = Math.round(response.data.temperature.current);
 cityElement.innerHTML = response.data.city;
 descriptionElement.innerHTML = response.data.condition.description;
 humidityElement.innerHTML = response.data.temperature.humidity;
 windElement.innerHTML = Math.round(response.data.wind.speed);
}