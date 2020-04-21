const request = require("request")


const forecast = (lat, long, callback) => {

const url = `http://api.weatherstack.com/current?access_key=e44e6882ceb3e51fb9a915689bbb8553&query=${lat},${long}&units=f`

    
request({ url, json: true}, (error, {body}) => {
  if(error) {
    callback("Unable to connect to weather service", undefined)
  } else if (body.error) {
    callback("Unable to find location", undefined)
  }
  else {
   callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}% `)
  }
 
})
  }

  module.exports = forecast