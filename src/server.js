const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

//Inicializacion
const app = express();

// Ajustes
app.set('puerto', process.env.PORT || 3000); // Se define el puerto a usar
app.set('views', path.join(__dirname,"views")); // Se indican donde estan las vistas a mostrar con join
app.engine('.hbs', exphbs.engine({ // Se configura hbs que se usara como un html programable
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // Ubicacion donde estara la base de todas las paginas
    partialsDir: path.join(app.get('views'), 'partials'), // Partes de html para reusar
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', '.hbs'); // Se indica que se usara hbs

// Middlewars
app.use(express.urlencoded({extended : false}));

// Rutas 
app.use(require('./rutas/index.ruta')); // Las rutas se manejaran en archivos a parte


module.exports = app