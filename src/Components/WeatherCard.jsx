import React, { useEffect, useState } from 'react'
import '../Styles/WeatherCard.css'

const WeatherCard = () => {

    const apiKey = "9fd023722100a4b92356b79e1587b119"
    const [searchValue, setSearchValue] = useState("lahore");
    const [info, setInfo] = useState([])
    const [weatherState, serWeatherState] = useState()
    const [temp, humidity, pressure, weathermood, speed, sunset, country] = info

    let sec = sunset;
    let date = new Date(sec + 1000)
    let timeStr = `${date.getHours()}:${date.getMinutes()}`

    useEffect(() => {
        if (weathermood) {
            switch (weathermood) {
                case "Clouds":
                    serWeatherState('wi-cloudy')
                    break;
                case "Clear":
                    serWeatherState('wi-stars')
                    break;
                case "Haze":
                    serWeatherState('wi-fog')
                    break;
                case "Mist":
                    serWeatherState('wi-day-cloudy')
                    break;
                case "Rain":
                    serWeatherState('wi-rain')
                    break;
                case "snow":
                    serWeatherState('wi-snow')
                    break;
                case "Smoke":
                    serWeatherState('wi-smoke')
                    break;
                default:
                    serWeatherState('wi-stars')
                    break;
            }
        }
    }, [weathermood])

    const fetchWeatherinfo = async () => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`)
            const data = await res.json()

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { speed } = data.wind;
            const { sunset, country } = data.sys;

            const myWeatherInfo = [
                temp, humidity, pressure, weathermood, speed, sunset, country
            ];

            setInfo(myWeatherInfo);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchWeatherinfo()

    }, [])

    return (

        <div className="wrapper">
            <div className="search_section">
                <input type="search" placeholder='Search' className='search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button className="srch_btn" onClick={fetchWeatherinfo}>Search</button>
            </div>
            <div className="weather_card">
                <div className="weather_icon">
                    <i className={`wi ${weatherState}`}></i>
                </div>
                <div className="weather_details">
                    <div className="temp">{temp}°
                        C</div>
                    <div className="mood">
                        <div className="weather_mood">{weathermood}</div>
                        <div className="country">{searchValue},{country}</div>
                    </div>
                    <div className="date">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="extras">
                    <div className="sunset">
                        <div className="icon"><i className="fa-regular fa-sun fa-2xl"></i></div>
                        <div className="details">
                            <div className="time">{timeStr} PM</div>
                            <h5 className="heading">Sunset</h5>
                        </div>
                    </div>

                    <div className="humidity">
                        <div className="icon"><i className="fa-solid fa-droplet fa-2xl"></i></div>
                        <div className="details">
                            <div className="time">{humidity}</div>
                            <h5 className="heading">Humidity</h5>
                        </div>
                    </div>

                    <div className="pressure">
                        <div className="icon"><i className="fa-solid fa-cloud fa-2xl"></i></div>
                        <div className="details">
                            <div className="time">{pressure}</div>
                            <h5 className="heading">Pressure</h5>
                        </div>
                    </div>

                    <div className="speed">
                        <div className="icon"><i className="fa-solid fa-gauge fa-2xl"></i></div>
                        <div className="details">
                            <div className="time">{speed}</div>
                            <h5 className="heading">Speed</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard