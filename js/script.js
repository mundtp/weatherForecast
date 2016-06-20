
var Api = '1b44e35547d7aedc130917d95a86575f'
var baseUrl ='https://api.forecast.io/forecast/'
var degree = '°'
var degreeF = degree.substr(1)

var containerNode = document.querySelector(".container")
var buttonContainerNode = document.querySelector("#nav-buttons")
var bodyNode = document.querySelector("body")
var inputNode = document.querySelector("#inputBox")
var selectedCityNode = document.querySelector(".selectedCity")


var cities = {}
	cities['New York'] = "40.7128/74.0059"
	cities['la'] = "1,1"

var date = new Date(),
	day = date.getDay(),
	hour = date.getHours()
var daysOfWeek = {
		0: "Sunday",
		1: "Monday",
		2: "Tuesday",
		3: "Wednesday",
		4: "Thursday",
		5: "Friday",
		6: "Saturday",
		7: "Sunday",
		8: "Monday",
		9: "Tuesday",
		10: "Wednesday",
		11: "Thursday",
		12: "Friday",
		13: "Saturday",
	}
var controller = function (){
	var hashRoute = location.hash.substr(1)
	if(!hashRoute){
		var locationReader = function(geoPos){
		location.hash = geoPos.coords.latitude + "/" + geoPos.coords.longitude + "/current"
		}

		navigator.geolocation.getCurrentPosition(locationReader)
	}
	
	var hashParts = hashRoute.split('/')
	var	lat = hashParts [0],
		long = hashParts[1],
		viewType = hashParts[2],
		urlWeather = baseUrl + Api + "/" + lat + "," + long
	 

	 // Define Promise and Initialize New API Requests to Dark sky 

	var promiseWeather = $.getJSON(urlWeather)
	if (viewType === 'current'){
		promiseWeather.then(renderCurrentForecast)
	}
	else if (viewType === 'hourly'){
		promiseWeather.then(renderHourlyForecast)
	}
	else if (viewType === 'daily'){
		promiseWeather.then(renderDailyForecast)
	}
		
}

var renderCurrentForecast = function(weatherObj){
	console.log(weatherObj)

	var htmlString = ''
	var forecastViewType = weatherObj.currently.summary,
		timezone = weatherObj.timezone,
		latitude = weatherObj.latitude,
		longitude = weatherObj.longitude

	htmlString += '<p class="details"> Latitude: ' + latitude.toFixed(1) + ', Longitude: ' + longitude.toFixed(1) + ", Timezone: " + timezone + '</p>';

	htmlString += '<p class="forecastViewType"> Current Weather: ' + weatherObj.currently.temperature.toFixed(0) + degreeF + ", " + forecastViewType + '</p>'
	if (weatherObj.currently.icon === "partly-cloudy-day"){
		htmlString += '<img src="http://aaj.tv/wp-content/uploads/2015/10/partly-cloudy.jpg">'
	}
	else if (weatherObj.currently.icon === "clear-day"){
		htmlString += '<img src="http://i.huffpost.com/gen/1872152/images/o-BRIGHT-SUN-facebook.jpg">'
	}
	else if (weatherObj.currently.icon === "clear-night"){
		htmlString += '<img src="https://snapshotsbykats.files.wordpress.com/2011/11/020.jpg">'
	}
	else if (weatherObj.currently.icon === "rain"){
		htmlString += '<img src="http://turnaroundtour.com/wp-content/uploads/rainjpeg.jpg">'
	}
	else if (weatherObj.currently.icon === "snow"){
		htmlString += '<img src="https://wallpaperscraft.com/image/background_glass_point_snowfall_imagination_36833_1920x1200.jpg">'
	}
	else if (weatherObj.currently.icon === "sleet"){
		htmlString += '<img src="https://valria.files.wordpress.com/2010/12/img00254-20101230-0808.jpg">'
	}
	else if (weatherObj.currently.icon === "wind"){
		htmlString += '<img src="http://roadtreking.com/wp-content/uploads/2014/04/wind.jpg">'
	}
	else if (weatherObj.currently.icon === "fog"){
		htmlString += '<img src="http://globe-views.com/dcim/dreams/fog/fog-03.jpg">'
	}
	else if (weatherObj.currently.icon === "cloudy"){
		htmlString += '<img src="https://c1.staticflickr.com/7/6023/5975465375_9c089b6085_b.jpg">'
	}
	else if (weatherObj.currently.icon === "partly-cloudy-night"){
		htmlString += '<img src="http://cdn.weatheravenue.com/img/background/background-night.jpg">'
	}

	containerNode.innerHTML = htmlString
	// s: clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night. (De

}
var renderHourlyForecast = function(weatherObj){
	console.log(weatherObj)
	var htmlString = ''
	var forecastViewType = weatherObj.hourly.summary,
		timezone = weatherObj.timezone,
		latitude = weatherObj.latitude,
		longitude = weatherObj.longitude

	htmlString += '<p class="details"> Latitude: ' + latitude.toFixed(1) + ', Longitude: ' + longitude.toFixed(1) + ", Timezone: " + timezone + '</p>';

	htmlString += '<p class="forecastViewType"> Hourly Forecast: ' + forecastViewType + '</p>'
	containerNode.innerHTML = htmlString

	for(var i = 0; i < 48; i++){

		htmlString += '<div class=hourCard><p class="hour">' + (hour + i) % 24 + ':00</p>'+ '<p class="temp">' + weatherObj.hourly.data[i].temperature.toFixed(0) + degreeF + '</p> ' + '<p class="precipProb"><font size = 1pt>%Rain: </font>' + (weatherObj.hourly.data[i].precipProbability * 100).toFixed(0) + '%</p>' + '<p class="hourSummary">' + weatherObj.hourly.data[i].summary + '</p></div>'	
	}

	containerNode.innerHTML = htmlString
}

var renderDailyForecast = function(weatherObj){
	console.log(weatherObj)
	var htmlString = ''
	var forecastViewType = weatherObj.daily.summary,
		timezone = weatherObj.timezone,
		latitude = weatherObj.latitude,
		longitude = weatherObj.longitude

	htmlString += '<p class="details"> Latitude: ' + latitude.toFixed(1) + ', Longitude: ' + longitude.toFixed(1) + ", Timezone: " + timezone + '</p>';

	htmlString += '<p class="forecastViewType"> Daily Forecast: ' + forecastViewType + '</p>'

	for(var i = 0; i < 8; i++){

		htmlString += '<div class=dayCard><p class="day">' + daysOfWeek[day + i].substr(0,3) + '</p>'+ '<p class="high"><font size = 1pt>High: </font>' + weatherObj.daily.data[i].temperatureMax.toFixed(0) + degreeF + '</p> ' + '<p class="low"><font size = 1pt>Low: </font>' + weatherObj.daily.data[i].temperatureMin.toFixed(0) + degreeF + '</p>' + '<p class="precipProb"><font size = 1pt>%Rain: </font>' + (weatherObj.daily.data[i].precipProbability * 100).toFixed(0) + '%</p>'+ '<p class="daySummary">' + weatherObj.daily.data[i].summary + '</p></div>'
	}


	containerNode.innerHTML = htmlString
}
   
   var changeHash = function (eventObj){
   	var updatedHash = eventObj.target.id
   	var hashRoute = location.hash.substr(1)
	var hashParts = hashRoute.split('/')
	var	lat = hashParts[0],
		long = hashParts[1]
   	location.hash = lat + "/" + long + "/" + updatedHash
   }





var userSearch = function(eventObj) {
	var googleApi = 'AIzaSyC8WtzWw9giW8mJYOT6-xuSPOYmSrYr-FM'

    if (eventObj.keyCode === 13) {
        
        //Extract User Input
        var inputElement = eventObj.target
        var inputValue = inputElement.value
        var promiseGeoLookup = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + inputValue + '&key=' + googleApi)
        promiseGeoLookup.then(getLatLong)

        


	     //Clear the search box
        inputElement.value = ''
    }
}

var getLatLong = function(apiResponse){
console.log(apiResponse)
			location.hash = apiResponse.results[0].geometry.location.lat + "/" + apiResponse.results[0].geometry.location.lng + "/current"
			selectedCityNode.innerHTML = apiResponse.results[0].formatted_address

		}


buttonContainerNode.addEventListener('click', changeHash)

window.addEventListener('hashchange',controller)
controller()

inputNode.addEventListener("keydown", userSearch) 