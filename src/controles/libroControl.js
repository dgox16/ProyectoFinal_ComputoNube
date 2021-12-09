const libroCtrl = {};
const Libro = require('../modelos/Libros');

libroCtrl.renderAgregarLibro = (req, res) => {
    res.render('libros/nuevoLibro')
}
libroCtrl.agregarLibro = async (req, res) => { 
    const { titulo, autor } = req.body;
    const { filename, originalname, mimetype, size} = req.file;
    const usuario = req.user.id;
    const libro = new Libro({
        titulo,
        autor,
        filename,
        path : 'img/subidas/' + filename,
        originalname,
        mimetype,
        usuario,
        size
    });
    

    await libro.save();
    res.redirect('/libro');
}

libroCtrl.listaLibros = async (req, res) => {
    const libros = await Libro.find({usuario: req.user.id}).sort({createdAt : -1});
    res.render('libros/todosLibros', { libros });
}

module.exports = libroCtrl;