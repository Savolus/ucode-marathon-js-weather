const API = 'https://api.openweathermap.org/data/2.5/onecall?lat=50.0095171&lon=36.31866&exclude=current,minutely,hourly,alerts&appid=590712bd89e28a4060c0dc832557d1a5'

const parseWeather = async () => {
    const response = await fetch(API)
    const json = await response.json()
    const daily = json.daily
    const forecasts = []

    const content = document.querySelector('.container .content')

    const iamges = {
        'Thunderstorm': './assets/images/thunderstorm.png',
        'Drizzle': './assets/images/drizzle.png',
        'Rain': './assets/images/rain.png',
        'Snow': './assets/images/snow.png',
        'Fog': './assets/images/fog.png',
        'Tornado': './assets/images/tornado.png',
        'Clear': './assets/images/clear.png',
        'Clouds': './assets/images/clouds.png'
    }

    daily.forEach(item => {
        forecasts.push({
            date: new Date(item.dt * 1000),
            temperature: ~~(item.temp.day - 273.15),
            iamge: item.weather[0].main
        })
    })

    forecasts.forEach(item => {
        const card = document.createElement('div')
        const date = document.createElement('span')
        const weather = document.createElement('div')
        const image = document.createElement('img')
        const temp = document.createElement('span')

        card.classList.add('weather-card')
        date.classList.add('date')
        weather.classList.add('weather')
        image.classList.add('image')
        temp.classList.add('tempearature')

        const pad = str => str.toString().padStart(2, '0')

        date.innerHTML = `${pad(item.date.getDate())}:${pad(item.date.getMonth() + 1)}`
        image.src = iamges[item.iamge]

        temp.innerHTML = `${
            item.temperature > 0 ?
                '+' + item.temperature :
                item.temperature
        }&deg;`

        weather.appendChild(image)
        weather.appendChild(temp)

        card.appendChild(date)
        card.appendChild(weather)

        content.appendChild(card)
    })
}

parseWeather()
