const API_KEY = "9f0b89bc8817a98b9b2ed11ce371b9d8";
const makeIconURL = (iconId) =>
    `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
    const data = await fetch(URL).then((response) => response.json()).then(data => data);
    const
        { weather,
            main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
            sys: { country },
            wind: { speed },
            name } = data;
    const { description, icon } = weather[0];
    return {
        description, iconURL: makeIconURL(icon), temp, temp_max, temp_min, feels_like, pressure, humidity, speed, country, name,
    };

}
export { getWeatherData };