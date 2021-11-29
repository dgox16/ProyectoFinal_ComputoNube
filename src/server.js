const express = require('express');

//Inicializacion
const app = express();
app.set('port', process.env.PORT || 3000);

module.exports = app