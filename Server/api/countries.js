const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Response = require('../../Models/Response');

router.get('/', (req, res) => {
    axios.get(`https://restcountries.eu/rest/v2/name/${req.body.country_name}`)
        .then(response => {
            const countries = response.data;
            const countryNames = countries.map(country => country.name);
            console.log(countryNames);
            if (req.body.match === true) {
                res.send(new Response(true, countryNames));
            } else {
                res.send(new Response(true, countryNames[0]));
            }
        })
        .catch(err => {
            if (err.response.status == 404) {
                res.status(404);
                res.send(new Response(false, 'Country with that name not found.'));
            }
        })
});


module.exports = router;