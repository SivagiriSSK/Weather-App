//
let cityNameInputWrapper = document.getElementById("cityNameInputWrapper");
let editCityNameWrapper = document.getElementById("editCityNameWrapper");
editCityNameWrapper.style.display = "none";
let weatherInfo = document.getElementById("weatherInfo");
let currentWeatherReports = [];

// get the city name from local storage
getWeatherReport(localStorage.getItem("city"));
document.getElementById("cityInput").value = localStorage.getItem("city");

// save button functionality
const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", () => {
  let cityName = document.getElementById("cityInput").value;

  // store the user entered city name in local storage
  localStorage.setItem("city", cityName);

  cityNameInputWrapper.style.display = "none";
  weatherInfo.style.display = "flex";
  document.getElementById("displayCity").innerText = cityName;
  editCityNameWrapper.style.display = "block";
  getWeatherReport(cityName);
});

// change city name functionality
changeCityBtn = document.getElementById("changeCityBtn");
changeCityBtn.addEventListener("click", () => {
  cityNameInputWrapper.style.display = "flex";
  editCityNameWrapper.style.display = "none";
});

function getWeatherReport(cityName) {
  currentWeatherReports = [];
  let city = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=0d0a354784e8166b7b9fee6a3a29bcc2`;

  // get the response from backend using fetch API
  fetch(city)
    .then((res) => {
      console.log("Successfully Fetched the response");
      // get the response & convert to JSON
      return res.json();
    })
    .then((resInJson) => {
      let currentTemperature = {
        temperature: resInJson.main.temp,
        minimumTemperature: resInJson.main.temp_min,
        maximumTemperature: resInJson.main.temp_max,
      };

      let currentHumidity = {
        humidity: resInJson.main.humidity,
      };

      let currentWind = {
        weather: resInJson.weather[0].main,
        windSpeed: resInJson.wind.speed,
      };

      let currentCoordinate = {
        longitude: resInJson.coord.lon,
        latitude: resInJson.coord.lat,
      };

      // push the weather reports into array
      currentWeatherReports.push(
        currentTemperature,
        currentHumidity,
        currentWind,
        currentCoordinate
      );
      displayWeatherReport(currentWeatherReports);
    })
    // catch the error
    .catch((err) => {
      console.log("Inside the Catch");
      console.log(err);
    })
    .finally(() => {
      console.log("Fetch is over!");
    });
}

// display the weather report in the Webpage
function displayWeatherReport(currentWeatherReports) {
  document.querySelector(".city-temperature").innerText =
    currentWeatherReports[0].temperature;
  document.querySelector(".minimum-temperature").innerText =
    currentWeatherReports[0].minimumTemperature;
  document.querySelector(".maximum-temperature").innerText =
    currentWeatherReports[0].maximumTemperature;
  document.querySelector(".city-humidity").innerText =
    currentWeatherReports[1].humidity;
  document.querySelector(".city-weather").innerText =
    currentWeatherReports[2].weather;
  document.querySelector(".city-wind-speed").innerText =
    currentWeatherReports[2].windSpeed;
  document.querySelector(".city-longitude").innerText =
    currentWeatherReports[3].longitude;
  document.querySelector(".city-latitude").innerText =
    currentWeatherReports[3].latitude;

  // display the weather image according to the response
  let displayWeatherImage = document.querySelector(".display-weather-image");
  switch (currentWeatherReports[2].weather) {
    case "Rain":
      displayWeatherImage.innerHTML = `<img src="./assets/images/rain-image.png" 
        class="float-start weather-image bg-body-tertiary" alt="rain image">`;
      currentWeatherReports[2].weather;
      break;

    case "Clouds":
      displayWeatherImage.innerHTML = `<img src="./assets/images/clouds.png" 
        class="float-start weather-image bg-body-tertiary" alt="clouds image">`;
      break;

    case "Haze":
      displayWeatherImage.innerHTML = `<img src="./assets/images/haze-image.png" 
        class="float-start weather-image bg-body-tertiary" alt="haze image">`;
      break;

    case "Mist":
      displayWeatherImage.innerHTML = `<img src="./assets/images/mist-image.png"
        class="float-start weather-image bg-body-tertiary" alt="mist image">`;
      break;

    case "Clear":
      displayWeatherImage.innerHTML = `<img src="./assets/images/clear-image.png" 
        class="float-start weather-image bg-body-tertiary" alt="clear image">`;
      break;

    default:
      displayWeatherImage.innerHTML = `<img src="./assets/images/clouds.png" 
        class="float-start weather-image bg-body-tertiary" alt="clouds image">`;
  }
}
