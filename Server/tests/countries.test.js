const request = require('supertest')
const app = require('../index')


describe('Get Country (Exact Match)', () => {
  const countryName = "Mexico";
  it('it should get a country', async () => {
    const res = await request(app)
      .get('/api/countries')
      .query({
        country_names: countryName,
        exactMatch: true,
        fields: "name,flag"
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toStrictEqual({
          "countries": [
            {
              "flag": "https://restcountries.eu/data/mex.svg",
              "name": "Mexico",
              "id": 0
            }
          ]
        });
        expect(res.body).toHaveProperty('message');
      });
  })
})


describe('Get Country Matches', () => {
  const countryNames = 'Malta,Swe';
  it('it should get a country', async () => {
    const res = await request(app)
      .get('/api/countries')
      .query({
        country_names: countryNames,
        exactMatch: false,
        fields: 'name,flag'
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message');
        expect(res.body.data).toStrictEqual({
          "countries": [
            {
              "flag": "https://restcountries.eu/data/mlt.svg",
              "name": "Malta",
              "id": 0
            },
            {
              "flag": "https://restcountries.eu/data/swe.svg",
              "name": "Sweden",
              "id": 1
            }
          ]
        })
      });

  })
})


describe('Get All Countries', () => {
  it('should retrieve a list of countries', async () => {
    const res = await request(app)
      .get('/api/countries')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('success', true);
      })
  })
})




describe('Get Countries (not exact match)', () => {
  const countryName = 'C';
  it('it should get a country', async () => {
    const res = await request(app)
      .get('/api/countries')
      .query({
        country_names: countryName,
        exactMatch: false,
        fields: 'name,flag'
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message');

        expect(res.body.data).toStrictEqual({
          "countries": [
            {
              "flag": "https://restcountries.eu/data/khm.svg",
              "name": "Cambodia",
              "id": 0
            },
            {
              "flag": "https://restcountries.eu/data/cmr.svg",
              "name": "Cameroon",
              "id": 1
            },
            {
              "flag": "https://restcountries.eu/data/can.svg",
              "name": "Canada",
              "id": 2
            },
            {
              "flag": "https://restcountries.eu/data/cpv.svg",
              "name": "Cabo Verde",
              "id": 3
            },
            {
              "flag": "https://restcountries.eu/data/cym.svg",
              "name": "Cayman Islands",
              "id": 4
            },
            {
              "flag": "https://restcountries.eu/data/caf.svg",
              "name": "Central African Republic",
              "id": 5
            },
            {
              "flag": "https://restcountries.eu/data/tcd.svg",
              "name": "Chad",
              "id": 6
            },
            {
              "flag": "https://restcountries.eu/data/chl.svg",
              "name": "Chile",
              "id": 7
            },
            {
              "flag": "https://restcountries.eu/data/chn.svg",
              "name": "China",
              "id": 8
            },
            {
              "flag": "https://restcountries.eu/data/cxr.svg",
              "name": "Christmas Island",
              "id": 9
            },
            {
              "flag": "https://restcountries.eu/data/cck.svg",
              "name": "Cocos (Keeling) Islands",
              "id": 10
            },
            {
              "flag": "https://restcountries.eu/data/col.svg",
              "name": "Colombia",
              "id": 11
            },
            {
              "flag": "https://restcountries.eu/data/com.svg",
              "name": "Comoros",
              "id": 12
            },
            {
              "flag": "https://restcountries.eu/data/cog.svg",
              "name": "Congo",
              "id": 13
            },
            {
              "flag": "https://restcountries.eu/data/cod.svg",
              "name": "Congo (Democratic Republic of the)",
              "id": 14
            },
            {
              "flag": "https://restcountries.eu/data/cok.svg",
              "name": "Cook Islands",
              "id": 15
            },
            {
              "flag": "https://restcountries.eu/data/cri.svg",
              "name": "Costa Rica",
              "id": 16
            },
            {
              "flag": "https://restcountries.eu/data/hrv.svg",
              "name": "Croatia",
              "id": 17
            },
            {
              "flag": "https://restcountries.eu/data/cub.svg",
              "name": "Cuba",
              "id": 18
            },
            {
              "flag": "https://restcountries.eu/data/cuw.svg",
              "name": "Curaçao",
              "id": 19
            },
            {
              "flag": "https://restcountries.eu/data/cyp.svg",
              "name": "Cyprus",
              "id": 20
            },
            {
              "flag": "https://restcountries.eu/data/cze.svg",
              "name": "Czech Republic",
              "id": 21
            },
            {
              "flag": "https://restcountries.eu/data/civ.svg",
              "name": "Côte d'Ivoire",
              "id": 22
            },
            {
              "flag": "https://restcountries.eu/data/ncl.svg",
              "name": "New Caledonia",
              "id": 23
            },
            {
              "flag": "https://restcountries.eu/data/shn.svg",
              "name": "Saint Helena, Ascension and Tristan da Cunha",
              "id": 24
            },
            {
              "flag": "https://restcountries.eu/data/tca.svg",
              "name": "Turks and Caicos Islands",
              "id": 25
            }
          ]
        })
      });
  })
})



