import {showWeatherData, showErrorMsg, hideErrorMsg} from "./DOMfunctions"
import {convertTime, tempInC, tempInF} from "./util"


async function showWeather(location, unit){

    try{
        //Fetch weather data
        let dataObject = await getWeatherData(location)
        if(dataObject.cod == 200){
            //Process data into an object with the information we need
            let weatherObject = await getWeatherObject(dataObject)
            //Add the weather data to the page
            showWeatherData(weatherObject, unit)
            hideErrorMsg()
        }else{
            showErrorMsg(dataObject, location)
        }

    }catch(err){
            console.log(err)

    }

}


async function getWeatherData(location){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=a11f6ec183570041115399586e272aa0`, {
        mode: 'cors'
        })
    let data = await response.json()
    return data
}

async function getWeatherObject(weatherObject){
    
    let dateString = convertTime(weatherObject.dt ,weatherObject.timezone)

    let resultObject = {
        location: weatherObject.name,
        date: dateString,
        tempC: tempInC(weatherObject.main.temp),
        feelsC: tempInC(weatherObject.main.feels_like),
        tempF: tempInF(weatherObject.main.temp),
        feelsF: tempInF(weatherObject.main.feels_like),
        description: weatherObject.weather[0].description,
        icon: weatherObject.weather[0].icon

    }
    return resultObject

}

export {showWeather}
