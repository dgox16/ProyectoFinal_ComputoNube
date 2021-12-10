const libroCtrl = {};
const Libro = require('../modelos/Libros');
const Autor = require('../modelos/Autores');

libroCtrl.renderAgregarLibro = async (req, res) => {
    const autores = await Autor.find();
    res.render('libros/nuevoLibro', { autores });
}
libroCtrl.agregarLibro = async (req, res) => {
    const { titulo, autor, añoLectura, calificacion } = req.body;
    const { filename } = req.file;
    const usuario = req.user.id;
    const auxAutor = await Autor.findOne({ nombre : autor });
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
            nombre : autor
        });
        await autorBD.save();
        const autorLibro = await Autor.findOne({nombre: autor})
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
}

libroCtrl.listaLibros = async (req, res) => {
    const libros = await Libro.find({ usuario: req.user.id }).sort({ createdAt: -1 });
    res.render('libros/todosLibros', { libros });
}

libroCtrl.renderVistaLibro = async (req, res) => {
    const libro = await Libro.findById(req.params.id);
    res.render('libros/vista', { libro });
}

libroCtrl.eliminarLibro = async (req, res) => {
    await Libro.findByIdAndDelete(req.params.id);
    req.flash('mensajeExito', 'Has eliminado el libro');
    res.redirect('/libro');
}

libroCtrl.renderEditarLibro = async (req, res) => {
    const libro = await Libro.findById(req.params.id); 
    res.render('libros/editar/:id', {libro})
}

module.exports = libroCtrl;