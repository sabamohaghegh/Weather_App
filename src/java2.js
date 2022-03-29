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
let weekDay = document.querySelector("#current-day");
weekDay.innerHTML = updateDay();

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
let currentHour = document.querySelector(".time");
currentHour.innerHTML = updateHour();

function updateDateDay() {
  let now = new Date();
  let dateDay = now.getDate();
  return dateDay;
}
let currentDateDay = document.querySelector(".date .date-day");
currentDateDay.innerHTML = updateDateDay();

function updateDateMonth() {
  let now = new Date();
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let dateMonth = months[now.getMonth()];
  return dateMonth;
}
let currentDateMonth = document.querySelector(".date .date-month");
currentDateMonth.innerHTML = updateDateMonth();

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

function unitC(event) {
  event.preventDefault();
  let heading = document.querySelector("#h1-heading");
  heading.innerHTML = 10;
}

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", unitC);

function unitF(event) {
  event.preventDefault();
  let heading = document.querySelector("#h1-heading");
  let temp = heading.innerHTML;
  temp = Number(temp);
  heading.innerHTML = `${Math.round((temp * 9) / 5 + 32)}`;
}

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", unitF);

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showCity);
search("Toronto");

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c5619e0b2f739fa488fdf6f0eff2434d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&unit=${unit}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(currentTemp);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);
