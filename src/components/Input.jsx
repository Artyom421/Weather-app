import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

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
            if ( cityName) {
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
            }
            else {
                return null
            }
    },[cityName])
    
    return (
        <div className="parent"> 
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
                    <span className="name">
                        {weatherData.name}
                        <span className="country">{weatherData.country}</span>
                    </span>
                    <span className="temp">{Math.floor(weatherData.temperature)} <span className="cels">°C</span></span>
                    
                    <span><img src={weatherData.icon} alt='img'/></span>
                    <span>{weatherData.description}</span>
                    <div className="another">
                        <div>
                            <p>PRESSURE: {Math.floor(weatherData.pressure * 0.750062)} mmHg</p>
                            <p>HUMIDITY: {weatherData.humidity} %</p>
                            <p>VISIBILITY: {weatherData.visibility} m</p>
                        </div>
                        <div>
                            <p>WIND DEG: {weatherData.wind_deg} °</p>
                            <p>WIND SPEED: {weatherData.wind_speed} m/s</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}