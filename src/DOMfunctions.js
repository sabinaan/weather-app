import {showWeather} from "./APIfunctions"

let cArray = document.querySelectorAll(".tempC")
let fArray = document.querySelectorAll(".tempF")
let toggleTempBtn = document.querySelector("#toggleTemp")

let currentTemp


const errorMsg = document.querySelector("#error-msg")

function showWeatherData(weatherObject,unit = currentTemp){

    showUnit(unit)

    document.querySelector("#location").innerHTML = weatherObject.location
    document.querySelector("#time").innerHTML = weatherObject.date
    document.querySelector("#tempC").innerHTML = weatherObject.tempC + "°C"
    document.querySelector("#feelsC").innerHTML = "feels like " + weatherObject.feelsC + "°C" 
    document.querySelector("#tempF").innerHTML = weatherObject.tempF + "°F"
    document.querySelector("#feelsF").innerHTML = "feels like " + weatherObject.feelsF + "°F"
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + weatherObject.icon + "@2x.png"
    document.querySelector("#description").innerHTML = weatherObject.description

}

let showUnit = function(unit){
    console.log(unit)
    if (unit == "C"){
        cArray.forEach(element => {
            element.style.display = "block"
        });
    
        fArray.forEach(element => {
            element.style.display = "none"
        });
        currentTemp = "C"
        toggleTempBtn.innerHTML = "Display °F"
     } else
     if (unit == "F") {
        cArray.forEach(element => {
            element.style.display = "none"
        });
    
        fArray.forEach(element => {
            element.style.display = "block"
        });
        currentTemp = "F"
        toggleTempBtn.innerHTML = "Display °C"
     }
}


let showErrorMsg = function(request, city){
    errorMsg.innerHTML = "There was an error accessing the weather data for " +  city + ": " + request.cod +": "+ request.message
    errorMsg.style.visibility = "visible"
}

let hideErrorMsg = function(){
    errorMsg.innerHTML = ""
    errorMsg.style.visibility = "hidden"
}

//Eventlistener for the form submission
document.querySelector("#search-form").addEventListener("submit",(e) => {
    e.preventDefault()
    let searchValue = document.querySelector("#search-input").value
    if (searchValue){
        showWeather(searchValue)
    }
    
})

document.querySelector("#toggleTemp").addEventListener("click", () =>{
    if( currentTemp == "C") {
        showUnit("F")
    }else{
        showUnit("C")
    }
})




export {showWeatherData, showErrorMsg, hideErrorMsg}