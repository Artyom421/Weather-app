import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import '../app.css'
import { changeInputValue, getCityName, getWeatherData } from "../store/actions"

export const Input = () => {

    // const initialState = {

    //     inputValue:'',
    //     cityName:'',
    //     weatherData: ''
    // }

    // const [state, setState] = useState(initialState)
    // const {inputValue, cityName, weatherData} = state
    // console.log(state);
   
    const dispatch = useDispatch()
    const { inputValue, cityName , weatherData } = useSelector(state => state)

    useEffect( () => {
            
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=21b17ce1518a5be6b1097495053cb5eb`)
            .then(res => dispatch(getWeatherData({
                name: res.data.name,
                temperature: res.data.main.temp,
                pressure: res.data.main.pressure,
                country: res.data.sys.country,
                humidity: res.data.main.humidity,
                visibility:res.data.visibility,
                wind_deg:res.data.wind.deg,
                wind_speed:res.data.wind.speed,
                icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
                description: res.data.weather[0].description
            })))
    },[cityName])
    
    return (
        <div > 
            <form onSubmit={(e) => {
                e.preventDefault()
                dispatch(getCityName(inputValue))
                dispatch(changeInputValue(''))
            }}>
                <input placeholder="Enter the city name in here" type="text" value={inputValue} onChange={(e) => dispatch(changeInputValue(e.target.value))
        }/>
            </form>
            {
                weatherData === '' ? null :
                <div className="data">
                    <span>name: {weatherData.name}</span>
                    <span>temp: {Math.floor(weatherData.temperature)} °C</span>
                    <span>pressure: {Math.floor(weatherData.pressure * 0.750062)} mmHg</span>
                    <span>Country: {weatherData.country}</span>
                    <span>humidity: {weatherData.humidity} %</span>
                    <span>visibility: {weatherData.visibility} m</span>
                    <span>DEG: {weatherData.wind_deg} °</span>
                    <span>speed: {weatherData.wind_speed} m/s</span>
                    <span>description: {weatherData.description}</span>
                    <span>icon: <img src={weatherData.icon} alt='img'/></span>
                </div>
            }
        </div>
    )
}