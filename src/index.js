console.log("hello world!")

async function getWeatherData(location){
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=a11f6ec183570041115399586e272aa0`, {
        mode: 'cors'
      })
    let data = await response.json()
    return data

}

function getWeatherForcast(location){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&appid=a11f6ec183570041115399586e272aa0`, {
        mode: 'cors'
      })
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        console.log(response)
    })
}

async function getWeatherObject(){
    let weatherObject = await getWeatherData('new york');
    console.log(weatherObject)
    let dateString = convertUNIXtolocal(weatherObject.dt,weatherObject.timezone)

    let resultObject = {
        date: dateString,
        temp: weatherObject.main.temp,
        tempFeels: weatherObject.main.feels_like,
        description: weatherObject.weather[0].description,
        icon: weatherObject.weather[0].icon

    }
    console.log(resultObject)

}

let convertUNIXtolocal = function(dateCode, timezone){
    let dateObject = new Date((dateCode+timezone)* 1000)
    let dayArray = ["Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let day = dayArray[dateObject.getUTCDay()]
    let date = dateObject.getUTCDate()
    let month = monthArray[dateObject.getUTCMonth()]
    let year = dateObject.getUTCFullYear()
    let hour = dateObject.getUTCHours()
    let minutes = dateObject.getUTCMinutes() 

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

getWeatherObject()

