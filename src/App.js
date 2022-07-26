import React, { useEffect, useState } from "react";
import coldBg from './assets/cold.jpg';
import hotBg from './assets/hot.jpg';
import Descriptions from "./components/Descriptions";
import { getWeatherData } from "./weatherService";
function App() {
  const [city, setCity] = useState('Pakistan');
  const [weather, setWeater] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bkground, setBkground] = useState(hotBg);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData(city, units);
      setWeater(data);
      //Dynamic background
      const checkbg = units === "metric" ? 20 : 60;
      if (data.temp <= checkbg) setBkground(coldBg);
      else setBkground(hotBg);
    };
    fetchData();
  }, [city, units])
  const handleUnitClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnits(isCelcius ? 'metric' : 'imperial')
  }
  const enterkeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.target.value)
    }
  }
  return (
    <div className="app" style={{ backgroundImage: ` url(${coldBg})` }}>
      <div className="overlay">
        {weather && (

          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown={enterkeyPressed} type="text" name="city" placeholder="Enter city.." />
              <button onClick={(e) => handleUnitClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="temp__desc">
                <h4>{`${weather.name},${weather.country}`}</h4>
                <img src={weather.iconURL} />
                <h4>{`${weather.description}`}</h4>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )
        }
      </div>
    </div>
  );
}

export default App;
