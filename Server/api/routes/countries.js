const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Response = require.main.require('../Models/Response');


/**
 * @swagger
 * /api/countries:
 *   get:
 *     tags: ['Countries']
 *     description: Get Countries
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: country_name
 *         description: The name of the country to search for.
 *         in: query
 *         required: false
 *         type: string
 *         default: Uni
 *       - name: country_names
 *         description: The names of the country to search for.
 *         in: query
 *         required: false
 *         type: string
 *         default: Uni
 *       - name: match
 *         description: Should it try to match part of the country name?
 *         in: query
 *         required: false
 *         type: boolean
 *         default: false
 *     responses:
 *       200:
 *         description: A successful response.
 *         schema:
 *           $ref: '#/components/schemas/Response'
 */
router.get('/', (req, res) => {

    //Get All
    if (req.query.country_name === undefined) {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                const countryNames = response.data.map(country => country.name);
                res.send(new Response(true, 'Countries received', { "country_names": countryNames }))
            })
            .catch(error => {
                throw error;
            })
    }

    //Get by full name
    if (req.query.country_name != undefined) {
        axios.get(`https://restcountries.eu/rest/v2/name/${req.query.country_name}?fullText=true&fields=name`)
            .then(response => {
                const countries = response.data;
                const countryNames = countries.map(country => country.name);
                res.send(new Response(true, 'Country found', { 'country_names': countryNames[0] }));
            })
            .catch(err => {
                if (err.response.status == 404) {
                    res.status(404);
                    res.send(new Response(false, 'Country with that name not found.', { error: err.message }));
                }
            })
    }

    //Get by array of names
    if (req.query.country_names) {

        const queryCountryNames = req.query.country_names.split(',');
        const matchingCountries = [];
        axios.get(`https://restcountries.eu/rest/v2?fields=name`)
            .then(response => {
                const countries = response.data;
                const countryNames = countries.map(country => country.name);
                countryNames.forEach(name => {
                    queryCountryNames.forEach(queryName => {
                        if (name.indexOf(queryName) > -1) {
                            matchingCountries.push(name);
                        }
                    });
                });
                res.send(new Response(true, 'Countries found', { 'country_names': matchingCountries }));
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