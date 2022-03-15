import { useSelector } from "react-redux"

export const CityList = () => {

    const { weatherData } = useSelector(state => state)

    return ( 
        <div>
            <span>{weatherData.name}</span>
        </div>
    )
}