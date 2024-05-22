document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.querySelector('.input-box');
    const searchBtn = document.getElementById('searchBtn');
    const weather_img = document.querySelector('.weather-img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const wind_speed = document.getElementById('wind-speed');
    const locationError = document.querySelector('.location-not-found');
    const weatherBody = document.querySelector('.weather-body');

    async function checkweather(city) {
        const api_Key = "3e2b8eb1f8d10ccf16c9cf7b95a9bd7b";
        const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}`;
        
        try {
            const response = await fetch(api_url);
            const weatherData = await response.json();

            if (weatherData.cod === '404') {
                locationError.style.display = "flex";
                weatherBody.style.display = "none";
                return;
            }

            locationError.style.display = "none";
            weatherBody.style.display = "flex";
            temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
            description.innerHTML = `${weatherData.weather[0].description}`;
            humidity.innerHTML = `${weatherData.main.humidity}%`;
            wind_speed.innerHTML = `${weatherData.wind.speed} Km/H`;

            switch (weatherData.weather[0].main) {
                case 'Clouds':
                    weather_img.src = "./assets/cloud.png";
                    break;
                case "Clear":
                    weather_img.src = "./assets/clear.png";
                    break;
                case "Rain":
                    weather_img.src = "./assets/rain.png";
                    break;
                case "Mist":
                    weather_img.src = "./assets/mist.png";
                    break;
                case "Snow":
                    weather_img.src = "./assets/snow.png";
                    break;
                default:
                    weather_img.src = "./assets/default.png";
            }
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    }

    searchBtn.addEventListener('click', () => {
        checkweather(inputBox.value);
    });
});
