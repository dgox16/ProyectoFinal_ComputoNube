require('dotenv').config();

require('./database'); // Se exportan los datos de la base de datos
const app = require('./server') // Se exportan las funciones de server donde se hacen las rutas

app.listen(app.get('puerto'), () => {
    console.log("Server on port", app.get('puerto')); // Prueba de conexion
});