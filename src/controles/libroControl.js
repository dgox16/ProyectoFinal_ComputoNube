const libroCtrl = {};
const Libro = require('../modelos/Libros');

libroCtrl.renderAgregarLibro = (req, res) => {
    res.render('libros/nuevoLibro')
}
libroCtrl.agregarLibro = async (req, res) => { 
    const { titulo, descripcion } = req.body;
    const { filename, originalname, mimetype, size} = req.file;
    const libro = new Libro({
        titulo,
        descripcion,
        filename,
        path : 'img/subidas/' + filename,
        originalname,
        mimetype,
        size
    });
    await libro.save();
    res.redirect('/libro');
}

libroCtrl.listaLibros = async (req, res) => {
    const libros = await Libro.find();
    res.render('libros/todosLibros', { libros });
}

module.exports = libroCtrl;