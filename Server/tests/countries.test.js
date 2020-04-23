const request = require('supertest')
const app = require('../index')


describe('Get Country', () => {
  const countryName = 'Mexico';
  it('it should get a country', async () => {
    const res = await request(app)
      .get('/api/countries')
      .send({
        country_name: countryName,
      })
      .expect(200,
        {
          message: countryName,
          success: true
        });
  })
})

describe('Get Country (not found)', () => {
  const countryName = 'Mexo';
  it('it should get a country', async () => {
    const res = await request(app)
      .get('/api/countries')
      .send({
        country_name: countryName,
        match: false
      })
      .expect(404,
        {
          "success": false,
          "message": "Country with that name not found."
        });
  })
})


describe('Get Country Matches', () => {
  const countryName = 'Uni';
  it('it should get a country', async () => {
    const res = await request(app)
      .get('/api/countries')
      .send({
        country_name: countryName,
        match: true
      })
      .expect(200,
        {
          message: [
            "United States Minor Outlying Islands",
            "Réunion",
            "Tanzania, United Republic of",
            "Tunisia",
            "United Arab Emirates",
            "United Kingdom of Great Britain and Northern Ireland",
            "United States of America",
            "Comoros",
            "Jordan",
            "Mexico",
            "Myanmar"],
          success: true
        });
  })
})




