const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Response = require('../../Models/Response');

router.get('/', (req, res) => {

    //Get All
    if (req.body.country_name === undefined) {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => {
                const countryNames = response.data.map(country => country.name);
                res.send(new Response(true, 'Countries received', { "country_names": countryNames }))
            })
            .catch(error => {
                throw error;
            })
    }

    //Get by name
    if (req.body.country_name) {
        axios.get(`https://restcountries.eu/rest/v2/name/${req.body.country_name}`)
            .then(response => {
                const countries = response.data;
                const countryNames = countries.map(country => country.name);
                console.log(countryNames);
                if (req.body.match === true) {
                    res.send(new Response(true, 'Countries found', { 'country_names': countryNames }));
                } else {
                    res.send(new Response(true, 'Country found', { 'country_names': countryNames[0] }));
                }
            })
            .catch(err => {
                if (err.response.status == 404) {
                    res.status(404);
                    res.send(new Response(false, 'Country with that name not found.', { error: err.message }));
                }
            })
    }




});




module.exports = router;