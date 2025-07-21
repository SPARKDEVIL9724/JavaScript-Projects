// const city = navigator.geolocation.getCurrentPosition((sucess callback) => {},(error callback) => {});

const currentLocationBtn = document.querySelector('.get-current-location');
const cityLocationBtn = document.querySelector('.city-location');
const cityInput = document.querySelector('.input-city');
const humdity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windspeed');
const pressure = document.querySelector('.pressure');
const cloudCoverage = document.querySelector('.cloud-coverage');
const precipitation = document.querySelector('.precipitation');
const temperature = document.querySelector('.temperature');
const date = document.querySelector('h3');

function day(date){
    const d = date.getDay();
    switch(d){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}

function changeForecast(data){
    temperature.innerText = `${data.current.temp_c}\u00B0C`;
    windSpeed.innerText = `${data.current.wind_dir} ${data.current.wind_kph}km/h`;
    precipitation.innerText = `${data.current.precip_mm} mm`;
    cloudCoverage.innerText = `${data.current.cloud} %`;
    pressure.innerText = `${data.current.pressure_mb} millibars`;
    humdity.innerText = `${data.current.humidity} %`;
}


async function getWeatherForLocation(lat,long){
    const weather = `http://api.weatherapi.com/v1/current.json?key=3545a9f83dc245009ae100949251907&q=${lat},${long}&aqi=no`
    promise = await fetch(weather);
    const weatherData = await promise.json();
    changeForecast(weatherData);
    return weatherData;
}

async function getWeatherForCity(city){
    const weather = `http://api.weatherapi.com/v1/current.json?key=3545a9f83dc245009ae100949251907&q=${city}&aqi=no`
    promise = await fetch(weather);
    if(promise.status !== 200){
        alert('City Undefined');
    }
    else{
        const weatherData = await promise.json();
        changeForecast(weatherData);
    }
    return weatherData;
}
const d = new Date;
date.innerText = `Date: ${day(d)} ${d.getDate()}/${d.getMonth() +1}/${d.getFullYear()} `;

currentLocationBtn.addEventListener('click', () => {
    const location = navigator.geolocation.getCurrentPosition((position) => {
        const weather = getWeatherForLocation(position.coords.latitude,position.coords.longitude);
        cityInput.value = 'Current Location';
    },
    () => {
        alert('Couldnot get current location');
    });
});

cityLocationBtn.addEventListener('click', () => {
    const location = cityInput.value;
    const weather = getWeatherForCity(location);
    cityInput.value = '';
});
