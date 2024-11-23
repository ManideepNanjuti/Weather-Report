
const apiKey = "e6e1adaae20251129bd2ad966b78eb56"; // Replace with your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // Extract weather information
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const icon = data.weather[0].icon;

            // Display the weather information
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `
                <h2>${city}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                <p><strong>Temperature:</strong> ${temperature} °C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                <p><strong>Description:</strong> ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            document.getElementById('weather').innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
    }
