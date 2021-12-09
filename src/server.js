const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const timeago = require('timeago.js');


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
    helpers: require('./auxiliar/handlebars'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
})); 

app.set('view engine', '.hbs'); // Se indica que se usara hbs

// Middlewars
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(morgan('dev'));
const almacenamiento = multer.diskStorage({
    destination : path.join(__dirname, 'public/img/subidas'),
    filename : (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});
app.use(multer({ storage : almacenamiento }).single('imagen'))


// Global Variables
app.use((req, res, next) => {
    res.locals.mensajeExito = req.flash('mensajeExito');
    res.locals.mensajeError = req.flash('mensajeError');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.timeago = timeago;
    next();
});


// Rutas 
app.use(require('./rutas/index.ruta')); // Las rutas se manejaran en archivos a parte
app.use(require('./rutas/usuario.ruta'));
app.use(require('./rutas/libro.ruta'));

// CSS e IMAGENES
app.use(express.static(path.join(__dirname, "public")));   

module.exports = app