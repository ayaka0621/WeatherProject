function showUsers(response) {
  console.log(response);
  let cityName = document.querySelector("#city");
  let tempElement = document.querySelector(".currenttemperature");
  let descriptionElement = document.querySelector(".weatherDiscription");
  let humidElement = document.querySelector("#humid");
  let windElemet = document.querySelector("#wind");
  cityName.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidElement.innerHTML = `Humidity ${response.data.main.humidity}%`;
  windElemet.innerHTML = `Wind:${Math.round(response.data.wind.speed)} Km/H`;
}

let apiKey = "311f1f45fee82242ab4086372ab360f5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showUsers);
