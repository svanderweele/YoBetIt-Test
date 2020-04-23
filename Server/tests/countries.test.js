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
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toStrictEqual({ 'country_names': countryName });
        expect(res.body).toHaveProperty('message');
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
      .expect(404)
      .then((res) => {
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message');
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
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toStrictEqual({
          'country_names': [
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
            "Myanmar"]
        })
      });

  })
})




