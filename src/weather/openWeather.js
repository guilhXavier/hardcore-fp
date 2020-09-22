import { Task } from '../types'
import { compose, map } from 'ramda'

const makeWeatherUrl = ({ zip, apiKey }) =>
  `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apiKey}`

const fetchIt = url =>
  Task((rej, res) =>
    fetch(url, {
      'Content-Type': 'application/json',
      'API-Key': 'secret',
    })
      .then(res)
      .then(x => x.json())
      .catch(rej)
  )

const OpenWeather = {
  fetch: compose(fetchIt, makeWeatherUrl),
}

export { OpenWeather }
