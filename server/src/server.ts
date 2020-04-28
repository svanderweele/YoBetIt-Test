import App from './app';
import CountriesController from './controllers/countries.controller';

const PORT: number = +process.env.PORT || 5000;
const app = new App(
  [
    new CountriesController(),
  ],
  PORT,
);

app.listen();