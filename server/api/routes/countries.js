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
 *       - name: country_names
 *         description: The names of the country to search for.
 *         in: query
 *         required: false
 *         type: string
 *         default: Malta, Swe
 *       - name: exactMatch
 *         description: Should it try to match part of the country name?
 *         in: query
 *         required: false
 *         type: boolean
 *         default: true
 *       - name: fields
 *         description: Fields used for filtering result from REST Countries api
 *         in: query
 *         required: false
 *         type: string
 *         default: name,flag
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

    function MapIdToCountries(countries) {
        let count = 0;
        countries.map(country => {
            country.id = count++;
            return country;
        });
    }

    //Get All
    if (req.query.country_names === undefined) {
        axios.get(`https://restcountries.eu/rest/v2/all${queryFields}`)
            .then(response => {
                MapIdToCountries(response.data);
                res.send(new Response(true, 'Countries received', { "countries": response.data }))
            })
            .catch(error => {
                throw error;
            })
    }

    //Get by full name
    if (req.query.country_names != undefined) {
        const queryCountryNames = req.query.country_names
            .split(',')
            .filter(e => e != '')
            .map(countryName => countryName.trim());
        
        const url = `https://restcountries.eu/rest/v2${queryFields}}`;
        axios.get(url)
            .then(response => {
                const countries = FilterCountriesByName(response.data, queryCountryNames, req.query.exactMatch);
                MapIdToCountries(countries);
                res.send(new Response(true, 'Countries found', { 'countries': countries }));
            })
            .catch(err => {
                if (err.response && err.response.status == 404) {
                    res.status(404);
                    res.send(new Response(false, 'Country with that name not found.', { error: err.message }));
                }
                res.send(new Response(false, 'Internal error occured', { error: err.message, url }));
            });
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