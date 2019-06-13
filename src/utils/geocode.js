const request = require("request")

const geocode = (adress, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(adress) + ".json?limit=1&access_token=pk.eyJ1IjoiaGFuazY5IiwiYSI6ImNqd2c0cHIzZjFjaXMzem91YWtjNzB3NnMifQ.KSbVcQCwCcQrm-13O0ADJw"

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unale to connect to location service", undefined)
        } else if (body.features === 0) {
            callback("Unale to find location try another search.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode