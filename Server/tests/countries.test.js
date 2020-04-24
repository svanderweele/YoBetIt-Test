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
          "country_names": [
            {
              "flag": "https://restcountries.eu/data/mex.svg",
              "name": "Mexico"
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
          "country_names": [
            {
              "flag": "https://restcountries.eu/data/mlt.svg",
              "name": "Malta"
            },
            {
              "flag": "https://restcountries.eu/data/swe.svg",
              "name": "Sweden"
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
          "country_names": [
            {
              "flag": "https://restcountries.eu/data/khm.svg",
              "name": "Cambodia"
            },
            {
              "flag": "https://restcountries.eu/data/cmr.svg",
              "name": "Cameroon"
            },
            {
              "flag": "https://restcountries.eu/data/can.svg",
              "name": "Canada"
            },
            {
              "flag": "https://restcountries.eu/data/cpv.svg",
              "name": "Cabo Verde"
            },
            {
              "flag": "https://restcountries.eu/data/cym.svg",
              "name": "Cayman Islands"
            },
            {
              "flag": "https://restcountries.eu/data/caf.svg",
              "name": "Central African Republic"
            },
            {
              "flag": "https://restcountries.eu/data/tcd.svg",
              "name": "Chad"
            },
            {
              "flag": "https://restcountries.eu/data/chl.svg",
              "name": "Chile"
            },
            {
              "flag": "https://restcountries.eu/data/chn.svg",
              "name": "China"
            },
            {
              "flag": "https://restcountries.eu/data/cxr.svg",
              "name": "Christmas Island"
            },
            {
              "flag": "https://restcountries.eu/data/cck.svg",
              "name": "Cocos (Keeling) Islands"
            },
            {
              "flag": "https://restcountries.eu/data/col.svg",
              "name": "Colombia"
            },
            {
              "flag": "https://restcountries.eu/data/com.svg",
              "name": "Comoros"
            },
            {
              "flag": "https://restcountries.eu/data/cog.svg",
              "name": "Congo"
            },
            {
              "flag": "https://restcountries.eu/data/cod.svg",
              "name": "Congo (Democratic Republic of the)"
            },
            {
              "flag": "https://restcountries.eu/data/cok.svg",
              "name": "Cook Islands"
            },
            {
              "flag": "https://restcountries.eu/data/cri.svg",
              "name": "Costa Rica"
            },
            {
              "flag": "https://restcountries.eu/data/hrv.svg",
              "name": "Croatia"
            },
            {
              "flag": "https://restcountries.eu/data/cub.svg",
              "name": "Cuba"
            },
            {
              "flag": "https://restcountries.eu/data/cuw.svg",
              "name": "Curaçao"
            },
            {
              "flag": "https://restcountries.eu/data/cyp.svg",
              "name": "Cyprus"
            },
            {
              "flag": "https://restcountries.eu/data/cze.svg",
              "name": "Czech Republic"
            },
            {
              "flag": "https://restcountries.eu/data/civ.svg",
              "name": "Côte d'Ivoire"
            },
            {
              "flag": "https://restcountries.eu/data/ncl.svg",
              "name": "New Caledonia"
            },
            {
              "flag": "https://restcountries.eu/data/shn.svg",
              "name": "Saint Helena, Ascension and Tristan da Cunha"
            },
            {
              "flag": "https://restcountries.eu/data/tca.svg",
              "name": "Turks and Caicos Islands"
            }
          ]
        })
      });
  })
})



