import { CHANGE_INPUT_VALUE, GET_CITY_NAME, GET_WEATHER_DATA } from "../actions";
  
const initialState = {
    inputValue: '',
    cityName: '',
    weatherData: ''
}



export const Reducer = ( state = initialState, action ) => {

    switch( action.type ){
        case CHANGE_INPUT_VALUE:
            return{...state, inputValue:action.payload}
        case GET_CITY_NAME:
            return{...state, cityName:action.payload}
        case GET_WEATHER_DATA:
            return{...state, weatherData:action.payload}
        default: 
            return state;
    } 
}