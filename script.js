// Function to update the time every second
// Function to update the time every second
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    // Adjust for the user's time zone offset
    var timezoneOffset = now.getTimezoneOffset();
    var localTime = new Date(now.getTime() - timezoneOffset);
    hours = localTime.getHours();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    // Update the time display
    document.getElementById("time").textContent = hours + ":" + minutes + ":" + seconds + " " + ampm;
}

// Call the updateTime function every second
setInterval(updateTime, 1000);




function getBackgroundImage(description) {
    var bodyElement = document.querySelector("body");
    if (description.includes("cloud")) {
        bodyElement.style.backgroundImage = "url('cloud.jpg')";
    } else if (description.includes("rain")) {
        bodyElement.style.backgroundImage = "url('rain.jpg')";
    } else if (description.includes("snow")) {
        bodyElement.style.backgroundImage = "url('snow.jpg')";
    } else if (description.includes("clear")) {
        bodyElement.style.backgroundImage = "url('clear.jpg')";
        
    } else {
        bodyElement.style.backgroundImage = "url('clear.jpg')";
    }
}



function getWeather() {
    var apiKey = "7a074b0af0161e1ef4310bf54f3710d4";
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var temperature = (data.main.temp - 273.15) * 1.8 + 32; // Convert from Kelvin to Celsius
                var description = data.weather[0].description;
                var iconCode = data.weather[0].icon; // Get the weather icon code
                var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"; // Construct the URL for the weather icon
                var iconElement = document.createElement("img"); // Create an HTML <img> element for the weather icon
                iconElement.src = iconUrl; // Set the src attribute of the <img> element to the icon URL
                iconElement.alt = description; // Set the alt attribute of the <img> element to the weather description
                var weatherElement = document.getElementById("weather");
                weatherElement.innerHTML = ""; // Clear the existing content of the weather display element
                weatherElement.appendChild(iconElement); // Add the <img> element to the weather display element
                weatherElement.innerHTML += temperature.toFixed(1) + " °F"; // Add the temperature and description to the weather display element
                getBackgroundImage(description);

                var city = data.name;
                var state = data.sys.country;

                // Update the location element with the city and state
                var locationElement = document.querySelector(".location");
                locationElement.textContent = city + ", " + state;
            })
            .catch(error => {
                console.log("An error occurred while fetching the weather data: ", error);
            });

    });
}

getWeather();
setInterval(updateTime, 1000);

// Replace YOUR_API_KEY with your actual API key from Newscatcher
