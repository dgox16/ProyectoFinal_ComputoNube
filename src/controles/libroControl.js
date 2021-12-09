const libroCtrl = {};
const Libro = require('../modelos/Libros');
const Autor = require('../modelos/Autores');

libroCtrl.renderAgregarLibro = async (req, res) => {
    const autores = await Autor.find();
    res.render('libros/nuevoLibro', { autores });
}
libroCtrl.agregarLibro = async (req, res) => {
    const { titulo, autor } = req.body;
    const { filename } = req.file;
    const usuario = req.user.id;
    const auxAutor = await Autor.findOne({ nombre : autor });
    if (auxAutor) {
        const libro = new Libro({
            titulo,
            autor: auxAutor.nombre,
            filename,
            path: 'img/portadas/' + filename,
            usuario
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
            usuario
        });
        await libro.save();
        res.redirect('/libro');
    }    
}

libroCtrl.listaLibros = async (req, res) => {
    const libros = await Libro.find({ usuario: req.user.id }).sort({ createdAt: -1 });
    res.render('libros/todosLibros', { libros });
}

module.exports = libroCtrl;