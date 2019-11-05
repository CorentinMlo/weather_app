const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ec5dc6d52596af7ba052bb18f4f97c7e/' + latitude + ',' + longitude + '?units=si&lang=fr';
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Impossible de se connecter au service météo !', undefined);
        } else if (body.error){
            callback(body.error, undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' Il fait actuellement ' + body.currently.temperature + '°C. Il y a ' + body.currently.precipProbability * 100 + '% de chance de précipitation. \n La vitesse du vent est de ' + body.currently.windSpeed + ' m/s, le ciel est recouvert à ' +  body.currently.cloudCover*100 + '% et l\'indice UV est de ' + body.currently.uvIndex + '.');
        }
    })
}

module.exports = forecast