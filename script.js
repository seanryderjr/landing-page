function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timezoneOffset = now.getTimezoneOffset();
    var localTime = new Date(now.getTime() - timezoneOffset);
    hours = localTime.getHours();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    document.getElementById("time").textContent = hours + ":" + minutes + ":" + seconds + " " + ampm;
}

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
                var temperature = (data.main.temp - 273.15) * 1.8 + 32;
                var description = data.weather[0].description;
                var iconCode = data.weather[0].icon;
                var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                var iconElement = document.createElement("img");
                iconElement.src = iconUrl;
                iconElement.alt = description;
                var weatherElement = document.getElementById("weather");
                weatherElement.innerHTML = "";
                weatherElement.appendChild(iconElement);
                weatherElement.innerHTML += temperature.toFixed(1) + " °F";
                getBackgroundImage(description);

                var city = data.name;
                var state = data.sys.country;

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


const textarea = document.getElementById('textarea');
const savedNotes = localStorage.getItem('notes');

if (savedNotes) {
    textarea.value = savedNotes;
}

textarea.addEventListener('input', () => {
    localStorage.setItem('notes', textarea.value);
});