import "./Nav.css";
import { useState, useEffect } from "react";

const Nav = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [cityWeather, setCityWeather] = useState();
  const [gotData, setGotData] = useState("Bielefeld");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&lang=de&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((weatherData) => {
        setCityWeather(weatherData);
      })
      .catch((error) => {
        console.log("Fehler beim laden", error);
      });
  }, [gotData]);

  const getWeatherData = (e) => {
    setCityWeather(e.target.value);
    setGotData(e.target.value);
  };

  return (
    <nav>
      <input
        className="btn"
        type="button"
        value="Berlin"
        onClick={getWeatherData}
      />
      <input
        className="btn"
        type="button"
        value="Düsseldorf"
        onClick={getWeatherData}
      />
      <input
        className="btn"
        type="button"
        value="Köln"
        onClick={getWeatherData}
      />
      <input
        className="btn"
        type="button"
        value="Hamburg"
        onClick={getWeatherData}
      />

      {cityWeather ? (
        <section className="weather-data">
          <p>{cityWeather.name}</p>
          {cityWeather.main ? (
            <section className="temp-data">
              <p>Aktuelle Temperatur: {cityWeather.main.temp} °C</p>
              <p>Min Temperatur: {cityWeather.main.temp_min} °C</p>
              <p>Max Temperatur: {cityWeather.main.temp_max} °C</p>
            </section>
          ) : null}
          {cityWeather.wind ? (
            <section className="wind-data">
              <p>Wind Geschwindigkeit: {cityWeather.wind.speed} m/s</p>
            </section>
          ) : null}
          {cityWeather.weather ? (
            <section className="cloud-data">
              <p>{cityWeather.weather[0].description}</p>
            </section>
          ) : null}
          {cityWeather.weather ? (
            <div
              className="icon-data"
              style={{
                backgroundImage: `url(http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png)`,
              }}
            ></div>
          ) : null}
        </section>
      ) : (
        <p>Daten werden geladen ...</p>
      )}
    </nav>
  );
};

export default Nav;
