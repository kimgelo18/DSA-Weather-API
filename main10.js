//Create constant variable for elements of DOM
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const currentWeatherItemsElement = document.getElementById('currentWeatherInfo');
const timezone = document.getElementById('timeZone');
const countryElement = document.getElementById('country');
const weatherForecastElement = document.getElementById('futureForecast');
const currentTempElement = document.getElementById('currentTemp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='08772bbe3dcda2e280a6131c40a43232';


setInterval(() => {
    //function DATE() returns current date and time
    const time = new Date();
    //method that returns the month (0 to 11) of a date
    const month = time.getMonth();
    //method that returns the day of the month (1 to 31) of a date.
    const date = time.getDate();
    //method that returns the day of the week (0 to 6) of a date.
    const day = time.getDay();
    //returns the hour (0 to 23) of a date.
    const hour = time.getHours();
    //convert hours to 12hour format
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    //returns the minutes (0 to 59) of a date.
    const minutes = time.getMinutes();
    //convert time to am pm in javascript
    const ampm = hour >=12 ? 'PM' : 'AM'
    //change the content of an HTML element timeEl
    timeElement.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    //change the content of an HTML element dateEl
    dateElement.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);


getWeatherData()
function getWeatherData () {
    
//Fetch data and add London longitude and latitude with template literals
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=51.500153&lon=-0.1262362&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
//Take data(JSON format) and convert to regular JS object        
        .then(res => res.json()).then(data => {
//console log the data to see what is available
        console.log(data)
        showWeatherData(data);
        

    })
}


//Function that fetches and displays data from weather API
function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryElement.innerHTML = data.lat + 'N ' + data.lon+'E' ;

    currentWeatherItemsElement.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>`;

   
    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempElement.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForecast += `
            <div class="futureForecastItem">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastElement.innerHTML = otherDayForecast;
}
