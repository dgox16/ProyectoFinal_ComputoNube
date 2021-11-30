const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


//Inicializacion
const app = express();
require('./configuraciones/passport');

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
app.use(methodOverride('__method'));
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


// Global Variables
app.use((req, res, next) => {
    res.locals.mensajeExito = req.flash('mensajeExito');
    res.locals.mensajeError = req.flash('mensajeError');
    res.locals.error = req.flash('error');
    res.locals.usuario = req.usuario || null;
    next();
});

// Rutas 
app.use(require('./rutas/index.ruta')); // Las rutas se manejaran en archivos a parte
app.use(require('./rutas/usuario.ruta'));


module.exports = app