const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// --- define  path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// --- Setup handlebars and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// --- Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Corentin',
    })
});

app.get('/about', (Sreq, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Corentin',
    })
});

app.get('/help', (Sreq, res) => {
    res.render('help', {
        title: 'Need help ? ...',
        name: 'Corentin',
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an adress ! ',
        })
    }

    var city = req.query.address;

    geocode(city, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            return res.send({
                city,
                latitude,
                longitude,
                location,
                forecast: forecastData,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        })
    }
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('Error', {
        title: 'Error',
        errorMsg: 'Help article not found',
        name: 'Corentin',
    })
});

app.get('*', (req, res) => {
    res.render('Error', {
        title: '404',
        errorMsg: 'Page not found.',
        name: 'Corentin',
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});