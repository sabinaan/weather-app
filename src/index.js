const errorMsg = document.querySelector("#error-msg")

async function showWeather(location, unit){

    try{
        //Fetch weather data and makes it readable
        let dataObject = await getWeatherData(location)
        if(dataObject.cod == 200){
            //Process data into an object with the information we need
            let weatherObject = await getWeatherObject(dataObject)
            //Display weather data in the DOM
            showWeatherData(weatherObject, unit)
            //Everything is well hide error msg
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

function showWeatherData(weatherObject,unit){

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

//Eventlistener for the form submission
document.querySelector("#search-form").addEventListener("submit",(e) => {
    e.preventDefault()
    let searchValue = document.querySelector("#search-input").value
    if (searchValue){
        showWeather(searchValue,"C")
    }
    
})

let showErrorMsg = function(request, city){
    errorMsg.innerHTML = "There was an error accessing the weather data for " +  city + ": " + request.cod +": "+ request.message
    errorMsg.style.visibility = "visible"
}

let hideErrorMsg = function(){
    errorMsg.innerHTML = ""
    errorMsg.style.visibility = "hidden"
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

showWeather("södertälje","C")

