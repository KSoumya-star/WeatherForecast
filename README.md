# Title : Weather Forecast App

# Description:
 step 1: signup to openweather.org to use free API..Find the API key page and generate a key to use.
        Open postman and call an API using the key.

step 2: Create the HTML and CSS.
        Create the html page , used Bootstrap here.

step 3: Implement the javascript structure

    using document.querySelector, select all the elemnts of the app.
    Add event listener on  click to the button(Get today's weather)
    using async  function ,await for the reults of API call [api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}].Store the reult in a variable.    
    another function outside the event listener, createCardHtml return the template card that was created in the html.It will take the parameters of the API data.
    In the event listener, call the function cardHtml.Render the template card
    Create an another function that fetches the data from the API.
    Fill in the template literals in the createCardHtml function so that the card is populated with the data from the API.
  
    To get  weather forecast of the city, use the above process creating different function, getForecastData and event listener forecastbutton.
    Inside async getforecastdata function, fetch the latitude and longitude(coordinates ) of the city using API http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
.
    Pass these coordinates again into new API call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} for the forecast weather data.Store the results in a variable after API call.

#Technology:
     Bootstrap, HTML, JavaScript and CSS

#Difficulties faced:
    - Adding javascript in the header without defer keyword reults in null value return
    - Timestamped date conversion
    - to find emojis  from the icon code sent from the api
    -
Licensce: MIT Licensce added

Lessons learnt:

-async and await functions
-API calls and to check the response after the call.
-using template literals
