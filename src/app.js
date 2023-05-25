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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forcecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forcecastHTML =
      forcecastHTML +
      `
    <div class="col-2">
      <div class="weather-forcecast-date">${day}</div>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAVVJREFUaN7tmckNgzAQRV1CSqAEl+ASKIFjjpTgEiiBElICJeTKjXRAB5MZyUgOyoKNx8hkLL1LNv6D8RoFAKpklAiIgAiIgAiIwMsLGxs8rjXSI3cE3nB379cqYdstgIEsMn8I/Qn6vD1UAAMYZAoMvoa+r7ML4EWbncHXNNkEGMLvkggSYAy/ULMJ4I9XEZ0VIjp3xSVwYw6/cEsu4EYcyIhOLdBnFuhTC3DXPs3SgzeLD3TdcRw1Yj10sABz+VBgsxrpLgSG7RB4Qxcq0DKGp6AtMnsBB3e34QttiIBlEjAuPEQwhQh0HHff1fgcKQBHCtCA0GCIKja8/yToKeYsoaXuzYY6D6HL1YlpWGwSBvfR3MPo7rr/geWeyHonYJkw3EsJqxjafyzmil9On2JDU/yW8hSb+lMcq5ziYCvB0eJ0+NFiMYe78v+ACIiACIiACJTEEyDCTi8sMWUSAAAAAElFTkSuQmCC"
        alt="weather-forcecast-icon"
      />
      
        <div class="weather-forecast-temperature">
          <span class="temeperature-max">18°</span>
          <spna class="temeperature-mini">12°</spna>
        </div>
      
    </div>

  `;
  });

  forcecastHTML = forcecastHTML + `</div>`;
  forecastElement.innerHTML = forcecastHTML;
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

  celsiusTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celsiusTemperature);
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

function displayisplayfahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".currenttemperature");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let tempElement = document.querySelector(".currenttemperature");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayisplayfahrenheitTemp);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displaycelsiusTemperature);

search("London");
displayForecast();
