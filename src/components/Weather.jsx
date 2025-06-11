import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Weather = () => {
  const [inputLocation, setInputLocation] = useState("");
  const [weatherData, setWeatherData] = useState(false);

  const search = async (cityName) => {
    if (cityName === "") {
      alert("Enter a city name.");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        alert(`Error: ${data.message}`);
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        sky_desc: data.weather[0].description,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        temp_min: Math.floor(data.main.temp_min),
        temp_max: Math.floor(data.main.temp_max),
        pressure: data.main.pressure,
        visibility: data.visibility / 1000,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (err) {
      setWeatherData(false);
      console.error("Failed to fetch weather data:", err);
    }
  };

  useEffect(() => {
    search("kurukshetra");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-emerald-700 flex flex-col items-center px-4 py-12">
      <h1 className="text-white text-5xl font-bold mb-3">Weather App</h1>
      <p className="text-white text-xl mb-8">
        Get current weather and forecasts for any city
      </p>

      <div className="flex items-center gap-4 mb-14 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search"
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          className="flex-grow h-14 rounded-full pl-6 text-gray-600 bg-teal-50 text-lg outline-none shadow-md"
        />
        <Icon
          icon="mdi:magnify"
          className="w-12 h-12 text-white cursor-pointer"
          onClick={() => (search(inputLocation), setInputLocation(""))}
        />
      </div>

      {weatherData && (
        <div className="w-full max-w-6xl bg-blue-400 bg-opacity-30 backdrop-blur-md px-10 pt-10 pb-6 rounded-3xl text-white shadow-xl min-h-[550px]">
          <div className="text-center mb-6">
            <h2 className="text-5xl font-bold">{weatherData.location}</h2>
            <p className="text-xl mt-4 capitalize">{weatherData.sky_desc}</p>
          </div>

          <div className="flex items-center justify-center gap-10 mb-12">
            <img
              src={weatherData.icon}
              alt={weatherData.sky_desc}
              className="w-24 h-24 drop-shadow-md"
            />

            <div className="text-left">
              <p className="text-7xl font-bold leading-tight">
                {weatherData.temperature}°
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-6">
            <div className="bg-blue-300 bg-opacity-20 rounded-xl p-4 h-32 flex flex-col justify-center">
              <p className="text-lg">Min/Max</p>
              <p className="text-3xl font-semibold">
                {weatherData.temp_min}° / {weatherData.temp_max}°
              </p>
            </div>
            <div className="bg-blue-300 bg-opacity-20 rounded-xl p-4 h-32 flex flex-col justify-center">
              <p className="text-lg">Humidity</p>
              <p className="text-3xl font-semibold">{weatherData.humidity} %</p>
            </div>
            <div className="bg-blue-300 bg-opacity-20 rounded-xl p-4 h-32 flex flex-col justify-center">
              <p className="text-lg">Wind</p>
              <p className="text-3xl font-semibold">
                {weatherData.windSpeed} m/s
              </p>
            </div>
            <div className="bg-blue-300 bg-opacity-20 rounded-xl p-4 h-32 flex flex-col justify-center">
              <p className="text-lg">Pressure</p>
              <p className="text-3xl font-semibold">
                {weatherData.pressure} hPa
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-center">
            <div className="bg-blue-300 bg-opacity-20 rounded-xl p-4 h-32 flex flex-col justify-center">
              <p className="text-lg">Visibility</p>
              <p className="text-3xl font-semibold">
                {weatherData.visibility}.0 km
              </p>
            </div>
            <div className="bg-blue-300 bg-opacity-20 rounded-xl p-4 h-32 flex flex-col justify-center">
              <p className="text-lg">Sunrise</p>
              <p className="text-3xl font-semibold">
                {new Date(weatherData.sunrise * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div className="bg-blue-300 bg-opacity-20 rounded-xl p-4 h-32 flex flex-col justify-center">
              <p className="text-lg">Sunset</p>
              <p className="text-3xl font-semibold">
                {new Date(weatherData.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
