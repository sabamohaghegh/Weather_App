function updateDay() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  return day;
}

function updateHour() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function updateDateDay() {
  let now = new Date();
  let dateDay = now.getDate();
  return dateDay;
}

function updateDateMonth() {
  let now = new Date();
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let dateMonth = months[now.getMonth()];
  return dateMonth;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let foreCastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      foreCastHTML =
        foreCastHTML +
        `<div class="col-3">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
               
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });
  foreCastHTML = foreCastHTML + `</div>`;
  forecastElement.innerHTML = foreCastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c5619e0b2f739fa488fdf6f0eff2434d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentTemp(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#h1-heading").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon-h1")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemp = response.data.main.temp;
  let icon = response.data.weather[0].icon;

  if (icon === "01d" || icon === "01n") {
    document.querySelector("#emoji-fun").innerHTML = "🕶";
    document.querySelector("#funny-prescription").innerHTML =
      "Don't forget your sunglasses!";
  } else {
    if (icon === "02d" || icon === "02n") {
      document.querySelector("#emoji-fun").innerHTML = "😉";
      document.querySelector("#funny-prescription").innerHTML =
        "Don't forget to soak up the sunlight as much as there is!";
    } else {
      if (icon === "03d" || icon === "03n") {
        document.querySelector("#emoji-fun").innerHTML = "😊";
        document.querySelector("#funny-prescription").innerHTML =
          "Don't forget to be happy!";
      } else {
        if (icon === "04d" || icon === "04n") {
          document.querySelector("#emoji-fun").innerHTML = "😋";
          document.querySelector("#funny-prescription").innerHTML =
            "Don't forget to smile!";
        } else {
          if (icon === "09d" || icon === "09n") {
            document.querySelector("#emoji-fun").innerHTML = "🌂";
            document.querySelector("#funny-prescription").innerHTML =
              "Don't forget your umbrella!";
          } else {
            if (icon === "10d" || icon === "10n") {
              document.querySelector("#emoji-fun").innerHTML = "🌂";
              document.querySelector("#funny-prescription").innerHTML =
                "Don't forget your umbrella!";
            } else {
              if (icon === "11d" || icon === "11n") {
                document.querySelector("#emoji-fun").innerHTML = "🐱‍👤";
                document.querySelector("#funny-prescription").innerHTML =
                  "Don't forget to be brave!";
              } else {
                if (icon === "13d" || icon === "13n") {
                  document.querySelector("#emoji-fun").innerHTML = "🧣";
                  document.querySelector("#funny-prescription").innerHTML =
                    "Don't forget to wear warm clothes";
                } else {
                  if (icon === "50d" || icon === "50n") {
                    document.querySelector("#emoji-fun").innerHTML = "☕";
                    document.querySelector("#funny-prescription").innerHTML =
                      "Don't forget to drink a cup of coffee!";
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  document
    .querySelector("#icon-h1")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c5619e0b2f739fa488fdf6f0eff2434d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  search(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c5619e0b2f739fa488fdf6f0eff2434d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(currentTemp);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showCity);

let weekDay = document.querySelector("#current-day");
weekDay.innerHTML = updateDay();

let currentHour = document.querySelector(".time");
currentHour.innerHTML = updateHour();

let currentDateDay = document.querySelector(".date .date-day");
currentDateDay.innerHTML = updateDateDay();

let currentDateMonth = document.querySelector(".date .date-month");
currentDateMonth.innerHTML = updateDateMonth();

currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);
search("Toronto");
