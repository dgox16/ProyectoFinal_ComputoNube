const autorCtrl = {};
const Autor = require('../modelos/Autores');
const Libro = require('../modelos/Libros');

autorCtrl.renderVistaAutores = async (req, res) => {
    const autores = await Autor.find().sort({nombre: 1});
    res.render('autores/todosAutores', {autores});
};

module.exports = autorCtrl;