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
            ' It is currently ' + body.currently.temperature + 
            ' degress out. There is a ' + body.currently.precipProbability + 
            '% chance of rain.')
        }
    })
}

module.exports = forecast