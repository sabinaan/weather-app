
async function getWeatherData(location){
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=a11f6ec183570041115399586e272aa0`, {
        mode: 'cors'
      })
    let data = await response.json()
    return data

}

async function getWeatherObject(location){
    let weatherObject = await getWeatherData(location);
    console.log(weatherObject)
    let dateString = convertUNIXtolocal(weatherObject.dt,weatherObject.timezone)

    let resultObject = {
        location: weatherObject.name,
        date: dateString,
        temp: weatherObject.main.temp,
        tempFeels: weatherObject.main.feels_like,
        description: weatherObject.weather[0].description,
        icon: weatherObject.weather[0].icon

    }
    return resultObject

}

async function showWeatherData(location,unit){
    let weatherObject = await getWeatherObject(location)
    let feels
    let temp

    if (unit == "C"){
        temp = tempInC(weatherObject.temp) + "°C"
        feels = tempInC(weatherObject.tempFeels) + "°C"
    } else {
        temp = tempInF(weatherObject.temp) + "°F"
        feels = tempInF(weatherObject.tempFeels) + "°F"
    }

    document.querySelector("#location").innerHTML = weatherObject.location
    document.querySelector("#time").innerHTML = weatherObject.date
    document.querySelector("#temp").innerHTML = temp
    document.querySelector("#description").innerHTML = weatherObject.description
    document.querySelector("#feels").innerHTML = "feels like " + feels
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + weatherObject.icon + "@2x.png"

}


let convertUNIXtolocal = function(dateCode, timezone){
    let dateObject = new Date((dateCode+timezone)* 1000)
    let dayArray = ["Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let day = dayArray[dateObject.getUTCDay()]
    let date = dateObject.getUTCDate()
    let month = monthArray[dateObject.getUTCMonth()]
    let year = dateObject.getUTCFullYear()
    let hour = dateObject.getUTCHours().toString().padStart(2,"0")
    let minutes = dateObject.getUTCMinutes().toString().padStart(2,"0")

    let dateString = `${day}, ${date} ${month} ${year}, ${hour}:${minutes}`
    return dateString
}

let tempInC = function(kelvinTemp){
    let celsiusTemp = Math.round(kelvinTemp - 273.15)
    return celsiusTemp
}

let tempInF = function(kelvinTemp){
    let farenheit = Math.round(1.8*(kelvinTemp-273)+32)
    return farenheit
}

showWeatherData("södertälje","C")

