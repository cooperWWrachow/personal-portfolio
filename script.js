// my weather class first
const myWeather = document.querySelector(".weather-color1");
// // must be on a form
const mySubmit = document.querySelector(".my-weather-display");
// users weather class varibales
const weatherForm = document.querySelector(".weatherForm");
const locationInput = document.querySelector(".locationInput")
const userWeather = document.querySelector(".weather-color2");


const apiKey = "1093475ce2c6a92ea5e8f82f3fe92f64";

// waits for request for my weather
mySubmit.addEventListener("submit", async event => {
    // forms refresh page by default so remove that
    event.preventDefault();
    const city = "figi";
    // console.log(city);
    const weatherData = await getWeatherData(city);

    displayWeatherInfo(weatherData, myWeather);
});

// Waits for user submit
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = locationInput.value;
    // reset input value to nothing
    locationInput.value = "";

    // checks for input
    if(city) {
        try {
            // in order to use await must have async in function "async event"
            // call function that retrieves the data and function that displays it
            const weatherData = await getWeatherData(city);
            // console.log(weatherData);
            displayWeatherInfo(weatherData, userWeather);
        }
        catch(error) {
            console.error(error);
            displayError("Unrecognizable by OpenWeatherMaps");
        };
    }
    else {
        displayError("Please Enter a City");
    };

});


// adds text top users clipboard
const copyText = () => {
    var text = document.getElementById("copyText").innerText;
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard: " + text);
};

// waits for email to be clicked, then calls copyText function
document.getElementById("copyText").addEventListener("click", copyText);


async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);
    // legit city means ok:true
    return await response.json();
};

// different forms so pass correct form as an argument 
const displayWeatherInfo = (data, form) => {
    
    // "destructuring" the data variable based on the elemts in the json response
    const {name: city, main: {temp, humidity}, weather: [{description}]} = data;
    // Resets values
    form.textContent = "";

    // create the contents for the html
    const locationDisplay = document.createElement("h3");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    // setting actual values within the classes
    locationDisplay.textContent = city;
    // in kelvin
    tempDisplay.textContent = `${((temp-273.15)*(9/5)+32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    
    // give class name 
    locationDisplay.classList.add("locationDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    // create child to parent div
    form.appendChild(locationDisplay);
    form.appendChild(tempDisplay);
    form.appendChild(humidityDisplay);
    form.appendChild(descDisplay);

};

const displayError = (message) => {
    // create a html element first
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    // create a class
    errorDisplay.classList.add("errorDisplay");

    userWeather.textContent = "";
    // append errorDisplay paragraph to the card
    userWeather.appendChild(errorDisplay);
};



// HAMBURGER ICON
const toggleMenu = () => {
    // targetting the entire menu-links element and hamburger-icon
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    // adds or removes that open class 
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
