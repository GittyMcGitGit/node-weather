const request = require("request")
const forecast = (lat, long, callback) => {

    const url = "https://api.darksky.net/forecast/65206126ce3a8af085e326872423203c/" + long + "," + lat + "?units=si&lang=de"

    request({ url, json:true}, (error, {body}) => {
        if (error){
            callback("Unale to connect to weather service", undefined)
        } else if (body.error){
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 
            ' Es sind momentan ' + body.currently.temperature + 
            ' Grad Celsius und ' + body.currently.precipProbability + 
            '% Regenwahrscheinlichkeit. Die heutige Höchsttemperatur beträgt ' + body.daily.data[0].temperatureHigh + 
            ' Grad Celsius.')
        }
    })
}

module.exports = forecast