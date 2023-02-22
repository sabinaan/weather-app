
let convertTime = function(dateCode, timezone){
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

export {convertTime, tempInC, tempInF}