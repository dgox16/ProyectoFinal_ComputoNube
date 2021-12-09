const mongoose = require('mongoose'); // Se utilizara el modulo de mongoose para la conexion con la DB

const { MONGODB_HOST, MONGODB_BASEDATOS } = process.env;

const MONGODB = `mongodb://${MONGODB_HOST}/${MONGODB_BASEDATOS}`; // Se indica con que base de datos se va a conectar

mongoose.connect(MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected to', db.connection.host)) // Indicacion de conexion
    .catch(err => console.log(err));
