// Отримати погоду за допомогою OpenWeatherMap API
// Опис: Використайте публічне API OpenWeatherMap для отримання поточної погоди.
// Зробіть GET-запит за адресою https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY},
// де {city} - назва міста, а {API_KEY} - ваш ключ API OpenWeatherMap.
// Перегляньте отримані дані щодо погоди.

const city = document.querySelector("[inp]");
const btn = document.querySelector("[btn]");
const box = document.querySelector("[cityBox]");
const API_KEY = "ae87a074a54100f5cf873bd3a915d460";

function setWeatherBackground(weatherCondition) {
  const body = document.body;
  let gradient = "";
  switch (weatherCondition.toLowerCase()) {
    case "clear":
      gradient = "linear-gradient(to bottom, #0476f2, #07a6f2)"; // Яскраво-синій для ясної погоди
      break;
    case "clouds":
      gradient = "linear-gradient(to bottom, #6d7b8d, #a7b7d1)"; // Сірий для хмарної погоди
      break;
    case "rain":
      gradient = "linear-gradient(to bottom, #3a5c83, #5d8aa8)"; // Темно-синій для дощу
      break;
    case "snow":
      gradient = "linear-gradient(to bottom, #e6e6fa, #b0e0e6)"; // Світло-блакитний для снігу
      break;
    case "thunderstorm":
      gradient = "linear-gradient(to bottom, #2c3e50, #4a6491)"; // Темно-синій для грози
      break;
    case "mist":
    case "fog":
    case "haze":
      gradient = "linear-gradient(to bottom, #bdc3c7, #2c3e50)"; // Світло-сірий для туману
      break;
    default:
      gradient = "linear-gradient(to bottom, #0476f2, #07a6f2)"; // За замовчуванням яскраво-синій
  }

  body.style.background = gradient;
}

btn.addEventListener("click", () => {
  if (city.value === "") {
    box.innerHTML = '<p class="error-message">Будь ласка, введіть назву міста.</p>';
  } else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric&lang=ua`)
      .then((response) => {
        if (!response.ok) {
          console.error("Something went wrong");
          box.innerHTML = '<p class="error-message">Місто не знайдено.</p>';
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const feelLike = Math.round(data.main.feels_like);
        const description = data.weather[0].description;
        const weatherCondition = data.weather[0].main;
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed);
        setWeatherBackground(weatherCondition);
        box.innerHTML = `
                    <div class="weather-info">
                        <h2>${cityName}</h2>
                        <p class="temperature">${temperature}°C</p>
                        <p class="feels-like">Відчувається як: ${feelLike}°C</p>
                        <p class="description">${description}</p>
                        <div class="details">
                            <div class="detail-item">
                                <span class="detail-value">${humidity}%</span>
                                <span class="detail-label">Вологість</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-value">${windSpeed} м/с</span>
                                <span class="detail-label">Вітер</span>
                            </div>
                        </div>
                    </div>
                `;
      })
      .catch((error) => {
        console.error("Error:", error);
        box.innerHTML = '<p class="error-message">Помилка при отриманні даних.</p>';
      });
  }
});
