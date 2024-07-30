const form = document.getElementById('form')
const input = document.getElementById('in1')
const maintitle = document.getElementById('main')
const loc = document.getElementById('loc')
const latitude = document.getElementById('lat')
const longtitude = document.getElementById('long')
const forecast = document.getElementById('forecast')
const error = document.getElementById('error')
const elements = document.querySelectorAll('h1:not(#main,#error)')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    maintitle.style.display = 'none'
    weather()
    form.reset()
})

async function weather() {
    try {
        const address = input.value
        const response = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await response.json()
        if (data.error) {
            error.style.display = 'block'
            error.innerText = data.error
            loc.style.display = 'none'
            latitude.style.display = 'none'
            longtitude.style.display = 'none'
            forecast.style.display = 'none'
        } else {
            showElement(0);
            loc.innerText = "Country is " + data.location
            latitude.innerText = "latitude is " + data.latitude
            longtitude.innerText = "longtitude is " + data.longtitude
            forecast.innerText = "Forecast is " + data.forecast
            error.style.display = 'none'
        }
    }
    catch(e) {
        error.innerText = 'Unable to fetch weather data'
    }
}

function showElement(index) {
    elements[index].style.display = 'block';
    if (index < elements.length - 1) {
        setTimeout(() => showElement(index + 1), 1000);
    }
}