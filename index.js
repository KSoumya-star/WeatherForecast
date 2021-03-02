//get API key from postman
const appId = 'Your Key';

//selecting  the get weather button with id =citybutton
const citybutton = document.querySelector('#citybutton');


//event listener for a click event on the "Get current weather" button

citybutton.addEventListener('click', async (e) => {
  e.preventDefault();
  const respdata = await getApiData();
  console.log(JSON.stringify(respdata));
  document.getElementById("cont");
  const cardHTML = createCardHtml(respdata.name, emojis[respdata.weather[0].icon], respdata.main.temp, respdata.main.feels_like, respdata.weather[0].description);
  document.querySelector("#weatherdata").innerHTML = cardHTML;
  //clear forecast data
  document.querySelector("#forecastData").innerHTML = '';
})
//select forecast button
const forecastbutton = document.querySelector('#forecastbutton');

//event listener for a click event on the "Get forecast weather" button

forecastbutton.addEventListener('click', async (e) => {
  e.preventDefault();
  const respdata = await getForecastData();
  console.log(JSON.stringify(respdata));
  document.getElementById("cont");
  const dailyDataList = respdata.daily;
  let cardForecast = '';
  for (let i = 0; i < dailyDataList.length; i++) {
    cardForecast += createForecastHtml(dailyDataList[i]);
  }
  document.querySelector("#forecastData").innerHTML = cardForecast;
})

//get the current weather data for the city
const getApiData = async () => {
  let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + place.value + '&appid=' + appId + '&units=metric';
  console.log(url);
  let response = await fetch(url);
  let data = await response.json();
  return data;
  }

//get the forecast weather data for the city
const getForecastData = async () => {

  let coords = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + place.value + '&appid=' + appId);
  let coordData = await coords.json();
  console.log(coordData);

  // get coordinates of the city -latitude and longitude
  let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + coordData[0].lat + '&lon=' + coordData[0].lon + '&exclude=minutely,hourly,alerts&appid=' + appId + '&cnt=7&units=metric';
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

//create html card- temperate literal string
const createCardHtml = (name, emoji, temp, feelsLike, description) => `
  <div class="card">
    <div class="row no-gutters align-items-center">    
      <div class="col-2 h2 pl-1 pt-1 text-center">                
        ${emoji}
      </div>
      <div class="col-10">
        <div class="card-body">
          <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
            <h4>${name}</h4>
            <h6>${temp}c, feels like ${feelsLike}c</h6>
          </div>
          <div class="row">
            <h5 class="card-subtitle text-muted">${description}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// emojis object used to find the right emoji from the icon code sent from the api
const emojis = {
  '01d': '☀️',
  '02d': '⛅️',
  '03d': '☁️',
  '04d': '☁️',
  '09d': '🌧',
  '10d': '🌦',
  '11d': '⛈',
  '13d': '❄️',
  '50d': '💨',
  '01n': '☀️',
  '02n': '⛅️',
  '03n': '☁️',
  '04n': '☁️',
  '09n': '🌧',
  '10n': '🌦',
  '11n': '⛈',
  '13n': '❄️',
  '50n': '💨',
};

//render the forecast data 
const createForecastHtml = (dailyData) => `
  <div class="card">
    <div class="row no-gutters align-items-center">    
      <div class="col-2 h2 pl-1 pt-1 text-center">                
        ${emojis[dailyData.weather[0].icon]}
      </div>
      <div class="col-10">
        <div class="card-body">
          <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
            <h4>${new Date(dailyData.dt * 1000).toLocaleDateString('en-AU')}</h4>
            <h6>Max - ${dailyData.temp.max}c, Min - ${dailyData.temp.min}c</h6>
          </div>
          <div class="row">
            <h5 class="card-subtitle text-muted">${dailyData.weather[0].description}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
`;