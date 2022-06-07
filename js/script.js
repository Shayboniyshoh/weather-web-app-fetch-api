const app = document.querySelector('.weather_app')
const temp = document.querySelector('.temp');
const city_name = document.querySelector('.city_name');
const city_time = document.querySelector('.city_time');
const city_date = document.querySelector('.city_date');
const icon = document.querySelector('.icon');
const weather_condition = document.querySelector('.weather_condition');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const form = document.getElementById('search_city');
const search = document.querySelector('.search')
const submit = document.querySelector('.submit')
const city_item = document.querySelectorAll('.city_item')

let cityInput = 'London';

city_item.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = '0';
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.length == 0) {
        alert('Please, write the city name you want to know the weather!')
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = '';
        app.style.opacity = '0';
    }
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key={There should be your own key}&q=${cityInput}`)
        .then(res => res.json())
        .then(data => {
            temp.innerHTML = data.current.temp_c + '&#176';
            weather_condition.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const h = parseInt(date.substring(date.length - 5));
            const min = parseInt(date.substring(date.length - 2));
            city_date.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
            city_time.innerHTML = `${h}:${min}`;
            city_name.innerHTML = data.location.name;
            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            // icon.src = data.current.condition.icon;
            icon.src = "../assets/icons/" + iconId;
            cloud.innerHTML = data.current.cloud + " %";
            humidity.innerHTML = data.current.humidity + " %";
            wind.innerHTML = data.current.wind_kph + " km/h"

            let timeOfDay = "day";
            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";
            }
            if (code == 1000) {
                app.style.backgroundImage = `url("../assets/images/${timeOfDay}/clear.jpg")`;
                submit.style.background = "#333";
                if (timeOfDay == "night") {
                    submit.style.background = "#181e27";
                }
            } else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url("../assets/images/${timeOfDay}/cloudy.jpg")`;
                submit.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    submit.style.background = "#181e27";
                }
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url("../assets/images/${timeOfDay}/rainy.jpg")`;
                submit.style.background = "#647d75";
                if (timeOfDay == "night") {
                    submit.style.background = "#325c80";
                }
            } else {
                app.style.backgroundImage = `url("../assets/images/${timeOfDay}/snowy.jpg")`;
                submit.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    submit.style.background = "#1b1b1b";
                }
            }
            app.style.opacity = "1";
        })
        .catch(() => {
            alert('City not found, please try again!');
            app.style.opacity = "1";
        });
}
fetchWeatherData();
app.style.opacity = "1";