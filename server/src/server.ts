import App from './app';
import CountriesController from './controllers/countries.controller';
import SlotsController from './controllers/slots.controller';

const PORT: number = +process.env.PORT || 5000;
const app = new App(
  [
    new CountriesController(),
    new SlotsController(),
  ],
  PORT,
);

app.listen();