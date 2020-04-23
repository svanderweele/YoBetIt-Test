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


