const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Response = require('../../../models/Response');


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

    //Filtering
    let queryFields = '?';

    if (req.query.fields) {
        let fields = req.query.fields.split(',');
        if (fields.length > 0) {
            queryFields += 'fields='
            fields.forEach(field => {
                queryFields += `${field};`;
            })
        }
    }

    //Get All
    if (req.query.country_names === undefined) {
        axios.get(`https://restcountries.eu/rest/v2/all${queryFields}`)
            .then(response => {
                const countryData = response.data.map(country => country);
                res.send(new Response(true, 'Countries received', { "country": countryData }))
            })
            .catch(error => {
                throw error;
            })
    }

    //Get by full name
    if (req.query.country_names != undefined) {
        // let url = `https://restcountries.eu/rest/v2/name/${req.query.country_name}${queryFields}`;
        // console.log(url);
        // axios.get(url)
        //     .then(response => {
        //         const countryData = response.data;
        //         res.send(new Response(true, 'Country found', { 'country': countryData }));
        //     })
        //     .catch(err => {
        //         if (err.response.status == 404) {
        //             res.status(404);
        //             res.send(new Response(false, 'Country with that name not found.', { error: err.message }));
        //         }
        //     })


        const queryCountryNames = req.query.country_names.split(',');


        const url = `https://restcountries.eu/rest/v2${queryFields}}`;
        axios.get(url)
            .then(response => {
                const countries = response.data;
                const filteredCountries = FilterCountriesByName(countries, queryCountryNames, req.query.exactMatch);
                res.send(new Response(true, 'Countries found', { 'country_names': filteredCountries }));
            })
            .catch(err => {
                if (err.response && err.response.status == 404) {
                    res.status(404);
                    res.send(new Response(false, 'Country with that name not found.', { error: err.message }));
                }
                res.send(new Response(false, 'Internal error occured', { error: err.message, url }));
            });
    }

    //Get by array of names
    if (req.query.country_names) {


    }


});


function FilterCountriesByName(countries, filterNames, exactMatch) {

    let validCountries = [];

    countries.forEach(country => {
        filterNames.forEach(queryName => {
            if (exactMatch === 'true') {
                if (country.name === queryName) {
                    validCountries.push(country);
                }
            } else {
                if (country.name.indexOf(queryName) > -1) {
                    validCountries.push(country);
                }
            }
        });
    });

    return validCountries;
}




module.exports = router;