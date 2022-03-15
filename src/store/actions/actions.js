export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE'
export const GET_CITY_NAME = 'GET_CITY_NAME'
export const GET_WEATHER_DATA = 'GET_WEATHER_DATA'

export const changeInputValue = ( payload ) => {
    return { type:CHANGE_INPUT_VALUE, payload}
}

export const getCityName = ( payload ) => {
    return { type:GET_CITY_NAME, payload}
}

export const getWeatherData = ( payload ) => {
    return { type:GET_WEATHER_DATA, payload}
}