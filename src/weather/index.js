import apiKey from './apiKey'
import { OpenWeather } from './openWeather'

const getWeatherItems = zip =>
  OpenWeather.fetch({ zip, apiKey })
    .map(res => res)
    .map(weathers => console.log(weathers))

///========================

const app = () => {
  const goBt = document.getElementById('go')
  const input = document.getElementById('zip')
  const results = document.getElementById('results')

  goBt.addEventListener('click', () => {
    const zip = input.value.trim()

    getWeatherItems(zip).fork(console.error, html => {
      results.innerHTML = html
    })
  })
}

app()
