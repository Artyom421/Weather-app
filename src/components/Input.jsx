import axios from "axios"
import { useState , useEffect } from "react"

import '../app.css'

export const Input = () => {

    const [inputValue, setInputValue] = useState('')
    const [cityName, setCityName] = useState('')
    const [weatherData, setWeatherData] = useState({})

    // const changeName = (value) => {
    //     if(value === '' ) {
    //         alert('hhhhhhhhhhhh')
    //     }
    //     else {
    //         setCityName(value)
    //     }
    // }
    // console.log(cityName);

    // const search = async (value) => {
    //     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=21b17ce1518a5be6b1097495053cb5eb`)
    //     .then(res => setWeatherData(res.data))
    //     console.log(weatherData);
    // }
    useEffect(
        async () => {
            
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=21b17ce1518a5be6b1097495053cb5eb`)
            .then(res => {
                
                setWeatherData(
                    {
                        name: res.data.name,
                        temperature: res.data.main.temp,
                        pressure: res.data.main.pressure,
                        country: res.data.sys.country,
                        humidity: res.data.main.humidity,
                        visibility:res.data.visibility,
                        wind_deg:res.data.wind.deg,
                        wind_speed:res.data.wind.speed,
                        icon: ` http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
                        description: res.data.weather[0].description
                    }
                )
                console.log(res.data)
            })
            

    },[cityName])
    
    return (
        <div > 
            <form onSubmit={(e) => {
                e.preventDefault()
                setCityName(inputValue)
                setInputValue('')
            }}>
                <input type="text" value={inputValue} onChange={(e) =>setInputValue(e.target.value)}/>
            </form>
            <div className="data">
                <span>name: {weatherData.name}</span>
                <span>temp: {weatherData.temperature} °C</span>
                <span>pressure: {weatherData.pressure} gPa</span>
                <span>Country: {weatherData.country}</span>
                <span>humidity: {weatherData.humidity} %</span>
                <span>visibility: {weatherData.visibility} m</span>
                <span>DEG: {weatherData.wind_deg} °</span>
                <span>speed: {weatherData.wind_speed} m/s</span>
                <span>description: {weatherData.description}</span>
                <span>icon: <img src={weatherData.icon} /></span>
                
            </div>
        </div>
    )
}