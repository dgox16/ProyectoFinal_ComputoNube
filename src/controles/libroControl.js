const libroCtrl = {};
const Libro = require('../modelos/Libros');
const Autor = require('../modelos/Autores');

// AGREGAR LIBRO
libroCtrl.renderAgregarLibro = async (req, res) => {
    const autores = await Autor.find();
    res.render('libros/nuevoLibro', { autores });
};

libroCtrl.agregarLibro = async (req, res) => {
    const { titulo, autor, añoLectura, calificacion } = req.body;
    const { filename } = req.file;
    const usuario = req.user.id;
    const auxAutor = await Autor.findOne({ nombre: autor });
    if (auxAutor) {
        const libro = new Libro({
            titulo,
            autor: auxAutor.nombre,
            filename,
            path: 'img/portadas/' + filename,
            usuario,
            añoLectura,
            calificacion
        });
        await libro.save();
        res.redirect('/libro');
    } else {
        const autorBD = new Autor({
            nombre: autor
        });
        await autorBD.save(); // CREAR AUTOR
        const autorLibro = await Autor.findOne({ nombre: autor })
        const libro = new Libro({
            titulo,
            autor: autorLibro.nombre,
            filename,
            path: 'img/portadas/' + filename,
            usuario,
            añoLectura,
            calificacion
        });
        await libro.save();
        res.redirect('/libro');
    }
};


// VER LIBROS
libroCtrl.listaLibros = async (req, res) => {
    const libros = await Libro.find({ usuario: req.user.id }).sort({ createdAt: -1 });
    res.render('libros/todosLibros', { libros });
};

libroCtrl.renderVistaLibro = async (req, res) => {
    const libro = await Libro.findById(req.params.id);
    const autor = await Autor.findOne({nombre: libro.autor});
    res.render('libros/vista', { libro, autor });
};


// ELIMINAR Y EDITAR LIBRO
libroCtrl.eliminarLibro = async (req, res) => {
    await Libro.findByIdAndDelete(req.params.id);
    req.flash('mensajeExito', 'Has eliminado el libro');
    res.redirect('/libro');
}

libroCtrl.renderEditarLibro = async (req, res) => {
    const autores = await Autor.find();
    const libro = await Libro.findById(req.params.id);
    res.render('libros/editar', { libro, autores })
}

libroCtrl.editarLibro = async (req, res) => {
    const { titulo, autor, añoLectura, calificacion } = req.body;
    const { filename } = req.file;
    const usuario = req.user.id;
    const auxAutor = await Autor.findOne({ nombre: autor });
    if (auxAutor) {
        await Libro.findByIdAndUpdate(req.params.id, {
            titulo,
            autor: auxAutor.nombre,
            filename,
            path: 'img/portadas/' + filename,
            usuario,
            añoLectura,
            calificacion
        });
        res.redirect('/libro');
    } else {
        const autorBD = new Autor({
            nombre: autor
        });
        await autorBD.save();
        const autorLibro = await Autor.findOne({ nombre: autor })
        await Libro.findByIdAndUpdate(req.params.id, {
            titulo,
            autor: autorLibro.nombre,
            filename,
            path: 'img/portadas/' + filename,
            usuario,
            añoLectura,
            calificacion
        });
        res.redirect('/libro');
    }
}

module.exports = libroCtrl;