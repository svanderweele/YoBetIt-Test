const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Defining routes
const countries = require('./api/countries');
app.use('/api/countries', countries);


//Setup Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;