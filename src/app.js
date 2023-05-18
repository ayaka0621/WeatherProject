function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Statuday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showUsers(response) {
  console.log(response);
  let cityName = document.querySelector("#city");
  let tempElement = document.querySelector(".currenttemperature");
  let descriptionElement = document.querySelector(".weatherDiscription");
  let humidElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  cityName.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidElement.innerHTML = `Humidity ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind:${Math.round(response.data.wind.speed)} Km/H`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showUsers);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("London");

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);
