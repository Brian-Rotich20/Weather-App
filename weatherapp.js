//WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "34bd5007bb8fc85a7a895181b7358492";

weatherForm.addEventListener("submit", async event =>{

        event.preventDefault();    //prevent reloading of the page.

        const city = cityInput.value;
        if(city){
            try{
                const weatherData = await getweatherData(city);
                displayWeatherInfo(weatherData);
            }
            catch(error){
                console.error(error);
                displayError(error);
            }
        }
        else{
            displayError("Please enter a city");
        }
});

async function getweatherData(city) {
    
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){  /////function to display weather data
 //destructuring
    const {name: city,
          main:{temp, humidity},
          weather:[{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent =`Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay"); 
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈"; // Thunderstorms
        case (weatherId >= 300 && weatherId < 400):
            return "🌧"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫"; // Atmosphere (mist, smoke, etc.)
        case (weatherId === 800):
            return "☀"; // Clear sky
        case (weatherId >= 801 && weatherId < 810):
            return "☁☁"; // Clouds
        default:
            return "❓"; // Unknown
    }
}

function displayError(message){
    
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errorDisplay);
    
}