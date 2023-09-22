/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/APIfunctions.js":
/*!*****************************!*\
  !*** ./src/APIfunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showWeather\": () => (/* binding */ showWeather)\n/* harmony export */ });\n/* harmony import */ var _DOMfunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMfunctions */ \"./src/DOMfunctions.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\n\n\nasync function showWeather(location, unit){\n\n    try{\n        //Fetch weather data\n        let dataObject = await getWeatherData(location)\n        if(dataObject.cod == 200){\n            //Process data into an object with the information we need\n            let weatherObject = await getWeatherObject(dataObject)\n            //Add the weather data to the page\n            ;(0,_DOMfunctions__WEBPACK_IMPORTED_MODULE_0__.showWeatherData)(weatherObject, unit)\n            ;(0,_DOMfunctions__WEBPACK_IMPORTED_MODULE_0__.hideErrorMsg)()\n        }else{\n            (0,_DOMfunctions__WEBPACK_IMPORTED_MODULE_0__.showErrorMsg)(dataObject, location)\n        }\n\n    }catch(err){\n            console.log(err)\n\n    }\n\n}\n\n\nasync function getWeatherData(location){\n    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=a11f6ec183570041115399586e272aa0`, {\n        mode: 'cors'\n        })\n    let data = await response.json()\n    return data\n}\n\nasync function getWeatherObject(weatherObject){\n    \n    let dateString = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertTime)(weatherObject.dt ,weatherObject.timezone)\n\n    let resultObject = {\n        location: weatherObject.name,\n        date: dateString,\n        tempC: (0,_util__WEBPACK_IMPORTED_MODULE_1__.tempInC)(weatherObject.main.temp),\n        feelsC: (0,_util__WEBPACK_IMPORTED_MODULE_1__.tempInC)(weatherObject.main.feels_like),\n        tempF: (0,_util__WEBPACK_IMPORTED_MODULE_1__.tempInF)(weatherObject.main.temp),\n        feelsF: (0,_util__WEBPACK_IMPORTED_MODULE_1__.tempInF)(weatherObject.main.feels_like),\n        description: weatherObject.weather[0].description,\n        icon: weatherObject.weather[0].icon\n\n    }\n    return resultObject\n\n}\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/APIfunctions.js?");

/***/ }),

/***/ "./src/DOMfunctions.js":
/*!*****************************!*\
  !*** ./src/DOMfunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"hideErrorMsg\": () => (/* binding */ hideErrorMsg),\n/* harmony export */   \"showErrorMsg\": () => (/* binding */ showErrorMsg),\n/* harmony export */   \"showWeatherData\": () => (/* binding */ showWeatherData)\n/* harmony export */ });\n/* harmony import */ var _APIfunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIfunctions */ \"./src/APIfunctions.js\");\n\n\nlet cArray = document.querySelectorAll(\".tempC\")\nlet fArray = document.querySelectorAll(\".tempF\")\nlet toggleTempBtn = document.querySelector(\"#toggleTemp\")\n\nlet currentTemp\n\n\nconst errorMsg = document.querySelector(\"#error-msg\")\n\nfunction showWeatherData(weatherObject,unit = currentTemp){\n\n    showUnit(unit)\n\n    document.querySelector(\"#location\").innerHTML = weatherObject.location\n    document.querySelector(\"#time\").innerHTML = weatherObject.date\n    document.querySelector(\"#tempC\").innerHTML = weatherObject.tempC + \"°C\"\n    document.querySelector(\"#feelsC\").innerHTML = \"feels like \" + weatherObject.feelsC + \"°C\" \n    document.querySelector(\"#tempF\").innerHTML = weatherObject.tempF + \"°F\"\n    document.querySelector(\"#feelsF\").innerHTML = \"feels like \" + weatherObject.feelsF + \"°F\"\n    document.querySelector(\"#icon\").src = \"http://openweathermap.org/img/wn/\" + weatherObject.icon + \"@2x.png\"\n    document.querySelector(\"#description\").innerHTML = weatherObject.description\n\n}\n\nlet showUnit = function(unit){\n    console.log(unit)\n    if (unit == \"C\"){\n        cArray.forEach(element => {\n            element.style.display = \"block\"\n        });\n    \n        fArray.forEach(element => {\n            element.style.display = \"none\"\n        });\n        currentTemp = \"C\"\n        toggleTempBtn.innerHTML = \"Display °F\"\n     } else\n     if (unit == \"F\") {\n        cArray.forEach(element => {\n            element.style.display = \"none\"\n        });\n    \n        fArray.forEach(element => {\n            element.style.display = \"block\"\n        });\n        currentTemp = \"F\"\n        toggleTempBtn.innerHTML = \"Display °C\"\n     }\n}\n\n\nlet showErrorMsg = function(request, city){\n    errorMsg.innerHTML = \"There was an error accessing the weather data for \" +  city + \": \" + request.cod +\": \"+ request.message\n    errorMsg.style.visibility = \"visible\"\n}\n\nlet hideErrorMsg = function(){\n    errorMsg.innerHTML = \"\"\n    errorMsg.style.visibility = \"hidden\"\n}\n\n//Eventlistener for the form submission\ndocument.querySelector(\"#search-form\").addEventListener(\"submit\",(e) => {\n    e.preventDefault()\n    let searchValue = document.querySelector(\"#search-input\").value\n    if (searchValue){\n        (0,_APIfunctions__WEBPACK_IMPORTED_MODULE_0__.showWeather)(searchValue)\n    }\n    \n})\n\ndocument.querySelector(\"#toggleTemp\").addEventListener(\"click\", () =>{\n    if( currentTemp == \"C\") {\n        showUnit(\"F\")\n    }else{\n        showUnit(\"C\")\n    }\n})\n\n\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/DOMfunctions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _APIfunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIfunctions */ \"./src/APIfunctions.js\");\n\n\n\n(0,_APIfunctions__WEBPACK_IMPORTED_MODULE_0__.showWeather)(\"stockholm\",\"C\")\n\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertTime\": () => (/* binding */ convertTime),\n/* harmony export */   \"tempInC\": () => (/* binding */ tempInC),\n/* harmony export */   \"tempInF\": () => (/* binding */ tempInF)\n/* harmony export */ });\n\nlet convertTime = function(dateCode, timezone){\n    let dateObject = new Date((dateCode+timezone)* 1000)\n    let dayArray = [\"Sunday\", \"Monday\", \"Thusday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"]\n    let monthArray = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"]\n    let day = dayArray[dateObject.getUTCDay()]\n    let date = dateObject.getUTCDate()\n    let month = monthArray[dateObject.getUTCMonth()]\n    let year = dateObject.getUTCFullYear()\n    let hour = dateObject.getUTCHours().toString().padStart(2,\"0\")\n    let minutes = dateObject.getUTCMinutes().toString().padStart(2,\"0\")\n\n    let dateString = `${day}, ${date} ${month} ${year}, ${hour}:${minutes}`\n    return dateString\n}\n\nlet tempInC = function(kelvinTemp){\n    let celsiusTemp = Math.round(kelvinTemp - 273.15)\n    return celsiusTemp\n}\n\nlet tempInF = function(kelvinTemp){\n    let farenheit = Math.round(1.8*(kelvinTemp-273)+32)\n    return farenheit\n}\n\n\n\n//# sourceURL=webpack://weather-app/./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;