const autorCtrl = {};
const Autor = require('../modelos/Autores');
const Libro = require('../modelos/Libros');

autorCtrl.renderVistaAutores = async (req, res) => {
    const autores = await Autor.find().sort({nombre: 1});
    res.render('autores/todosAutores', {autores});
};
autorCtrl.renderAdministrarAutor = async (req, res) => {
    const autor = await Autor.findById(req.params.id);
    const libros = await Libro.find({ autor: autor.nombre })
    console.log(libros);
    res.render('autores/administrar', { autor, libros });
}


module.exports = autorCtrl;